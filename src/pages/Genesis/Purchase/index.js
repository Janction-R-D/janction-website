import { history, useModel, Redirect, useIntl } from 'umi';
import { DEFAULT_PURCHASE_TYPE, getPurchases, PURCHASES } from './extra';
import styles from './index.less';
import { useEffect, useState } from 'react';
import Customized from './components/Customized';
import Quick from './components/Quick';
import { Button } from 'antd';
import { fetchUserInfo } from '@/services/genesis';
function Purchase() {
  const { path, isQuick } = history.location.state || {};
  const { initialState } = useModel('@@initialState');
  const { isLessee } = initialState || {};
  const [activePurType, setActivePurType] = useState(DEFAULT_PURCHASE_TYPE);
  const [isBinded, setIsBinded] = useState(false);
  const intl = useIntl();
  const purchases = getPurchases(intl);
  useEffect(() => {
    if (isQuick) {
      setActivePurType(PURCHASES[1].value);
    }
  }, [isQuick]);
  useEffect(() => {
    getUserInfo();
  }, []);
  const getUserInfo = async () => {
    try {
      const res = await fetchUserInfo();
      if (res?.email) {
        setIsBinded(res);
      }
    } catch (error) {
      console.log(error);
    }
  };
  if (!isLessee) return <Redirect to="/genesis/dashboard"></Redirect>;

  return (
    <main className={styles['purchase-container']}>
      <section className={styles['header-wrapper']}>
        <header>
          <h1>{intl.formatMessage({ id: 'purchase.title' })}</h1>
        </header>
        {!isBinded && (
          <div className={styles['warning-box']}>
            <i className="iconfont icon-info" />
            <span>
              {intl.formatMessage({ id: 'purchase.bindEmail' })}
              <span
                className={styles['bind']}
                onClick={() => history.push('/genesis/user-center')}
              >
                {intl.formatMessage({ id: 'purchase.goBind' })}
              </span>
            </span>
          </div>
        )}
      </section>
      <section className={styles['purchase-nav-header']}>
        <div className={styles['purchase-type-nav']}>
          {purchases.map((item) => (
            <div
              key={item.value}
              className={[
                styles['nav-item'],
                activePurType == item.value && styles['nav-active-item'],
              ].join(' ')}
              onClick={() => setActivePurType(item.value)}
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
