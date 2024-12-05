import { fetchLocation } from '@/services/location';
import { useEffect, useState } from 'react';

// 获取缩放比例
const useLocation = () => {
  const [data, setData] = useState([]);
  const [continents, setContinents] = useState({});
  const [selectedContinent, setSelectedContinent] = useState(null);

  useEffect(() => {
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

      setData(countries);
      setContinents(grouped);
    } catch (error) {
      console.error('Error fetching country data:', error);
    }
  };

  return { data, continents };
};

export default useLocation;
