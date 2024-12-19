import { renderBackgroudImg } from '@/utils/lang';
import banner1 from '@/assets/images/genesis/banner1.png';
import BuyNode from './BuyNode';
import styles from './index.less';
import { history, useLocation } from 'umi';
import { useAccount } from 'wagmi';
import { useEffect } from 'react';

const NTFBanner = (props) => {
  const { address } = useAccount();
  const location = useLocation();
  const { inviterCode } = location.query || {};
  const inviterIsStorage = localStorage.getItem('inviterCode');

  // const verifyUser = () => {
  //   if (inviterCode) {
  //     if (address) {
  //       const data = {
  //         receive_address: address,
  //         code: inviterCode,
  //       };
  //       console.log(data);

  //       return fetchInviteAccept(data)
  //         .then((res) => console.log(res))
  //         .catch((err) => console.log(err));
  //     }
  //     history.push(`/login?inviterCode=${inviterCode}`, {
  //       inviterCode: inviterCode,
  //     });
  //   }
  // };
  // si no hay codigo de invitacion en el link y en el local storage este componente no se muestra
  if (!inviterIsStorage && !inviterCode) return null;
  return (
    <div className={styles['banner']} style={renderBackgroudImg(banner1)}>
      <h1>Deploy node</h1>
      <p>
        Directly purchase deployed Janction mining machine nodes to share more
        profits！ Currently holding Janction Landlord NFT to participate in the
        computing power provider network！
      </p>
      <BuyNode inviterCode={inviterCode} />
    </div>
  );
};

export default NTFBanner;
