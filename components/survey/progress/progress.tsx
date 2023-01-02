import styles from '@styles/survey/Progress.module.scss';
import { useTranslation } from 'next-i18next';
import { useContext } from 'react';
import { SurveyContext } from '../surveyContext';

export default function Progress() {
  const { t } = useTranslation();
  const { noOfAnswered, progress, numberOfPairs } = useContext(SurveyContext);
  const percentage = Number((progress * 100).toFixed(0));

  return (
    <div className={styles.progressWrapper}>
      <div className={styles.progressText}>
        {t('progress.text', { noOfAnswered, numberOfPairs, percentage })}
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
