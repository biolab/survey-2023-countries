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
      options: [
        'Do 25 let',
        '26-35 let',
        '36-45 let',
        '46-55 let',
        '56-65 let',
        'Nad 65 let',
      ],
    },
    {
      key: 'region',
      options: [
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
      ],
    },
    {
      key: 'education',
      options: [
        'Osnovna',
        'Dveletna ali triletna poklicna srednja',
        'Štiriletna ali petletna srednja šola',
        'Višja šola',
        'Visoka šola',
        'univerzitetna izobrazba (1. in 2. bolonjska stopnja)',
        'Specializacija',
        'znanstveni magisterij',
        'doktorat',
      ],
    },

    // Question without options will have agreement scale from 1 - 10
    { key: 'responsibility' },
    { key: 'unemployment' },
  ],
};

export default config;
