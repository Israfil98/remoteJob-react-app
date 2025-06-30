import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchJobItem, fetchJobList } from '../api/jobApi';
import { useJobListStore } from '../stores/jobListStore';

export function useJobList(searchText: string) {
  return useQuery({
    queryKey: ['job-list', searchText],
    queryFn: () => fetchJobList(searchText),
    staleTime: 1000 * 60 * 60,
    refetchOnWindowFocus: false,
    retry: false,
    enabled: !!searchText,
  });
}

export function useSelectedJobItem() {
  const setActiveItem = useJobListStore((state) => state.actions.setActiveItem);
  const { id } = useParams();

  useEffect(() => {
    if (id) setActiveItem(id);
  }, [id, setActiveItem]);

  return useQuery({
    queryKey: ['job-item', id],
    queryFn: () => fetchJobItem(id),
    staleTime: 1000 * 60 * 60,
    retry: false,
    enabled: !!id,
    refetchOnWindowFocus: false,
  });
}

export function useDebounce<T>(value: T, delay: number) {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timerId = setTimeout(() => setDebouncedValue(value), delay);

    return () => clearTimeout(timerId);
  }, [delay, value]);

  return debouncedValue;
}
