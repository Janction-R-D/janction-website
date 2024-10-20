import React from 'react';
import { Button } from 'antd';
export default function FoterPrice({ styles, totalAmount }) {
  return (
    <div className={styles['footer-price']}>
      <section className={styles['flex-col']}>
        <p className={styles['text--yellow']}>&#165; {totalAmount}</p>
        <div className={styles['flex-items']}>
          <p className={styles['text-grey']}>Selected</p>
          <p>SA5.8XLARGE128 (Standard SA5, 32C128G)</p>
        </div>
      </section>
      <section className={styles['footer-price__buttons']}>
        <Button type="text" className={styles['btn-midgrey']}>
          Cancel
        </Button>
        <Button type="text" className={styles['btn-gradient']}>
          Confirm
        </Button>
      </section>
    </div>
  );
}
