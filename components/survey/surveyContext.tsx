import _isNill from 'lodash/isNil';
import React from 'react';
import { useCallback, useEffect, useMemo, useReducer, useState } from 'react';
import { CountryPair, getCountryPairs, isTestEnvironment } from './utils';
import config from 'site.config';

export const SURVEY_PASS_KEY = 'survey_pass';
const SURVEY_SUBMITTED_KEY = 'survey_submitted';
const { numberOfPairs, pairsPerPage, canSubmitSurveyMultipleTimes } = config;

function pageReducer(page: number, action: -1 | 1 | 0) {
  switch (action) {
    case -1:
      return page - 1;
    case 1:
      return page + 1;
    case 0:
    default:
      return 0;
  }
}

interface SurveyContextI {
  pairs: CountryPair[];
  pagePairs: CountryPair[];
  selectOption: (key: string, value: string) => void;
  noOfAnswered: number;
  progress: number;
  setPage: React.Dispatch<0 | 1 | -1>;
  nextPageEnabled: boolean;
  page: number;
  showMetaDataPage: boolean;
  submitted: boolean;
  numberOfPairs: number;
  setMetaDataPageDone: (value: boolean) => void;
  setVerified: (value: boolean) => void;
  setDemographics: (value: { [key: string]: string }) => void;
  submit: () => void;
  verified: boolean;
  alreadySubmitted: boolean;
}

export const SurveyContext = React.createContext<SurveyContextI>({
  pairs: [],
  pagePairs: [],
  selectOption: () => null,
  noOfAnswered: 0,
  progress: 0,
  setPage: () => null,
  submit: () => null,
  setVerified: () => null,
  nextPageEnabled: false,
  page: 0,
  showMetaDataPage: false,
  submitted: false,
  numberOfPairs,
  setMetaDataPageDone: () => null,
  setDemographics: () => null,
  verified: false,
  alreadySubmitted: false,
});

export default function SurveyContextProvider({
  children,
}: {
  children: React.ReactElement;
}) {
  const [pairs, setPairs] = useState<CountryPair[]>([]);
  const [page, setPage] = useReducer(pageReducer, 0);
  const [metaDataPageDone, setMetaDataPageDone] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [verified, setVerified] = useState(false);
  const [alreadySubmitted, setAlreadySubmitted] = useState(false);
  const [demographics, setDemographics] = useState<{
    [key: string]: string;
  } | null>(null);

  useEffect(() => {
    setPairs(getCountryPairs(numberOfPairs));
  }, []);

  const selectOption = useCallback((key: string, value: string) => {
    setPairs((data) => {
      const newData = [...data];
      newData.find((pair) => pair.key === key)!['selected'] = value;
      return newData;
    });
  }, []);

  useEffect(() => {
    if (canSubmitSurveyMultipleTimes) {
      return;
    }
    setAlreadySubmitted(!!localStorage.getItem(SURVEY_SUBMITTED_KEY));
  }, []);

  const submit = useCallback(async () => {
    const pass = localStorage.getItem(SURVEY_PASS_KEY);

    await fetch(
      `https://ozip.biolab.si/anketa/submit?secret=${pass}${
        isTestEnvironment() ? '&test_env=true' : ''
      }`,
      {
        body: JSON.stringify({
          timestamp: new Date().toISOString(),
          countryPairs: pairs,
          demographicsData: demographics,
        }),
        method: 'POST',
      }
    );

    localStorage.setItem(SURVEY_SUBMITTED_KEY, 'true');
    setSubmitted(true);
  }, [pairs, demographics]);

  const pagePairs = useMemo(() => {
    const start = page * pairsPerPage;
    const end = start + pairsPerPage;
    return pairs.slice(start, end);
  }, [pairs, page]);

  const noOfAnswered = useMemo(
    () => pairs.filter((pair) => pair.selected).length,
    [pairs]
  );

  const progress: number = useMemo(
    () => Number((noOfAnswered / pairs.length).toFixed(2)),
    [noOfAnswered, pairs.length]
  );

  const nextPageEnabled = useMemo(() => {
    return (
      (!!pagePairs.length && pagePairs.every((pair) => pair.selected)) ||
      metaDataPageDone
    );
  }, [pagePairs, metaDataPageDone]);

  const showMetaDataPage = useMemo(() => {
    return pagePairs.length === 0;
  }, [pagePairs]);

  const contextValue = useMemo(
    () => ({
      pairs,
      pagePairs,
      selectOption,
      noOfAnswered,
      progress,
      numberOfPairs,
      setDemographics,
      setPage,
      setMetaDataPageDone,
      submit,
      verified,
      setVerified,
      submitted,
      nextPageEnabled,
      page,
      showMetaDataPage,
      alreadySubmitted,
    }),
    [
      showMetaDataPage,
      nextPageEnabled,
      noOfAnswered,
      page,
      pagePairs,
      pairs,
      progress,
      submitted,
      verified,
      alreadySubmitted,
      setVerified,
      setDemographics,
      selectOption,
      setMetaDataPageDone,
      submit,
    ]
  );

  return (
    <SurveyContext.Provider value={contextValue}>
      {children}
    </SurveyContext.Provider>
  );
}
