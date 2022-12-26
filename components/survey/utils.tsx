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

export const getCountryPairs = (noOfPairs: num) => {
  let result = countries.flatMap((country1, index) =>
    countries.slice(index + 1).map((country2) => country1 + ' ' + country2)
  );

  return result;
};
