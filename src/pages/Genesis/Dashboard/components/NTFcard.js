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
import Cards from './Cards';

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
  //   useEffect(() => {
  //     const swiper = new Swiper('.swiper-container', {
  //       // Optional parameters
  //       direction: 'horizontal',
  //       loop: true,
  //       effect: 'coverFlow',
  //       grabCursor: true,
  //       centeredSlides: true,
  //       slidesPerView: 'auto',
  //       spaceBetween: 20,
  //       initialSlide: 1,
  //       coverflowEffect: {
  //         rotate: 0,
  //         stretch: 80,
  //         depth: 200,
  //         modifier: 1,
  //         slideShadows: true,
  //       },
  //       // If we need pagination
  //       pagination: {
  //         el: `.${styles['swiper-pagination']}`,
  //         clickable: true,
  //       },

  //       // Navigation arrows
  //       navigation: {
  //         nextEl: '.swiper-button-next',
  //         prevEl: '.swiper-button-prev',
  //       },

  //       modules: [Navigation, Pagination],
  //     });
  //   }, []);

  return (
    <div
      className={`swiper-container ${styles['sales-wrapper']} ${styles['swiper-container']}  `}
    >
      <img className={styles['banner-img']} src={banner} />
      <Cards />
    </div>
  );
};

export default NTFcard;
