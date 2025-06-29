import { useJobListStore } from '../stores/jobListStore';
import JobListItem from './JobListItem';
import Spinner from './Spinner';

export function JobList() {
  const jobList = useJobListStore((state) => state.jobList);
  const isLoading = useJobListStore((state) => state.isLoading);
  const activeJobItemId = useJobListStore((state) => state.activeJobItemId);

  const jobListItemsPerPage = jobList.slice(0, 7); // last index not included (getting 7 items per page)

  return (
    <ul className='job-list'>
      {isLoading && <Spinner />}

      {!isLoading &&
        jobListItemsPerPage.map((jobItem) => (
          <JobListItem
            key={jobItem.id}
            jobItem={jobItem}
            isActive={activeJobItemId === jobItem.id}
          />
        ))}
    </ul>
  );
}

export default JobList;
