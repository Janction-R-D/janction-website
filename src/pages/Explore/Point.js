import styles from './index.less';
import { useEffect, useState } from 'react';
import Line from './components/Line';
import {
  fetchNetworkEarnings,
  fetchTotalNetworkEarnings,
  fetchTotalPoints,
  fetchUserCreditsInfo,
} from '../../services/explore/point';
import numeral from 'numeral';
import { MONTH } from '../../constant';
import { renderBackgroudImg } from '@/utils/lang';
import ripple from '@/assets/images/explore/ripple.png';
import wave_line from '@/assets/images/explore/wave_line.png';
import statistic_bg from '@/assets/images/explore/statistic_bg.png';

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
  const [totalPoints, setTotalPoints] = useState();
  const [totalNetworkEarnings, setTotalNetworkEarnings] = useState();
  const [networkEarnings, setNetworkEarnings] = useState([]);

  useEffect(() => {
    getUserCreditsInfo();
    getTotalPoints();
    getTotalNetworkEarnings();
    getNetworkEarnings();
  }, []);

  const getUserCreditsInfo = async () => {
    const userCreditsList = await fetchUserCreditsInfo();
    const arr = extendArray(userCreditsList, 5);
    setUserCreditsList(arr);
  };

  const getTotalPoints = async () => {
    const totalPoints = await fetchTotalPoints();
    setTotalPoints(totalPoints);
  };

  const getTotalNetworkEarnings = async () => {
    const totalNetworkEarnings = await fetchTotalNetworkEarnings();
    setTotalNetworkEarnings(totalNetworkEarnings);
  };

  const getNetworkEarnings = async () => {
    const networkEarningsList = await fetchNetworkEarnings();
    const networkEarnings = MONTH.map((item) => {
      const res = networkEarningsList.find(
        (earnItem) => earnItem.month == item.value,
      );
      return res?.earning || 0;
    });
    setNetworkEarnings(networkEarnings);
  };

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
      <div
        className={styles['point-slogan']}
        style={renderBackgroudImg(ripple)}
      >
        <h1>
          LAYER 2 FOR <br />
          DECENTRALIZED AI
        </h1>
        {renderUserCreditsInfo()}
      </div>
      <div
        className={styles['node-statistic']}
        style={renderBackgroudImg(wave_line)}
      >
        <div
          className={styles['statistic']}
          style={renderBackgroudImg(statistic_bg)}
        >
          <h1>{totalPoints ? numeral(totalPoints).format('0,0 +') : '~'}</h1>
          <p>Points</p>
        </div>
        <div className={styles['label']}>Total Points</div>
      </div>
      <div className={styles['total-network-earning']}>
        <div className={styles['header']}>
          <i></i>
          <div className={styles['info']}>
            <h1>TOTAL NETWORK EARNINGS</h1>
            <p>
              {totalNetworkEarnings
                ? numeral(totalNetworkEarnings).format('0,0.00')
                : '~'}
            </p>
          </div>
        </div>
        <div className={styles['chart-container']}>
          <Line data={networkEarnings} />
        </div>
      </div>
    </div>
  );
};

export default Point;
