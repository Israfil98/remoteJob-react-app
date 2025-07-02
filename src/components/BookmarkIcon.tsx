import { BookmarkFilledIcon } from '@radix-ui/react-icons';
import { useBookmarkedIdList } from '../hooks/hooks';

export default function BookmarkIcon({ id }: { id: number }) {
  const { bookmarkedIdList, onBookmarkIconClick } = useBookmarkedIdList(id);

  return (
    <button
      className='bookmark-btn'
      onClick={onBookmarkIconClick}>
      <BookmarkFilledIcon
        className={`${bookmarkedIdList.includes(id) && 'filled'}`}
      />
    </button>
  );
}
