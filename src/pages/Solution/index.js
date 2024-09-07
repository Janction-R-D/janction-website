import { history } from 'umi';
import * as Flow1 from './components/Flow1.json';
import styles from './index.less';
import {
  characteristic,
  computes,
  slogan,
  solutionSection,
  steps,
} from './data';

const Solution = (props) => {
  const learnMore = () => {
    history.push('/explore');
  };

  const toExplore = () => {
    history.push('/explore');
  };

  return (
    <div className={styles['solution-container']}>
      <section className={styles['slogan']}>
        <h1>{slogan.title}</h1>
        <h2>{slogan.subTitle}</h2>
        <p>{slogan.description}</p>
        <div className={styles['try-it']} onClick={toExplore}>
          <span>Try it</span>
          <i className="iconfont icon-lt-arrow"></i>
        </div>
      </section>
      <section className={styles['improve']}>
        <hgroup>
          <h1>{solutionSection.title}</h1>
          <p>{solutionSection.description}</p>
        </hgroup>
        <div className={styles['description']}>
          {solutionSection.list.map((item) => (
            <div className={styles['description-wrapper']} key={item.name}>
              <div className={styles['icon']}>
                <i className={item.icon} />
              </div>
              <div className={styles['info']}>
                <h2>{item.title}</h2>
                <p>{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
      <section className={styles['characteristic']}>
        {characteristic.map((item) => (
          <div
            className={styles['characteristic-wrapper']}
            style={{ flexDirection: item.direction }}
          >
            <div className={styles['icon']}>
              <img src={item.icon} alt="" />
            </div>
            <div className={styles['info']}>
              <h2>{item.title}</h2>
              <p>{item.description}</p>
              <span className={styles['learn-more']} onClick={learnMore}>
                Learn more
              </span>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
};

export default Solution;
