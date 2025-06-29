import { useEffect, useState } from 'react';
import { useJobListStore } from '../stores/jobListStore';

export function useJobList(searchText: string) {
  const onSearchTextChange = useJobListStore(
    (state) => state.actions.onSearchTextChange
  );
  const fetchJobListItems = useJobListStore(
    (state) => state.actions.fetchJobListItems
  );

  useEffect(() => {
    if (!searchText) return;

    fetchJobListItems(searchText);
  }, [searchText, fetchJobListItems]);

  return {
    onSearchTextChange,
  };
}

export function useActiveJobItemId() {
  const handleHashChange = useJobListStore(
    (state) => state.actions.handleHashChange
  );
  const activeJobItemId = useJobListStore((state) => state.activeJobItemId);

  useEffect(() => {
    handleHashChange();

    window.addEventListener('hashchange', handleHashChange);

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, [handleHashChange]);

  return activeJobItemId;
}

export function useSelectedJobItem() {
  const activeJobItemId = useActiveJobItemId();
  const fetchJobListItem = useJobListStore(
    (state) => state.actions.fetchJobListItem
  );
  const selectedJobItem = useJobListStore((state) => state.selectedJobItem);
  const isLoadingSelectedJobItem = useJobListStore(
    (state) => state.isLoadingSelectedJobItem
  );

  useEffect(() => {
    if (!activeJobItemId) return;

    fetchJobListItem(activeJobItemId);
  }, [activeJobItemId, fetchJobListItem]);

  return { selectedJobItem, isLoadingSelectedJobItem };
}

export function useDebounce<T>(value: T, delay: number) {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timerId = setTimeout(() => setDebouncedValue(value), delay);

    return () => clearTimeout(timerId);
  }, [delay, value]);

  return debouncedValue;
}

export const createUniqueKey = <T>(value: T, index: number) => {
  const key = `${value} ${Math.random() + index}`;

  return key;
};
