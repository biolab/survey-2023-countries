import Introduction from './introduction';
import { getCountryPairs } from './utils';

export default function Survey() {
  const pairs = getCountryPairs(10);

  return (
    <>
      <Introduction />

      {pairs.map((pair) => (
        <div key={pair}>{pair}</div>
      ))}
    </>
  );
}
