import React, { useEffect, useState } from 'react';
import IdentityCard from './components/card/Card';
import styles from './index.less';
import planetImg from '@/assets/images/genesis/planet.png';
import lessorImg from '@/assets/images/genesis/rol_lessor.png';
import lesseeImg from '@/assets/images/genesis/rol_lessee.png';
import { Redirect, useLocation, useModel, useIntl } from 'umi';

export default function Rol() {
  const { initialState } = useModel('@@initialState');
  const { sessionType } = initialState || {};
  const [cardsType, setCardType] = useState([]);
  const location = useLocation();
  const { type } = location.state || {};
  const intl = useIntl();

  const cards = [
    {
      title: intl.formatMessage({ id: 'role.lessor' }),
      name: intl.formatMessage({ id: 'role.lessor.name' }),
      description: intl.formatMessage({ id: 'role.description' }),
      isLessee: false,
      img: lessorImg,
      path: '/genesis/dashboard',
    },
    {
      title: intl.formatMessage({ id: 'role.lessee' }),
      name: intl.formatMessage({ id: 'role.lessee.name' }),
      description: intl.formatMessage({ id: 'role.description' }),
      isLessee: true,
      img: lesseeImg,
      path: '/genesis/dashboard',
    },
  ];
  useEffect(() => {
    if (sessionType && sessionType !== 'wallet') {
      const showedCards = cards.filter((item) => item.title !== 'Lessor');
      setCardType(showedCards);

      return;
    }
    setCardType(cards);
  }, []);
  if (!type) return <Redirect to="/login" />;
  return (
    <main className={styles['identity-wrapper']}>
      <h1 className={`${styles['text-title']} ${styles['text--blue']}`}>
        {intl.formatMessage({ id: 'role.choose' })}
      </h1>
      <div className={styles['banner']}>
        <img src={planetImg} alt="Lessor" />
      </div>
      <section className={styles['cards-wrapper']}>
        {cardsType.map((card, index) => (
          <IdentityCard key={index} card={card} />
        ))}
      </section>
    </main>
  );
}
Rol.wrappers = ['@/wrappers/auth'];
