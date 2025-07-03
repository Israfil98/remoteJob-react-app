import { TriangleDownIcon } from '@radix-ui/react-icons';
import { useRef } from 'react';
import { useOnClickOutside } from '../hooks/hooks';
import { useJobListStore } from '../stores/jobListStore';
import BookmarksPopover from './BookmarksPopover';

export default function BookmarksButton() {
  const togglePopover = useJobListStore((state) => state.togglePopover);
  const onTogglePopover = useJobListStore(
    (state) => state.actions.onTogglePopover
  );
  // use ref to hide popover when outside click occurred
  const popoverButtonRef = useRef<HTMLButtonElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);

  useOnClickOutside([popoverButtonRef, popoverRef], () =>
    onTogglePopover(false)
  );

  return (
    <section>
      <button
        className='bookmarks-btn'
        ref={popoverButtonRef}
        onClick={() => onTogglePopover(!togglePopover)}>
        Bookmarks <TriangleDownIcon />
      </button>

      {togglePopover && <BookmarksPopover ref={popoverRef} />}
    </section>
  );
}
