import { useEffect, useState } from 'react';
import { APPLICATION } from '../../extra';
import styles from './index.less';

const Application = (props) => {
  const { value, onChange } = props;
  const [active_ap, setActiveAp] = useState();

  useEffect(() => {
    setActiveAp(value);
  }, [value]);

  return (
    <div className={styles['application-wrapper']}>
      {APPLICATION.map((item) => (
        <div
          className={[
            styles['item'],
            active_ap == item.value && styles['active-item'],
          ].join(' ')}
          onClick={() => {
            setActiveAp(item);
            onChange(item.value);
          }}
        >
          <span>{item.name}</span>
        </div>
      ))}
    </div>
  );
};

export default Application;
