import { useCallback, useEffect, useMemo, useState } from 'react';
import { CountryPair, getCountryPairs } from './utils';

export const useSurveyData = () => {
  const [pairs, setPairs] = useState<CountryPair[]>([]);

  useEffect(() => {
    setPairs(getCountryPairs(50));
  }, []);

  const selectOption = useCallback((index: number, value: string) => {
    setPairs((data) => {
      const newData = [...data];
      newData[index]['selected'] = value;
      return newData;
    });
  }, []);

  const noOfAnswered = useMemo(
    () => pairs.filter((pair) => pair.selected).length,
    [pairs]
  );

  const progress: number = useMemo(
    () => Number((noOfAnswered / pairs.length).toFixed(2)),
    [noOfAnswered, pairs.length]
  );

  return { pairs, selectOption, noOfAnswered, progress };
};
