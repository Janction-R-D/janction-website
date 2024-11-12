import Lottie from 'react-lottie';
import { history } from 'umi';
import * as Flow1 from './components/Flow2.json';
import styles from './index.less';
import { computes, steps } from './data';

const GetStarted = (props) => {
  const toPersonal = () => {
    window.open('/genesis');
  };

  const toExplore = () => {
    history.push('/explore');
  };

  return (
    <div className={styles['get-started-container']}>
      <section className={styles['vision']}>
        <hgroup>
          <h1>
            Join & share
            <br />
            your processor resources
          </h1>
          <p>
            Janction GPU Marketplace aims to provide unlimited GPU capacity to
            users at lower costs by aggregating GPUs from multiple sources.
          </p>
          <div className={styles['get-started']} onClick={toPersonal}>
            <span>Get Started</span>
            <i className="iconfont icon-lt-arrow"></i>
          </div>
          <img src={require('@/assets/images/get-started/next.png')} alt="" />
        </hgroup>
        <div className={styles['lottie-animation']}>
          <Lottie
            options={{
              loop: true,
              autoplay: true,
              animationData: Flow1,
            }}
          />
        </div>
      </section>
      <section className={styles['join']}>
        <hgroup>
          <h1>JOIN NETWORK</h1>
        </hgroup>
        <div className={styles['steps']}>
          {steps.map((item) => (
            <div className={styles['step']} key={item.name}>
              <div className={styles['banner']}>
                <img src={item.banner} />
              </div>
              <div className={styles['info']}>
                <h2>{item.name}</h2>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
      <section className={styles['compute']}>
        <hgroup>
          <h1>Let’s Compute</h1>
        </hgroup>
        <div className={styles['compute-wrapper']}>
          {computes.map((item, index) => (
            <section key={index}>
              <div className={styles['icon']}>
                <img src={item.icon} alt="" />
              </div>
              <h2>{item.title}</h2>
              <p>{item.description}</p>
              <div
                className={styles['get-started']}
                onClick={() => {
                  history.push(item.path);
                }}
              >
                <span>{item.buttonText}</span>
                <i className="iconfont icon-lt-arrow"></i>
              </div>
            </section>
          ))}
        </div>
      </section>
    </div>
  );
};

export default GetStarted;
