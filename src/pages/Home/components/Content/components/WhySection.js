import React from 'react';
import { Card } from 'antd';
import { useIntl } from 'umi';
import whyIllustration from '@/assets/images/Home_2/why_illustration.png';
import Shadow from '@/assets/images/Home_2/shadow_2.png';
import styles from './index.less';

const mocks = [0, 1, 2, 3]; // solo índices

export default function WhySection() {
  const intl = useIntl();

  return (
    <Card className={styles['why-section']}>
      <img src={Shadow} className={styles['shadow']} />
      <section className={styles['why-section__left']}>
        <h1 className={styles['why-section__title']}>
          {intl.formatMessage({ id: 'whySection.title' })}
        </h1>
        <div className={styles['illustration__box']}>
          <img src={whyIllustration} className={styles['illustration']} />
        </div>
      </section>
      <section className={styles['why-section__content']}>
        {mocks.map((i) => (
          <CardElement
            key={i}
            icon={cardIcons[i]}
            title={intl.formatMessage({ id: `whySection.item.${i}.title` })}
            description={intl.formatMessage({
              id: `whySection.item.${i}.description`,
            })}
          />
        ))}
      </section>
    </Card>
  );
}

const cardIcons = ['gpu', 'P2Pruanjianjiancha', 'safety', 'tags'];

const CardElement = ({ icon = 'ubuntu', title, description }) => {
  return (
    <article className={styles['article']}>
      <div>
        <i className={`iconfont icon-${icon}`} style={{ fontSize: '22px' }} />
      </div>
      <div className={styles['content']}>
        <span className={styles['title']}>{title}</span>
        <span className={styles['description']}>{description}</span>
      </div>
    </article>
  );
};
