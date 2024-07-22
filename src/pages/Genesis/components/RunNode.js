import { useEffect, useState } from 'react';
import styles from './index.less';
import { motion } from 'framer-motion';
import { message } from 'antd';
import { COMMAND, DOCKER_PATH, ANDROID_APK_PATH } from '@/constant';

const RunNode = (props) => {
  const { selectedValues } = props;
  const [nodeData, setNodaData] = useState();

  useEffect(() => {
    let nodeData = {
      docker: DOCKER_PATH,
      script:
        COMMAND[selectedValues?.system]?.[selectedValues?.architecture] ||
        '(code area)',
    };
    if (selectedValues?.system == 'android') {
      nodeData.apk = ANDROID_APK_PATH;
    }
    setNodaData(nodeData);
  }, [selectedValues]);

  const onCopy = () => {
    navigator.clipboard
      .writeText(nodeData?.script)
      .then(() => {
        message.success('Copied!');
      })
      .catch((err) => {
        console.error('Copied failed', err);
      });
  };

  const renderLinks = () => {
    if (selectedValues?.system == 'android') {
      return (
        <section className={styles['link']}>
          <h2>Download APK</h2>
          <div>
            <p className="ell" title={nodeData?.apk}>
              {nodeData?.apk}
            </p>
            <a
              href={nodeData?.apk}
              className="iconfont icon-link"
              target="_blank"
            ></a>
          </div>
          <ul>
            <li>
              You can get our apk installation package through the following
              link (Tip: remove the .1 suffix).
            </li>
            <li>Install the app.</li>
            <li>Enter the Janction app and click wallet connect.</li>
            <li>
              Then click the login button, which will redirect you to the wallet
              app of your choice, then approve and sign in.
            </li>
          </ul>
        </section>
      );
    }
    return (
      <>
        <section className={styles['link']}>
          <h2>Install Docker</h2>
          <div>
            <p className="ell">{nodeData?.docker}</p>
            <a
              href={nodeData?.docker}
              className="iconfont icon-link"
              target="_blank"
            ></a>
          </div>
        </section>
        {/* <section className={styles['link']}>
          <h2>Download Binaray</h2>
          <div>
            <p className="ell">{nodeData?.binaray}</p>
            <a
              href={nodeData?.binaray}
              className="iconfont icon-link"
              target="_blank"
            ></a>
          </div>
        </section> */}
        <section className={styles['run-command']}>
          <h2>Run Command</h2>
          <div>
            <h3>
              <span>Script</span>
              <i className="iconfont icon-copy" onClick={onCopy}></i>
            </h3>
            <div className={styles['code-area']}>
              {nodeData?.script}
              <i className="iconfont icon-copy" onClick={onCopy}></i>
            </div>
          </div>
          <ul>
            <li>
              You can set your account private key by "-e PRIVATE_KEY=0xab..."
            </li>
            <li>
              You can change the container name by "--name your-node-name"
            </li>
          </ul>
        </section>
      </>
    );
  };

  return (
    <motion.div
      initial={{ x: '-100%' }}
      animate={{ x: 0 }}
      transition={{ duration: 0.8 }}
    >
      <section className={styles['run-node']}>
        <hgroup>
          <h1>
            {selectedValues?.system == 'android'
              ? 'Running on Android'
              : 'Run Node'}
          </h1>
          <span>You need to execute the following command</span>
        </hgroup>
        <div className={styles['content']}>{renderLinks()}</div>
      </section>
    </motion.div>
  );
};

export default RunNode;
