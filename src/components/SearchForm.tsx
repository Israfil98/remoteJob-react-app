import { useJobListStore } from '../stores/jobListStore';

export default function SearchForm() {
  const searchText = useJobListStore((state) => state.searchText);
  const onSearchTextChange = useJobListStore(
    (state) => state.actions.onSearchTextChange
  );

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
