import { useEffect, useState } from 'react';
import styles from './index.less';

const PurchaseCheckBox = (props) => {
  const { options = [], value, onChange } = props;
  const [active, setActive] = useState([]);

  useEffect(() => {
    setActive(value || []);
  }, [value]);

  return (
    <div className={styles['purchase-checkbox-wrapper']}>
      {options.map((item) => (
        <div
          className={[
            styles['item'],
            active.includes(item.value) && styles['active-item'],
          ].join(' ')}
          onClick={() => {
            let _active = [...active];
            if (_active.includes(item.value)) {
              _active = _active.filter((_item) => item.value !== _item);
            } else {
              _active.push(item.value);
            }
            setActive(_active);
            onChange(_active);
          }}
        >
          <span>{item.label}</span>
        </div>
      ))}
    </div>
  );
};

export default PurchaseCheckBox;
