import React, { useState } from 'react';
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

const slidesData = [
  {
    key: 1,
    image: slide1,
    address: '0x1234567890abcdef1234567890abcdef12345678',
  },
  {
    key: 2,
    image: slide2,
    address: '0xabcdef1234567890abcdef1234567890abcdef12',
  },
  {
    key: 3,
    image: slide3,
    address: '0x7890abcdef1234567890abcdef1234567890abcd',
  },
  {
    key: 4,
    image: slide4,
    address: '0x4567890abcdef1234567890abcdef1234567890a',
  },
  {
    key: 5,
    image: slide5,
    address: '0xabcdef7890abcdef1234567890abcdef1234567b',
  },
];

export default function Cards() {
  const [selectedNtf, setSelectedNtf] = useState(null); // Nuevo estado para almacenar el NFT seleccionado

  const handleOk = () => {
    setSelectedNtf(null); // Cierra el modal al hacer clic en 'Ok'
  };

  const handleCancelPay = () => {
    setSelectedNtf(null); // Cierra el modal al cancelar
  };

  const handleClick = (ntf) => {
    setSelectedNtf(ntf); // Establece el NFT seleccionado al hacer clic en la imagen
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
          stretch: 0,
          depth: 500,
          modifier: 1,
          slideShadows: false,
        }}
        pagination={true}
        modules={[EffectCoverflow, Pagination]}
        className="mySwiper"
      >
        {slidesData.map((ntf, index) => (
          <SwiperSlide key={ntf.key}>
            <img
              src={ntf.image}
              alt={`NFT ${index + 1}`}
              onClick={() => handleClick(ntf)} // Llama a handleClick con el NFT correspondiente
            />
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
        <img src={data.image} alt="NFT Selected" />
        <section>
          <p>
            <i className="iconfont icon-list"></i> Details
          </p>
          <ul>
            <li>
              <p>Status:</p>
              <p>Complete</p>
            </li>
            <li>
              <p>Transaction Hash:</p>
              <p>{data.address}</p>
            </li>
            <li>
              <p>ID:</p>
              <p>{data.key}</p>
            </li>
            <li>
              <p>Contract address:</p>
              <p>4678ghrtcgmgc</p>
            </li>
          </ul>
        </section>
      </div>
    </Modal>
  );
}
