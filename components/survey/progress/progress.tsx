import styles from '@styles/survey/Progress.module.scss';

export default function Progress({
  noOfAnswered,
  progress,
  noOfPairs,
}: {
  noOfAnswered: number;
  progress: number;
  noOfPairs: number;
}) {
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
