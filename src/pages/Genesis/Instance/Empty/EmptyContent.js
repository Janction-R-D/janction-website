import React from 'react';
import styles from './index.less';
import { Button, Card } from 'antd';
import { ShoppingCartOutlined } from '@ant-design/icons';
import QuickCard from '../InstanceComponents/QuickCard/QuickCard';
const cardData = [
  {
    id: 1,
    title: 'NVIDIA TX4090',
    location: 'Chicago, USA',
    cores: '8 Cores',
    memory: '16GiB',
    bandwidth: '5M',
    duration: '1 month',
    price: '9.9',
    discount: '45%',
    originalPrice: '50',
  },
  {
    id: 2,
    title: 'NVIDIA TX4090',
    location: 'Chicago, USA',
    cores: '8 Cores',
    memory: '16GiB',
    bandwidth: '5M',
    duration: '1 month',
    price: '9.9',
    discount: '45%',
    originalPrice: '50',
  },
  {
    id: 3,
    title: 'NVIDIA TX4090',
    location: 'Chicago, USA',
    cores: '8 Cores',
    memory: '16GiB',
    bandwidth: '5M',
    duration: '1 month',
    price: '9.9',
    discount: '45%',
    originalPrice: '50',
  },
  {
    id: 4,
    title: 'NVIDIA TX4090',
    location: 'Chicago, USA',
    cores: '8 Cores',
    memory: '16GiB',
    bandwidth: '5M',
    duration: '1 month',
    price: '9.9',
    discount: '45%',
    originalPrice: '50',
  },
  {
    id: 5,
    title: 'NVIDIA TX4090',
    location: 'Chicago, USA',
    cores: '8 Cores',
    memory: '16GiB',
    bandwidth: '5M',
    duration: '1 month',
    price: '9.9',
    discount: '45%',
    originalPrice: '50',
  },
];

export default function EmptyContent() {
  return (
    <Card className={styles['card-table']}>
      <header>
        <div className={styles['intro']}>
          <p className={styles['intro-title']}>
            No instance is currently available
          </p>
          <p className={styles['intro-desc']}>
            You can <span>“purchase recommended products” </span>or
            <span>“customize your purchases”</span>
          </p>
        </div>
        <Button
          className={styles['connect-btn']}
          type="primary"
          onClick={() => history.push('/genesis/purchase')}
        >
          To Puchase <ShoppingCartOutlined />
        </Button>
      </header>
      <main className={styles['cards-container']}>
        <p className={styles['title']}>Recommended Products</p>
        <section className={styles['cards']}>
          {cardData.map((card) => (
            <QuickCard key={card.id} card={card} />
          ))}
        </section>
      </main>
    </Card>
  );
}
