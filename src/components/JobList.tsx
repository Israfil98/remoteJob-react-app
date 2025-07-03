import { useEffect, useMemo } from 'react';
import { useDebounce, useJobList } from '../hooks/hooks';
import { useJobListStore } from '../stores/jobListStore';
import { RESULTS_PER_PAGE } from '../utilities/constants';
import JobListItem from './JobListItem';
import Spinner from './Spinner';

export function JobList() {
  const setJobList = useJobListStore((state) => state.actions.setJobList);
  const jobList = useJobListStore((state) => state.jobList);
  const searchText = useJobListStore((state) => state.searchText);
  const activeJobItemId = useJobListStore((state) => state.activeJobItemId);
  const currentPage = useJobListStore((state) => state.currentPage);
  const sortBy = useJobListStore((state) => state.sortBy);

  const debouncedSearchText = useDebounce(searchText, 300);
  const { data, isLoading } = useJobList(debouncedSearchText);

  const jobListSorted = useMemo(
    () =>
      [...jobList].sort((a, b) => {
        if (sortBy === 'relevant') {
          return b.relevanceScore - a.relevanceScore;
        } else if (sortBy === 'recent') {
          return a.daysAgo - b.daysAgo;
        }

        return 0;
      }),
    [jobList, sortBy]
  );
  const jobListItemsPerPage = useMemo(
    () =>
      jobListSorted.slice(
        currentPage * RESULTS_PER_PAGE - RESULTS_PER_PAGE,
        currentPage * RESULTS_PER_PAGE
      ),
    [currentPage, jobListSorted]
  ); // last index not included (getting 7 items per page)

  useEffect(() => {
    if (data) {
      setJobList(data);
    }
  }, [data, setJobList]);

  return (
    <ul className='job-list'>
      {isLoading && <Spinner />}

      {!isLoading &&
        jobListItemsPerPage.map((jobItem) => (
          <JobListItem
            key={jobItem.id}
            jobItem={jobItem}
            isActive={+activeJobItemId! === jobItem.id}
          />
        ))}
    </ul>
  );
}

export default JobList;
