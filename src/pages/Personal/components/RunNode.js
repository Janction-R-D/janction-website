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
          <span>This is the prompt text</span>
        </hgroup>
        <div className={styles['content']}>
          <section>
            <hgroup>
              <h2>Install Docker</h2>
            </hgroup>
            <p className="mt20">
              https://www.docker.com/products/docker-desktop/
            </p>
          </section>
          <section>
            <hgroup>
              <h2>Download Binaray</h2>
            </hgroup>
            <p className="mt20">https://www</p>
          </section>
          <section className={styles['run-command']}>
            <hgroup>
              <h2>Run Command</h2>
            </hgroup>
            <p className="mt20">Script</p>
            <div className={styles['code-area']}>(code area)</div>
          </section>
        </div>
      </section>
    </motion.div>
  );
};

export default RunNode;
