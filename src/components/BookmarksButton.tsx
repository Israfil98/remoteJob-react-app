import { TriangleDownIcon } from '@radix-ui/react-icons';
import { useJobListStore } from '../stores/jobListStore';
import BookmarksPopover from './BookmarksPopover';

export default function BookmarksButton() {
  const togglePopover = useJobListStore((state) => state.togglePopover);
  const onTogglePopover = useJobListStore(
    (state) => state.actions.onTogglePopover
  );

  return (
    <section>
      <button
        className='bookmarks-btn'
        onClick={() => onTogglePopover(!togglePopover)}>
        Bookmarks <TriangleDownIcon />
      </button>

      {togglePopover && <BookmarksPopover />}
    </section>
  );
}
