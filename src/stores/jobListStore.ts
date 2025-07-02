import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { TJobItem, TSortBy } from '../utilities/commonTypes';

type TJobListStore = {
  jobList: TJobItem[];
  searchText: string;
  activeJobItemId: string | null;
  currentPage: number;
  sortBy: TSortBy;
  bookmarkedIdList: number[];
  togglePopover: boolean;
  actions: {
    onSearchTextChange: (newText: string) => void;
    setJobList: (jobList: TJobItem[]) => void;
    setActiveItem: (id: string) => void;
    setCurrentPage: (page: number) => void;
    setSortBy: (sortBy: TSortBy) => void;
    toggleBookmarkedId: (id: number) => void;
    onTogglePopover: (toggle: boolean) => void;
  };
};

export const useJobListStore = create<TJobListStore>()(
  persist(
    (set, get) => ({
      jobList: [],
      searchText: '',
      activeJobItemId: null,
      currentPage: 1,
      sortBy: 'relevant',
      bookmarkedIdList: [],
      togglePopover: false,
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
        toggleBookmarkedId: (id: number) => {
          const currentBookmarkedList = get().bookmarkedIdList;

          if (currentBookmarkedList.includes(id)) {
            set((state) => ({
              bookmarkedIdList: state.bookmarkedIdList.filter(
                (currId) => currId !== id
              ),
            }));
          } else {
            set((state) => ({
              bookmarkedIdList: [...state.bookmarkedIdList, id],
            }));
          }
        },
        onTogglePopover: (toggle) => {
          set(() => ({ togglePopover: toggle }));
        },
      },
    }),
    {
      name: 'bookmarkedIdList',
      partialize: (state) => ({ bookmarkedIdList: state.bookmarkedIdList }),
    }
  )
);
