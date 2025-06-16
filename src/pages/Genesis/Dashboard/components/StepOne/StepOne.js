import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import styles from './index.less';
import { ARCHITECTURE, SYSTEM_LIST } from '@/constant';

const StepOne = (props, ref) => {
  const { selectedValues, setSelectedValues, links, setDownloadLink } = props;
  const [architecture, setArchitecture] = useState([]);
  useEffect(() => {
    if (!selectedValues?.system) return;
    const _architecture = ARCHITECTURE.filter((item) =>
      item.sys.includes(selectedValues.system),
    );

    const getLink = links.find(
      (item) => item.operatingSystem == selectedValues.system,
    );
    if (!getLink) {
      setDownloadLink(null);
      return;
    }
    setDownloadLink(getLink.appLink);
    setArchitecture(_architecture);
  }, [selectedValues]);
  const onSysSelect = (sys) => {
    console.log(sys);
    const _architecture = ARCHITECTURE.filter((item) =>
      item.sys.includes(sys.value),
    );

    setSelectedValues({
      architecture: _architecture?.[0]?.value,
      system: sys.value,
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
    >
      <section className={styles['sys-choice']}>
        <p className={styles['sys-title']}>Choose your Operating System</p>

        <ul className={styles['sys-list']}>
          {SYSTEM_LIST.map((item) => (
            <li
              key={item.value}
              className={
                selectedValues?.system == item.value ? styles['active'] : ''
              }
              onClick={() => onSysSelect(item)}
            >
              <span>{item.label}</span>
              <i className={`iconfont icon-${item.icon}`} />
            </li>
          ))}
        </ul>
        {selectedValues?.system !== 'android' && (
          <>
            <p className={styles['sys-title']}>Choose Architecture</p>

            <ul className={styles['gpu-cpu']}>
              {architecture.map((item) => (
                <li
                  className={` ${
                    selectedValues?.architecture == item.value &&
                    styles['active']
                  }
                  }`}
                  key={item.value}
                  onClick={() => {
                    setSelectedValues({
                      ...selectedValues,
                      architecture: item.value,
                    });
                  }}
                >
                  <span>{item.name}</span>
                </li>
              ))}
            </ul>
          </>
        )}
      </section>
    </motion.div>
  );
};

export default StepOne;
