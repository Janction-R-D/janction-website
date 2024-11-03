import React, { useState } from 'react';
import styles from './index.less';
import Resources from './components/Resources';
import { Card, Radio, Pagination } from 'antd';
import NodeCard from './components/Nodes';

export default function AccessControl() {
  const [filter, setFilter] = useState('All Filter');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(16);
  const nodes = Array.from({ length: 48 }, (_, i) => i + 1);
  const indexOfLastInstance = currentPage * itemsPerPage;
  const indexOfFirstInstance = indexOfLastInstance - itemsPerPage;
  const currentInstances = nodes?.slice(
    indexOfFirstInstance,
    indexOfLastInstance,
  );
  const handleRefresh = () => {
    window.location.reload();
  };
  return (
    <div>
      <div className={styles['title']}>
        <h1>Access Control</h1>
      </div>
      <Resources />
      <Card className={styles['card']}>
        <div className={styles['card-header']}>
          <h2>
            Node status monitoring <i className="iconfont icon-info"></i>
          </h2>
          <span className={styles['refresh']} onClick={handleRefresh}>
            <i className="iconfont icon-refresh"></i>
            Refresh
          </span>
        </div>
        <div className={styles['filters']}>
          <div className={styles['band-radio-wrapper']}>
            <Radio.Group
              defaultValue="All-nodes"
              buttonStyle="solid"
              style={{
                borderRadius: '24px',
              }}
              className={styles['band-radio']}
            >
              <Radio.Button
                value="All-nodes"
                name="filter"
                onClick={() => setFilter('All-nodes')}
              >
                All nodes
              </Radio.Button>
              <Radio.Button
                value="Fault"
                name="filter"
                onClick={() => setFilter('Fault')}
              >
                Fault
              </Radio.Button>
              <Radio.Button
                value="Normal"
                name="filter"
                onClick={() => setFilter('Normal')}
              >
                Normal
              </Radio.Button>
            </Radio.Group>
          </div>
          <span className={styles['filter-button']}>{filter}</span>
        </div>
        <ul className={styles['nodes']}>
          {currentInstances.map((item, index) => (
            <li key={index}>
              <NodeCard />
            </li>
          ))}
        </ul>
        <div className={styles['pagination-wrapper']}>
          <Pagination
            current={currentPage}
            pageSize={itemsPerPage}
            total={nodes?.length}
            showLessItems
            onChange={(page) => setCurrentPage(page)}
          />
        </div>
      </Card>
    </div>
  );
}
