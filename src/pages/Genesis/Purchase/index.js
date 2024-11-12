import { useEffect, useState } from 'react';
import { history, Redirect, useModel } from 'umi';
import Customized from './components/Customized';
import Quick from './components/Quick';
import { DEFAULT_PURCHASE_TYPE, PURCHASES } from './extra';
import styles from './index.less';

function Purchase(props) {
  const { isQuick } = history.location.state || {};
  const { initialState } = useModel('@@initialState');
  const { isLessee } = initialState || {};

  const [activePurType, setActivePurType] = useState(DEFAULT_PURCHASE_TYPE);

  useEffect(() => {
    if (isQuick) {
      setActivePurType(PURCHASES[1].value);
    }
  }, [isQuick]);

  const onPurTypeChange = (type) => {
    setActivePurType(type);
  };

  if (!isLessee) return <Redirect to="/genesis/dashboard"></Redirect>;

  return (
    <main className={styles['purchase-container']}>
      <section>
        <h1 className={styles['text__title']}>Configure instance</h1>

        <div className={styles['purchase-type-nav']}>
          {PURCHASES.map((item) => (
            <div
              key={item.value}
              className={[
                styles['nav-item'],
                activePurType == item.value && styles['nav-active-item'],
              ].join(' ')}
              onClick={() => onPurTypeChange(item.value)}
            >
              {item.name}
            </div>
          ))}
        </div>

        {activePurType == PURCHASES[0].value && <Customized />}
        {activePurType == PURCHASES[1].value && <Quick />}
      </section>
    </main>
  );
}

Purchase.wrappers = ['@/wrappers/auth'];
export default Purchase;
