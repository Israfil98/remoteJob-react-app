import { create } from 'zustand';
import type { TJobItem } from '../utilities/commonTypes';

type TJobListStore = {
  jobList: TJobItem[];
  searchText: string;
  activeJobItemId: string | null;
  currentPage: number;
  actions: {
    onSearchTextChange: (newText: string) => void;
    setJobList: (jobList: TJobItem[]) => void;
    setActiveItem: (id: string) => void;
    setCurrentPage: (page: number) => void;
  };
};

export const useJobListStore = create<TJobListStore>()((set, get) => ({
  jobList: [],
  searchText: '',
  activeJobItemId: null,
  currentPage: 1,
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
  },
}));
