import styles from './index.less';
import { motion } from 'framer-motion';

const RunNode = (props) => {
  return (
    <motion.div
      initial={{ x: '-100%' }}
      animate={{ x: 0 }}
      transition={{ duration: 0.8 }}
    >
      <section className={styles['run-node']}>
        <hgroup>
          <h1>Run Node</h1>
          <span>You need to execute the following command</span>
        </hgroup>
        <div className={styles['content']}>
          <section className={styles['step']}>
            <h2>Install Docker</h2>
            <div>
              <p>https://www.docker.com/products/docker-desktop/</p>
              <i></i>
            </div>
          </section>
          <section className={styles['step']}>
            <h2>Download Binaray</h2>
            <div>
              <p>https://www.docker.com/products/docker-desktop/</p>
              <i></i>
            </div>
          </section>
          <section className={styles['run-command']}>
            <h2>Run Command</h2>
            <div>
              <h3>Script</h3>
              <div className={styles['code-area']}>
                <span>(code area)</span>
              </div>
            </div>
          </section>
        </div>
      </section>
    </motion.div>
  );
};

export default RunNode;
