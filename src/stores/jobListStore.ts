import { create } from 'zustand';
import type { TJobItem, TSortBy } from '../utilities/commonTypes';

type TJobListStore = {
  jobList: TJobItem[];
  searchText: string;
  activeJobItemId: string | null;
  currentPage: number;
  sortBy: TSortBy;
  actions: {
    onSearchTextChange: (newText: string) => void;
    setJobList: (jobList: TJobItem[]) => void;
    setActiveItem: (id: string) => void;
    setCurrentPage: (page: number) => void;
    setSortBy: (sortBy: TSortBy) => void;
  };
};

export const useJobListStore = create<TJobListStore>()((set) => ({
  jobList: [],
  searchText: '',
  activeJobItemId: null,
  currentPage: 1,
  sortBy: 'relevant',
  actions: {
    onSearchTextChange: (newText: string) => {
      set(() => ({ searchText: newText }));
    },
    setJobList: (jobList: TJobItem[]) => {
      set(() => ({ jobList: jobList }));
    },
    setActiveItem: (id: string) => {
      set(() => ({ activeJobItemId: id }));
    },
    setCurrentPage: (page: number) => {
      set(() => ({ currentPage: page }));
    },
    setSortBy: (sortBy: TSortBy) => {
      set(() => ({ sortBy: sortBy }));
    },
  },
}));
