import { fetchLocation } from '@/services/location';
import { useEffect, useState } from 'react';
import defaultContinents from '@/utils/continents.json';
import { isEmpty } from 'lodash';

// 获取缩放比例
const useContinents = ({ current }) => {
  const [continents, setContinents] = useState(defaultContinents);

  useEffect(() => {
    if (current !== 3) return;
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const countries = await fetchLocation();

      // 按洲分类
      const grouped = countries.reduce((acc, country) => {
        const region = country.region || 'Others';
        if (!acc[region]) {
          acc[region] = [];
        }
        acc[region].push({
          name: country.name.common,
          code: country.cca2,
        });
        return acc;
      }, {});
      if (isEmpty(grouped)) {
        setContinents(defaultContinents);
        return;
      }
      setContinents(grouped);
    } catch (error) {
      console.error('Error fetching country data:', error);
    }
  };

  return continents;
};

export default useContinents;
