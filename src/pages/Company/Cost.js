import React from 'react';
import styles from './index.less';
import { useIntl } from 'umi';

const dcItems = [
  {
    titleId: 'cost.item.otherExpenses.title',
    descriptionId: 'cost.item.otherExpenses.description',
    icon: 'file-transfer-line',
  },
  {
    titleId: 'cost.item.returnPolicy.title',
    descriptionId: 'cost.item.returnPolicy.description',
    icon: 'sand-clock',
  },
  {
    titleId: 'cost.item.deliveryTime.title',
    descriptionId: 'cost.item.deliveryTime.description',
    icon: 'clock1',
  },
];

export default function Cost() {
  const intl = useIntl();

  return (
    <section className={styles['cost-wrapper']}>
      <h2>{intl.formatMessage({ id: 'cost.title' })}</h2>

      <section className={styles['dc-cards']}>
        {dcItems.map((item, index) => (
          <DCard
            key={index}
            title={intl.formatMessage({ id: item.titleId })}
            description={intl.formatMessage({ id: item.descriptionId })}
            icon={item.icon}
          />
        ))}
      </section>
    </section>
  );
}

const DCard = ({ title, description, icon }) => {
  return (
    <article className={styles['dc-card']}>
      <div className={styles['dc-card-icon']}>
        <i className={`iconfont icon-${icon}`} />
      </div>
      <div className={styles['dc-card__content']}>
        <div className={styles['dc-card__header']}>
          <span className={styles['dc-card_title']}>{title}</span>
        </div>
        <p className={styles['dc-card_descriotion']}>{description}</p>
      </div>
    </article>
  );
};
