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
  const [gpuSelected, setGpuSelected] = useState(gpuList[0]);

  const onBrandChange = (brandId) => {
    setActive(brandId);
  };

  return (
    <motion.div
      initial={{ x: '-100%' }}
      animate={{ x: 0 }}
      transition={{ duration: 0.8 }}
    >
      <section className={styles['gpu-check']}>
        <div className="df jc_sb ai_c">
          <hgroup>
            <h1>Check your GPU</h1>
            <span>List of supported GPUs</span>
          </hgroup>
          <SearchInput />
        </div>
        <ul className={styles['gpu-list']}>
          {gpuList.map((item) => (
            <li
              key={item.name}
              className={gpuSelected.name == item.name && styles['active']}
              onClick={() => setGpuSelected(item)}
            >
              <div className={styles['name']}>GPU</div>
              <div
                className={`${styles['status']} ${
                  item.status && styles['active']
                }`}
              >
                on-line
              </div>
            </li>
          ))}
        </ul>
        <div className={styles['tip']}>
          Please use a supported GPU or you will not be able to join the
          network. If you would like to add a GPU model, please{' '}
          <span className={styles['contact']}>Contact Us</span>.
        </div>
      </section>
    </motion.div>
  );
};

export default Gpu;
