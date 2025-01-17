import banner from '@/assets/images/genesis/banner-8.png';
import styles from './index.less';
import Cards from './Cards';
import { useState } from 'react';
import Hoisting from './Hoisting';

const NTFcard = ({ nft }) => {
  const [showModal, setShowModal] = useState(false);
  const handleOk = () => {
    setShowModal(true);
  };
  return (
    <div
      className={`swiper-container ${styles['sales-wrapper']} ${styles['swiper-container']}  `}
    >
      <header className={styles['nft-header']}>
        <h2>My NFT</h2>
        <p onClick={handleOk}>
          Node hoisting
          <div>
            <i className="iconfont icon-up"></i>
          </div>
        </p>
      </header>
      <img className={styles['banner-img']} src={banner} />
      <Cards nft={nft} />
      <Hoisting
        nft={nft}
        showModal={showModal}
        handleOk={handleOk}
        setShowModal={setShowModal}
      />
    </div>
  );
};

export default NTFcard;
