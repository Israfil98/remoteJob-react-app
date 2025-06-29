import { useDebounce, useJobList } from '../hooks/hooks';
import { useJobListStore } from '../stores/jobListStore';

export default function SearchForm() {
  const searchText = useJobListStore((state) => state.searchText);
  const debouncedValue = useDebounce(searchText, 300);
  const { onSearchTextChange } = useJobList(debouncedValue);

  return (
    <form
      action='#'
      className='search'>
      <button type='submit'>
        <i className='fa-solid fa-magnifying-glass'></i>
      </button>

      <input
        spellCheck='false'
        type='text'
        required
        placeholder='Find remote developer jobs...'
        value={searchText}
        onChange={(e) => onSearchTextChange(e.target.value)}
      />
    </form>
  );
}
