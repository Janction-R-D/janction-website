import reward_bg from '@/assets/images/genesis/reward_bg.png';
import {
  fetchNTFClaimJasmy,
  fetchNTFClaimJasmyUpdate,
} from '@/services/genesis';
import contract from '@/utils/contracts';
import { delay, renderBackgroudImg } from '@/utils/lang';
import numeral from 'numeral';
import { useEffect, useState } from 'react';
import styles from './index.less';
import { Button, InputNumber, message } from 'antd';
import { toFixed, toNumber } from '../lang';
import { useChainId } from 'wagmi';
import { useEthersSigner } from '@/hooks/useEthersSigner';
import { history, useIntl } from 'umi';

const ContributorReward = (props) => {
  const [remaining, setRemaining] = useState(0);
  const [reward, setReward] = useState(0); // 原始可领取数量
  const [rewardShow, setRewardShow] = useState(0); // 用于展示的数量（可能带格式）
  const [claimAmount, setClaimAmount] = useState();
  const [loading, setLoading] = useState(false);
  const chainId = useChainId();
  const signer = useEthersSigner(chainId);
  const intl = useIntl();
  useEffect(() => {
    getData();
  }, []);
  const getData = async () => {
    try {
      const res = await fetchNTFClaimJasmy();
      const _remaining = res.data.reduce(
        (a, b) => a + Number(b.airdropped || 0),
        0,
      );
      setReward(res.claim_available);
      setRewardShow(res.claim_available_show);
      setRemaining(_remaining);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log('『error』', error);
    }
  };

  // 最大可领取数量：取原始 reward 和 100000 中较小的那个
  const maxClaim = Math.min(toNumber(reward), 100000);

  const onClaim = async () => {
    try {
      if (loading) return;
      const amount = toNumber(claimAmount);
      if (!amount) return;
      if (amount > maxClaim) {
        message.error(
          intl.formatMessage({
            id: 'reward.claim.max.error',
            defaultMessage:
              'The claim amount cannot exceed your available Jasmy or 100,000.',
          }),
        );
        return;
      }
      setLoading(true);
      const claimData = await fetchNTFClaimJasmyUpdate({ jasmy: amount });
      await contract.distributeRewards(signer, claimData.signature, amount);
      await delay(1000);
      await getData();
      message.success('Successfully!');
    } catch (err) {
      setLoading(false);
      console.log('『err』', err);

      // 检查是否是 gas 不足的错误
      const errorMessage = err?.message || err?.toString() || '';
      if (
        errorMessage.includes('Insufficient gas balance') ||
        errorMessage.includes('insufficient funds')
      ) {
        message.error({
          content:
            errorMessage ||
            'Insufficient gas balance. Please add ETH to your wallet to cover gas fees.',
          duration: 8,
        });
      } else {
        message.error('Failed, please try again!');
      }
    }
  };
  const onNavigate = () => history.push('/genesis/dashboard');
  return (
    <div className={styles['contributor-reward']}>
      <div className={styles['header']}>
        <h1>
          {intl.formatMessage({
            id: 'reward.title',
            defaultMessage: 'Contributor Reward',
          })}
        </h1>
        <div className={styles['extra']}>
          <div className={styles['connect-button']} onClick={onNavigate}>
            <i className="iconfont icon-pre" style={{ color: 'orange' }} />
            {intl.formatMessage({ id: 'reward.back', defaultMessage: 'Back' })}
          </div>
          {/* <a
            className="hvr-grow"
            href="https://x.com/JanctionMGT"
            target="_black"
          >
            <i className="iconfont icon-x"></i>
          </a> */}
          <a
            className="hvr-grow"
            href="https://t.me/jasmyofficial"
            target="_black"
          >
            <i className="iconfont icon-telegram"></i>
          </a>
          <div className={styles['connect-button']}>{`Jasmy: ${numeral(
            remaining || 0,
          ).format('0.00')}`}</div>
        </div>
      </div>
      <div className={styles['content']} style={renderBackgroudImg(reward_bg)}>
        <div>
          <div className={styles['claim-container']}>
            <p className={styles['value']}>{toFixed(rewardShow)}</p>
            <span className={styles['unit']}>Jasmy</span>
            <div className={styles['input-row']}>
              <InputNumber
                min={0}
                // 不使用 max，让我们自己根据 maxClaim 做实时校验
                value={claimAmount}
                onChange={setClaimAmount}
                className={styles['amount-input']}
                status={toNumber(claimAmount) > maxClaim ? 'error' : undefined}
                placeholder={intl.formatMessage({
                  id: 'reward.claim.placeholder',
                  defaultMessage: 'Enter claim amount',
                })}
              />
              <Button
                className={styles['max-btn']}
                onClick={() => setClaimAmount(maxClaim)}
              >
                Max
              </Button>
            </div>
            <Button
              loading={loading}
              className={[
                styles['btn'],
                (!toNumber(claimAmount) || toNumber(claimAmount) > maxClaim) &&
                  styles['disabled'],
              ].join(' ')}
              disabled={
                !toNumber(claimAmount) || toNumber(claimAmount) > maxClaim
              }
              onClick={onClaim}
            >
              {intl.formatMessage({
                id: 'reward.claim',
                defaultMessage: 'Claim',
              })}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

ContributorReward.wrappers = ['@/wrappers/jasmyAuth'];
export default ContributorReward;
