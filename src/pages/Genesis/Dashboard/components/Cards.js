import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import img from '@/assets/images/genesis/ntf/silde-1.png';
import styles from './cards.less';
import 'swiper/css';
import 'swiper/css/effect-cards';

// import required modules
import { EffectCards } from 'swiper/modules';

export default function Cards() {
  return (
    <>
      <Swiper
        effect={'cards'}
        grabCursor={true}
        modules={[EffectCards]}
        className={`mySwiper ${styles['mySwiper']}  `}
      >
        <SwiperSlide>
          <img src={img} alt={`Slide `} />
        </SwiperSlide>
        <SwiperSlide>
          <img src={img} alt={`Slide `} />
        </SwiperSlide>
        <SwiperSlide>
          <img src={img} alt={`Slide `} />
        </SwiperSlide>
      </Swiper>
    </>
  );
}
