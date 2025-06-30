import type {
  TFetchJobListAPI,
  TJobItem,
  TSelectedJobItem,
} from '../utilities/commonTypes';

const BASE_URL_API =
  'https://bytegrad.com/course-assets/projects/rmtdev/api/data';

export const fetchJobList = async (searchText: string): Promise<TJobItem[]> => {
  const response = await fetch(`${BASE_URL_API}?search=${searchText}`);

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.description);
  }

  const data: TFetchJobListAPI = await response.json();
  const jobList = data.jobItems;

  return jobList;
};

export const fetchJobItem = async (id: string): Promise<TSelectedJobItem> => {
  const response = await fetch(`${BASE_URL_API}/${id}`);

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.description);
  }

  const data = await response.json();
  const jobItem = data.jobItem;

  return jobItem;
};
