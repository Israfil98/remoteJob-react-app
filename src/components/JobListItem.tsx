import { Link } from 'react-router-dom';
import type { TJobItem } from '../utilities/commonTypes';
import BookmarkIcon from './BookmarkIcon';

export default function JobListItem({
  jobItem,
  isActive,
}: {
  jobItem: TJobItem;
  isActive: boolean;
}) {
  return (
    <li className={`job-item ${isActive && 'job-item--active'}`}>
      <Link
        to={`/${jobItem.id}`}
        className='job-item__link'>
        <div className='job-item__badge'>{jobItem.badgeLetters}</div>

        <div className='job-item__middle'>
          <h3 className='third-heading'>{jobItem.title}</h3>
          <p className='job-item__company'>{jobItem.company}</p>
        </div>

        <div className='job-item__right'>
          <BookmarkIcon />
          <time className='job-item__time'>{jobItem.daysAgo}d</time>
        </div>
      </Link>
    </li>
  );
}
