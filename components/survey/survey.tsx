import Introduction from './introduction/introduction';
import styles from '@styles/survey/Survey.module.scss';
import { useContext, useMemo } from 'react';
import { CountryPair } from './utils';
import Progress from './progress/progress';
import Config from './config/config';
import Navigation from './navigation/navigation';
import { SurveyContext } from './surveyContext';
import Demographics from './demographics/demographics';

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
  const { pagePairs, showMetaDataPage, selectOption, submitted } =
    useContext(SurveyContext);

  if (submitted) {
    return (
      <div className={styles.showMetaDataPage}>Hvala za vaše odgovore!</div>
    );
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
