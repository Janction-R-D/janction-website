import Icons from '@/components/Icons';
import { SYSTEM_LIST, GPU_CPU } from '@/constant';
import { motion, useAnimationControls } from 'framer-motion';
import { useState } from 'react';
import styles from './index.less';

const DeployNode = (props) => {
  const controls = useAnimationControls();
  const [sysSelected, setSysSelected] = useState();
  const [gpuOrCpu, setGpuOrCpu] = useState(GPU_CPU[0]);

  const onSysSelect = (sys) => {
    setSysSelected(sys);
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
                sysSelected?.value == item.value && styles.active,
              ].join(' ')}
              onClick={() => onSysSelect(item)}
            >
              <motion.div animate={controls}>
                <i className={`iconfont icon-${item.icon}`} />
              </motion.div>
              <span>{item.label}</span>
            </li>
          ))}
        </ul>
        <hgroup>
          <h1>Choose GPU Or CPU</h1>
          <span>List of supported platform</span>
        </hgroup>
        <ul className={styles['gpu-cpu']}>
          {GPU_CPU.map((item) => (
            <li
              className={[
                'hvr-float',
                gpuOrCpu.name == item.name && styles['active'],
              ].join(' ')}
              key={item.name}
              onClick={() => setGpuOrCpu(item)}
            >
              <span>{item.name}</span>
            </li>
          ))}
        </ul>
      </section>
    </motion.div>
  );
};

export default DeployNode;
