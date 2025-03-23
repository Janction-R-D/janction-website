import { history, useModel, Redirect } from 'umi';
import { DEFAULT_PURCHASE_TYPE, PURCHASES } from './extra';
import styles from './index.less';
import { useEffect, useState } from 'react';
import Customized from './components/Customized';
import Quick from './components/Quick';

function Purchase() {
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
      <section className={styles['purchase-header']}>
        <h1 className={styles['text__title ']}>Configuration instance</h1>
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
      </section>
      <section className={styles['purchase-main']}>
        {activePurType == PURCHASES[0].value && <Quick />}
        {activePurType == PURCHASES[1].value && <Customized />}
      </section>
    </main>
  );
}
Purchase.wrappers = ['@/wrappers/auth'];
export default Purchase;
