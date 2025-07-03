import { ArrowLeftIcon, ArrowRightIcon } from '@radix-ui/react-icons';
import { useMemo } from 'react';
import { useJobListStore } from '../stores/jobListStore';
import { RESULTS_PER_PAGE } from '../utilities/constants';

export default function PaginationControls() {
  const jobList = useJobListStore((state) => state.jobList);
  const currentPage = useJobListStore((state) => state.currentPage);
  const setCurrentPage = useJobListStore(
    (state) => state.actions.setCurrentPage
  );

  const totalNumberOfPages = useMemo(
    () => jobList.length / RESULTS_PER_PAGE,
    [jobList.length]
  );

  return (
    <section className='pagination'>
      <button
        className={`pagination__button ${
          currentPage === 1 && 'pagination__button--hidden'
        }`}
        onClick={(e) => {
          e.currentTarget.blur();
          setCurrentPage(currentPage - 1);
        }}>
        <ArrowLeftIcon />
        Page {currentPage - 1}
      </button>
      {totalNumberOfPages ? (
        <span className='pagination__current-page'>{currentPage}</span>
      ) : null}
      <button
        className={`pagination__button ${
          currentPage >= totalNumberOfPages && 'pagination__button--hidden'
        }`}
        onClick={(e) => {
          e.currentTarget.blur();
          setCurrentPage(currentPage + 1);
        }}>
        Page {currentPage + 1}
        <ArrowRightIcon />
      </button>
    </section>
  );
}
