export default function ResultsCount({ results }: { results: number }) {
  return (
    <p className='count'>
      <span className='u-bold'>{results}</span> results
    </p>
  );
}
