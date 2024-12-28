import { renderBackgroudImg } from '@/utils/lang';
import styles from './index.less';
import reward_banner from '@/assets/images/genesis/reward_banner.png';
import reward_title from '@/assets/images/genesis/reward_title.png';
import { history } from 'umi';
import { useEffect, useState } from 'react';
import { fetchNTFClaimJasmy } from '@/services/genesis';
import { message } from 'antd';

const ContributorReward = (props) => {
  const [remaining, setRemaining] = useState(0);
  const [reward, setReward] = useState(0);

  useEffect(() => {
    getData();
  }, []);
  const getData = async () => {
    try {
      const res = await fetchNTFClaimJasmy();
      const _reward = res.data.reduce((a, b) => a + b.airdropable, 0);
      const _remaining = res.data.reduce((a, b) => a + b.airdropped, 0);
      setReward(_reward);
      setRemaining(_remaining);
    } catch (error) {
      console.log('『error』', error);
    }
  };

  return (
    <div
      className={styles['contributor-reward']}
      style={renderBackgroudImg(reward_banner)}
    >
      <img src={reward_title} className={styles['title']}></img>
      <div className={styles['receive']}>
        <div className={styles['value']}>
          <i className={styles['icon']}></i>
          <span>{reward}</span>
        </div>
        <div
          className={styles['btn']}
          onClick={() => {
            if (!reward) {
              message.warning('The reward has been claimed!');
              return;
            }
            history.push('/genesis/rewards', { reward, remaining });
          }}
        >
          Receive award
        </div>
      </div>
    </div>
  );
};

export default ContributorReward;
