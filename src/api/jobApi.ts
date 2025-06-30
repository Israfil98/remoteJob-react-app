import type {
  TFetchJobItemAPI,
  TFetchJobListAPI,
  TJobItem,
} from '../utilities/commonTypes';

const BASE_URL_API =
  'https://bytegrad.com/course-assets/projects/rmtdev/api/data';

export const fetchJobList = async (searchText: string): Promise<TJobItem[]> => {
  const response = await fetch(`${BASE_URL_API}?search=${searchText}`);
  if (!response.ok) throw new Error('Network error');
  const data: TFetchJobListAPI = await response.json();
  const jobList = data.jobItems;

  return jobList;
};

export const fetchJobItem = async (id: string | undefined) => {
  const response = await fetch(`${BASE_URL_API}/${id}`);
  const data: TFetchJobItemAPI = await response.json();
  const jobItem = data.jobItem;

  return jobItem;
};
