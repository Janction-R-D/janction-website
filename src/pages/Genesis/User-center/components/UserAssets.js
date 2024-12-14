import React, { useEffect, useState } from 'react';
import { Card, Input, Select, Button } from 'antd';
import styles from '../index.less';
import JanctionTip from '@/components/JanctionTip';
export default function UserAssets({ data, duration, setDuration }) {
  const options = [
    { value: 1, label: '1 Month' },
    { value: 2, label: '2 Months' },
    { value: 3, label: '3 Months' },
    { value: 4, label: '4 Months' },
    { value: 5, label: '5 Months' },
    { value: 6, label: '6 Months' },
    { value: 9, label: '9 Months' },
    { value: 12, label: '1 Year' },
  ];
  useEffect(() => {
    console.log(data);
    setDuration(options[0]);
  }, []);
  const handleChange = (e) => {
    console.log(e);
  };
  return (
    <Card className={styles['card']}>
      <section className={styles['card-header']}>
        <h3>Staking your assets</h3>
        <JanctionTip title="Bet your empty currency to earn rewards and help maintain network security." />
      </section>
      <section className={styles['card-assets-items']}>
        <div>
          <p>Quantity pledged (ETH)</p>
          <Input
            type="number"
            inputMode="numeric"
            className={styles['card-assets-input']}
            defaultValue={data?.assets?.amount || 0}
            suffix="ETH"
            name="amount"
          />
          {/* <section className={styles['card-assets-input']}>
            <p> {data?.assets?.amount}</p>
            <span>ETH</span>
          </section> */}
        </div>
        <div>
          <p>Duration pledged (Months)</p>
          <Select
            className={styles['card-assets-select']}
            options={options}
            defaultValue={{
              value: data.assets?.duration_months || 0,
              label: `${data.assets?.duration_months || 0} ${
                data.assets?.duration_months !== 1 ? 'Months' : 'Month'
              }`,
            }}
            bordered={false}
            onChange={handleChange}
            fieldNames="duration_months"
            name="duration_months"
          />
          {/* <section className={styles['card-assets-input']}>
            {data.assets?.duration_months}{' '}
            {data.assets?.duration_months > 1 ? 'Months' : 'Month'}
          </section> */}
        </div>
        <div>
          <p>Anticipated income</p>
          <Input
            type="number"
            className={styles['card-assets-input']}
            defaultValue={data?.assets?.anticipated_income || 0}
            suffix="ETH"
            name="anticipated_income"
          />
          {/* <section className={styles['card-assets-input']}>
            <p>{data?.assets?.anticipated_income}</p>
            <span>ETH</span>
          </section> */}
        </div>
      </section>
      <Button
        className={styles['create-btn']}
        style={{ paddingInline: '28px', marginTop: '12px' }}
        htmlType="submit"
      >
        Save
      </Button>
    </Card>
  );
}
