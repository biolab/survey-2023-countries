import _sampleSize from 'lodash/sampleSize';
import _random from 'lodash/random';
import config from 'site.config';

const { countries, writeResultsToTestFolder } = config;

export type CountryPair = {
  key: string;
  options: string[];
  selected?: string;
};

export const getCountryPairs = (numberOfPairs: number): CountryPair[] => {
  let allPairs = countries
    .flatMap((country1, index) =>
      countries.slice(index + 1).map((country2) => ({
        options: _random(1) ? [country1, country2] : [country2, country1],
      }))
    )
    .map((pair) => ({
      ...pair,
      key: pair.options.join('::'),
    }));

  return _sampleSize(allPairs, numberOfPairs);
};

export function isTestEnvironment() {
  return process.env.NODE_ENV === 'development' || writeResultsToTestFolder;
}
