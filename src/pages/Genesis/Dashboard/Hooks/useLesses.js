import React, { useEffect, useState } from 'react';
import { fetchLessesData } from '../../../../services/genesis/instance';

export default function useLesses() {
  const [lessesData, setLessesData] = useState({});
  useEffect(() => {
    fetchLessesData()
      .then((res) => {
        if (!res?.success) return;
        const data = res?.data || {};
        setLessesData(data);
      })
      .catch((err) => console.log(err));
  }, []);

  return { lessesData };
}
