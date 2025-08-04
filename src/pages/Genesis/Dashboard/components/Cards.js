import React, { useEffect, useMemo, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Modal } from 'antd';
import 'swiper/css';
import 'swiper/css/effect-cards';
import styles from './index.less';
import './cards.less';
import { EffectCoverflow, Pagination } from 'swiper/modules';
import { fetchNft } from '@/services/genesis';
import { useIntl } from 'umi';

export default function Cards({ nft }) {
  const [selectedNtf, setSelectedNtf] = useState(null);

  const handleOk = () => {
    setSelectedNtf(null);
  };

  const handleCancelPay = () => {
    setSelectedNtf(null);
  };

  const handleClick = (ntf) => {
    setSelectedNtf(ntf);
  };

  const renderSwiper = useMemo(() => {
    return (
      <Swiper
        effect={'coverflow'}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={'auto'}
        coverflowEffect={{
          rotate: 10,
          stretch: 120,
          depth: 450,
          modifier: 1,
          slideShadows: false,
        }}
        initialSlide={
          nft?.detail?.length > 1 ? Math.floor(nft?.detail?.length / 2) : 0
        }
        pagination={true}
        // loop={true}
        modules={[EffectCoverflow, Pagination]}
        className="swiper"
      >
        {nft?.detail?.map((item) => (
          <SwiperSlide key={item.token_id} onClick={() => handleClick(item)}>
            <SwiperImg item={item} />
          </SwiperSlide>
        ))}
      </Swiper>
    );
  }, [nft]);

  return (
    <div className={styles['modal-nft']}>
      {renderSwiper}
      {/* Mostrar el modal solo si hay un NFT seleccionado */}
      {selectedNtf && (
        <MyNtf
          handleOk={handleOk}
          handleCancel={handleCancelPay}
          data={selectedNtf} // Pasa el NFT seleccionado
        />
      )}
    </div>
  );
}

function MyNtf({ handleOk, handleCancel, data }) {
  const [nft, setNft] = useState({});
  const intl = useIntl();
  useEffect(() => {
    fetchNft(data.token_id)
      .then((res) => setNft(res))
      .catch((err) => console.log(err));
  }, []);
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
        <img
          src={`${process.env.ASSETS_URL}/image/${data?.token_id}.jpg`}
          alt={`NFT Image `}
        />
        <section>
          <p className={styles['details-text']}>
            <i className="iconfont icon-list"></i>{' '}
            {intl.formatMessage({ id: 'details.title' })}
          </p>
          <ul>
            <li>
              <span>{intl.formatMessage({ id: 'details.metadata' })} :</span>
              <p>{nft.metadata || '~'}</p>
            </li>
            <li>
              <span>{intl.formatMessage({ id: 'details.name' })} :</span>
              <p>{nft.name || '~'}</p>
            </li>
            <li>
              <span>
                {intl.formatMessage({ id: 'details.contractAddress' })} :
              </span>
              <p>{data.contract || '~'}</p>
            </li>
            <li>
              <span>{intl.formatMessage({ id: 'details.description' })} :</span>
              <p>{nft.description || '~'}</p>
            </li>
            <li>
              <span>
                {intl.formatMessage({ id: 'details.transactionHash' })} :
              </span>
              <p>{data.transaction_hash || '~'}</p>
            </li>
          </ul>
        </section>
      </div>
    </Modal>
  );
}

export function SwiperImg({ item }) {
  return (
    <img
      src={`${process.env.ASSETS_URL}/image/${item?.token_id}.jpg`}
      alt={`NFT ${item?.token_id}`}
    />
  );
}
