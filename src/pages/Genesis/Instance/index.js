import JanctionTable from '@/components/JanctionTable';
import { Input, Pagination, Card, Row, Col, Space, Button } from 'antd';
import { useState, useEffect } from 'react';
import { history } from 'umi';
import styles from './index.less';
import data from './Instance.json';
import data2 from './InstanceComponents/instance2.json';
import HeaderCard from './InstanceComponents/HeaderCard';
import OperationModal from './InstanceComponents/OperationModal';
import InstanceCard from './InstanceComponents/InstanceCard';
import InstanceTable from './instanceTable';
import { fetchNodeList } from '@/services/genesis';
import useNodes from './Hooks/useNodes';
import { useModel } from 'umi';

function Instance() {
  const { initialState } = useModel('@@initialState');
  const { isLessees } = initialState || {};
  const [view, setView] = useState('table');
  const [showOverView, setShowOverView] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const { nodes } = useNodes();

  const { summary, resource } = nodes;
  const [filteredData, setFilteredData] = useState(resource);

  const handleModal = () => {
    setShowOverView(!showOverView);
  };

  const handleSearch = (value) => {
    const filtered = resource?.filter(
      (instance) =>
        instance.name.toLowerCase().includes(value.toLowerCase()) ||
        instance.PublicIp.includes(value),
    );
    setFilteredData(filtered);
  };
  const handleSetView = () => {
    if (view === 'table') {
      setView('graph');
      return;
    }
    setView('table');
  };
  console.log(filteredData);
  //Pagination Control
  const indexOfLastInstance = currentPage * itemsPerPage;
  const indexOfFirstInstance = indexOfLastInstance - itemsPerPage;
  const currentInstances = resource?.slice(
    indexOfFirstInstance,
    indexOfLastInstance,
  );

  return (
    <>
      <div className={styles['title']}>
        <h1>My Nodes</h1>
        <div>
          <i
            className={`iconfont ${
              showOverView ? 'icon-eye-close' : 'icon-eye'
            }`}
            onClick={handleModal}
          ></i>
          <p>
            {showOverView
              ? 'Close Resource Overview'
              : 'Expand Resource Overview'}
          </p>
        </div>
      </div>
      {showOverView && <HeaderCard summary={summary} />}
      <Card className={styles['card-table']}>
        <Row justify="space-between" align="middle">
          <Col>
            <Space>
              {!isLessees && (
                <Button
                  className={styles['create-btn']}
                  type="primary"
                  onClick={() => history.push('/genesis/purchase')}
                >
                  Create
                </Button>
              )}
              {isLessees && (
                <Button
                  className={styles['create-btn']}
                  type="primary"
                  onClick={() => history.push('/genesis/mount')}
                >
                  Mount
                </Button>
              )}
            </Space>
          </Col>
          <Col span={13} style={{ display: 'flex', gap: '16px' }}>
            <Input
              suffix={
                <i
                  className="iconfont icon-search"
                  style={{ fontSize: '1vw' }}
                />
              }
              placeholder="You can fuzzy search for cloud servers by ID, name, and IP. Multiple keywords are separated by commas ()"
              onChange={(e) => handleSearch(e.target.value)}
              className={styles['search-input']}
            />
            <div className={styles['buttons']}>
              <Button className={styles['button']} onClick={handleSetView}>
                <i className="iconfont icon-multipleselectlist"></i>
              </Button>
              <span>|</span>
              <Button className={styles['button']} onClick={handleSetView}>
                <i className="iconfont icon-listblock"></i>
              </Button>
            </div>
          </Col>
        </Row>
        {view === 'graph' && (
          <section className={styles['instances']}>
            {currentInstances?.map((instance, index) => (
              <InstanceCard key={index} instance={instance} />
            ))}
            <div className={styles['pagination-wrapper']}>
              <Pagination
                current={currentPage}
                pageSize={itemsPerPage}
                total={resource?.length}
                showLessItems
                onChange={(page) => setCurrentPage(page)}
              />
            </div>
          </section>
        )}
        {view === 'table' && <InstanceTable data={resource} />}
      </Card>
    </>
  );
}

Instance.wrappers = ['@/wrappers/auth'];
export default Instance;
