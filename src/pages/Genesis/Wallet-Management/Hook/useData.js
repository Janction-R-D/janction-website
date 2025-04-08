import { fetchIncomeInfo } from '@/services/genesis';
import React, { useEffect, useMemo, useState } from 'react';

export default function useData() {
  const [list, setList] = useState([]);
  const [revenue, setRevenue] = useState();
  const [statisticData, setStatisticData] = useState(null);

  useEffect(() => {
    getData();
  }, []);
  const getData = async () => {
    try {
      const { statistical_info, transaction_records, ...extra } =
        await fetchIncomeInfo();
      setStatisticData(statistical_info);

      const newList = transaction_records.map((item, index) => ({
        ...item,
        key: index,
      }));

      setList(newList || []);

      setRevenue(extra);
    } catch (error) {
      console.log('『error』', error);
    }
  };

  const compared_yesterday = useMemo(() => {
    let node_i = '~';
    let rentalServer_i = '~';
    if (!revenue) return { node_i, rentalServer_i };
    const {
      node_income = 0,
      node_income_yesterday = 0,
      rental_server_revenue = 0,
      rental_server_revenue_yesterday = 0,
    } = revenue;
    if (!node_income_yesterday) {
      node_i = 1;
    }
    if (!rental_server_revenue_yesterday) {
      rentalServer_i = 1;
    }
    node_i = (node_income - node_income_yesterday) / node_income_yesterday;
    rentalServer_i =
      (rental_server_revenue - rental_server_revenue_yesterday) /
      rental_server_revenue_yesterday;
    return { node_i, rentalServer_i };
  }, [revenue]);
  return { revenue, list, compared_yesterday };
}
