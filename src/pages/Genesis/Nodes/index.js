import React, { useState } from 'react';
import styles from './index.less';
import Resources from './components/Resources';
import { Card, Radio, Pagination, Button, Col, Input, Row } from 'antd';
import data from './components/data.json';
import NodeCard from './components/Nodes';
import { history, Redirect, useModel } from 'umi';
import NodesTable from './components/NodesTable';
import Filters from './components/Filters';

const initQuery = { current: 1, size: 10 };
export default function AccessControl() {
  const [filters, setFilter] = useState({ status: 'all', word: '' });
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(4);
  const { initialState } = useModel('@@initialState');
  const { isLessee } = initialState || {};
  const filtereData = (data) => {
    return data.filter((item) => {
      return (
        (item.deviceId.includes(filters.word) ||
          item.api.includes(filters.word)) &&
        (filters.status === 'all' || item.status === filters.status)
      );
    });
  };
  const filteredData = filtereData(data).map((item, index) => ({
    ...item,
    key: index,
  }));
  const indexOfLastInstance = currentPage * itemsPerPage;
  const indexOfFirstInstance = indexOfLastInstance - itemsPerPage;
  const currentInstances = filteredData?.slice(
    indexOfFirstInstance,
    indexOfLastInstance,
  );

  if (isLessee) return <Redirect to="/genesis/instance"></Redirect>;

  return (
    <div>
      <div className={styles['title']}>
        <h1>My Nodes</h1>
      </div>
      <Resources />
      <Card className={styles['card']}>
        <div className={styles['card-header']}>
          <h2>
            Node status monitoring <i className="iconfont icon-info"></i>
          </h2>
        </div>
        <Filters styles={styles} setFilters={setFilter} filters={filters} />
        {/* <ul className={styles['nodes']}>
          {currentInstances.map((item, index) => (
            <li key={index}>
              <NodeCard />
            </li>
          ))}
        </ul> */}
        <NodesTable data={currentInstances} />
        <div className={styles['pagination-wrapper']}>
          <Pagination
            current={currentPage}
            pageSize={itemsPerPage}
            total={filteredData?.length}
            showLessItems
            onChange={(page) => setCurrentPage(page)}
          />
        </div>
      </Card>
    </div>
  );
}
