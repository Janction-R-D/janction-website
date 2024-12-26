import banner from '@/assets/images/genesis/banner-8.png';
import styles from './index.less';
import Cards from './Cards';

const NTFcard = ({ nft }) => {
  return (
    <div
      className={`swiper-container ${styles['sales-wrapper']} ${styles['swiper-container']}  `}
    >
      <h2>My NFT</h2>
      <img className={styles['banner-img']} src={banner} />
      <Cards nft={nft} />
    </div>
  );
};

export default NTFcard;
