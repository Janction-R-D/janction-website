import React from 'react';
import styles from './index.less';
import { useIntl } from 'umi';
import { dcMock } from './mock';

export default function Decentralized() {
  const intl = useIntl();

  return (
    <section className={styles['decentralized']}>
      <h2>{intl.formatMessage({ id: 'decentralized.title' })}</h2>

      <section className={styles['dc-cards']}>
        {dcMock.map((_, index) => (
          <DCard key={index} index={index} />
        ))}
      </section>
    </section>
  );
}

const DCard = ({ index }) => {
  const intl = useIntl();
  const { icon } = dcMock[index];

  return (
    <article className={styles['dc-card']}>
      <div className={styles['dc-card__header']}>
        <i className={`iconfont icon-${icon}`} />
        <span className={styles['dc-card_title']}>
          {intl.formatMessage({ id: `decentralized.item.${index}.title` })}
        </span>
      </div>
      <p className={styles['dc-card_descriotion']}>
        {intl.formatMessage({ id: `decentralized.item.${index}.description` })}
      </p>
    </article>
  );
};
