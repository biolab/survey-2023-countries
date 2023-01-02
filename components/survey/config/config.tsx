import styles from '@styles/survey/Survey.module.scss';
import config from 'site.config';

const isDevelopment = process.env.NODE_ENV === 'development';

export default function Config() {
  if (!isDevelopment) {
    return null;
  }
  return (
    <div className={styles.config}>
      <p>Number of pairs: {config.numberOfPairs}</p>
      <p>Pairs per page: {config.pairsPerPage}</p>
    </div>
  );
}
