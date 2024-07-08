import {
  motion,
  useScroll,
  useSpring,
  useMotionValueEvent,
  useInView,
} from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import Lottie from 'react-lottie';
import { history } from 'umi';
import * as Flow1 from './components/Flow1.json';
import styles from './index.less';

const GetStarted = (props) => {
  const scrollRef = useRef();
  const [h, setH] = useState(0);

  const getPercent = (value) => {
    if (value < 50) {
      return '17.33%';
    }
    if (value >= 50 && value < 82) {
      return '50%';
    }
    return '82%';
  };

  useEffect(() => {
    const domA = scrollRef.current;
    let variable = 0;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const rect = entry.boundingClientRect;
          const viewportHeight = window.innerHeight;
          const elementHeight = rect.height;
          const elementTop = rect.top;
          const halfViewportHeight = viewportHeight / 2;
          if (elementTop >= halfViewportHeight) {
            variable = 0;
          } else if (elementTop + elementHeight <= halfViewportHeight) {
            variable = 100;
          } else {
            const distance = halfViewportHeight - elementTop;
            variable = (distance / elementHeight) * 100;
          }
          setH(getPercent(variable.toFixed(2)));
        });
      },
      {
        threshold: new Array(101).fill(0).map((_, i) => i / 100),
      },
    );

    observer.observe(domA);
  }, []);

  const toPersonal = () => {
    window.open('/genesis');
  };

  const toExplore = () => {
    history.push('/explore/overview');
  };

  return (
    <div className={styles['get-started-container']}>
      <div className={styles['lottie-animation']}>
        <Lottie
          options={{
            loop: true,
            autoplay: true,
            animationData: Flow1,
          }}
          height={322}
          width={518}
        />
      </div>
      <section className={styles['vision']}>
        <hgroup>
          <h1>VISION</h1>
          <p>
            Janction GPU Marketplace aims to provide unlimited GPU capacity to
            users at lower costs by aggregating GPUs from multiple sources.
          </p>
          <button className="hvr-pulse-shrink" onClick={toExplore}>
            EXPLORE
          </button>
          <img src={require('@/assets/images/get-started/next.png')} alt="" />
        </hgroup>
        <div className={styles['lottie-animation']}>
          <Lottie
            options={{
              loop: true,
              autoplay: true,
              animationData: Flow1,
            }}
            height={322}
            width={518}
          />
        </div>
      </section>
      <section className={styles['join']}>
        <hgroup>
          <h1>JOIN NETWORK</h1>
        </hgroup>
        <div className={styles['steps']} ref={scrollRef}>
          <section
            className={['hvr-grow', styles['step1']].join(' ')}
            onClick={toPersonal}
          >
            <img
              src={require('@/assets/images/get-started/step1_icon.png')}
              alt=""
            />
            <div className={styles['text-info']}>
              <h1>Step 1</h1>
              <h2>Environmental preparation</h2>
              <p>
                Choose Your Operating System, Install Softwares Such As Docker
              </p>
            </div>
          </section>
          <section
            className={['hvr-grow', styles['step2']].join(' ')}
            onClick={toPersonal}
          >
            <img
              src={require('@/assets/images/get-started/step2_icon.png')}
              alt=""
            />
            <div className={styles['text-info']}>
              <h1>Step 2</h1>
              <h2>Initialize</h2>
              <p>Download Janction Binary Setup And Initalize Dataset</p>
            </div>
          </section>
          <section
            className={['hvr-grow', styles['step3']].join(' ')}
            onClick={toPersonal}
          >
            <img
              src={require('@/assets/images/get-started/step3_icon.png')}
              alt=""
            />
            <div className={styles['text-info']}>
              <h1>Step 3</h1>
              <h2>Run Node</h2>
              <p>Join Network, Loading Jobs And Computing</p>
            </div>
          </section>
          <div className={styles['progress-bar']}>
            <div className={styles['bar']}>
              <motion.div
                className={styles['active-bar']}
                style={{ height: h }}
              >
                <div className={styles['point']}></div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
      <section className={styles['compute']}>
        <hgroup>
          <h1>Let’s Compute</h1>
        </hgroup>
        <div className={styles['compute-info']}>
          <section className={styles['ai']}>
            <div className={[styles['info']].join(' ')}>
              <div className={styles['img-box']}>
                <img
                  src={require('@/assets/images/get-started/AI.png')}
                  alt=""
                />
              </div>
              <div>
                <h1>View Your AI Jobs</h1>
                <p>Check your Job status and running status</p>
              </div>
            </div>
            <div className={styles['shadow']}></div>
          </section>
          <section className={styles['ai-job']} onClick={toPersonal}>
            <div className={[styles['info']].join(' ')}>
              <div className={styles['img-box']}>
                <img
                  src={require('@/assets/images/get-started/AI_job.png')}
                  width={97}
                  alt=""
                />
              </div>
              <div>
                <h1>Submit Your AI Job</h1>
                <p>Coming Soon</p>
              </div>
            </div>
          </section>
          <section className={styles['point']} onClick={toPersonal}>
            <div className={[styles['info']].join(' ')}>
              <div className={styles['img-box']}>
                <img
                  src={require('@/assets/images/get-started/point.png')}
                  width={213}
                  alt=""
                />
              </div>
              <div>
                <h1>Check Your Points</h1>
                <p>Coming Soon</p>
              </div>
            </div>
          </section>
        </div>
      </section>
    </div>
  );
};

export default GetStarted;
