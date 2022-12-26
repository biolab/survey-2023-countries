import { useState } from 'react';
import styles from '@styles/survey/Survey.module.scss';

export default function Config({
  changeConfig,
}: {
  changeConfig: (noOfPairs: number | undefined) => void;
}) {
  const [isHidden, setIsHidden] = useState(false);
  const [noOfPairs, setNoOfPairs] = useState(undefined);

  const applyConfig = () => {
    changeConfig(noOfPairs);
  };

  if (isHidden) {
    return null;
  }

  return (
    <div className={styles.config}>
      <div>
        <label htmlFor='noOfPairs'>No of pairs</label>
        <input
          type='number'
          id='noOfPairs'
          onInput={(e: any) => setNoOfPairs(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor='pairsForPage'>Pairs per page</label>
        <input type='number' id='pairsForPage' />
      </div>
      <div className={styles.checkboxContainer}>
        <input type='checkbox' id='scales' name='scales' />
        <label htmlFor='scales'>Move to next page after completed</label>
      </div>
      <button onClick={applyConfig}>Apply</button>
      <button onClick={() => setIsHidden(true)}>Hide</button>
    </div>
  );
}
