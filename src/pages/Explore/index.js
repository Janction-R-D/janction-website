import '@/assets/images/explore/statistic_bg.png';
import '@/assets/images/explore/slogan_bg.webp';
import '@/assets/images/explore/device_item_active_bg.png';
import '@/assets/images/home/shadow_left.webp';
import '@/assets/images/home/shadow_right.webp';
import BulletScreen from 'rc-bullets';
import { useEffect, useRef, useState } from 'react';
import { fetchUserCreditsInfo } from '../../services/explore/point';
import styles from './index.less';
import Nodes from './Nodes';
import Points from './Points';
import { history } from 'umi';

const nav = [
  { value: 'node', label: 'Node' },
  { value: 'points', label: 'Points' },
];

const time = 3000;

const Explore = (props) => {
  const [userCreditsList, setUserCreditsList] = useState();
  const [navActive, setNavActive] = useState('node');
  const [screen, setScreen] = useState(null);

  const timer = useRef();

  useEffect(() => {
    const _nav = history.location.query?.nav;
    if (_nav) {
      setNavActive(_nav);
    }
    initBullet();
    getUserCreditsInfo();
    return () => {
      setScreen(null);
      clearTimer(timer.current);
    };
  }, []);

  useEffect(() => {
    if (screen && userCreditsList?.length > 0) {
      createBullet();
      timer.current = setInterval(() => {
        createBullet();
      }, time * (userCreditsList?.length + 1));
    }
  }, [screen, userCreditsList]);

  useEffect(() => {
    if (!screen) return;
    if (navActive == 'node') {
      screen.hide();
    } else {
      screen.show();
    }
  }, [navActive, screen]);

  const initBullet = () => {
    let s = new BulletScreen('.bullet', { duration: 20 });
    s.hide();
    setScreen(s);
  };

  const clearTimer = () => {
    clearInterval(timer.current);
    timer.current = null;
  };

  const onNavChange = (nav) => {
    setNavActive(nav);
  };

  const getUserCreditsInfo = async () => {
    try {
      const userCreditsList = await fetchUserCreditsInfo();
      setUserCreditsList(userCreditsList);
    } catch (err) {
      console.log('『err』', err);
    }
  };

  const createBullet = () => {
    if (screen) {
      userCreditsList.map((item, index) => {
        setTimeout(() => {
          screen.push(renderUserCreditsInfo(item));
        }, index * time);
      });
    }
  };

  const renderUserCreditsInfo = (item) => {
    return (
      <div className={styles['user-credits-info']}>
        <i></i>
        <span>{`${item.wallet_address} Get `}</span>
        <span className={styles['points']}>{`${item.point} Points`}</span>
      </div>
    );
  };

  return (
    <div className={styles['explore-container']}>
      <div className={styles['shadow']}></div>
      <div className={[styles['slogan'], styles[navActive]].join(' ')}>
        <div className={styles['left']}>
          <h1>
            LAYER 2 FOR
            <br />
            DECENTRALIZED AI
          </h1>
        </div>
        <div className={['bullet', styles['right']].join(' ')}>
          <div className={styles['shadow']}></div>
        </div>
      </div>
      <div className={styles['nav-wrapper']}>
        {nav.map((item) => (
          <input
            type="radio"
            key={item.value}
            name="nav"
            id={item.value}
            checked={item.value == navActive}
          />
        ))}
        <nav>
          <div className={styles['shadow-left']}></div>
          <div className={styles['shadow-right']}></div>
          <ul>
            {nav.map((item) => (
              <li
                key={item.value}
                className={`${
                  navActive === item.value ? styles['active'] : ''
                }`}
                onClick={() => onNavChange(item.value)}
              >
                <label htmlFor={item.value}>{item.label}</label>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      {navActive == 'node' ? <Nodes /> : <Points />}
    </div>
  );
};

export default Explore;
