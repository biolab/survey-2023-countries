import Introduction from './introduction/introduction';
import { useSurveyData } from './useSurveyData';
import styles from '@styles/survey/Survey.module.scss';
import { useMemo } from 'react';
import { CountryPair } from './utils';
import Progress from './progress/progress';
import Config from './config/config';

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
    pairs,
    noOfAnswered,
    progress,
    noOfPairs,
    selectOption,
    changeConfig,
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

      {pairs.map((pair) => (
        <div className={styles.pairOption} key={pair.key}>
          <Option
            pair={pair}
            option={0}
            selectOption={selectOption}
          />
          <Option
            pair={pair}
            option={1}
            selectOption={selectOption}
          />
        </div>
      ))}
    </>
  );
}
