import React from 'react';
import styles from './index.less';
import { dcMock } from './mock';

export default function Cost() {
  return (
    <section className={styles['cost-wrapper']}>
      <h2>Cost&After sales</h2>

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
      <div className={styles['dc-card-icon']}>
        <i className={`iconfont icon-${icon}`} />
      </div>
      <div className={styles['dc-card__content']}>
        <div className={styles['dc-card__header']}>
          <span className={styles['dc-card_title']}>{title}</span>
        </div>
        <p className={styles['dc-card_descriotion']}>{description}</p>
      </div>
    </arctile>
  );
};
