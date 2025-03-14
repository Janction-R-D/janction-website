import React, { useEffect } from 'react';
import { Card, Checkbox } from 'antd';
import styles from './index.less';

const Internet_List = [
  { name: 'Bangalore, India', value: 'Bangalore, India' },
  { name: 'Manchester, UK', value: 'Manchester, UK' },
];

export default function InternetType({ value, onChange }) {
  useEffect(() => {
    if (!value) {
      onChange?.(Internet_List[0]?.value);
    }
  }, [value, onChange]);

  const handleCheckboxChange = (value) => {
    if (value === activeValue) {
      return; // Evita deseleccionar el único seleccionado
    }
    setActiveValue(value);
    onChange(value); // Llama a la función para actualizar el formulario
  };

  return (
    <div className={styles['internet-conf-wrapper']}>
      <h3>Internet</h3>
      <section className={styles['internet-conf-cards']}>
        {Internet_List.map((item) => (
          <Card
            key={item.value}
            className={[
              styles['item'],
              value === item.value && styles['active-item'],
            ].join(' ')}
            onClick={() => handleCheckboxChange(item.value)}
          >
            <div className={styles['content']}>
              <p className={styles['description']}>{item.name}</p>
              <Checkbox
                className={styles['rounded-check']}
                checked={value === item.value}
                onChange={() => handleCheckboxChange(item.value)}
              />
            </div>
          </Card>
        ))}
      </section>
    </div>
  );
}
