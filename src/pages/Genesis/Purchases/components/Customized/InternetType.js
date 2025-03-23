import { useState } from 'react';

import { Card, Checkbox } from 'antd';
import styles from './index.less';
import { INTERNET } from '../../extra';

export default function InternetType(props) {
  const { value = [], onChange, formValues, setCurrent } = props;
  const [activeValue, setActiveValue] = useState();

  const handleCheckboxChange = (checked, newVal) => {
    let newValues = checked
      ? [...value, newVal]
      : value.filter((item) => item !== newVal);

    onChange(newValues); // Llama a la función para actualizar el formulario
  };

  return (
    <div className={styles['internet-conf-wrapper']}>
      <h3>Internet</h3>
      <section className={styles['internet-conf-cards']}>
        {INTERNET.map((item, index) => (
          <Card
            key={index}
            className={[
              styles['item'],
              activeValue === item.value && styles['active-item'],
            ].join(' ')}
            onClick={() =>
              handleCheckboxChange(!value.includes(item.value), item.value)
            }
          >
            <div className={styles['content']}>
              <p className={styles['description']}>{item.label}</p>
              <Checkbox
                className={styles['rounded-check']}
                checked={value.includes(item.value)}
                onChange={(e) =>
                  handleCheckboxChange(e.target.value, item.value)
                }
              />
            </div>
          </Card>
        ))}
      </section>
    </div>
  );
}
