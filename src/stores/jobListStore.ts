import { create } from "zustand";

import type {
  TFetchJobItemAPI,
  TFetchJobListAPI,
  TJobListStore,
} from "../utilities/commonTypes";
import { BASE_URL_API } from "../utilities/constants";

export const useJobListStore = create<TJobListStore>()((set) => ({
  searchText: "",
  jobList: [],
  isLoading: false,
  activeJobItemId: null,
  selectedJobItem: null,
  isLoadingSelectedJobItem: false,
  actions: {
    onSearchTextChange: (newText) => {
      set(() => ({ searchText: newText }));
    },
    fetchJobListItems: async (searchText: string) => {
      set(() => ({ isLoading: true }));

      const response = await fetch(`${BASE_URL_API}?search=${searchText}`);
      const data: TFetchJobListAPI = await response.json();

      set(() => ({ isLoading: false }));
      set(() => ({ jobList: data.jobItems }));
    },
    handleHashChange: () => {
      const id = +window.location.hash.slice(1);
      set(() => ({ activeJobItemId: id }));
    },
    fetchJobListItem: async (id: number) => {
      set(() => ({ isLoadingSelectedJobItem: true }));

      const response = await fetch(`${BASE_URL_API}/${id}`);
      const data: TFetchJobItemAPI = await response.json();

      set(() => ({ isLoadingSelectedJobItem: false }));
      set(() => ({ selectedJobItem: data.jobItem }));
    },
  },
}));
