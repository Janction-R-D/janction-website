import styles from './index.less';
import { useEffect, useState } from 'react';
import Line from './components/Line';

const Point = (props) => {
  const [userCreditsList, setUserCreditsList] = useState([
    {
      userId: '1',
      userName: '用户0x56ab0649',
      creditsNum: 124,
    },
    {
      userId: '2',
      userName: '用户06ab0649',
      creditsNum: 31,
    },
    {
      userId: '3',
      userName: '用户0x56ab06491212',
      creditsNum: 43,
    },
    {
      userId: '4',
      userName: '用户0x56ab49',
      creditsNum: 78,
    },
  ]);

  useEffect(() => {
    setInterval(() => {
      const show = document.querySelector('li[data-show]');
      const ready =
        show.nextElementSibling ||
        document.querySelector('li[data-carousel]:first-child');
      const next =
        ready.nextElementSibling ||
        document.querySelector('li[data-carousel]:first-child');
      const up = document.querySelector('li[data-up]');
      if (up) {
        up.removeAttribute('data-up');
      }
      show.removeAttribute('data-show');
      show.setAttribute('data-up', '');
      ready.removeAttribute('data-ready', '');
      ready.setAttribute('data-show', '');
      next.setAttribute('data-ready', '');
    }, [5000]);
  }, []);

  const renderUserCreditsInfo = () => {
    let item = {
      userId: '4',
      userName: '用户0x56ab0649',
      creditsNum: 124,
    };
    return (
      <ul className={styles['user-credits-info']}>
        {userCreditsList.map((item, index) => (
          <li
            key={item.userId}
            data-carousel
            {...(index == 0
              ? { 'data-show': '' }
              : index == 1
              ? { 'data-ready': '' }
              : {})}
          >
            <i></i>
            <span>{`${item.userName}获得${item.creditsNum}积分`}</span>
          </li>
        ))}
        {/* <li
            key={item.userId}
            data-carousel
            data-up
          >
            <i></i>
            <span>{`${item.userName}获得${item.creditsNum}积分`}</span>
          </li>
          <li
            key={item.userId}
            data-carousel
            data-show
          >
            <i></i>
            <span>{`${item.userName}获得${item.creditsNum}积分`}</span>
          </li>
          <li
            key={item.userId}
            data-carousel
            data-ready
          >
            <i></i>
            <span>{`${item.userName}获得${item.creditsNum}积分`}</span>
          </li>
          <li
            key={item.userId}
            data-carousel
            data-up
          >
            <i></i>
            <span>{`${item.userName}获得${item.creditsNum}积分`}</span>
          </li> */}
      </ul>
    );
  };

  return (
    <div className={styles['explore-point-container']}>
      <div className={styles['point-slogan']}>
        <h1>
          AYER 2 FOR <br />
          DECENTRALIZED AI
        </h1>
        {renderUserCreditsInfo()}
      </div>
      {renderUserCreditsInfo()}
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
