import { forwardRef } from 'react';
import { createPortal } from 'react-dom';
import { useBookmarkedJobItems } from '../hooks/hooks';
import { useJobListStore } from '../stores/jobListStore';
import JobListItem from './JobListItem';
import Spinner from './Spinner';

const BookmarksPopover = forwardRef<HTMLDivElement>(function (_, ref) {
  // get bookmarked ids
  const activeJobItemId = useJobListStore((state) => state.activeJobItemId);
  const bookmarkedIdList = useJobListStore((state) => state.bookmarkedIdList);

  // get bookmarked job item list based on ids in local storage
  const { data: jobItems, pending } = useBookmarkedJobItems(bookmarkedIdList);

  // display array of JobListItem component

  return createPortal(
    <div
      className='bookmarks-popover'
      ref={ref}>
      <ul className='job-list'>
        {pending ? (
          <Spinner />
        ) : (
          jobItems.map((item) => {
            return (
              <JobListItem
                key={item.id}
                jobItem={item}
                isActive={+activeJobItemId! === item.id}
              />
            );
          })
        )}
      </ul>
    </div>,
    document.body
  );
});

export default BookmarksPopover;
