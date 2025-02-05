import banner1 from '@/assets/images/genesis/banner1.png';
import {
  empty,
  renderBackgroudImg,
  renderBackgroudImgMobile,
} from '@/utils/lang';
import storage from '@/utils/storage';
import { useLocation } from 'umi';
import BuyNode from './BuyNode';
import styles from './index.less';
import { useEffect, useState } from 'react';
import { useAccount } from 'wagmi';
import { fetchMineInviteCode } from '@/services/genesis/distribution';
import useScale from '@/hooks/useScale';

const NTFBanner = (props) => {
  const [code, setCode] = useState();
  const { isPC } = useScale();
  const { address } = useAccount();

  const location = useLocation();
  const { inviterCode, root } = location.query || {};

  useEffect(() => {
    if (!empty(root)) {
      storage.set({ name: 'isLessee', value: root == 'lessee' });
    }
    if (address) {
      getMineCode();
      return;
    }
    if (!inviterCode) return;
    // Provides an invitation code for redirecting to the login page
    storage.set({ name: 'inviterCode', value: inviterCode });
  }, []);
  const getMineCode = async () => {
    try {
      const res = await fetchMineInviteCode();
      if (res?.code == 40410) {
        return;
      }
      setCode(res.code);
    } catch (err) {
      console.log('『err』', err);
    }
  };

  // There are only two situations in which a banner can be displayed
  // 1. have been invited
  // 2. invite link
  if (!code && !inviterCode) return null;
  return (
    <div
      className={styles['banner']}
      style={
        isPC ? renderBackgroudImg(banner1) : renderBackgroudImgMobile(banner1)
      }
    >
      <h1>Deploy node</h1>
      {/* <img className={styles['banner-img']} src={banner1} /> */}
      <p>
        Directly purchase deployed Janction mining machine nodes to share more
        profits！ Currently holding Janction Lessor NFT to participate in the
        computing power provider network！
      </p>
      <BuyNode mineCode={code} inviterCode={inviterCode} />
    </div>
  );
};

export default NTFBanner;
