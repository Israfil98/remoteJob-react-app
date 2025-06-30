import { create } from 'zustand';
import type { TJobItem } from '../utilities/commonTypes';

type TJobListStore = {
  jobList: TJobItem[];
  searchText: string;
  activeJobItemId: string | null;
  actions: {
    onSearchTextChange: (newText: string) => void;
    setJobList: (jobList: TJobItem[]) => void;
    setActiveItem: (id: string) => void;
  };
};

export const useJobListStore = create<TJobListStore>()((set) => ({
  jobList: [],
  searchText: '',
  activeJobItemId: null,
  actions: {
    onSearchTextChange: (newText) => {
      set(() => ({ searchText: newText }));
    },
    setJobList: (jobList: TJobItem[]) => {
      set(() => ({ jobList: jobList }));
    },
    setActiveItem: (id) => {
      set(() => ({ activeJobItemId: id }));
    },
  },
}));
