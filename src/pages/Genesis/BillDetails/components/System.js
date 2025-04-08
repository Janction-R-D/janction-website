import { ARCHITECTURE, SYSTEM_LIST } from '@/constant';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import styles from './index.less';

const DeployNode = (props, ref) => {
  const { selectedValues, setSelectedValues } = props;
  const [architecture, setArchitecture] = useState([]);

  useEffect(() => {
    if (!selectedValues?.system) return;
    const _architecture = ARCHITECTURE.filter((item) =>
      item.sys.includes(selectedValues.system),
    );
    setArchitecture(_architecture);
  }, [selectedValues]);

  const onSysSelect = (sys) => {
    const _architecture = ARCHITECTURE.filter((item) =>
      item.sys.includes(sys.value),
    );
    setArchitecture(_architecture);
    setSelectedValues({
      architecture: _architecture?.[0]?.value,
      system: sys.value,
    });
  };

  return (
    <motion.div
      initial={{ x: '-100%' }}
      animate={{ x: 0 }}
      transition={{ duration: 0.8 }}
    >
      <section className={styles['sys-choice']}>
        <hgroup>
          <h1>Choose your Operating System</h1>
          <span>List of supported OS</span>
        </hgroup>
        <ul className={styles['sys-list']}>
          {SYSTEM_LIST.map((item) => (
            <li
              key={item.value}
              className={[
                'df ai_c jc_c fd_c hvr-float',
                selectedValues?.system == item.value && styles.active,
              ].join(' ')}
              onClick={() => onSysSelect(item)}
            >
              <i className={`iconfont icon-${item.icon}`} />
              <span>{item.label}</span>
            </li>
          ))}
        </ul>
        {selectedValues?.system !== 'android' && (
          <>
            <hgroup>
              <h1>Choose Architecture</h1>
              <span>List of supported platform</span>
            </hgroup>
            <ul className={styles['gpu-cpu']}>
              {architecture.map((item) => (
                <li
                  className={[
                    'hvr-float',
                    selectedValues?.architecture == item.value &&
                      styles['active'],
                  ].join(' ')}
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

export default DeployNode;
