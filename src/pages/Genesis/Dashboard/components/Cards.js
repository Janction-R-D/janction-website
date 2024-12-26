import React, { useEffect, useState } from 'react';
import slide1 from '@/assets/images/genesis/ntf/silde-1.png';
import slide2 from '@/assets/images/genesis/ntf/silde-3.png';
import slide3 from '@/assets/images/genesis/ntf/silde-4.png';
import slide4 from '@/assets/images/genesis/ntf/silde-5.png';
import slide5 from '@/assets/images/genesis/ntf/silde-6.png';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Modal } from 'antd';
import 'swiper/css';
import 'swiper/css/effect-cards';
import styles from './index.less';
import './cards.less';
import { EffectCoverflow, Pagination } from 'swiper/modules';
import { EffectCards } from 'swiper/modules';
import { fetchNft } from '@/services/genesis';

// const slidesData = [
//   {
//     key: 1,
//     image: slide1,
//     address: '0x1234567890abcdef1234567890abcdef12345678',
//   },
//   {
//     key: 2,
//     image: slide2,
//     address: '0xabcdef1234567890abcdef1234567890abcdef12',
//   },
//   {
//     key: 3,
//     image: slide3,
//     address: '0x7890abcdef1234567890abcdef1234567890abcd',
//   },
//   {
//     key: 4,
//     image: slide4,
//     address: '0x4567890abcdef1234567890abcdef1234567890a',
//   },
//   {
//     key: 5,
//     image: slide5,
//     address: '0xabcdef7890abcdef1234567890abcdef1234567b',
//   },
// ];
const IMG_URL = 'https://pub-da89859eb37b4af0ab4fbec6b5247ec5.r2.dev/image/';
export default function Cards({ nft }) {
  const [selectedNtf, setSelectedNtf] = useState(null);

  const handleOk = () => {
    setSelectedNtf(null);
  };

  const handleCancelPay = () => {
    setSelectedNtf(false);
  };

  const handleClick = (ntf) => {
    setSelectedNtf(ntf);
  };

  return (
    <>
      <Swiper
        effect={'coverflow'}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={'auto'}
        coverflowEffect={{
          rotate: 10,
          stretch: 120,
          depth: 480,
          modifier: 1,
          slideShadows: false,
        }}
        pagination={true}
        modules={[EffectCoverflow, Pagination]}
        className="mySwiper"
      >
        {nft.detail?.map((item) => (
          <SwiperSlide key={item.token_id} onClick={() => handleClick(item)}>
            <SwiperImg nft={item} />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Mostrar el modal solo si hay un NFT seleccionado */}
      {selectedNtf && (
        <MyNtf
          handleOk={handleOk}
          handleCancel={handleCancelPay}
          data={selectedNtf} // Pasa el NFT seleccionado
        />
      )}
    </>
  );
}

function MyNtf({ handleOk, handleCancel, data }) {
  const [nft, setNft] = useState({});

  useEffect(() => {
    fetchNft(data.token_id)
      .then((res) => setNft(res))
      .catch((err) => console.log(err));
  }, []);
  console.log(nft);
  return (
    <Modal
      open={true} // El modal siempre está abierto cuando hay un NFT seleccionado
      onOk={handleOk}
      onCancel={handleCancel}
      className={styles['modal-purchase']}
      width={500}
      footer={false}
      closable={false}
    >
      <div className={styles['modal-img']}>
        <img src={nft.image} alt={`NFT ${nft.name} Image `} />
        <section>
          <p className={styles['details-text']}>
            <i className="iconfont icon-list"></i> Details
          </p>
          <ul>
            <li>
              <span>Metadata :</span>
              <p>{nft.metadata || '~'}</p>
            </li>
            <li>
              <span>Name :</span>
              <p>{nft.name}</p>
            </li>
            <li>
              <span>Contratct Addres :</span>
              <p>{data.contract}</p>
            </li>
            <li>
              <span>Description :</span>
              <p>{nft.description || '~'}</p>
            </li>
            <li>
              <span>Transaction Hash :</span>
              <p>{data.transaction_hash}</p>
            </li>
          </ul>
        </section>
      </div>
    </Modal>
  );
}

function SwiperImg({ nft }) {
  // const [img,setImg] = useState()
  console.log(nft);
  return (
    <img
      src={`${IMG_URL}${nft.token_id}.jpg`}
      alt={`NFT`}
      // Llama a handleClick con el NFT correspondiente
    />
  );
}
