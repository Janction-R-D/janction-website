import React, { useEffect, useState } from 'react';
import { fetchLessesData } from '../../../../services/genesis/instance';

export default function useLesses() {
  const [lessesData, setLessesData] = useState({});
  useEffect(() => {
    fetchLessesData()
      .then((res) => {
        setLessesData(res);
      })
      .catch((err) => console.log(err));
  }, []);

  return { lessesData };
}
