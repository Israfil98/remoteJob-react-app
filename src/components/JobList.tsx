import { useEffect } from 'react';
import { useDebounce, useJobList } from '../hooks/hooks';
import { useJobListStore } from '../stores/jobListStore';
import JobListItem from './JobListItem';
import Spinner from './Spinner';

export function JobList() {
  const setJobList = useJobListStore((state) => state.actions.setJobList);
  const searchText = useJobListStore((state) => state.searchText);
  const debouncedSearchText = useDebounce(searchText, 300);
  const { data, isLoading } = useJobList(debouncedSearchText);
  const activeJobItemId = useJobListStore((state) => state.activeJobItemId);

  const jobListItemsPerPage = data?.slice(0, 7); // last index not included (getting 7 items per page)

  useEffect(() => {
    if (data) {
      setJobList(data);
    }
  }, [data, setJobList]);

  return (
    <ul className='job-list'>
      {isLoading && <Spinner />}

      {!isLoading &&
        jobListItemsPerPage?.map((jobItem) => (
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
