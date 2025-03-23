import { useEffect, useMemo, useState } from 'react';
import { history, useModel } from 'umi';
import styles from './genesis.less';
import PurchaseHeader from '@/components/Layouts/Auth/PurchaseHeader';

const PurchaseLayout = (props) => {
  const { children } = props;
  const { initialState } = useModel('@@initialState');
  const { isLessee } = initialState || {};
  const [active, setActive] = useState();

  useEffect(() => {
    setActive(history.location.pathname);
  }, [history.location.pathname]);

  const onMenuChange = (nav) => {
    history.push(nav.path);
  };

  return (
    <div id={styles['purchase-layout']}>
      <main>
        <div className={styles['personal-container']}>
          <main className={styles['main-no-padding']}>
            <PurchaseHeader showLogo={true} />
            <div className={styles['content']}>{children}</div>
          </main>
        </div>
      </main>
    </div>
  );
};
PurchaseLayout.wrappers = ['@/wrappers/auth'];
export default PurchaseLayout;
