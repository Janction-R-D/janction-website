import Icons from '@/components/Icons';
import SearchInput from '@/components/SeachInput';
import { ConnectButton, useConnectModal } from '@rainbow-me/rainbowkit';
import { useAccount } from 'wagmi';
import { Avatar } from 'antd';
import styles from './index.less';
import userIcon from '@/assets/images/personal/user_icon.png';

const Header = (props) => {
  const { address } = useAccount();
  const { openConnectModal } = useConnectModal();
  return (
    <>
      <div className={styles['header']}>
        <div className={styles['points']}>
          <Icons name="points" width={38} height={38} />
          <span className="ml20">Points:2000</span>
        </div>
        <div className={styles['nodes']}>Nodes:21</div>
        <div className="df ai_c jc_fe f1">
          <div className={styles['search']}>
            <SearchInput />
          </div>
          <div className={styles['docs']}>
            <Icons name="docs" />
            <span>Docs</span>
          </div>
          <div className={styles['connect-account']}>
            {address ? (
              <ConnectButton />
            ) : (
              <button
                onClick={openConnectModal}
                className={styles['connect-button']}
              >
                Connect Account
              </button>
            )}
          </div>
        </div>
      </div>
      <div className={styles['android-header']}>
        <div className={styles['top']}>
          <div className={styles['user']}>
            <img src={userIcon} />
          </div>
          <div className={styles['search']}>
            <SearchInput className={styles['search-input']} />
          </div>
          <div className={styles['docs']}>
            <Icons name="docs" className={styles['docs-icon']} />
          </div>
        </div>
        <div className={styles['bottom']}>
          <div className={styles['points']}>
            <Icons name="points" className={styles['points-icon']} />
            <span>Points:2000</span>
          </div>
          <div className={styles['nodes']}>Nodes:21</div>
        </div>
      </div>
    </>
  );
};

export default Header;
