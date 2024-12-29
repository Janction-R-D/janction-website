import reward_bg from '@/assets/images/genesis/reward_bg.png';
import {
  fetchNTFClaimJasmy,
  fetchNTFClaimJasmyUpdate,
} from '@/services/genesis';
import contract from '@/utils/contract';
import { renderBackgroudImg } from '@/utils/lang';
import numeral from 'numeral';
import { useEffect, useState } from 'react';
import styles from './index.less';
import { Button, message } from 'antd';
import { toFixed } from '../lang';

const ContributorReward = (props) => {
  const [remaining, setRemaining] = useState(0);
  const [reward, setReward] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getData();
  }, []);
  const getData = async () => {
    try {
      const res = await fetchNTFClaimJasmy();
      const _remaining = res.data.reduce((a, b) => a + b.airdropped, 0);
      setReward(res.claim_available);
      setRemaining(toFixed(_remaining, 2));
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log('『error』', error);
    }
  };

  const onClaim = async () => {
    try {
      if (loading) return;
      if (!Number(toFixed(reward, 2))) return;
      setLoading(true);
      const signature = await contract.eIP712Signature(reward);
      if (!signature) {
        message.error('Failed to claim, please try again!');
        setLoading(false);
        return;
      }
      await fetchNTFClaimJasmyUpdate({ signature });
      await getData();
      message.success('Successfully!');
    } catch (err) {
      setLoading(false);
      console.log('『err』', err);
      message.error('Failed, please try again!');
    }
  };

  return (
    <div className={styles['contributor-reward']}>
      <div className={styles['header']}>
        <h1>Contributor Reward</h1>
        <div className={styles['extra']}>
          <a
            className="hvr-grow"
            href="https://x.com/JanctionMGT"
            target="_black"
          >
            <i className="iconfont icon-x"></i>
          </a>
          <a
            className="hvr-grow"
            href="https://t.me/jasmyofficial"
            target="_black"
          >
            <i className="iconfont icon-telegram"></i>
          </a>
          <div className={styles['remaining']}>{`Jasmy: ${numeral(
            remaining || 0,
          ).format('0.00')}`}</div>
        </div>
      </div>
      <div className={styles['content']} style={renderBackgroudImg(reward_bg)}>
        <div>
          <div className={styles['claim-container']}>
            <p className={styles['value']}>{toFixed(reward, 2)}</p>
            <span className={styles['unit']}>Jasmy</span>
            <Button
              loading={loading}
              className={[
                styles['btn'],
                !Number(toFixed(reward, 2)) && styles['disabled'],
              ].join(' ')}
              onClick={onClaim}
            >
              Claim
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

ContributorReward.wrappers = ['@/wrappers/jasmyAuth'];
export default ContributorReward;
