import React, { useEffect, useState } from 'react';
import Swiper from 'swiper';
import img from '@/assets/images/genesis/ntf/silde-1.png';
import banner from '@/assets/images/genesis/banner-8.png';
import { Button, Modal } from 'antd';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import styles from './index.less';

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

const NTFcard = () => {
  const [isPay, setIsPay] = useState(false);
  const handleOk = () => {
    setIsPay(true);
  };
  const handleCancelPay = () => {
    setIsPay(false);
  };
  useEffect(() => {
    const swiper = new Swiper(`.${styles['sales-wrapper']}`, {
      // Optional parameters
      direction: 'horizontal',
      loop: true,
      centeredSlides: true,
      slidesPerView: 'auto',
      spaceBetween: 30,

      // If we need pagination
      pagination: {
        el: `.${styles['swiper-pagination']}`,
        clickable: true,
      },

      // Navigation arrows
      navigation: {
        nextEl: `.${styles['swiper-button-next']}`,
        prevEl: `.${styles['swiper-button-prev']}`,
      },

      modules: [Navigation, Pagination],
    });
  }, []);

  return (
    <div
      className={`${styles['sales-wrapper']} ${styles['swiper-container']}  `}
    >
      <img className={styles['banner-img']} src={banner} />
      <div className="swiper-wrapper">
        {sliderElements.map((item) => (
          <div
            className={`swiper-slide ${styles['swiper-slide']}`}
            key={item.key}
          >
            <img
              src={img}
              alt={`Slide ${item.key}`}
              className={styles['slide-image']}
              onClick={handleOk}
            />
            <MyNtf
              isPay={isPay}
              setIsPay={setIsPay}
              handleCancel={handleCancelPay}
            />
          </div>
        ))}
      </div>

      <div className={styles['swiper-pagination']}></div>
      <div className={styles['swiper-button-prev']}></div>
      <div className={styles['swiper-button-next']}></div>
    </div>
  );
};
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

export default NTFcard;
