import Icons from '@/components/Icons';
import styles from './index.less';
import { useState } from 'react';
import { ConnectButton, useConnectModal } from '@rainbow-me/rainbowkit';
import { useAccount } from 'wagmi';

const questions = [
  {
    title: 'How many Nodes we have？',
    nodes: 1720,
  },
  {
    title: 'How many Jobs have we completed？',
    nodes: 13420,
  },
  {
    title: 'How many points has the user spent？',
    nodes: 720,
  },

  {
    title: 'How much computing power do we provide？',
    nodes: 20,
  },
];
const zoonList = [
  {
    az: 'AZ-AP-Tokyo',
    total: 12,
    available: 7,
  },
  {
    az: 'AZ-AP-Singapore',
    total: 12,
    available: 7,
  },
  {
    az: 'AZ-US-:Ohio',
    total: 12,
    available: 7,
  },
  {
    az: 'AZ-US-:NewYork',
    total: 12,
    available: 7,
  },
];
const Overview = (props) => {
  const [recList, setRecList] = useState([
    {
      name: '0x8e******ae23',
      userId: '0x8e******ae23',
      rented: 'AZ-AP-Tokyo NVIDIA® GeForce RTXT 4090',
    },
    {
      name: 'DEVICE-agb32e03u71a',
      deviceId: 'DEVICE-agb32e03u71a',
      completed: 100,
    },
    {
      name: '0x8e******ae23',
      userId: '0x8e******ae23',
      rented: 'AZ-AP-Tokyo NVIDIA® GeForce RTXT 4090',
    },
    {
      name: 'DEVICE-agb32e03u71a',
      deviceId: 'DEVICE-agb32e03u71a',
      completed: 100,
    },
    {
      name: '0x8e******ae23',
      userId: '0x8e******ae23',
      rented: 'AZ-AP-Tokyo NVIDIA® GeForce RTXT 4090',
    },
    {
      name: 'DEVICE-agb32e03u71a',
      deviceId: 'DEVICE-agb32e03u71a',
      completed: 100,
    },
  ]);
  const { address } = useAccount();
  const { openConnectModal } = useConnectModal();

  const onNavChange = (nav) => {};

  return (
    <div className={styles['explore-overview-container']}>
      <div className={styles['slogan']}>
        <h1>JANCTION</h1>
        <h2>AYER 2 F0R DECENTRALIZED AI</h2>
      </div>
      <section className={styles['overview']}>
        <h1>Overview</h1>
        <div className={styles['questions']}>
          <ul className="df fd_c">
            {questions.map((item) => (
              <li key={item.title}>
                <div className={styles['shadow']}> </div>
                <div className={styles['info']}>
                  <p>{item.title}</p>
                  <div className={styles['nodes']}>
                    <span className={styles['value']}>{item.nodes}</span>
                    <span>Nodes</span>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <section className={styles['this-moment']}>
        <h1>THIS MOMENT</h1>
        <div className={styles['records']}>
          <div className={styles['divider']}>
            <img src={require('@/assets/svgs/divider.svg')} alt="" />
          </div>
          <div className={styles['records-list']}>
            <ul>
              {recList.map((item) => (
                <li key={item.name}>
                  {item.userId ? (
                    <p className={styles['user-records']}>
                      <span>User </span>
                      <span className={styles['name-active']}>
                        {`${item.userId} `}
                      </span>
                      <span>rented </span>
                      <span className={styles['dev-active']}>
                        {item.rented}
                      </span>
                    </p>
                  ) : (
                    <p className={styles['device-records']}>
                      <span
                        className={styles['name-active']}
                      >{`${item.deviceId} `}</span>
                      <span>{`completed a task that consumed `}</span>
                      <span>{`${item.completed} points`}</span>
                    </p>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
      <section className={styles['availability-zone']}>
        <h1>Availability Zone</h1>
        <div className={styles['content']}>
          <table>
            <thead>
              <th>
                <td>AZ</td>
                <td>total</td>
                <td>available</td>
              </th>
            </thead>
            <tbody>
              {zoonList.map((item) => (
                <tr>
                  <td>{item.az}</td>
                  <td>{item.total}</td>
                  <td>{item.available}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <img src={require('@/assets/images/explore/earth.png')} alt="" />
        </div>
      </section>
    </div>
  );
};

export default Overview;
