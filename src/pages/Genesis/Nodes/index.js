import { fetchNodesList } from '@/services/genesis';
import { Card, Pagination } from 'antd';
import { useEffect, useState } from 'react';
import { Redirect, useModel } from 'umi';
import Filters from './components/Filters';
import NodesTable from './components/NodesTable';
import Resources from './components/Resources';
import styles from './index.less';

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
      <div className={styles['title']}>
        <h1>My Nodes</h1>
      </div>
      <Resources />
      <Card className={styles['card']}>
        <div className={styles['card-header']}>
          <h2>Node status monitoring</h2>
        </div>
        <Filters styles={styles} setFilter={setFilter} filters={filters} />
        <NodesTable data={filteredData} getList={getList} />
      </Card>
    </div>
  );
}
