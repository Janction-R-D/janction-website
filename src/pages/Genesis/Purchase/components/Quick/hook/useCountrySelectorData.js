import { useEffect, useState } from 'react';

import groupedContinents from '@/utils/continents.json';
import { isEmpty } from 'lodash';

const flattenCountries = (data) => {
  if (isEmpty(data)) return [];

  const allCountries = Object.values(data).flat();

  return allCountries.sort((a, b) => a.name.localeCompare(b.name));
};

const useCountrySelectorData = () => {
  const [allCountries, setAllCountries] = useState([]);

  useEffect(() => {
    const flatList = flattenCountries(groupedContinents);
    setAllCountries(flatList);
  }, []);

  return allCountries;
};

export default useCountrySelectorData;
