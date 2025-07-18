import { ANDROID_APK_PATH, COMMAND, DOCKER_PATH } from '@/constant';
import { useEffect, useState } from 'react';
import { copy } from '@/utils/lang';
import styles from './index.less';
import { Typography } from 'antd';
import RunNodeScript from './RunNodeScript';
const { Text } = Typography;
const RunNode = (props) => {
  const { selectedValues, nodesData, getNodes, loading, isWin } = props;

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
          <RunNodeScript
            nodesData={nodesData}
            getNodes={getNodes}
            loading={loading}
            isWin={false}
          />
        </>
      );
    }
    if (selectedValues?.system == 'linux') {
      return (
        <RunNodeScript
          isLinux
          nodesData={nodesData}
          getNodes={getNodes}
          loading={loading}
          isWin={false}
        />
      );
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
              href="https://learn.microsoft.com/en-us/windows/wsl/install"
              target="_blank"
            >
              <i className="iconfont icon-link" />
            </a>
          </Text>

          <p style={{ marginTop: '16px' }}>
            If you prefer not to follow the Microsoft WSL guide, you can follow
            our step-by-step instructions below:
          </p>

          <h3>Check if WSL is installed</h3>
          <Text className={styles['token_id']}>
            <p className="ell">$ wsl -l -v</p>
            <a
              className={styles['icon-blue']}
              onClick={() => copy('wsl -l -v')}
            >
              <i className="iconfont icon-copy" />
            </a>
          </Text>
          <p>This command checks whether WSL is available on your system.</p>

          <h3>Install Ubuntu</h3>
          <Text className={styles['token_id']}>
            <p className="ell">
              $ wsl --install --distribution Ubuntu --web-download
            </p>
            <a
              className={styles['icon-blue']}
              onClick={() =>
                copy('wsl --install --distribution Ubuntu --web-download')
              }
            >
              <i className="iconfont icon-copy" />
            </a>
          </Text>
          <p>After installation, verify with:</p>
          <Text className={styles['token_id']}>
            <p className="ell">$ wsl -l -v</p>
            <a
              className={styles['icon-blue']}
              onClick={() => copy('wsl -l -v')}
            >
              <i className="iconfont icon-copy" />
            </a>
          </Text>

          <h3>Start Ubuntu and set root password</h3>
          <Text className={styles['token_id']}>
            <p className="ell">$ wsl -d Ubuntu</p>
            <a
              className={styles['icon-blue']}
              onClick={() => copy('wsl -d Ubuntu')}
            >
              <i className="iconfont icon-copy" />
            </a>
          </Text>
          <p>This will launch Ubuntu and prompt you to set a root password.</p>
        </section>

        <RunNodeScript
          nodesData={nodesData}
          getNodes={getNodes}
          loading={loading}
          isWin={isWin}
        />
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
