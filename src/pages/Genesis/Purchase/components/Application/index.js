import { useState } from 'react';
import { APPLICATION } from '../../extra';
import styles from './index.less';

const Application = (props) => {
  const [active_ap, setActiveAp] = useState(APPLICATION[0]);

  return (
    <div className={styles['application-wrapper']}>
      {APPLICATION.map((item) => (
        <div
          className={[
            styles['item'],
            active_ap.value == item.value && styles['active-item'],
          ].join(' ')}
          onClick={() => setActiveAp(item)}
        >
          <span>{item.name}</span>
        </div>
      ))}
    </div>
  );
};

export default Application;
