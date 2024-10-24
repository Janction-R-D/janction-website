import React, { useState } from 'react';
import { Button } from 'antd';
const Counter = ({ styles }) => {
  const [amount, setAmount] = useState(0);
  const increment = () => {
    setAmount(amount + 1);
  };

  const decrement = () => {
    setAmount(amount - 1);
  };

  return (
    <section className={styles['counter-flex']}>
      <div className={styles['counter']}>
        <Button type="text" onClick={decrement} className={styles['decrement']}>
          -
        </Button>
        <p>{amount}</p>
        <Button type="text" onClick={increment} className={styles['increment']}>
          +
        </Button>
      </div>
    </section>
  );
};

export default Counter;
