export type TJobItem = {
  id: number;
  title: string;
  badgeLetters: string;
  company: string;
  relevanceScore: number;
  daysAgo: number;
};

export type TJobListStore = {
  searchText: string;
  jobList: TJobItem[];
  isLoading: boolean;
  activeJobItemId: number | null;
  selectedJobItem: TSelectedJobItem | null;
  isLoadingSelectedJobItem: boolean;
  actions: {
    onSearchTextChange: (newText: string) => void;
    fetchJobListItems: (searchText: string) => Promise<void>;
    handleHashChange: () => void;
    fetchJobListItem: (id: number) => Promise<void>;
  };
};

export type TFetchJobListAPI = {
  public: boolean;
  sorted: boolean;
  jobItems: TJobItem[];
};

export type TSelectedJobItem = {
  id: number;
  badgeLetters: string;
  company: string;
  companyURL: string;
  coverImgURL: string;
  daysAgo: number;
  description: string;
  duration: string;
  location: string;
  qualifications: string[];
  relevanceScore: number;
  reviews: string[];
  salary: string;
  title: string;
};

export type TFetchJobItemAPI = {
  public: boolean;
  jobItem: TSelectedJobItem;
};
