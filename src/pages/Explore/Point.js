import styles from './index.less';
import { useEffect, useState } from 'react';
import Line from './components/Line';

function extendArray(arr, len) {
  if (arr.length === 0 || arr.length >= len) return arr.slice(0, len);

  let result = arr.slice();
  while (result.length < len) {
    result.push(...arr.slice(0, len - result.length));
  }
  return result;
}

const Point = (props) => {
  const [userCreditsList, setUserCreditsList] = useState();

  useEffect(() => {
    const _userCreditsList = [
      {
        userId: '1',
        userName: '用户0x56ab0649',
        creditsNum: 124,
      },
    ];
    const arr = extendArray(_userCreditsList, 5);
    setUserCreditsList(arr);
  }, []);

  const renderUserCreditsInfo = () => {
    return (
      <ul className={styles['user-credits-info']}>
        {(userCreditsList || []).map((item, index) => (
          <li key={`${item.userId}${index}`} style={{ '--d': index - 2 }}>
            <i></i>
            <span>{`${item.userName}获得${item.creditsNum}积分`}</span>
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div className={styles['explore-point-container']}>
      <div className={styles['point-slogan']}>
        <h1>
          LAYER 2 FOR <br />
          DECENTRALIZED AI
        </h1>
        {renderUserCreditsInfo()}
      </div>
      <div className={styles['node-statistic']}>
        <div className={styles['statistic']}>
          <h1>112,893 +</h1>
          <p>Points</p>
        </div>
        <div className={styles['label']}>Total Points</div>
      </div>
      <div className={styles['total-network-earning']}>
        <div className={styles['header']}>
          <i></i>
          <div className={styles['info']}>
            <h1>TOTAL NETWORK EARNINGS</h1>
            <p>$ 1,060,463</p>
          </div>
        </div>
        <div className={styles['chart-container']}>
          <Line />
        </div>
      </div>
    </div>
  );
};

export default Point;
