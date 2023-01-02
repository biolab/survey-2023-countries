import styles from '@styles/survey/Content.module.scss';
import { useTranslation } from 'next-i18next';

export default function Introduction() {
  const { t } = useTranslation();

  return (
    <div className={styles.content}>
      <h1>{t('introduction.title')}</h1>
      <p>{t('introduction.p1')}</p>
      <p>{t('introduction.p2')}</p>
    </div>
  );
}
