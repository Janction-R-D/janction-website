import styles from './index.less';
import { history } from 'umi';

const Products = (props) => {
  return (
    <div className={styles['product-container']}>
      <div
        className={`animate__animated animate__zoomIn df fd_c jc_c ${styles['slogan']}`}
      >
        <h1 data-text="THE JANCTION FOR ALL AI SERVICE">
          THE JANCTION FOR ALL AI SERVICE
        </h1>
        <div
          className={`animate__animated animate__fadeInUp ${styles['learn-more']}`}
        >
          <button
            onClick={() => {
              history.push('/getStarted');
            }}
          >
            Learn More About Janction
          </button>
        </div>
      </div>
      <div className={styles['architecture']}>
        <h1>Architecture</h1>
        <div className={styles['info']}>
          <img
            src={require('@/assets/images/product/architecture.png')}
            alt=""
          />
        </div>
      </div>
      <div className={styles['apps']}>
        <h1>Apps</h1>
        <div className={styles['list']}>
          <div>
            <img src={require('@/assets/images/product/nexus.png')} />
            <p>Janction Nexus</p>
            <button
              onClick={() => {
                history.push('/explore/nodes');
              }}
            >
              <span>Exploer</span>
              <i></i>
            </button>
          </div>
          <div>
            <img src={require('@/assets/images/product/eq_cabinet.png')} />
            <p>Janction Genesis</p>
            <button
              onClick={() => {
                window.open('/genesis');
              }}
            >
              <span>Join Network</span>
              <i></i>
            </button>
          </div>
          <div>
            <img src={require('@/assets/images/product/chip.png')} />
            <p>Janction Pulse</p>
            <button>
              <span>Let's Compute</span>
              <i></i>
            </button>
          </div>
        </div>
      </div>
      <div className={styles['introduce']}>
        <h1>Introduce</h1>
        <div className={styles['list']}>
          <div className={styles['item']}>
            <div className={styles['content']}>
              <section>
                <h2>Janction Nexus</h2>
                <p>
                  This app provides comprehensive insights into the overall data
                  of all GPU providers and consumers within the Junction
                  network, offering detailed analytics and statistics.
                </p>
              </section>
              <div className={styles['banner']}>
                <img src={require('@/assets/images/product/nexus_long.png')} />
              </div>
            </div>
            <img
              src={require('@/assets/images/product/faq.png')}
              alt="faq"
              loading="lazy"
              width="88"
              className={styles['faq']}
            />
          </div>
          <div className={`${styles['item']} ${styles['item-reverse']}`}>
            <img
              src={require('@/assets/images/product/faq.png')}
              alt="fag"
              loading="lazy"
              width="88"
            />
            <div className={styles['content']}>
              <section>
                <h2>Janction Genesis</h2>
                <p>
                  This app enables users to offer their GPU resources to the
                  network and earn rewards for their contributions.
                </p>
              </section>
              <div className={styles['banner']}>
                <img
                  src={require('@/assets/images/product/eq_cabinet_long.png')}
                />
              </div>
            </div>
          </div>
          <div className={styles['item']}>
            <div className={styles['content']}>
              <section>
                <h2>Janction Pulse</h2>
                <p>
                  This app allows users to access and utilize GPU resources from
                  the network for their computational needs, with costs based on
                  usage.
                </p>
              </section>
              <div className={styles['banner']}>
                <img src={require('@/assets/images/product/chip_long.png')} />
              </div>
            </div>
            <img
              src={require('@/assets/images/product/faq.png')}
              alt="fag"
              loading="lazy"
              width="88"
              className={styles['faq']}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
