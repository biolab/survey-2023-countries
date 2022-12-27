import Introduction from './introduction/introduction';
import styles from '@styles/survey/Survey.module.scss';
import { useContext, useMemo } from 'react';
import { CountryPair } from './utils';
import Progress from './progress/progress';
import Config from './config/config';
import Navigation from './navigation/navigation';
import { SurveyContext } from './surveyContext';

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

function MetaDataPage() {
  return (
    <div className={styles.metaDataPage}>
      <h2>Hvala za vaše odgovore. Prosimo, da nam poveste še nekaj o sebi. (WIP)</h2>

      <div className={styles.question}>Vaš spol</div>
      <div className={styles.pairOption + ' ' + styles.pairOptionSmall}>
        {['Ženska', 'Moški', 'Ne želim odgovoriti'].map((age) => (
          <button key={age} className={false ? styles.selected : undefined}>
            {age}
          </button>
        ))}
      </div>

      <div className={styles.question}>Koliko ste stari</div>
      <div className={styles.pairOption + ' ' + styles.pairOptionSmall}>
        {[
          'Do 25 let',
          '26-35 let',
          '36-45 let',
          '46-55 let',
          '56-65 let',
          'Nad 65 let',
        ].map((age) => (
          <button key={age} className={false ? styles.selected : undefined}>
            {age}
          </button>
        ))}
      </div>

      <div className={styles.question}>V kateri regiji živite?</div>
      <div className={styles.pairOption + ' ' + styles.pairOptionSmall}>
        {[
          'Gorenjska',
          'Goriška',
          'Jugovzhodna Slovenija',
          'Koroška',
          'Obalno-kraška',
          'Osrednjeslovenska',
          'Podravska',
          'Pomurska',
          'Posavska',
          'Primorsko-notranjska',
          'Savinjska',
          'Zasavska',
        ].map((age) => (
          <button key={age} className={false ? styles.selected : undefined}>
            {age}
          </button>
        ))}
      </div>
    </div>
  );
}

export default function Survey() {
  const { pagePairs, metaDataPage, selectOption, changeConfig } =
    useContext(SurveyContext);

  return (
    <>
      <Config changeConfig={changeConfig} />
      <Introduction />
      <Progress />

      <Navigation />

      {metaDataPage ? (
        <MetaDataPage />
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
