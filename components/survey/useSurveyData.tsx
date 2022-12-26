import { useCallback, useEffect, useMemo, useState } from 'react';
import { CountryPair, getCountryPairs } from './utils';
import _isNill from 'lodash/isNil';

export const useSurveyData = (_noOfPairs: number = 50) => {
  const [pairs, setPairs] = useState<CountryPair[]>([]);
  const [noOfPairs, setNoOfPairs] = useState(_noOfPairs);

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

  const changeConfig = useCallback((_noOfPairs: number | undefined) => {
    if (!_isNill(_noOfPairs)) {
      setNoOfPairs(_noOfPairs);
    }
  }, []);

  const noOfAnswered = useMemo(
    () => pairs.filter((pair) => pair.selected).length,
    [pairs]
  );

  const progress: number = useMemo(
    () => Number((noOfAnswered / pairs.length).toFixed(2)),
    [noOfAnswered, pairs.length]
  );

  return {
    pairs,
    selectOption,
    noOfAnswered,
    progress,
    changeConfig,
    noOfPairs,
  };
};
