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
            <p>{nodeData?.apk}</p>
            <a
              href={nodeData?.apk}
              className="iconfont icon-link"
              target="_blank"
            ></a>
          </div>
        </section>
      );
    }
    return (
      <>
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
          <h1>Run Node</h1>
          <span>You need to execute the following command</span>
        </hgroup>
        <div className={styles['content']}>{renderLinks()}</div>
      </section>
    </motion.div>
  );
};

export default RunNode;
