import { ANDROID_APK_PATH, COMMAND, DOCKER_PATH } from '@/constant';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { copy } from '../../../../utils/lang';
import styles from './index.less';

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
    if (selectedValues?.system == 'macos') {
      return (
        <>
          <section className={styles['link']}>
            <h1>Prerequisites: Install Docker</h1>
            <p>
              Install the latest version of{' '}
              <a
                className="cm"
                href="https://docs.docker.com/desktop/install/mac-install/"
                target="_blank"
              >
                Docker Desktop
              </a>{' '}
              if it is not already installed.
            </p>
            <ul>
              <li>
                For Apple M series (e.g. M1/M2/M3), please click the “Docker
                Desktop for Mac with Apple silicon” button to download and
                install.
              </li>
              <li>
                For Intel chips (e.g. i7/i5/i3), please click the “Docker
                Desktop for Mac with Intel chip” button to download and install.
              </li>
            </ul>
            <p>
              Once installed, you can check the version of docker on the command
              line.
            </p>
            <div>
              <p>
                <span className="db">$ docker --version</span>
                <span className="db">Docker version 24.0.7, build afdd53b</span>
              </p>
              <a
                className="iconfont icon-copy"
                onClick={() =>
                  copy(`$ docker --version
                  Docker version 24.0.7, build afdd53b`)
                }
              ></a>
            </div>
          </section>
          <section className={styles['run-command']}>
            <h2>Start the node</h2>
            <div>
              <h3>
                <span>Script</span>
                <i
                  className="iconfont icon-copy"
                  onClick={() => copy(nodeData?.script)}
                ></i>
              </h3>
              <div className={styles['code-area']}>
                {nodeData?.script}
                <i
                  className="iconfont icon-copy"
                  onClick={() => copy(nodeData?.script)}
                ></i>
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
    }
    if (selectedValues?.system == 'linux') {
      return (
        <>
          <section className={styles['link']}>
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
          </section>
          <section className={styles['run-command']}>
            <h1 className="mb20">Start the node</h1>
            <div>
              <h3>
                <span>Script</span>
                <i
                  className="iconfont icon-copy"
                  onClick={() => copy(nodeData?.script)}
                ></i>
              </h3>
              <div className={styles['code-area']}>
                {nodeData?.script}
                <i
                  className="iconfont icon-copy"
                  onClick={() => copy(nodeData?.script)}
                ></i>
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
    }
    return (
      <>
        <section className={styles['link']}>
          <h1>Prerequisites</h1>
          <p>
            Install the latest version of{' '}
            <a
              className="cm"
              href="https://docs.docker.com/desktop/install/windows-install/"
              target="_blank"
            >
              Docker Desktop
            </a>{' '}
            if it is not already installed.
          </p>
          <p>
            click the “Docker Desktop for Windows - x86_64” button to download
            and install.
          </p>
          <p>
            If after installation, you see an error message "Docker Engine
            stopped" when opening the application, you need to{' '}
            <a
              className="cm"
              href="https://learn.microsoft.com/en-us/virtualization/hyper-v-on-windows/quick-start/enable-hyper-v"
            >
              enable hyper-v
            </a>
          </p>
          <p>
            Once installed, you can check the version of docker on the command
            line.
          </p>
          <div>
            <p className="ell">
              <span className="db">$ docker --version</span>
              <span className="db">Docker version 27.0.3, build 7d4bcd8</span>
            </p>
            <a
              className="iconfont icon-copy"
              onClick={() =>
                copy(`$ docker --version
              Docker version 27.0.3, build 7d4bcd8`)
              }
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
          <h1>Start the node</h1>
          <div>
            <h3>
              <span>Script</span>
              <i
                className="iconfont icon-copy"
                onClick={() => copy(nodeData?.script)}
              ></i>
            </h3>
            <div className={styles['code-area']}>
              {nodeData?.script}
              <i
                className="iconfont icon-copy"
                onClick={() => copy(nodeData?.script)}
              ></i>
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
