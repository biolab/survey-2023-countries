import { useCallback, useEffect, useMemo, useReducer, useState } from 'react';
import { CountryPair, getCountryPairs } from './utils';
import _isNill from 'lodash/isNil';

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

export const useSurveyData = (
  _noOfPairs: number = 6,
  _pairsPerPage: number = 5
) => {
  const [pairs, setPairs] = useState<CountryPair[]>([]);
  const [noOfPairs, setNoOfPairs] = useState(_noOfPairs);
  const [pairsPerPage, setPairsPerPage] = useState(_pairsPerPage);
  const [page, setPage] = useReducer(pageReducer, 0);
  const [autoProgress, setAutoProgress] = useState(false);

  useEffect(() => {
    setPairs(getCountryPairs(noOfPairs));
  }, [noOfPairs]);

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

  return {
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
  };
};
