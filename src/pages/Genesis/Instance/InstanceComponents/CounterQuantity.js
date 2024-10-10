import { useState } from 'react';
import { Button } from 'antd';
export default function CounterQuantity({ styles }) {
  const [count, setCount] = useState(0);

  const increment = () => {
    setCount((prevCount) => prevCount + 1);
  };

  const decrement = () => {
    setCount((prevCount) => (prevCount > 0 ? prevCount - 1 : 0));
  };

  return (
    <div className={styles['counter-flex']}>
      <p className={styles['text-grey']}>Quantity: </p>
      <div className={styles['counter']}>
        <Button type="text" onClick={decrement} className={styles['decrement']}>
          -
        </Button>
        <p>{count}</p>
        <Button type="text" onClick={increment} className={styles['increment']}>
          +
        </Button>
      </div>
    </div>
  );
}
