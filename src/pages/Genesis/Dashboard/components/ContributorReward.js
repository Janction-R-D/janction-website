import reward_banner from '@/assets/images/genesis/reward_banner.png';
import reward_title from '@/assets/images/genesis/reward_title.png';
import { fetchNTFClaimJasmy } from '@/services/genesis';
import { renderBackgroudImg } from '@/utils/lang';
import { message } from 'antd';
import { useEffect, useState } from 'react';
import { history } from 'umi';
import { toFixed, toNumber } from '../../lang';
import styles from './index.less';

const ContributorReward = (props) => {
  const { nft } = props;
  const [reward, setReward] = useState(0);

  useEffect(() => {
    getData();
  }, []);
  const getData = async () => {
    try {
      const res = await fetchNTFClaimJasmy();
      setReward(res.claim_available);
    } catch (error) {
      console.log('『error』', error);
    }
  };

  return (
    <div
      className={[
        styles['contributor-reward'],
        !toNumber(reward) && styles['disabled'],
      ].join(' ')}
      style={renderBackgroudImg(reward_banner)}
    >
      <img src={reward_title} className={styles['title']}></img>
      <div className={styles['receive']}>
        <div className={styles['value']}>
          <i className={styles['icon']}></i>
          <span>{toFixed(reward)}</span>
        </div>
        <div
          className={styles['btn']}
          onClick={() => {
            if (!toNumber(reward)) {
              message.warning('The reward has been claimed!');
              return;
            }
            history.push('/genesis/rewards', { nft });
          }}
        >
          Receive award
        </div>
      </div>
    </div>
  );
};

export default ContributorReward;
