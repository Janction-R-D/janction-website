import React from 'react';
import IdentityCard from './components/card/Card';
import styles from './index.less';
import planetImg from '@/assets/images/genesis/planet.png';
import lessorImg from '@/assets/images/genesis/rol_lessor.png';
import lesseeImg from '@/assets/images/genesis/rol_lessee.png';
const cards = [
  {
    title: 'Lessor',
    name: 'Find Nodes to Rent',
    description: 'Your Personal Speed Minning Node',
    isLessee: false,
    img: lessorImg,
    path: '/genesis/dashboard',
  },
  {
    title: 'Lessee',
    name: 'Rent Out Your Node',
    description: 'Your Personal Speed Minning Node',
    isLessee: true,
    img: lesseeImg,
    path: '/genesis/dashboard',
  },
];
export default function Rol() {
  return (
    <main className={styles['identity-wrapper']}>
      <h1 className={`${styles['text-title']} ${styles['text--blue']}`}>
        Choose your identity
      </h1>
      <div className={styles['banner']}>
        <img src={planetImg} alt="Lessor" />
      </div>
      <section className={styles['cards-wrapper']}>
        {cards.map((card, index) => (
          <IdentityCard key={index} card={card} />
        ))}
      </section>
    </main>
  );
}
