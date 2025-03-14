import { useState } from 'react';
import { Card, Checkbox } from 'antd';
import styles from './index.less';
const proccess = [
  {
    name: 'GeForce RTX 4090',
    quantity: '245',
    brand: 'nvidia',
    color: 'green',
    value: 'RTX 4090',
  },
  {
    name: 'GeForce RTX 4090',
    quantity: '245',
    brand: 'nvidia',
    color: 'green',
    value: 'RTX 4080',
  },
  {
    name: 'GeForce RTX 4090',
    quantity: '245',
    brand: 'nvidia',
    color: 'green',
    value: 'RTX 4070',
  },
];
export function Processors(props) {
  const { onChange, formValues, value } = props;
  const [activeValue, setActiveValue] = useState(
    formValues?.processor_model || proccess[0]?.value,
  );

  const handleCheckboxChange = (newValue) => {
    if (newValue !== value) {
      onChange?.(newValue);
    }
  };
  return (
    <section className={styles['models-conf-cards']}>
      {proccess.map((item, index) => (
        <Card
          key={index}
          className={[
            styles['item'],
            value === item.value && styles['active-item'],
          ].join(' ')}
          onClick={() => handleCheckboxChange(item.value)}
        >
          <div className={styles['content']}>
            <div
              className={[styles['item-content'], styles[`${item.color}`]].join(
                ' ',
              )}
            >
              <i className={`iconfont icon-${item.brand} `} />
              <p className={styles['description']}>{item.name}</p>
            </div>
            <Checkbox
              className={styles['rounded-check']}
              checked={value === item.value}
              onChange={() => handleCheckboxChange(item.value)}
            />
          </div>
        </Card>
      ))}
    </section>
  );
}
