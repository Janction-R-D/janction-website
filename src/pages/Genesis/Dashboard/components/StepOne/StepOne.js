import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import styles from './index.less';
import { ARCHITECTURE, SYSTEM_LIST } from '@/constant';

const StepOne = ({ selectedValues, setSelectedValues }) => {
  const [availableArchitectures, setAvailableArchitectures] = useState([]);

  useEffect(() => {
    if (!selectedValues?.system) {
      setAvailableArchitectures([]);
      return;
    }

    const filteredArchitectures = ARCHITECTURE.filter((arch) =>
      arch.sys.includes(selectedValues.system),
    );

    setAvailableArchitectures(filteredArchitectures);

    if (
      !selectedValues.architecture ||
      !filteredArchitectures.some(
        (a) => a.value === selectedValues.architecture,
      )
    ) {
      setSelectedValues((prev) => ({
        ...prev,
        architecture: filteredArchitectures[0]?.value || null,
      }));
    }
  }, [selectedValues.system, setSelectedValues]);

  const onSysSelect = (sys) => {
    setSelectedValues({
      system: sys.value,
      architecture: null, // reset arquitectura al cambiar sistema para forzar la selección
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
                selectedValues.system === item.value ? styles['active'] : ''
              }
              onClick={() => onSysSelect(item)}
            >
              <span>{item.label}</span>
              <i className={`iconfont icon-${item.icon}`} />
            </li>
          ))}
        </ul>

        {selectedValues.system !== 'android' &&
          availableArchitectures.length > 0 && (
            <>
              <p className={styles['sys-title']}>Choose Architecture</p>
              <ul className={styles['gpu-cpu']}>
                {availableArchitectures.map((item) => (
                  <li
                    key={item.value}
                    className={
                      selectedValues.architecture === item.value
                        ? styles['active']
                        : ''
                    }
                    onClick={() =>
                      setSelectedValues({
                        ...selectedValues,
                        architecture: item.value,
                      })
                    }
                  >
                    <span>
                      {selectedValues.system === 'macos'
                        ? item.value === 'cpu'
                          ? 'ARM'
                          : item.value === 'cpu64'
                          ? 'AMD64'
                          : item.name
                        : selectedValues.system === 'windows'
                        ? 'ARM'
                        : item.name}
                    </span>
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
