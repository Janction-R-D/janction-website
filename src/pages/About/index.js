import Lottie from 'react-lottie';
import * as Flow1 from './components/Flow1.json';
import styles from './index.less';

const About = (props) => {
  return (
    <div className={styles['about-container']}>
      <section className={styles['vision']}>
        <div className={styles['faq']}>
          <img
            src={require('@/assets/images/icons/terminal_icon.png')}
            alt=""
            width={32}
          />
          <div className={styles['vertical-line']}>
            <img
              src={require('@/assets/images/icons/flow_line.png')}
              width={20}
            />
          </div>
        </div>
        <hgroup>
          <h1>VISION</h1>
          <p>
            Janction GPU Marketplace aims to provide unlimited GPU capacity to
            users at lower costs by aggregating GPUs from multiple sources.
          </p>
          <button>EXPLOER</button>
        </hgroup>
        <Lottie
          options={{
            loop: true,
            autoplay: true,
            animationData: Flow1,
          }}
          height={322}
          width={518}
        />
        <div className={styles['shadow-box-1']}></div>
        <div className={styles['shadow-box-2']}></div>
      </section>
      <section className={styles['join']}>
        <hgroup>
          <h1>JOIN NETWORK</h1>
        </hgroup>
        <div className={styles['steps']}>
          <section className={styles['step1']}>
            <img src={require('@/assets/images/about/step1_icon.png')} alt="" />
            <div>
              <h1>Step 1</h1>
              <h2>Environmental preparation</h2>
              <p>
                Choose Your Operating System, Install Softwares Such As Docker
              </p>
            </div>
          </section>
          <section className={styles['step2']}>
            <img src={require('@/assets/images/about/step2_icon.png')} alt="" />
            <div>
              <h1>Step 2</h1>
              <h2>Initialize</h2>
              <p>Download Janction Binary Setup And Initalize Dataset</p>
            </div>
          </section>
          <section className={styles['step3']}>
            <img src={require('@/assets/images/about/step3_icon.png')} alt="" />
            <div>
              <h1>Step 3</h1>
              <h2>Run Node</h2>
              <p>Join Network, Loading Jobs And Computing</p>
            </div>
          </section>
          <section className={styles['step4']}>
            <img src={require('@/assets/images/about/step4_icon.png')} alt="" />
            <div>
              <h1>Step 4</h1>
              <h2>Manage Your Nodes</h2>
              <p>Manage nodes and view points</p>
            </div>
          </section>
        </div>
      </section>
      <section className={styles['compute']}>
        <hgroup>
          <h1>Let’s Compute</h1>
        </hgroup>
        <div className={styles['compute-info']}>
          <section>
            <div className={styles['info']}>
              <img
                src={require('@/assets/images/about/AI.png')}
                width={144}
                alt=""
              />
              <h1>View Your AI Jobs</h1>
              <p>Check your Job status and running status</p>
            </div>
            <div className={styles['border-box']}></div>
          </section>
          <section className={styles['ai_job']}>
            <div className={styles['info']}>
              <img
                src={require('@/assets/images/about/AI_job.png')}
                width={97}
                alt=""
              />
              <h1>Submit Your AI Job</h1>
              <p>Coming Soon</p>
            </div>
            <div className={styles['border-box']}></div>
          </section>
          <section className={styles['point']}>
            <div className={styles['info']}>
              <img
                src={require('@/assets/images/about/point.png')}
                width={213}
                alt=""
              />
              <h1>Check Your Points</h1>
              <p>Coming Soon</p>
            </div>

            <div className={styles['border-box']}></div>
          </section>
        </div>
      </section>
    </div>
  );
};

export default About;
