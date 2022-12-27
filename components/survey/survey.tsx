import Introduction from './introduction/introduction';
import { useSurveyData } from './useSurveyData';
import styles from '@styles/survey/Survey.module.scss';
import { useMemo } from 'react';
import { CountryPair } from './utils';
import Progress from './progress/progress';
import Config from './config/config';
import Navigation from './navigation/navigation';

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

export default function Survey() {
  const {
    pagePairs,
    noOfAnswered,
    progress,
    noOfPairs,
    nextPageEnabled,
    page,
    metaDataPage,
    selectOption,
    changeConfig,
    setPage,
  } = useSurveyData();

  return (
    <>
      <Config changeConfig={changeConfig} />
      <Introduction />
      <Progress
        progress={progress}
        noOfAnswered={noOfAnswered}
        noOfPairs={noOfPairs}
      />

      <Navigation
        nextPageEnabled={nextPageEnabled}
        page={page}
        setPage={setPage}
      />

      {metaDataPage ? (
        <div>
          <p>
            Hvala za vaše odgovore. Prosimo, da nam poveste še nekaj o sebi.
          </p>
        </div>
      ) : (
        pagePairs.map((pair) => (
          <div className={styles.pairOption} key={pair.key}>
            <Option pair={pair} option={0} selectOption={selectOption} />
            <Option pair={pair} option={1} selectOption={selectOption} />
          </div>
        ))
      )}

      <Navigation
        nextPageEnabled={nextPageEnabled}
        page={page}
        setPage={setPage}
        bottom
      />
    </>
  );
}
