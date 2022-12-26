import styles from '@styles/survey/Progress.module.scss';


export default function Progress({
  noOfAnswered,
  progress,
}: {
  noOfAnswered: number;
  progress: number;
}) {
  return (
    <div className={styles.progressWrapper}>
      <div className={styles.progressText}>
        Vašo preferenco ste izrazili za {noOfAnswered} od 50 parov ({progress}{' '}
        %) držav.
      </div>

      <div className={styles.progressBar}>
        <div
          className={styles.progress}
          style={{ width: `${progress * 100}%` }}
        ></div>
      </div>
    </div>
  );
}
