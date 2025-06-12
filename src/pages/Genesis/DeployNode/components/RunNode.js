import { ANDROID_APK_PATH, COMMAND, DOCKER_PATH } from '@/constant';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { copy } from '@/utils/lang';
import styles from './index.less';
import { Typography } from 'antd';
import RunNodeScript from './RunNodeScript';
const { Text } = Typography;
const RunNode = (props) => {
  const { selectedValues } = props;
  const [nodeData, setNodaData] = useState();
  useEffect(() => {
    let nodeData = {
      docker: DOCKER_PATH[selectedValues?.system],
      script:
        COMMAND[selectedValues?.system]?.[selectedValues?.architecture] ||
        '(code area)',
    };
    if (selectedValues?.system == 'android') {
      nodeData.apk = ANDROID_APK_PATH;
    }
    setNodaData(nodeData);
  }, [selectedValues]);

  const renderLinks = () => {
    if (selectedValues?.system == 'android') {
      return (
        <>
          <section className={styles['link']}>
            <h1>Prerequisites: Install termux-app</h1>
            <Text className={styles['token_id']}>
              {nodeData?.apk}
              <a
                className={styles['icon-orange']}
                href={nodeData?.apk}
                target="_blank"
              >
                <i className="iconfont icon-link" />
              </a>
            </Text>
          </section>
        </>
      );
    }
    if (selectedValues?.system == 'macos') {
      return (
        <>
          <section className={styles['link']}>
            <h1>Prerequisites</h1>
            <h2>1. Install lima</h2>
            <Text className={styles['token_id']}>
              <p className="ell">
                <span className="db">$ brew install lima</span>
              </p>
              <a
                className={styles['icon-orange']}
                onClick={() => copy(`brew install lima`)}
              >
                <i className="iconfont icon-copy" />
              </a>
            </Text>
            <Text className={styles['token_id']}>
              <p className="ell">
                <span className="db">$ limactl start</span>
              </p>
              <a
                className={styles['icon-orange']}
                onClick={() => copy(`limactl start`)}
              >
                <i className="iconfont icon-copy" />
              </a>
            </Text>
            <h2>2. Replace shell with linux version</h2>
            <Text className={styles['token_id']}>
              <p className="ell">
                <span className="db">$ lima sudo -i</span>
              </p>
              <a
                className={styles['icon-orange']}
                onClick={() => copy(`lima sudo -i`)}
              >
                <i className="iconfont icon-copy" />
              </a>
            </Text>
          </section>
          <RunNodeScript />
        </>
      );
    }
    if (selectedValues?.system == 'linux') {
      return <RunNodeScript isLinux />;
    }
    return (
      <>
        <section className={styles['link']}>
          <h1>Prerequisites</h1>
          <h2>1. Install WSL</h2>
          <Text className={styles['token_id']}>
            <p className="ell">
              https://learn.microsoft.com/en-us/windows/wsl/install
            </p>
            <a
              // className={styles['icon-blue']}
              href="https://learn.microsoft.com/en-us/windows/wsl/install"
              target="_blank"
            >
              <i className="iconfont icon-link" />
            </a>
          </Text>
          <h2>2. Replace shell with linux version</h2>
          <Text className={styles['token_id']}>
            <p className="ell">$ wsl sudo -i</p>
            <a
              className={styles['icon-blue']}
              onClick={() => copy(`wsl sudo -i`)}
            >
              <i className="iconfont icon-copy" />
            </a>
          </Text>
        </section>
        <RunNodeScript />
      </>
    );
  };

  return (
    <section className={styles['run-node']}>
      <hgroup>
        <div className={styles['run-node__box']}></div>
        <span className={styles['node-desc']}>
          You need to execute the following command
        </span>
      </hgroup>
      <div className={styles['content']}>{renderLinks()}</div>
    </section>
  );
};

export default RunNode;
