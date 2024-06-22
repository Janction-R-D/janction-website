import Icons from '@/components/Icons';
import SearchInput from '@/components/SeachInput';
import { useState } from 'react';
import styles from './index.less';
import { motion } from 'framer-motion';

const brandList = [
  { id: 1, name: 'AMD' },
  { id: 2, name: 'NVDIA' },
  { id: 3, name: 'APPLE' },
];
const Gpu = (props) => {
  const [sysList, setSysList] = useState([
    { id: 1, name: 'Docker (recommend)' },
    { id: 2, name: 'MAC' },
    { id: 3, name: 'Linux' },
    { id: 4, name: 'Windows' },
  ]);
  const [gpuList, setGpuList] = useState([
    {
      name: 'GPU 1',
      status: 0,
      onlineTime: 'Already online：2 hours and 30 minutes',
    },
    {
      name: 'GPU 2',
      status: 1,
      onlineTime: 'Already online：2 hours and 30 minutes',
    },
    {
      name: 'GPU 3',
      status: 0,
      onlineTime: 'Already online：2 hours and 30 minutes',
    },
    {
      name: 'GPU 4',
      status: 1,
      onlineTime: 'Already online：2 hours and 30 minutes',
    },
    {
      name: 'GPU 5',
      status: 1,
      onlineTime: 'Already online：2 hours and 30 minutes',
    },
  ]);
  const [active, setActive] = useState(brandList[0].id);

  const onBrandChange = (brandId) => {
    setActive(brandId);
  };

  return (
    <motion.div
      initial={{ x: '-100%' }}
      animate={{ x: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className={styles['gpu']}>
        <section className={styles['gpu-check']}>
          <hgroup>
            <h1>Check your GPU</h1>
            <span>This is the prompt text</span>
          </hgroup>
          <div className={styles['gpu-container']}>
            <nav>
              {brandList.map((item) => (
                <button
                  key={item.id}
                  className={`hvr-shrink ${
                    active == item.id && styles['active']
                  }`}
                  onClick={() => onBrandChange(item.id)}
                >
                  {item.name}
                </button>
              ))}
            </nav>
            <div className={styles['gpu-list']}>
              <ul>
                {gpuList.map((item) => (
                  <li key={item.name}>
                    <div className={styles['icon-box']}>
                      <img src={require('@/assets/svgs/cpu.svg')} />
                    </div>
                    <div className={styles['info']}>
                      <div className={styles['name']}>GPU</div>
                      <div
                        className={`${styles['status']} ${
                          item.status && styles['active']
                        }`}
                      >
                        on-line
                      </div>
                    </div>
                    <div className={styles['online-time']}>
                      {item.onlineTime}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className={styles['tip']}>
            Please use a supported GPU or you will not be able to join the
            network. If you would like to add a GPU model, please contact us
          </div>
        </section>
        <div className={styles['android-tip']}>
          Please use a supported GPU or you will not be able to join the
          network. If you would like to add a GPU model, please contact us
        </div>
      </div>
    </motion.div>
  );
};

export default Gpu;
