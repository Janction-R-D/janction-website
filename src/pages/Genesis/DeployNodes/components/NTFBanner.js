import banner1 from '@/assets/images/genesis/banner1.png';
import { renderBackgroudImg } from '@/utils/lang';
import { useLocation } from 'umi';
import BuyNode from './BuyNode';
import styles from './index.less';

const NTFBanner = (props) => {
  const location = useLocation();
  const { inviterCode } = location.query || {};
  const inviterIsStorage = localStorage.getItem('inviterCode');

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
