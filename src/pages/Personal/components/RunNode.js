import { useState } from 'react';
import styles from './index.less';
import { motion } from 'framer-motion';
import { message } from 'antd';

const RunNode = (props) => {
  const [nodeData, setNodaData] = useState({
    docker: 'https://www.docker.com/products/docker-desktop/',
    binaray: 'https://www.docker.com/products/docker-desktop/',
    code: '(code area)',
  });

  const onCopy = () => {
    navigator.clipboard
      .writeText(nodeData?.code)
      .then(() => {
        message.success('Copied!');
      })
      .catch((err) => {
        console.error('Copied failed', err);
      });
  };

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
          <section className={styles['link']}>
            <h2>Install Docker</h2>
            <div>
              <p>{nodeData?.docker}</p>
              <a
                href={nodeData?.docker}
                className="iconfont icon-link"
                target="_blank"
              ></a>
            </div>
          </section>
          <section className={styles['link']}>
            <h2>Download Binaray</h2>
            <div>
              <p>{nodeData?.binaray}</p>
              <a
                href={nodeData?.binaray}
                className="iconfont icon-link"
                target="_blank"
              ></a>
            </div>
          </section>
          <section className={styles['run-command']}>
            <h2>Run Command</h2>
            <div>
              <h3>Script</h3>
              <div className={styles['code-area']}>
                <span>(code area)</span>
                <i className="iconfont icon-copy" onClick={onCopy}></i>
              </div>
            </div>
          </section>
        </div>
      </section>
    </motion.div>
  );
};

export default RunNode;
