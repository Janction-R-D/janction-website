import React, { useEffect, useMemo, useState } from 'react';
import styles from './index.less';
import { Button, Divider } from 'antd';
import { AppstoreAddOutlined, ArrowUpOutlined } from '@ant-design/icons';

import Guide from './components/Guide/Guide';
import OverviewTable from './components/Overview';
import Profit from './components/profit';
import Arithmetic from './components/artihmetic';

import { fetchLessor } from '@/services/genesis';
import { useModel } from 'umi';
import { ARITHMETIC_SITUATION, convertMBtoGB } from './data';
import NTFcard from './components/NTFcard';
import VideoGrid from './components/VideoGrid';

export default function Lessor() {
  const [isOpen, setIsOpen] = useState(false);
  const [lessorsData, setLessorsData] = useState();
  const [monitorList, setMonitorList] = useState([]);
  const { code } = useModel('common');

  const percent = useMemo(() => {
    const { monthly_goal = 0, total = 0 } = lessorsData?.profit || {};
    if (monthly_goal) return (total / monthly_goal) * 100;
    return 0;
  }, [lessorsData]);

  useEffect(() => {
    getLessors();
  }, []);
  const getLessors = async () => {
    try {
      const res = await fetchLessor();
      setLessorsData(res);
      setMonitorList(res?.activites || []);
    } catch (error) {
      console.log('『error』', error);
    }
  };

  const sales_by_rep = useMemo(() => {
    const maxPrice = (lessorsData?.sales_by_rep || []).reduce(
      (max, item) => (item.price > max ? item.price : max),
      0,
    );
    return (lessorsData?.sales_by_rep || []).map((item) => {
      let brand = (item.brand || '').toLowerCase();
      const isNvidia = brand == 'nvdia';
      return {
        ...item,
        icon: brand == 'nvdia' ? 'nvidia' : brand == 'apple' ? 'macos' : brand,
        color: isNvidia ? '#76b900' : '#fff',
        percent: maxPrice ? `${(item.price / maxPrice) * 100}%` : 0,
      };
    });
  }, [lessorsData]);

  const arithmetic_situation = useMemo(() => {
    const {
      online_memory_footprint = 0,
      offline_memory_footprint = 0,
      free_memory = 0,
    } = lessorsData?.arithmetic_situation || {};
    return [
      {
        name: ARITHMETIC_SITUATION.online_memory_footprint,
        value: online_memory_footprint,
        format: convertMBtoGB(online_memory_footprint),
      },
      {
        name: ARITHMETIC_SITUATION.offline_memory_footprint,
        value: offline_memory_footprint,
        format: convertMBtoGB(offline_memory_footprint),
      },
      {
        name: ARITHMETIC_SITUATION.free_memory,
        value: free_memory,
        format: convertMBtoGB(free_memory),
      },
    ];
  }, [lessorsData]);

  const nft_sumary = useMemo(() => {
    const { ammount, detail } = lessorsData?.nft_summary || {};
    return {
      ammount: ammount || 0,
      detail: detail || [],
    };
  }, [lessorsData]);
  const overview = useMemo(() => {
    const res = lessorsData?.activities || [];
    return res;
  }, [lessorsData]);
  const onSortChange = (e) => {
    const sortField = e.target.value;
    const _monitorList = monitorList.sort(
      (a, b) => b[sortField] - a[sortField],
    );
    setMonitorList([..._monitorList]);
  };
  const onOpen = () => {
    setIsOpen(true);
  };

  return (
    <main className={styles['dashboard-wrapper']}>
      <section className={styles['header-wrapper']}>
        <header>
          <h1>Dashboard</h1>
          <Divider type="vertical" className={styles['line']} />
          <span>
            <p>Your personal speed </p>
            <p>mining node</p>
          </span>
        </header>
        <p className={styles['join-text']}>Join Janction Network</p>
        <section className={styles['buttons-box']}>
          <Button className={styles['button']} onClick={() => onOpen()}>
            Donwload App{' '}
            <span className={styles.icon}>
              <AppstoreAddOutlined />
            </span>
          </Button>
          <Guide isOpen={isOpen} setIsOpen={setIsOpen} onOpen={onOpen} />
          <Button className={styles['button']}>
            Generate Token ID{' '}
            <span className={styles.icon_rotate}>
              <ArrowUpOutlined />
            </span>
          </Button>
        </section>
      </section>
      <section className={styles['container']}>
        <section className={styles['overview-wrapper']}>
          {nft_sumary.ammount !== 0 ? (
            <NTFcard nft={nft_sumary} />
          ) : (
            <>
              <OverviewTable overview={overview} />
              <section className={styles['buttons-box']}>
                <Button className={styles['button']} onClick={() => onOpen()}>
                  Donwload App{' '}
                  <span className={styles.icon}>
                    <AppstoreAddOutlined />
                  </span>
                </Button>
                <Guide isOpen={isOpen} setIsOpen={setIsOpen} onOpen={onOpen} />
                <Button className={styles['button']}>
                  Generate Token ID{' '}
                  <span className={styles.icon_rotate}>
                    <ArrowUpOutlined />
                  </span>
                </Button>
              </section>
            </>
          )}
        </section>

        <section className={styles['container-info']}>
          <Profit
            lessorsData={lessorsData}
            getLessors={getLessors}
            percent={percent}
          />
          <Arithmetic />
        </section>
        {/* <VideoGrid /> */}
      </section>
    </main>
  );
}
