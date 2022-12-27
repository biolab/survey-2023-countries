import styles from '@styles/survey/Survey.module.scss';
import { useContext } from 'react';
import { SurveyContext } from '../surveyContext';

export default function Navigation({ bottom }: { bottom?: boolean }) {
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
        Prejšnja stran
      </button>

      {showMetaDataPage ? (
        <button
          disabled={nextPageEnabled ? undefined : true}
          onClick={() => submit()}
        >
          Zaključi
        </button>
      ) : (
        <button
          disabled={nextPageEnabled ? undefined : true}
          onClick={() => setPage(1)}
        >
          Naslednja stran
        </button>
      )}
    </div>
  );
}
