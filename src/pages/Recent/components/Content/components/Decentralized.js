import React from 'react';
import styles from './index.less';

import { dcMock } from './mock';
export default function Decentralized() {
  return (
    <section className={styles['decentralized']}>
      <h2>Decentralized AI hub</h2>

      <section className={styles['dc-cards']}>
        {dcMock.map((item, index) => (
          <DCard key={index} {...item} />
        ))}
      </section>
    </section>
  );
}

const DCard = (props) => {
  const { title, icon, description } = props;
  return (
    <arctile className={styles['dc-card']}>
      <div className={styles['dc-card__header']}>
        <i className={`iconfont icon-${icon}`} />
        <span className={styles['dc-card_title']}>{title}</span>
      </div>
      <p className={styles['dc-card_descriotion']}>{description}</p>
    </arctile>
  );
};
