import JanctionRadio from '@/components/JanctionRadio';
import SearchInput from '@/components/SeachInput';
import { SYSTEM_LIST } from '@/constant';
import { DEFAULT_COMPUTE_MODE, IP_FILTERS } from '../../extra';
import styles from './index.less';
import { useEffect, useState } from 'react';
import PurchaseSubCard from '../Card/SubCard';

const PublicIp = (props) => {
  const { value, onChange } = props;
  const [computeMode, setComputeMode] = useState(DEFAULT_COMPUTE_MODE.value);
  const [activeIp, setActiveIp] = useState(SYSTEM_LIST[0].value);

  useEffect(() => {
    setActiveIp(value);
  }, [value]);

  const onComputeModeChange = (mode) => {
    setComputeMode(mode);
  };
  return (
    <PurchaseSubCard title="Public IP">
      <div className={styles['filter']}>
        <JanctionRadio
          defaultValue={computeMode}
          options={IP_FILTERS}
          onChange={onComputeModeChange}
        />
        <SearchInput />
      </div>
      <div className={styles['list']}>
        {SYSTEM_LIST.map((item, index) => (
          <div
            className={[
              styles['item'],
              activeIp == item.value && styles['active-item'],
            ].join(' ')}
            onClick={() => {
              setActiveIp(item.value);
              onChange(item.value);
            }}
            key={index}
          >
            <div className={styles['icon']}>
              <i className={`iconfont icon-${item.icon}`}></i>
            </div>
            <span>{item.label}</span>
          </div>
        ))}
        <div className={[styles['item'], styles['more']].join(' ')}>
          <i className="iconfont icon-down"></i>
          <span>More</span>
        </div>
      </div>
    </PurchaseSubCard>
  );
};

export default PublicIp;
