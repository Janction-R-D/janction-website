import { fetchNodesList } from '@/services/genesis';
import { Card, message, Pagination } from 'antd';
import { useEffect, useMemo, useState } from 'react';
import { Redirect, useModel } from 'umi';
import Filters from './components/Filters';
import NodeStats from './components/resource';
import NodeList from './components/nodeList';
import EmptyNodes from './components/empty';
import styles from './index.less';
import { getNodeStatusMatch } from './components/extra';

const initQuery = { status: 'all', word: '' };

function Nodes() {
  const [list, setList] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [filters, setFilter] = useState(initQuery);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(6); // Puedes ajustar este valor
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
    let running = 0,
      listed = 0,
      active = 0,
      total = list.length;
    list?.forEach((item) => {
      const { isRunning, isListed, isActive } = getNodeStatusMatch(item);
      if (isRunning) running += 1;
      if (isListed) listed += 1;
      if (isActive) active += 1;
    });
    return { running, listed, active, total };
  }, [list]);

  useEffect(() => {
    if (!list.length) return;
    const filterData = list.filter((node) => {
      const strFlag = node.id
        .toLowerCase()
        .includes(filters?.word.toLowerCase());
      let statusFlag = false;
      if (!filters?.status || filters?.status === 'all') statusFlag = true;
      if (filters?.status === 'listed') {
        statusFlag =
          node.status_str === 'online' &&
          node.operating_status_str === 'leisure';
      }
      if (filters?.status === 'active') {
        statusFlag =
          node.status_str === 'online' &&
          node.operating_status_str === 'leased';
      }
      if (filters?.status === 'running') {
        statusFlag =
          node.status_str === 'online' &&
          node.operating_status_str !== 'leisure' &&
          node.operating_status_str !== 'leased';
      }
      if (filters?.status === 'offline') {
        statusFlag = node.status_str !== 'online';
      }
      return strFlag && statusFlag;
    });
    setFilteredData(filterData);
    setCurrentPage(1); // Reiniciar a la primera página si se cambia el filtro
  }, [list, filters]);

  // Datos de la página actual
  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredData.slice(start, start + pageSize);
  }, [filteredData, currentPage, pageSize]);

  if (isLessee) return <Redirect to="/genesis/instance" />;

  return (
    <div className={styles['nodes-wrapper']}>
      <section className={styles['header-wrapper']}>
        <header>
          <h1>My Nodes</h1>
        </header>
      </section>
      <main className={styles['container']}>
        <NodeStats statisticData={statisticData} getList={getList} />
        {list.length > 0 ? (
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

            <NodeList data={paginatedData} getList={getList} />

            <div className={styles.pagination_wrapper}>
              <Pagination
                current={currentPage}
                pageSize={pageSize}
                total={filteredData.length}
                onChange={(page, size) => {
                  setCurrentPage(page);
                  setPageSize(size);
                }}
                showSizeChanger
                pageSizeOptions={['5', '10', '20', '50']}
              />
            </div>
          </Card>
        ) : (
          <EmptyNodes />
        )}
      </main>
    </div>
  );
}

Nodes.wrappers = ['@/wrappers/auth'];
export default Nodes;
