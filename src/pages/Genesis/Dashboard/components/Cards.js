import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import img from '@/assets/images/genesis/ntf/silde-1.png';
import { Modal } from 'antd';
import 'swiper/css';
import 'swiper/css/effect-cards';
import styles from './index.less';
import './cards.less';

// import required modules
import { EffectCards } from 'swiper/modules';
const sliderElements = [
  {
    key: 1,
    image: '@/assets/images/genesis/ntf/silde-1.png',
    address: '0x1234567890abcdef1234567890abcdef12345678',
  },
  {
    key: 2,
    image: '@/assets/images/genesis/ntf/silde-3.png',
    address: '0xabcdef1234567890abcdef1234567890abcdef12',
  },
  {
    key: 3,
    image: '@/assets/images/genesis/ntf/silde-4.png',
    address: '0x7890abcdef1234567890abcdef1234567890abcd',
  },
  //   {
  //     key: 4,
  //     image: '@/assets/images/genesis/ntf/silde-5.png',
  //     address: '0x4567890abcdef1234567890abcdef1234567890a',
  //   },
  //   {
  //     key: 5,
  //     image: '@/assets/images/genesis/ntf/silde-6.png',
  //     address: '0xabcdef7890abcdef1234567890abcdef1234567b',
  //   },
];

export default function Cards() {
  const [isPay, setIsPay] = useState(false);
  const handleOk = () => {
    setIsPay(true);
  };
  const handleCancelPay = () => {
    setIsPay(false);
  };
  return (
    <>
      <Swiper
        effect={'cards'}
        grabCursor={true}
        modules={[EffectCards]}
        className="mySwiper"
      >
        {sliderElements.map((ntf) => (
          <SwiperSlide key={ntf.key}>
            <img src={img} onClick={handleOk} />
            <MyNtf
              handleOk={handleOk}
              handleCancel={handleCancelPay}
              isPay={isPay}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
function MyNtf({ isPay, handleCancel, handleOk }) {
  return (
    <Modal
      open={isPay}
      onOk={handleOk}
      onCancel={handleCancel}
      className={styles['modal-purchase']}
      width={500}
      footer={false}
      closable={false}
    >
      <div className={styles['modal-img']}>
        <img src={img} />
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
              <p>0xe3802293</p>
            </li>
            <li>
              <p>ID:</p>
              <p>73489024hu094invm</p>
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
