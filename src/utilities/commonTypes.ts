export type TJobItem = {
  id: number;
  title: string;
  badgeLetters: string;
  company: string;
  relevanceScore: number;
  daysAgo: number;
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
