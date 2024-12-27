import React, { useEffect, useState } from 'react';
import { Card } from 'antd';
import styles from './resources.less';
import { fetchLessor } from '@/services/genesis';

export default function Resources({ statisticData }) {
  const [nftAmount, setNftAmmount] = useState(0);
  useEffect(() => {
    getLessors();
  }, []);
  const getLessors = async () => {
    const res = await fetchLessor();
    const { ammount = 0, detail } = res?.nft_summary || {};
    setNftAmmount(ammount);
  };

  const data = [
    {
      name: 'Running nodes',
      field: 'running',
      value: 24546,
      color: 'white',
    },
    {
      name: 'listed nodes',
      field: 'listed',
      value: 19283,
      color: 'white',
    },
    {
      name: 'active instances',
      field: 'active',
      value: 2193,
      color: 'white',
    },
  ];

  return (
    <Card className={styles['card']}>
      <div className={styles['card-header']}>
        <h2>My nodes</h2>
      </div>
      <div>
        <ul>
          {data.map((item, index) => (
            <li key={index}>
              <span>{item.name}</span>
              <p className={styles[`${item.color}`]}>
                {item.field == 'running'
                  ? (statisticData?.[item.field] || 0) + nftAmount
                  : statisticData?.[item.field]}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </Card>
  );
}
