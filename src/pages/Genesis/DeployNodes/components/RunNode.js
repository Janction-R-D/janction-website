import { ANDROID_APK_PATH, COMMAND, DOCKER_PATH } from '@/constant';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { copy } from '@/utils/lang';
import styles from './index.less';
import { Button, Checkbox } from 'antd';
import RunNodeScript from './RunNodeScript';

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
          </section>
          <RunNodeScript isLinux />
        </>
      );
    }
    if (selectedValues?.system == 'macos') {
      return (
        <>
          <section className={styles['link']}>
            <h1>Prerequisites</h1>
            <h2>1. Install lima</h2>
            <div>
              <p className="ell">
                <span className="db">$ brew install lima</span>
                <span className="db">$ limactl start</span>
              </p>
              <a
                className="iconfont icon-copy"
                onClick={() => copy(`brew install lima;limactl start`)}
              ></a>
            </div>
            <h2>2. Replace shell with linux version</h2>
            <div>
              <p className="ell">
                <span className="db">$ lima sudo -i</span>
              </p>
              <a
                className="iconfont icon-copy"
                onClick={() => copy(`lima sudo -i`)}
              ></a>
            </div>
          </section>
          <RunNodeScript />
        </>
      );
    }
    if (selectedValues?.system == 'linux') {
      return (
        <>
          {/* <section className={styles['link']}>
            <h1 className="mb20">Prerequisites: Install docker</h1>
            <p>1. You can install docker by executing the following command</p>
            <div>
              <p className="ell">curl https://get.docker.com/ | sh</p>
              <a
                className="iconfont icon-copy"
                onClick={() => copy('curl https://get.docker.com/ | sh')}
              ></a>
            </div>
            <p>
              2. Once installed, confirm that the latest versions of both Docker
              and Docker Compose executables were installed.
            </p>
            <div>
              <p>
                <span className="db">$ docker --version</span>
                <span className="db">Docker version 26.1.2, build 211e74b</span>
              </p>
              <a
                className="iconfont icon-copy"
                onClick={() =>
                  copy(`$ docker --version
                  Docker version 26.1.2, build 211e74b`)
                }
              ></a>
            </div>
            <p>3. Make sure the Docker daemon is running.</p>
            <div>
              <p>sudo systemctl start docker</p>
              <a
                className="iconfont icon-copy"
                onClick={() => copy(`sudo systemctl start docker`)}
              ></a>
            </div>
            <p>
              4. Optional: If you want the Docker daemon to start when the
              system starts, use the following:
            </p>
            <div>
              <p>sudo systemctl enable docker</p>
              <a
                className="iconfont icon-copy"
                onClick={() => copy(`sudo systemctl enable docker`)}
              ></a>
            </div>
            <p>5. Add your user to the Docker group.</p>
            <div>
              <p>
                <span className="db">{`sudo usermod -a -G docker <username>`}</span>
              </p>
              <a
                className="iconfont icon-copy"
                onClick={() => copy(`sudo usermod -a -G docker <username>`)}
              ></a>
            </div>
          </section> */}
          <RunNodeScript isLinux />
        </>
      );
    }
    return (
      <>
        <section className={styles['link']}>
          <h1>Prerequisites</h1>
          <h2>1. Install WSL</h2>
          <div>
            <p className="ell">
              https://learn.microsoft.com/en-us/windows/wsl/install
            </p>
            <a
              href="https://learn.microsoft.com/en-us/windows/wsl/install"
              className="iconfont icon-link"
              target="_blank"
            ></a>
          </div>
          <h2>2. Replace shell with linux version</h2>
          <div>
            <p className="ell">$ wsl sudo -i</p>
            <a
              className="iconfont icon-copy"
              onClick={() => copy(`wsl sudo -i`)}
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
        <RunNodeScript />
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
          <div className={styles['run-node__box']}>
            <h1>
              {selectedValues?.system == 'android'
                ? 'Running on Android'
                : 'Run Node'}
            </h1>
          </div>
          <span className={styles['node-desc']}>
            You need to execute the following command
          </span>
        </hgroup>
        <div className={styles['content']}>{renderLinks()}</div>
      </section>
    </motion.div>
  );
};

export default RunNode;
