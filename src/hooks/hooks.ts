import { useQueries, useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useParams } from 'react-router-dom';
import { fetchJobItem, fetchJobList } from '../api/jobApi';
import { useJobListStore } from '../stores/jobListStore';

export function useJobList(searchText: string) {
  const { data, isLoading, error } = useQuery({
    queryKey: ['job-list', searchText],
    queryFn: () => fetchJobList(searchText),
    staleTime: 1000 * 60 * 60,
    refetchOnWindowFocus: false,
    retry: false,
    enabled: !!searchText,
  });

  useEffect(() => {
    if (error) toast.error(error.message, { duration: 2000 });
  }, [error]);

  return { data, isLoading } as const;
}

export function useSelectedJobItem() {
  const setActiveItem = useJobListStore((state) => state.actions.setActiveItem);
  const { id } = useParams();

  const { data, isLoading, error } = useQuery({
    queryKey: ['job-item', id],
    queryFn: () => fetchJobItem(id!),
    staleTime: 1000 * 60 * 60,
    retry: false,
    enabled: !!id,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (error) toast.error(error.message, { duration: 2000 });
    if (id) setActiveItem(id);
  }, [id, setActiveItem, error]);

  return { data, isLoading } as const;
}

export function useBookmarkedJobItems(ids: number[]) {
  return useQueries({
    queries: ids.map((id) => ({
      queryKey: ['job-item', String(id)],
      queryFn: () => fetchJobItem(String(id)),
      staleTime: 1000 * 60 * 60,
      retry: false,
      enabled: !!id,
      refetchOnWindowFocus: false,
    })),
    combine: (results) => {
      return {
        data: results
          .map((result) => result.data)
          .filter((jobItem) => jobItem !== undefined),
        pending: results.some((result) => result.isPending),
      };
    },
  });
}

export function useBookmarkedIdList(id: number) {
  const toggleBookmarkedId = useJobListStore(
    (state) => state.actions.toggleBookmarkedId
  );
  const bookmarkedIdList = useJobListStore((state) => state.bookmarkedIdList);

  const onBookmarkIconClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    event.stopPropagation();

    toggleBookmarkedId(id);
  };

  return { bookmarkedIdList, onBookmarkIconClick };
}

export function useDebounce<T>(value: T, delay: number) {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timerId = setTimeout(() => setDebouncedValue(value), delay);

    return () => clearTimeout(timerId);
  }, [delay, value]);

  return debouncedValue;
}
