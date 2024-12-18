import { renderBackgroudImg } from '@/utils/lang';
import banner1 from '@/assets/images/genesis/banner1.png';
import BuyNode from './BuyNode';
import styles from './index.less';
import { useLocation, useModel } from 'umi';

const NTFBanner = (props) => {
  const { initialState } = useModel('@@initialState');
  const location = useLocation();
  const { inviterCode } = location.query || {};

  const verifyUser = () => {
    if (inviterCode) {
      if (initialState?.userAccount?.address) {
        const data = {
          receive_address: initialState.userAccount.address,
          code: inviterCode,
        };
        console.log(data);

        return fetchInviteAccept(data)
          .then((res) => console.log(res))
          .catch((err) => console.log(err));
      }
      history.push(`/login?inviterCode=${inviterCode}`, {
        inviterCode: inviterCode,
      });
    }
  };

  return (
    <div className={styles['banner']} style={renderBackgroudImg(banner1)}>
      <h1>Deploy node</h1>
      <p>
        Directly purchase deployed Janction mining machine nodes to share more
        profits！ Currently holding Janction Landlord NFT to participate in the
        computing power provider network！
      </p>
      <BuyNode />
    </div>
  );
};

export default NTFBanner;
