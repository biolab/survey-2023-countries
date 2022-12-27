import styles from '@styles/survey/Progress.module.scss';
import { useContext } from 'react';
import { SurveyContext } from '../surveyContext';

export default function Progress() {
  const { noOfAnswered, progress, noOfPairs } = useContext(SurveyContext);
  const percentage = Number((progress * 100).toFixed(0));

  return (
    <div className={styles.progressWrapper}>
      <div className={styles.progressText}>
        Vašo preferenco ste izrazili za {noOfAnswered} od {noOfPairs} parov (
        {percentage} %) držav.
      </div>

      <div className={styles.progressBar}>
        <div
          className={styles.progress}
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
}
