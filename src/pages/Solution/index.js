import { history } from 'umi';
import styles from './index.less';
import { characteristic, slogan, solutionSection } from './data';

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
          {solutionSection.list.map((item, index) => (
            <div className={styles['description-wrapper']} key={index}>
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
        {characteristic.map((item, index) => (
          <div key={index} className={styles['characteristic-wrapper']}>
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
