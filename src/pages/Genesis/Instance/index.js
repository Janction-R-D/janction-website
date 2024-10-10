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

function Instance() {
  const [showOverView, setShowOverView] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(3);
  const [filteredData, setFilteredData] = useState(data2);

  const handleModal = () => {
    setShowOverView(!showOverView);
  };

  const handleSearch = (value) => {
    const filtered = data2.filter(
      (instance) =>
        instance.name.toLowerCase().includes(value.toLowerCase()) ||
        instance.PublicIp.includes(value),
    );
    setFilteredData(filtered);
  };

  // Control de paginación
  const indexOfLastInstance = currentPage * itemsPerPage;
  const indexOfFirstInstance = indexOfLastInstance - itemsPerPage;
  const currentInstances = filteredData.slice(
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
      {showOverView && <HeaderCard />}
      <Card className={styles['card-table']}>
        <Row justify="space-between" align="middle">
          <Col>
            <Space>
              <Button
                className={styles['create-btn']}
                type="primary"
                onClick={() => history.push('/genesis/create')}
              >
                Create
              </Button>
              <Button
                className={styles['create-btn']}
                style={{ width: '200px' }}
                type="primary"
                onClick={() => history.push('/genesis/create')}
              >
                Change view
              </Button>
            </Space>
          </Col>
          <Col span={12} style={{ display: 'flex', gap: '16px' }}>
            <Input
              suffix={
                <i
                  className="iconfont icon-search"
                  style={{ fontSize: '1vw' }}
                />
              }
              placeholder="Search by ID, name, or IP."
              onChange={(e) => handleSearch(e.target.value)}
              className={styles['search-input']}
            />
          </Col>
        </Row>
        <section className={styles['instances']}>
          {currentInstances.map((instance, index) => (
            <InstanceCard key={index} instance={instance} />
          ))}
          <div className={styles['pagination-wrapper']}>
            <Pagination
              current={currentPage}
              pageSize={itemsPerPage}
              total={filteredData.length}
              showLessItems
              onChange={(page) => setCurrentPage(page)}
            />
          </div>
        </section>
      </Card>
    </>
  );
}

Instance.wrappers = ['@/wrappers/auth'];
export default Instance;
