const config = {
  numberOfPairs: 50,
  pairsPerPage: 10,
  numberOfTopResults: 3,

  // Set this to true, when the survey will be shared to the public
  writeResultsToTestFolder: false,

  countries: [
    "Nemčija",
    "Slovaška",
    "Ciper",
    "Hrvaška",
    "Portugalska",
    "Romunija",
    "Italija",
    "Belgija",
    "Islandija",
    "Črna gora",
    "Norveška",
    "Madžarska",
    "Irska",
    "Luksemburg",
    "Turčija",
    "Avstrija",
    "Finska",
    "Švedska",
    "Francija",
    "Slovenija",
    "Litva",
    "Bolgarija",
    "Švica",
    "Srbija",
    "Estonija",
    "Latvija",
    "Češka",
    "Poljska",
    "Nizozemska",
    "Španija",
    "Severna Makedonija",
    "Danska",
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
    // {
    //  key: 'education',
    //  options: ['II', 'IV', 'V', 'VI/1', 'VI/2', 'VII', 'VIII/1+'],
    // },
    {
      key: 'grades',
      options: ["nula", "spomin", "a", "b", "c", "d", "e"],
    },

    // Question without options will have agreement scale from 1 - 10
    { key: 'responsibility' },
    { key: 'employment' },
    { key: 'competition' },
    { key: 'gini' },
    { key: 'privatization' }
  ],
};

export default config;
