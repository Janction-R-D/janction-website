import JanctionTable from '@/components/JanctionTable';
import SearchInput from '@/components/SeachInput';
import { fetchNodeList } from '@/services/genesis/instance';
import { Card, Input, Pagination, Table } from 'antd';
import { useEffect, useState } from 'react';
import { Redirect, useModel, useIntl, FormattedMessage } from 'umi';
import styles from './index.less';
import HeaderCard from './InstanceComponents/HeaderCard';
import JanctionTip from '@/components/JanctionTip';
import Operation from './InstanceComponents/Operation';
import RefundCard from './RefundCard';

function Staking() {
  const intl = useIntl();
  const { initialState } = useModel('@@initialState');
  const { isLessee } = initialState || {};

  const [summary, setSummary] = useState(null);
  const [filteredData, setFilteredData] = useState([]);
  const [current, setCurrent] = useState(1);
  const pageSize = 8;

  const paginatedData = filteredData.slice(
    (current - 1) * pageSize,
    current * pageSize,
  );

  useEffect(() => {
    fetchNodeList()
      .then((res) => {
        setSummary(res?.summary ?? null);
        setFilteredData(res?.resources ?? []);
      })
      .catch((err) => console.error('Error fetching node list:', err));
  }, []);

  const columns = [
    {
      title: intl.formatMessage({ id: 'staking.columns.deviceId' }),
      dataIndex: 'id',
      key: 'id',
      ellipsis: true,
    },
    {
      title: intl.formatMessage({ id: 'staking.columns.status' }),
      dataIndex: 'status_str',
      key: 'status_str',
      ellipsis: true,
    },
    {
      title: intl.formatMessage({ id: 'staking.columns.memory' }),
      dataIndex: 'memory',
      key: 'memory',
      ellipsis: true,
    },
    {
      title: intl.formatMessage({ id: 'staking.columns.cooling' }),
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: intl.formatMessage({ id: 'staking.columns.withdrawable' }),
      dataIndex: 'Location',
      key: 'Location',
      ellipsis: true,
    },
    {
      title: (
        <div className="df ai_c gap10">
          <span>
            <FormattedMessage id="staking.columns.undercarriage" />
          </span>
          <JanctionTip
            placement="topRight"
            title={intl.formatMessage({
              id: 'staking.columns.undercarriageTip',
            })}
          />
        </div>
      ),
      dataIndex: 'GPUrate',
      key: 'GPUrate',
    },
    {
      title: intl.formatMessage({ id: 'staking.columns.memoryUsage' }),
      dataIndex: 'MemoryUsage',
      key: 'MemoryUsage',
    },
    {
      title: intl.formatMessage({ id: 'staking.columns.releaseDowntime' }),
      dataIndex: 'downtime',
      key: 'downtime',
      render: (_, record) => (
        <div style={{ whiteSpace: 'pre' }}>{record.downtime}</div>
      ),
    },
    {
      title: intl.formatMessage({ id: 'staking.columns.operation' }),
      key: 'action',
      render: (_, record) => <Operation record={record} />,
    },
  ];

  if (isLessee) return <Redirect to="/genesis/dashboard" />;

  return (
    <main className={styles['stake-wrapper']}>
      <div className={styles['title']}>
        <h1>
          <FormattedMessage id="staking.title" />
        </h1>
      </div>

      <HeaderCard summary={summary} />

      <Card className={styles['card-table']}>
        <div className={styles['card-header']}>
          <div>
            <span>
              <FormattedMessage id="staking.card.manageStake" />
            </span>
            <JanctionTip
              placement="topLeft"
              title={intl.formatMessage({
                id: 'staking.card.manageStakeTip',
              })}
            />
          </div>
          <Input
            suffix={
              <i
                className="iconfont icon-search"
                style={{ fontSize: '0.8rem' }}
              />
            }
            placeholder={intl.formatMessage({
              id: 'staking.search.placeholder',
            })}
            className={styles['search-input']}
          />
        </div>

        <Table
          className={styles['table']}
          columns={columns}
          dataSource={paginatedData}
          scroll={{ x: 'auto' }}
          pagination={false}
          rowKey="id"
        />

        <div className={styles.list}>
          {paginatedData?.map((item, index) => (
            <RefundCard
              key={index}
              data={{
                id: item.id,
                status: item.status_str,
                gpu: item.memory,
                cooling: item.status,
                withdrawable: item.Location,
                undercarriage: item.GPUrate,
              }}
            />
          ))}
        </div>
        <div className={styles['pagination-wrapper']}>
          <Pagination
            current={current}
            total={filteredData?.length}
            pageSize={pageSize}
            onChange={setCurrent}
            showSizeChanger={false}
          />
        </div>
      </Card>
    </main>
  );
}

Staking.wrappers = ['@/wrappers/auth'];
export default Staking;
