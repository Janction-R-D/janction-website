import React from 'react';
import IdentityCard from './components/card/Card';
import styles from './index.less';
import planetImg from '@/assets/images/genesis/planet.png';
import gputImg from '@/assets/images/genesis/gpu.png';
const cards = [
  {
    name: 'Rent Out Your Node',
    isLessee: false,
    img: gputImg,
    path: '/genesis/dashboard',
  },
  {
    name: 'Find Nodes to Rent',
    isLessee: true,
    img: planetImg,
    path: '/genesis/dashboard',
  },
];
export default function Rol() {
  return (
    <main className={styles['identity-wrapper']}>
      <h1 className={`${styles['text-title']} ${styles['text--blue']}`}>
        Choose your identity
      </h1>

      <section className={styles['cards-wrapper']}>
        {cards.map((card, index) => (
          <IdentityCard key={index} card={card} />
        ))}
      </section>
    </main>
  );
}
