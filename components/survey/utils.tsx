import _sampleSize from 'lodash/sampleSize';
import _random from 'lodash/random';

const countries = [
  'Germany',
  'Slovakia',
  'Cyprus',
  'Croatia',
  'Portugal',
  'Romania',
  'Italy',
  'Belgium',
  'Iceland',
  'Montenegro',
  'Norway',
  'Hungary',
  'Ireland',
  'Luxembourg',
  'Turkey',
  'Austria',
  'Finland',
  'Sweden',
  'France',
  'Slovenia',
  'Lithuania',
  'Bulgaria',
  'Switzerland',
  'Serbia',
  'Estonia',
  'Latvia',
  'Czech Republic',
  'Poland',
  'Netherlands',
  'Spain',
  'Macedonia, Republic of',
  'Denmark',
];

export type CountryPair = {
  key: string;
  options: string[];
  selected?: string;
};

export const getCountryPairs = (noOfPairs: number): CountryPair[] => {
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

  return _sampleSize(allPairs, noOfPairs);
};
