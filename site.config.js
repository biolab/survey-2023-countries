const config = {
  numberOfPairs: 1,
  pairsPerPage: 2,
  numberOfTopResults: 3,

  // Set this to true, when the survey will be shared to the public
  writeResultsToTestFolder: true,

  countries: [
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
  ],

  demographicQuestions: [
    {
      key: 'age',
      options: ['0-25', '26-35', '36-45', '46-55', '56-65', '65+'],
    },
    {
      key: 'region',
      options: [
        'gorenjska',
        'goriska',
        'jv_slovenija',
        'koroska',
        'obalno_kraska',
        'osrednjeslovenska',
        'podravska',
        'pomurska',
        'posavska',
        'primorsko_notranjska',
        'savinjska',
        'zasavska',
      ],
    },
    {
      key: 'education',
      options: ['II', 'IV', 'V', 'VI/1', 'VI/2', 'VII', 'VIII/1+'],
    },

    // Question without options will have agreement scale from 1 - 10
    { key: 'responsibility' },
    { key: 'test' }
  ],
};

export default config;
