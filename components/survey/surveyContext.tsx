import _isNill from 'lodash/isNil';
import React from 'react';
import { useCallback, useEffect, useMemo, useReducer, useState } from 'react';
import { CountryPair, getCountryPairs } from './utils';

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
  changeConfig: (
    _noOfPairs?: number,
    _pairsPerPage?: number,
    _autoProgress?: boolean
  ) => void;
  noOfPairs: number;
  setPage: React.Dispatch<0 | 1 | -1>;
  nextPageEnabled: boolean;
  page: number;
  metaDataPage: boolean;
}

export const SurveyContext = React.createContext<SurveyContextI>({
  pairs: [],
  pagePairs: [],
  selectOption: () => null,
  noOfAnswered: 0,
  progress: 0,
  changeConfig: () => null,
  noOfPairs: 0,
  setPage: () => null,
  nextPageEnabled: false,
  page: 0,
  metaDataPage: false,
});

export default function SurveyContextProvider({
  children,
}: {
  children: React.ReactElement;
}) {
  const [pairs, setPairs] = useState<CountryPair[]>([]);
  const [noOfPairs, setNoOfPairs] = useState(50);
  const [pairsPerPage, setPairsPerPage] = useState(10);
  const [page, setPage] = useReducer(pageReducer, 0);
  const [autoProgress, setAutoProgress] = useState(false);

  useEffect(() => {
    setPairs(getCountryPairs(noOfPairs));
  }, [noOfPairs, pairsPerPage, autoProgress]);

  const selectOption = useCallback((key: string, value: string) => {
    setPairs((data) => {
      const newData = [...data];
      newData.find((pair) => pair.key === key)!['selected'] = value;
      return newData;
    });
  }, []);

  const changeConfig = useCallback(
    (_noOfPairs?: number, _pairsPerPage?: number, _autoProgress?: boolean) => {
      if (!_isNill(_noOfPairs)) {
        setNoOfPairs(Number(_noOfPairs));
      }
      if (!_isNill(_pairsPerPage)) {
        setPairsPerPage(Number(_pairsPerPage));
      }
      if (!_isNill(_pairsPerPage)) {
        setAutoProgress(Boolean(_autoProgress));
      }
      setPage(0);
    },
    []
  );

  const pagePairs = useMemo(() => {
    const start = page * pairsPerPage;
    const end = start + pairsPerPage;
    return pairs.slice(start, end);
  }, [pairs, pairsPerPage, page]);

  const noOfAnswered = useMemo(
    () => pairs.filter((pair) => pair.selected).length,
    [pairs]
  );

  const progress: number = useMemo(
    () => Number((noOfAnswered / pairs.length).toFixed(2)),
    [noOfAnswered, pairs.length]
  );

  const nextPageEnabled = useMemo(() => {
    return !!pagePairs.length && pagePairs.every((pair) => pair.selected);
  }, [pagePairs]);

  const metaDataPage = useMemo(() => {
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
      changeConfig,
      noOfPairs,
      setPage,
      nextPageEnabled,
      page,
      metaDataPage,
    }),
    [
      changeConfig,
      metaDataPage,
      nextPageEnabled,
      noOfAnswered,
      noOfPairs,
      page,
      pagePairs,
      pairs,
      progress,
      selectOption,
    ]
  );

  return (
    <SurveyContext.Provider value={contextValue}>
      {children}
    </SurveyContext.Provider>
  );
}
