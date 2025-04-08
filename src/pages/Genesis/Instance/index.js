import { fetchNodeList } from '@/services/genesis/instance';
import { isEmpty } from '@/utils/lang';
import { Button, Card, Col, Input, Pagination, Row, Space } from 'antd';
import { useEffect, useState } from 'react';
import { history, useModel, Redirect } from 'umi';
import JactionEmpty from '../../../components/JactionEmpty';
import styles from './index.less';
import HeaderCard from './InstanceComponents/HeaderCard';
import InstanceCard from './InstanceComponents/InstanceCard';
import InstanceTable from './instanceTable';

const initQuery = { current: 1, size: 10 };
function Instance() {
  const { initialState } = useModel('@@initialState');
  const { isLessee } = initialState || {};
  const [view, setView] = useState('table');
  const [showOverView, setShowOverView] = useState(true);
  const [query, setQuery] = useState(initQuery);
  const [summary, setSummary] = useState(null);
  const [resource, setResource] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const getAllNodes = () => {
    fetchNodeList()
      .then((res) => {
        setSummary(res?.summary || null);
        setResource(res?.resource || []);
        setFilteredData(res?.resource || []);
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    getAllNodes();
  }, []);

  const handleModal = () => {
    setShowOverView(!showOverView);
  };

  const handleSearch = (value) => {
    const filtered = resource?.filter((instance) =>
      instance.name.toLowerCase().includes(value.toLowerCase()),
    );
    setQuery({ ...query, current: 1 });
    setFilteredData(filtered);
  };
  const handleSetView = (view) => {
    if (view === 'table') {
      setView('graph');
      return;
    } else {
      setView('table');
    }
  };

  const onPageChange = (page) => {
    setQuery({ ...query, current: page });
    //Pagination Control
    const endIndex = page * query.size;
    const startINdex = endIndex - query.size;
    const filterData = resource?.slice(startINdex, endIndex);
    setFilteredData(filterData);
  };
  if (!isLessee) return <Redirect to="/genesis/nodes"></Redirect>;
  return (
    <>
      <div className={styles['title']}>
        <h1>My Instances</h1>
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
        <Row justify="space-between" style={{ gap: '12px' }} align="middle">
          <Col>
            <Space>
              <Button
                className={styles['create-btn']}
                type="primary"
                onClick={() => history.push('/genesis/purchase')}
              >
                Create
              </Button>
            </Space>
          </Col>
          <Col
            span={15}
            sm={24}
            xs={24}
            style={{ display: 'flex', gap: '16px' }}
          >
            <Input
              suffix={
                <i
                  className="iconfont icon-search"
                  style={{ fontSize: '14px' }}
                />
              }
              placeholder="You can fuzzy search for cloud servers by ID, name, and IP. Multiple keywords are separated by commas"
              onChange={(e) => handleSearch(e.target.value)}
              onPressEnter={(e) => handleSearch(e.target.value)}
              className={styles['search-input']}
            />
            <div className={styles['buttons']}>
              <Button
                className={styles['button']}
                onClick={() => handleSetView('graph')}
              >
                <i className="iconfont icon-multipleselectlist"></i>
              </Button>
              <span>|</span>
              <Button
                className={styles['button']}
                onClick={() => handleSetView('table')}
              >
                <i className="iconfont icon-listblock"></i>
              </Button>
            </div>
          </Col>
        </Row>
        {view === 'graph' && (
          <section className={styles['instances']}>
            {!isEmpty(filteredData) && (
              <>
                {filteredData?.map((instance, index) => (
                  <InstanceCard
                    key={index}
                    instance={instance}
                    getAllNodes={getAllNodes}
                  />
                ))}
                <div className={styles['pagination-wrapper']}>
                  <Pagination
                    current={query?.current}
                    pageSize={query?.size}
                    total={resource?.length}
                    showLessItems
                    onChange={onPageChange}
                  />
                </div>
              </>
            )}
            {isEmpty(filteredData) && (
              <JactionEmpty description="There are no instances currently, please add an instance." />
            )}
          </section>
        )}
        {view === 'table' && (
          <InstanceTable data={filteredData} getAllNodes={getAllNodes} />
        )}
      </Card>
    </>
  );
}

Instance.wrappers = ['@/wrappers/auth'];
export default Instance;
