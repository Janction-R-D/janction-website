import reward_banner from '@/assets/images/genesis/reward_banner.png';
import reward_title from '@/assets/images/genesis/reward_title.png';
import { fetchNTFClaimJasmy, fetchJctAirdrop } from '@/services/genesis';
import { renderBackgroudImg } from '@/utils/lang';
import { useEffect, useState } from 'react';
import { history, useIntl } from 'umi';
import { toFixed } from '../../lang';
import styles from './index.less';
import AirdropModal from './AirdropModal';

const ContributorReward = (props) => {
  const { nft } = props;
  const [rewardShow, setRewardShow] = useState(0);
  const [airdropModalOpen, setAirdropModalOpen] = useState(false);
  const [airdropData, setAirdropData] = useState(null);
  const intl = useIntl();
  useEffect(() => {
    getData();
  }, []);
  const getData = async () => {
    try {
      const res = await fetchNTFClaimJasmy();
      setRewardShow(res.claim_available_show);
    } catch (error) {
      console.log('『error』', error);
    }
  };

  // 获取空投数据
  const getAirdropData = async () => {
    try {
      const res = await fetchJctAirdrop();
      setAirdropData(res);
      return res;
    } catch (error) {
      console.log('『error』', error);
      return null;
    }
  };

  // 打开弹窗时获取空投数据
  const handleOpenModal = async () => {
    await getAirdropData();
    setAirdropModalOpen(true);
  };

  return (
    <>
      <div
        className={[styles['contributor-reward']].join(' ')}
        style={renderBackgroudImg(reward_banner)}
      >
        <img src={reward_title} className={styles['title']}></img>
        <div className={styles['receive']}>
          <div className={styles['value']}>
            <i className={styles['icon']}></i>
            <span>{toFixed(rewardShow)}</span>
          </div>
          <div
            className={styles['btn']}
            onClick={() => {
              history.push('/genesis/rewards', { nft });
            }}
          >
            {intl.formatMessage({ id: 'receive.award' })}
          </div>
          <div
            className={`${styles['btn']} ${styles['btn-airdrop']}`}
            onClick={handleOpenModal}
          >
            Claim Your Airdrop
          </div>
        </div>
      </div>
      <AirdropModal
        open={airdropModalOpen}
        onClose={() => setAirdropModalOpen(false)}
        airdropData={airdropData}
      />
    </>
  );
};

export default ContributorReward;
