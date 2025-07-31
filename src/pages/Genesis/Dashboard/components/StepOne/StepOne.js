import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import styles from './index.less';
import { ARCHITECTURE_LINK, SYSTEM_LIST } from '@/constant';
const APP_SYSTEM = SYSTEM_LIST.filter((item) => item.value !== 'android');
const StepOne = ({ selectedValues, setSelectedValues }) => {
  const [availableArchitectures, setAvailableArchitectures] = useState([]);

  useEffect(() => {
    if (!selectedValues?.system) {
      setAvailableArchitectures([]);
      return;
    }

    const filteredArchitectures = ARCHITECTURE_LINK.filter((arch) =>
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
  const ARCH_LABELS = {
    cpu: 'ARM',
    cpu64: 'AMD64',
  };

  function getArchLabel(value, fallback) {
    return ARCH_LABELS[value] || fallback;
  }
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
    >
      <section className={styles['sys-choice']}>
        <p className={styles['sys-title']}>Choose your Operating System</p>

        <ul className={styles['sys-list']}>
          {APP_SYSTEM.map((item) => (
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
                    <span>{getArchLabel(item.value, item.name)}</span>
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
