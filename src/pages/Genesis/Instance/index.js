import { fetchNodeList } from '@/services/genesis/instance';
import { isEmpty } from '@/utils/lang';
import {
  Button,
  Card,
  Col,
  Input,
  Pagination,
  Row,
  Segmented,
  Space,
} from 'antd';
import { useEffect, useState } from 'react';
import { history, useModel, Redirect } from 'umi';
import JactionEmpty from '../../../components/JactionEmpty';
import styles from './index.less';
import HeaderCard from './InstanceComponents/HeaderCard';
import InstanceCard from './InstanceComponents/InstanceCard';
import InstanceTable from './instanceTable';
import {
  AppstoreOutlined,
  BarsOutlined,
  ShoppingCartOutlined,
} from '@ant-design/icons';
import EmptyContent from './Empty/EmptyContent';
import InstanceMonitor from '@/components/InstanceMonitor';

const initQuery = { current: 1, size: 5 };
function Instance() {
  const { initialState } = useModel('@@initialState');
  const { isLessee } = initialState || {};
  const [view, setView] = useState('Kanban');
  const [showOverView, setShowOverView] = useState(true);
  const [query, setQuery] = useState(initQuery);
  const [summary, setSummary] = useState(null);
  const [resource, setResource] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const getAllNodes = () => {
    fetchNodeList()
      .then((res) => {
        setSummary(res?.summary || null);
        setResource(res?.resources || []);
        setFilteredData(res?.resources || []);
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
    if (view === 'Kanban') {
      setView('List');
      return;
    } else {
      setView('Kanban');
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
      <section className={styles['header-wrapper']}>
        <header>
          <h1>My Instances</h1>
        </header>
      </section>

      {showOverView && (
        <HeaderCard summary={summary} getAllNodes={getAllNodes} />
      )}
      {filteredData.length >= 1 ? (
        <Card className={styles['card-table']}>
          <Row justify="space-between" style={{ gap: '12px' }} align="middle">
            <Col
              span={15}
              sm={24}
              xs={24}
              style={{
                display: 'flex',
                gap: '16px',
                borderBottom: '1px solid #767676',
                padding: '0px 14px 12px',
              }}
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
                  className={styles['connect-btn']}
                  type="primary"
                  onClick={() => history.push('/genesis/purchase')}
                >
                  To Purchase <ShoppingCartOutlined />
                </Button>
                <Segmented
                  vertical
                  options={[
                    { value: 'List', icon: <BarsOutlined /> },
                    { value: 'Kanban', icon: <AppstoreOutlined /> },
                  ]}
                  onChange={handleSetView}
                  style={{ border: '1px solid #ccc' }}
                />
              </div>
            </Col>
          </Row>
          {view === 'List' && (
            <section className={styles['instances']}>
              {!isEmpty(filteredData) && (
                <>
                  {filteredData?.map((instance, index) => (
                    <InstanceMonitor
                      key={index}
                      instance={instance}
                      getAllNodes={getAllNodes}
                    />
                    // <InstanceCard
                    //   key={index}
                    //   instance={instance}
                    //   getAllNodes={getAllNodes}
                    // />
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
          {view === 'Kanban' && (
            <InstanceTable data={filteredData} getAllNodes={getAllNodes} />
          )}
        </Card>
      ) : (
        <EmptyContent />
      )}
    </>
  );
}

Instance.wrappers = ['@/wrappers/auth'];
export default Instance;
