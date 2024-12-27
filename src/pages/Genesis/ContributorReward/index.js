import reward_bg from '@/assets/images/genesis/reward_bg.png';
import { fetchNTFClaimJasmyUpdate } from '@/services/genesis';
import contract from '@/utils/contract';
import { renderBackgroudImg } from '@/utils/lang';
import numeral from 'numeral';
import { useState } from 'react';
import { history } from 'umi';
import styles from './index.less';

const ContributorReward = (props) => {
  const [remaining, setRemaining] = useState(0);

  const { reward } = history.location.state || {};

  const onClaim = async () => {
    try {
      const signature = await contract.eIP712Signature(reward);
      await fetchNTFClaimJasmyUpdate({ signature });
    } catch (err) {
      console.log('『err』', err);
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
          <div className={styles['remaining']}>{`VeJCT: ${
            remaining || 0
          }`}</div>
        </div>
      </div>
      <div className={styles['content']} style={renderBackgroudImg(reward_bg)}>
        <div>
          <div className={styles['claim-container']}>
            <p className={styles['value']}>{numeral(1000).format('0.00')}</p>
            <span className={styles['unit']}>Jasmy</span>
            <div className={styles['btn']} onClick={onClaim}>
              Claim
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

ContributorReward.wrappers = ['@/wrappers/jasmyAuth'];
export default ContributorReward;
