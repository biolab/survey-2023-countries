import styles from '@styles/survey/Survey.module.scss';

export default function Navigation({
  setPage,
  nextPageEnabled,
  page,
  bottom,
}: {
  setPage: (value: -1 | 1 | 0) => void;
  nextPageEnabled: boolean;
  page: number;
  bottom?: boolean;
}) {
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
      <button
        disabled={nextPageEnabled ? undefined : true}
        onClick={() => setPage(1)}
      >
        Naslednja stran
      </button>
    </div>
  );
}
