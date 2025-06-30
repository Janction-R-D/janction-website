import React from 'react';
import { Card } from 'antd';
import whyIllustration from '@/assets/images/Home_2/why_illustration.png';
import Shadow from '@/assets/images/Home_2/shadow_2.png';
import styles from './index.less';
import { mocks } from './mock';
export default function WhySection() {
  return (
    <Card className={styles['why-section']}>
      <img src={Shadow} className={styles['shadow']} />
      <section className={styles['why-section__left']}>
        <h1 className={styles['why-section__title']}>Why choose Janction ?</h1>
        <div className={styles['illustration__box']}>
          <img src={whyIllustration} className={styles['illustration']} />
        </div>
      </section>
      <section className={styles['why-section__content']}>
        {mocks.map((item, index) => (
          <CardElement key={index} {...item} />
        ))}
      </section>
    </Card>
  );
}

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
