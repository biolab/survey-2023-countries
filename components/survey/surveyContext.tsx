import _isNill from 'lodash/isNil';
import React from 'react';
import { useCallback, useEffect, useMemo, useReducer, useState } from 'react';
import { CountryPair, getCountryPairs, isTestEnvironment } from './utils';
import config from 'site.config';

const { numberOfPairs, pairsPerPage } = config;

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
});

export default function SurveyContextProvider({
  children,
}: {
  children: React.ReactElement;
}) {
  const [pairs, setPairs] = useState<CountryPair[]>([]);
  const [page, setPage] = useReducer(pageReducer, 0);
  const [autoProgress, setAutoProgress] = useState(false);
  const [metaDataPageDone, setMetaDataPageDone] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [verified, setVerified] = useState(false);
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

  const submit = useCallback(async () => {
    const pass = localStorage.getItem('survey_pass');

    await fetch(
      `http://ozip.biolab.si/anketa/submit?secret=${pass}${
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

  useEffect(() => {
    if (!autoProgress || !nextPageEnabled) {
      return;
    }

    setPage(1);
  }, [autoProgress, nextPageEnabled]);

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
