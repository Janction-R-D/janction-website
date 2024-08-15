import '@/assets/images/explore/statistic_bg.png';
import '@/assets/images/explore/slogan_bg.png';
import '@/assets/images/explore/user_get_points.png';
import BulletScreen from 'rc-bullets';
import { useEffect, useRef, useState } from 'react';
import useScale from '../../hooks/useScale';
import { fetchUserCreditsInfo } from '../../services/explore/point';
import styles from './main.less';
import Nodes from './Nodes';
import Points from './Points';

function extendArray(arr, len) {
  if (arr.length === 0 || arr.length >= len) return arr.slice(0, len);

  let result = arr.slice();
  while (result.length < len) {
    result.push(...arr.slice(0, len - result.length));
  }
  return result;
}

const nav = [
  { value: 'node', label: 'Node' },
  { value: 'points', label: 'Points' },
];

const Explore = (props) => {
  const [userCreditsList, setUserCreditsList] = useState();
  const [navActive, setNavActive] = useState('node');
  const [screen, setScreen] = useState(null);

  const timer = useRef();
  const scale = useScale();

  useEffect(() => {
    initBullet();
  }, []);

  useEffect(() => {
    getUserCreditsInfo();
  }, []);

  useEffect(() => {
    if (screen) {
      timer.current = setInterval(() => {
        screen.push(
          renderUserCreditsInfo({ userName: '0x56ab0649', creditsNum: 124 }),
        );
      }, 1000);
    } else if (timer) {
      clearTimer();
    }
    return clearTimer;
  }, [screen]);

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
    if (nav == 'node') {
      screen.hide();
    } else {
      screen.show();
    }
  };

  const getUserCreditsInfo = async () => {
    const userCreditsList = await fetchUserCreditsInfo();
    const arr = extendArray(userCreditsList, 5);
    console.log('『arr』', arr);
    setUserCreditsList(arr);
  };

  const renderUserCreditsInfo = (item) => {
    return (
      <div className={styles['user-credits-info']}>
        <i></i>
        <span>{`${item.userName} Get `}</span>
        <span className={styles['points']}>{`${item.creditsNum} Points`}</span>
      </div>
    );
  };

  return (
    <div className={styles['explore-container']}>
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
          <input type="radio" key={item.value} name="nav" id={item.value} />
        ))}
        <nav>
          <ul>
            {nav.map((item) => (
              <li
                key={item.value}
                className={navActive == item.value && styles['active']}
                onClick={() => onNavChange(item.value)}
              >
                <label for={item.value}>{item.label}</label>
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
