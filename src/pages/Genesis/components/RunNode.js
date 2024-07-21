import { useEffect, useState } from 'react';
import styles from './index.less';
import { motion } from 'framer-motion';
import { message } from 'antd';

const RunNode = (props) => {
  const { selectedValues } = props;
  const [nodeData, setNodaData] = useState({
    docker: 'https://www.docker.com/products/docker-desktop/',
    binaray: 'https://www.docker.com/products/docker-desktop/',
    code: '(code area)',
  });
  const docker = {
    macos: {
      cpu64:
        'docker run -d -e PRIVATE_KEY=0xab... --name janction-node roddyneo/jct-macos-amd64:0.0.9',
      cpu: 'docker run -d -e PRIVATE_KEY=0xab... --name janction-node roddyneo/jct-macos-arm:0.0.9',
    },
    linux: {
      cpu64:
        'docker run -d -e PRIVATE_KEY=0xab... --name janction-node roddyneo/jct-linux-amd64:0.0.9',
      cpu: 'docker run -d -e PRIVATE_KEY=0xab... --name janction-node roddyneo/jct-linux-arm:0.0.9',
    },
    windows: {
      cpu64:
        'docker run -d -e PRIVATE_KEY=0xab... --name janction-node roddyneo/jct-windows-amd64:0.0.9',
    },
  };

  useEffect(() => {
    if (selectedValues?.system == 'android') {
      setNodaData({
        ...nodeData,
        apk: 'https://janction-test-1324956105.cos.ap-tokyo.myqcloud.com/janction.apk?q-sign-algorithm=sha1&q-ak=AKID--CAKWwFjso0Ddr-cBx98Vcd-Dvd5uswajldZLPXjPTjRNezGgZE6Pi87AA1EZ-2&q-sign-time=1719758323;1719761923&q-key-time=1719758323;1719761923&q-header-list=host&q-url-param-list=&q-signature=1e081b7f6eff8410a1d4a44829a58093c7600b42&x-cos-security-token=acBbXNgU3t64LR8t1WzD4i4FBM94s1hafb7f71301f6769bfebfe1453fffc7a1fvJPm9TUe_khwMPRyyithBH6Q69I_-D21dN5W-X8-MuTL3eElmLMrNccf6fb1__i7wGaMTH4CSdEx-DS91fce_8XTNywaxkwhzXuWkdlnxtkO3YGJqZ-22-ha6GptPQscPLvXp582SGuxu-0EfOHFloyb5-qf-lZZiZAIzjiMRGuC60AX3FwKCvPJbbkIe4pt',
      });
    }
  }, [selectedValues]);

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
              {docker[selectedValues.system]?.[selectedValues?.architecture]}
              {/* <span>(code area)</span> */}
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
