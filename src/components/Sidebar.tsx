import { useJobListStore } from '../stores/jobListStore';
import JobList from './JobList';
import PaginationControls from './PaginationControls';
import ResultsCount from './ResultsCount';
import SortingControls from './SortingControls';

export default function Sidebar() {
  const jobList = useJobListStore((state) => state.jobList);

  const results = jobList.length;

  return (
    <div className='sidebar'>
      <div className='sidebar__top'>
        <ResultsCount results={results} />
        <SortingControls />
      </div>
      <JobList />
      <PaginationControls />
    </div>
  );
}
