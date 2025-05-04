import { fetchNodesList } from '@/services/genesis';
import { Card, message, Pagination } from 'antd';
import { useEffect, useMemo, useState } from 'react';
import { Redirect, useModel } from 'umi';
import Filters from './components/Filters';
import NodesTable from './components/NodesTable';
import Resources from './components/Resources';
import styles from './index.less';
import { getNodeStatusMatch } from './components/extra';
import NodeStats from './components/resource';
import NodeList from './components/nodeList';
import EmptyNodes from './components/empty';
const mockData = [
  {
    id: 'node-01',
    gpu: 'NVIDIA A100 x4',
    status: 'running',
    yesterdayReward: 12.34,
    rewarded: 154.7,
    runningTime: '36h 20m',
    listTime: '2025-05-01 09:30',
  },
  {
    id: 'node-02',
    gpu: 'NVIDIA RTX 3090 x2',
    status: 'stopped',
    yesterdayReward: 5.67,
    rewarded: 89.4,
    runningTime: '12h 10m',
    listTime: '2025-05-03 15:12',
  },
  {
    id: 'node-03',
    gpu: 'NVIDIA H100 x1',
    status: 'running',
    yesterdayReward: 9.81,
    rewarded: 103.2,
    runningTime: '72h 00m',
    listTime: '2025-04-28 21:00',
  },
];

const initQuery = { status: 'all', word: '' };
export default function Nodes() {
  const [list, setList] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [filters, setFilter] = useState(initQuery);
  const { initialState } = useModel('@@initialState');
  const { isLessee } = initialState || {};

  useEffect(() => {
    getList();
  }, []);
  const getList = async () => {
    try {
      const res = await fetchNodesList({ mine: true });

      setList(res || []);
      setFilteredData(res || []);
      setFilter(initQuery);
    } catch (error) {
      console.log('『error』', error);
    }
  };

  const statisticData = useMemo(() => {
    let running = 0;
    let listed = 0;
    let active = 0;
    list?.map((item) => {
      const { isRunning, isListed, isActive } = getNodeStatusMatch(item);
      if (isRunning) running += 1;
      if (isListed) listed += 1;
      if (isActive) active += 1;
      return item;
    });
    return { running, listed, active };
  }, [list]);

  useEffect(() => {
    if (!list.length) {
      return;
    }
    let filterData = list.filter((node) => {
      const strFlag = node.id
        .toLowerCase()
        .includes(filters?.word.toLowerCase());
      let statusFlag = false;
      if (!filters?.status || filters?.status == 'all') statusFlag = true;
      if (filters?.status == 'listed') {
        statusFlag =
          node.status_str === 'online' &&
          node.operating_status_str == 'leisure';
      }
      if (filters?.status == 'active') {
        statusFlag =
          node.status_str === 'online' && node.operating_status_str == 'leased';
      }
      if (filters?.status == 'running') {
        statusFlag =
          node.status_str === 'online' &&
          node.operating_status_str !== 'leisure' &&
          node.operating_status_str !== 'leased';
      }
      if (filters?.status == 'offline') {
        statusFlag = node.status_str !== 'online';
      }
      return strFlag && statusFlag;
    });
    setFilteredData(filterData);
  }, [list, filters]);

  if (isLessee) return <Redirect to="/genesis/instance"></Redirect>;

  return (
    <div className={styles['nodes-wrapper']}>
      <section className={styles['header-wrapper']}>
        <header>
          <h1>My Nodes</h1>
        </header>
      </section>
      <main className={styles['container']}>
        {/* <Resources statisticData={statisticData} getList={getList} />
         */}
        <NodeStats statisticData={statisticData} getList={getList} />

        {mockData.length > 0 ? (
          <Card className={styles['card']}>
            <header>
              <div className={styles['card-header']}>
                <h2>Node status monitoring</h2>
              </div>
              <Filters
                styles={styles}
                setFilter={setFilter}
                filters={filters}
              />
            </header>
            {/* <NodesTable data={filteredData} getList={getList} /> */}
            <NodeList data={mockData} />
          </Card>
        ) : (
          <EmptyNodes />
        )}
      </main>
    </div>
  );
}
