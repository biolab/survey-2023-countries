import styles from '@styles/survey/Content.module.scss';
import { useContext, useMemo } from 'react';
import { SurveyContext } from '../surveyContext';
import config from 'site.config';

const { numberOfTopResults } = config;

export default function Submitted() {
  const { pairs } = useContext(SurveyContext);

  const { top, bottom } = useMemo(() => {
    const allSelectedCountriesCount = pairs.reduce((acc, pair) => {
      acc[pair.selected!] = (acc[pair.selected!] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const allCountriesCount = pairs.reduce((acc, pair) => {
      pair.options.forEach((option) => {
        acc[option] = (acc[option] || 0) + 1;
      });

      return acc;
    }, {} as Record<string, number>);

    const countryIndexes = Object.keys(allCountriesCount)
      .reduce((acc, country) => {
        acc.push({
          country,
          index: (
            (allSelectedCountriesCount[country] || 0) /
            allCountriesCount[country]
          ).toFixed(2),
          ratio: `${allSelectedCountriesCount[country] || 0}/${
            allCountriesCount[country]
          }`,
        });

        return acc;
      }, [] as { country: string; index: string; ratio: string }[])
      .sort((a, b) => Number(b.index) - Number(a.index));

    return {
      top: countryIndexes.slice(0, numberOfTopResults),
      bottom: countryIndexes.slice(-numberOfTopResults).reverse(),
    };
  }, [pairs]);

  return (
    <div className={styles.content}>
      <h1>Hvala za izpolnjeno anketo.</h1>

      <div className={styles.results}>
        <p>Skladno z vašimi odgovori so države, kjer bi najraje živeli:</p>
        {top.map(({ country, index, ratio }) => (
          <div key={country}>
            <strong>{country}</strong> Index: {index} ({ratio})
          </div>
        ))}
      </div>

      <div className={styles.results}>
        <p>Države, kjer ne bi radi živeli:</p>
        {bottom.map(({ country, index, ratio }) => (
          <div key={country}>
            <strong>{country}</strong> Index: {index} ({ratio})
          </div>
        ))}
      </div>

      <p className={styles.footnote}>
        Podatke, ki ste nam jih posredovali, bomo statistično obdelali in na
        podlagi vaših in vseh ostalih odgovorov poiskali socioekonomske,
        zdravstvene, okoljske in poklicne dejavnike blagostanja, ki najbolj
        vplivajo na zadovoljstvo Slovencev.
      </p>
    </div>
  );
}
