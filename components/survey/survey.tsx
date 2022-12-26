import Introduction from './introduction/introduction';
import { useSurveyData } from './useSurveyData';
import styles from '@styles/survey/Survey.module.scss';
import { useMemo } from 'react';
import { CountryPair } from './utils';
import Progress from './progress/progress';
import Config from "./config/config";

function Option({
  pair,
  option,
  index,
  selectOption,
}: {
  pair: CountryPair;
  option: number;
  index: number;
  selectOption: (index: number, value: string) => void;
}) {
  const isSelected = useMemo(
    () => pair.selected === pair.options[option],
    [option, pair.selected, pair.options]
  );

  const country = useMemo(() => pair.options[option], [pair, option]);
  return (
    <button
      onClick={() => selectOption(index, pair.options[option])}
      className={isSelected ? styles.selected : undefined}
    >
      {country}
    </button>
  );
}

export default function Survey() {
  const {
    pairs,
    selectOption,
    noOfAnswered,
    progress,
    changeConfig,
    noOfPairs,
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

      {pairs.map((pair, index) => (
        <div className={styles.pairOption} key={JSON.stringify(pair.options)}>
          <Option
            pair={pair}
            option={0}
            index={index}
            selectOption={selectOption}
          />
          <Option
            pair={pair}
            option={1}
            index={index}
            selectOption={selectOption}
          />
        </div>
      ))}
    </>
  );
}
