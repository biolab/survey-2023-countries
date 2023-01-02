import styles from '@styles/survey/Survey.module.scss';
import { useTranslation } from 'next-i18next';
import { useContext } from 'react';
import { SurveyContext } from '../surveyContext';

export default function Navigation({ bottom }: { bottom?: boolean }) {
  const { t } = useTranslation();
  const { nextPageEnabled, page, showMetaDataPage, setPage, submit } =
    useContext(SurveyContext);

  return (
    <div
      className={
        styles.navigation +
        ' ' +
        (bottom ? styles.navigationBottom : styles.navigationTop)
      }
    >
      <button
        disabled={page === 0 ? true : undefined}
        onClick={() => setPage(-1)}
      >
        {t('navigation.previous')}
      </button>

      {showMetaDataPage ? (
        <button
          disabled={nextPageEnabled ? undefined : true}
          onClick={() => submit()}
        >
          {t('navigation.finish')}
        </button>
      ) : (
        <button
          disabled={nextPageEnabled ? undefined : true}
          onClick={() => setPage(1)}
        >
          {t('navigation.next')}
        </button>
      )}
    </div>
  );
}
