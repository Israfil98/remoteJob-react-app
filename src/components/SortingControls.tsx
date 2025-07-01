import { useJobListStore } from '../stores/jobListStore';
import type { TSortBy } from '../utilities/commonTypes';

export default function SortingControls() {
  const sortBy = useJobListStore((state) => state.sortBy);
  const setSortBy = useJobListStore((state) => state.actions.setSortBy);
  const setCurrentPage = useJobListStore(
    (state) => state.actions.setCurrentPage
  );

  const onSortByClick = (sortBy: TSortBy) => {
    setCurrentPage(1);
    setSortBy(sortBy);
  };

  return (
    <section className='sorting'>
      <i className='fa-solid fa-arrow-down-short-wide'></i>

      <button
        className={`sorting__button sorting__button--relevant ${
          sortBy === 'relevant' && 'sorting__button--active'
        }`}
        onClick={(e) => {
          e.currentTarget.blur();
          onSortByClick('relevant');
        }}>
        Relevant
      </button>

      <button
        className={`sorting__button sorting__button--recent ${
          sortBy === 'recent' && 'sorting__button--active'
        }`}
        onClick={(e) => {
          e.currentTarget.blur();
          onSortByClick('recent');
        }}>
        Recent
      </button>
    </section>
  );
}
