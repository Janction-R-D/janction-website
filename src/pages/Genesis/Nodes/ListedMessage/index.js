import React, { useEffect, useState } from 'react';
import styles from './index.less';
import { history } from 'umi';
import { fetchUserInfo } from '@/services/genesis';
export default function ListedMessage() {
  const [isBinded, setIsBinded] = useState(false);
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
  return (
    <>
      {!isBinded && (
        <div className={styles['warning-box']}>
          <i className="iconfont icon-info" />
          <span>
            Please bind your email to receive real-time node monitoring updates
            <span
              className={styles['bind']}
              onClick={() => history.push('/genesis/user-center')}
            >
              Go bind email.
            </span>
          </span>
        </div>
      )}
    </>
  );
}
