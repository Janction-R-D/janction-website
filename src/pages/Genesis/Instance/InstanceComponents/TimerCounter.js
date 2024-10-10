import React, { useState } from 'react';
import { Button } from 'antd';
const TimeCounter = ({ styles, setTotalAmount, totalAmount }) => {
  const timeOptions = [
    '1 month',
    '2 months',
    '3 months',
    '6 months',
    '9 months',
    '1 year',
    '2 years',
  ];

  const [index, setIndex] = useState(1);

  const increment = () => {
    setIndex((prevIndex) =>
      prevIndex < timeOptions.length - 1 ? prevIndex + 1 : prevIndex,
    );
    setTotalAmount((prevState) => prevState * (index / 10).toFixed(2));
  };

  const decrement = () => {
    setIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : prevIndex));
    setTotalAmount((prevState) => prevState * (index / 10).toFixed(2));
  };

  return (
    <section className={styles['counter-flex']}>
      <p className={styles['text-grey']}>Period</p>
      <div className={styles['counter']}>
        <Button type="text" onClick={decrement} className={styles['decrement']}>
          -
        </Button>
        <p>{timeOptions[index]}</p>
        <Button type="text" onClick={increment} className={styles['increment']}>
          +
        </Button>
      </div>
    </section>
  );
};

export default TimeCounter;
