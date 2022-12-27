import { useState } from 'react';
import styles from '@styles/survey/Survey.module.scss';

export default function Config({
  changeConfig,
}: {
  changeConfig: (
    _noOfPairs?: number,
    _pairsPerPage?: number,
    _autoProgress?: boolean
  ) => void;
}) {
  const [isHidden, setIsHidden] = useState(false);
  const [noOfPairs, setNoOfPairs] = useState(undefined);
  const [pairsPerPage, setPairsPerPage] = useState(undefined);
  const [autoProgress, setAutoProgress] = useState(undefined);

  const applyConfig = () => {
    changeConfig(noOfPairs, pairsPerPage, autoProgress);
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
        <label htmlFor='pairsPerPage'>Pairs per page</label>
        <input
          type='number'
          id='pairsPerPage'
          onInput={(e: any) => setPairsPerPage(e.target.value)}
        />
      </div>
      <div className={styles.checkboxContainer}>
        <input
          type='checkbox'
          id='scales'
          name='scales'
          onInput={(e: any) => setAutoProgress(e.target.checked)}
        />
        <label htmlFor='scales'>Move to next page after completed</label>
      </div>
      <button onClick={applyConfig}>Apply</button>
      <button onClick={() => setIsHidden(true)}>Hide</button>
    </div>
  );
}
