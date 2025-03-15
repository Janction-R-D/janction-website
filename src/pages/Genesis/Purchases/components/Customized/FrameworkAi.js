import React, { useEffect, useState } from 'react';
import { Switch, Card, Checkbox } from 'antd';
import { FRAMEWORK } from './constant';
import styles from './index.less';
export default function FrameworkAi({ value, onChange }) {
  const [check, setCheck] = useState(true);

  const onCheckChange = (checked) => {
    console.log(`switch to ${checked}`);
    setCheck(checked);
  };
  useEffect(() => {
    if (!check) {
      onChange();
    }
  }, [check]);
  const handleCheckboxChange = (newValue) => {
    if (newValue !== value) {
      onChange?.(newValue);
    }
  };
  return (
    <main className={styles['framework-conf-wrapper']}>
      <div className={styles['framework-check']}>
        <p>AI Framework</p> <Switch defaultChecked onChange={onCheckChange} />
      </div>
      <section className={styles['framework-conf-cards']}>
        {FRAMEWORK.map((item) => (
          <Card
            key={item.value}
            className={[
              styles['item'],
              value === item.value && styles['active-item'],
              check === true && styles['disabled'],
            ].join(' ')}
            style={{
              cursor: check ? 'pointer' : 'not-allowed',
              pointerEvents: check ? '' : 'none',
            }}
            onClick={() => handleCheckboxChange(item.value)}
          >
            <div className={styles['content']}>
              <p className={styles['description']}>{item.name}</p>
              {check && (
                <Checkbox
                  className={styles['rounded-check']}
                  checked={value === item.value}
                  onChange={() => handleCheckboxChange(item.value)}
                  disabled={!check}
                />
              )}
            </div>
          </Card>
        ))}
      </section>
    </main>
  );
}
