import { useMemo } from 'react';
import flags from '../flags.json';

export default function useFlag({ locations }) {
  const allFlags = useMemo(() => {
    return locations.map((location) => {
      const countryData = flags.find(
        (item) => item.country === location.country,
      );
      return { ...location, flag: countryData ? countryData.flag : null };
    });
  }, [locations]); // Se recalcula solo si `locations` cambia

  return { allFlags };
}
