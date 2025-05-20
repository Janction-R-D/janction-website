import { useEffect, useState } from 'react';
import ResourcesHeader from './components/ResourcesHeader';
import styles from './index.less';
import { Button, Divider } from 'antd';
import useLesses from '../Dashboard3/Hooks/useLesses';
import ModalUpload from './components/UploadCard/ModalUpload';
import { fetchNodeList, fetchUserConfig } from '@/services/genesis';
import QuickCard from '@/components/QuickCard/QuickCard';
import InstanceMonitor from '@/components/InstanceMonitor';
// import InstanceMonitor from './components/InstanceMonitor';
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

export default function Lessee() {
  const [avModalOpen, setAvModaOpen] = useState(false);
  const [summary, setSummary] = useState(null);
  const [userConf, setUserConf] = useState({});

  const { lessesData } = useLesses();

  useEffect(() => {
    getUserConfig();
    getAllNodes();
  }, []);
  const getUserConfig = async () => {
    try {
      const res = await fetchUserConfig();
      setUserConf(res);
      if (!res?.default_avatar_status && res?.pass_newbie_guide) {
        setAvModaOpen(true);
      }
    } catch (err) {
      console.log(err);
    }
  };
  const getAllNodes = () => {
    fetchNodeList()
      .then((res) => {
        setSummary(res?.summary || null);
      })
      .catch((err) => console.log(err));
  };
  const handleOk = () => {
    setAvModaOpen(true);
  };
  return (
    <main className={styles['dashboard-wrapper']}>
      {/* <ModalUpload
        avModalOpen={avModalOpen}
        handleOk={handleOk}
        setAvModaOpen={setAvModaOpen}
        userConf={userConf}
        setUserConf={setUserConf}
      /> */}
      <section className={styles['header-wrapper']}>
        <header>
          <h1>Dashboard</h1>
          <Divider type="vertical" className={styles['line']} />
          <span>
            <p>GPU rental service with stable </p>
            <p>service and reasonable price</p>
          </span>
        </header>
      </section>
      <section className={styles['header-resources']}>
        <ResourcesHeader summary={summary} />
      </section>
      <main className={styles['cards-container']}>
        {userConf?.last_resource_visited && (
          <>
            <p className={styles['title']}>Last visit</p>
            <section className={styles['card-monitor']}>
              <InstanceMonitor instance={userConf?.last_resource_visited} />
            </section>
          </>
        )}
        <p className={styles['title']}>Exclusive for New Users</p>
        <section className={styles['cards']}>
          {cardData.map((card) => (
            <QuickCard key={card.id} card={card} />
          ))}
        </section>
      </main>
    </main>
  );
}
