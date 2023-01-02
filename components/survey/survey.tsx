import Introduction from './introduction/introduction';
import styles from '@styles/survey/Survey.module.scss';
import { useCallback, useContext, useMemo, useState } from 'react';
import { CountryPair } from './utils';
import Progress from './progress/progress';
import Config from './config/config';
import Navigation from './navigation/navigation';
import { SurveyContext } from './surveyContext';
import Demographics from './demographics/demographics';
import Submitted from './submitted/submitted';
import { useTranslation } from 'next-i18next';

function Option({
  pair,
  option,
  selectOption,
}: {
  pair: CountryPair;
  option: number;
  selectOption: (key: string, value: string) => void;
}) {
  const isSelected = useMemo(
    () => pair.selected === pair.options[option],
    [option, pair.selected, pair.options]
  );

  const country = useMemo(() => pair.options[option], [pair, option]);
  return (
    <button
      onClick={() => selectOption(pair.key, pair.options[option])}
      className={isSelected ? styles.selected : undefined}
    >
      {country}
    </button>
  );
}

function Verification() {
  const { setVerified } = useContext(SurveyContext);
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const { t } = useTranslation();

  const verify = useCallback(async () => {
    const verifyResponse = await fetch(
      `http://127.0.0.1:5000/verify?secret=${password}`,
      { method: 'GET' }
    );

    if (verifyResponse.status !== 200) {
      setError(true);
      return;
    }

    localStorage.setItem('survey_pass', password);

    setError(false);
    setVerified(true);
  }, [password, setVerified]);

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    verify();
  };

  return (
    <div className={styles.verification}>
      <h1>{t('verification.title')}</h1>
      <form onSubmit={submit} className={styles.inputWrapper}>
        <input
          value={password}
          onInput={(e: any) => {
            setPassword(e.target.value);
          }}
        />
        <button>{t('verification.continue')}</button>
      </form>
      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
}

export default function Survey() {
  const { pagePairs, showMetaDataPage, selectOption, submitted, verified } =
    useContext(SurveyContext);

  if (!verified) {
    return <Verification />;
  }
  if (submitted) {
    return <Submitted />;
  }
  return (
    <>
      <Config />
      <Introduction />
      <Progress />

      {showMetaDataPage ? (
        <Demographics />
      ) : (
        pagePairs.map((pair) => (
          <div className={styles.pairOption} key={pair.key}>
            <Option pair={pair} option={0} selectOption={selectOption} />
            <Option pair={pair} option={1} selectOption={selectOption} />
          </div>
        ))
      )}

      <Navigation bottom />
    </>
  );
}
