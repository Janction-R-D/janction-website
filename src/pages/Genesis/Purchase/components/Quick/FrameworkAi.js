import pytorch from '@/assets/images/genesis/pytorch.png';
import tensorflow from '@/assets/images/genesis/tensorflow.png';
import { FRAMEWORK } from '@/constant';
import { Card, Checkbox } from 'antd';
import styles from './index.less';
export default function FrameworkAi({ value, onChange }) {
  const handleCheckboxChange = (newValue) => {
    if (newValue !== value) {
      onChange?.(newValue);
    }
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
              value === item.value && styles['active-item'],
            ].join(' ')}
            onClick={() => handleCheckboxChange(item.value)}
          >
            <div className={styles['content']}>
              <div>
                {['tensorflow', 'pytorch'].includes(item.value) ? (
                  <img src={item.value == 'pytorch' ? pytorch : tensorflow} />
                ) : (
                  <p>{item.label}</p>
                )}
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
    </main>
  );
}
