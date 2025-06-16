import { Card, Checkbox } from 'antd';
import pytorch from '@/assets/images/genesis/pytorch.png';
import tensorflow from '@/assets/images/genesis/tensorflow.png';
import { FRAMEWORK } from './constant';
import styles from './index.less';

export default function FrameworkAi({ value = [], onChange }) {
  const handleCheckboxChange = (itemValue) => {
    const isSelected = value.includes(itemValue);
    const newValue = isSelected
      ? value.filter((v) => v !== itemValue)
      : [...value, itemValue];
    onChange?.(newValue);
  };

  return (
    <main className={styles['framework-conf-wrapper']}>
      <div className={styles['framework-check']}>
        <p>AI Framework</p>
      </div>
      <section className={styles['framework-conf-cards']}>
        {FRAMEWORK.map((item) => (
          <Card
            key={item.value}
            className={[
              styles['item'],
              value.includes(item.value) && styles['active-item'],
            ].join(' ')}
            style={{ cursor: 'pointer' }}
            onClick={() => handleCheckboxChange(item.value)}
          >
            <div className={styles['content']}>
              <div>
                <img
                  height={35}
                  src={item.value === 'pytorch' ? pytorch : tensorflow}
                  alt={item.label}
                />
              </div>
              <Checkbox
                className={styles['rounded-check']}
                checked={value.includes(item.value)}
                style={{ visibility: 'hidden' }}
                onChange={() => handleCheckboxChange(item.value)}
              />
            </div>
          </Card>
        ))}
      </section>
    </main>
  );
}
