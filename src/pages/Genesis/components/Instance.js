import JanctionTable from '@/components/JanctionTable';
import { Input } from 'antd';
import { Tag, Button, Space, Col, Row, Card } from 'antd';
import {
  CheckCircleOutlined,
  MinusCircleOutlined,
  QuestionCircleOutlined,
} from '@ant-design/icons';
import { history } from 'umi';
import styles from './Instance.less';
import data from './Instance.json';
import HeaderCard from './InstanceComponents/HeaderCard';
import { useState } from 'react';

export default function Instance() {
  const [showOverView, setShowOverView] = useState(true);
  const columns = [
    {
      title: <div className="name">Instance ID / Name</div>,
      dataIndex: 'name',
      key: 'name',
      ellipsis: true,
      width: 75,
    },
    {
      title: <div className="name">Cores</div>,
      dataIndex: 'Cores',
      key: 'Cores',
      ellipsis: true,
      width: 55,
    },
    {
      title: <div className="memory">Memory</div>,
      dataIndex: 'memory',
      key: 'memory',
      ellipsis: true,
      width: 60,
    },
    {
      title: 'Status',
      key: 'status',
      dataIndex: 'status',
      width: 75,
      render: (text) => (
        <>
          {text === 'Running' ? (
            <div className="status status-running">
              <i className="iconfont  icon-check"></i> Running
            </div>
          ) : text === 'Stopped' ? (
            <div className="status status-stopped">
              <i className="iconfont  icon-play_pause"></i> Stopped
            </div>
          ) : text === 'Expired' ? (
            <div className="status status-expired">
              <i className="iconfont  icon-icforbidden"></i> Expired
            </div>
          ) : text === 'Expiring Soon' ? (
            <div className="status status-expiring-soon">
              <i className="iconfont  icon-questioncircle"></i> Expiring Soon
            </div>
          ) : (
            <div>other</div>
          )}
        </>
      ),
    },
    {
      title: 'Public IP',
      dataIndex: 'PublicIp',
      key: 'PublicIp',
      ellipsis: true,
      width: 50,
    },
    {
      title: 'GPU Rate',
      dataIndex: 'GPUrate',
      key: 'GPUrate',
      width: 50,
    },

    {
      title: 'Memory Usage Rates',
      dataIndex: 'MemoryUsage',
      key: 'MemoryUsage',
      width: 50,
    },
    {
      title: 'Release time / Downtime',
      key: 'downtime',
      dataIndex: 'downtime',
      width: 100,
      render: (_, record) => (
        <div style={{ whiteSpace: 'pre' }}>{record.downtime}</div>
      ),
    },

    {
      title: <div className="operation">Operation</div>,
      key: 'action',
      width: 100,
      render: (_, record) => (
        <Space
          size="middle"
          style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}
        >
          <a>Stop</a>
          <a>Start</a>
          <a className="ellipsis">More function</a>
        </Space>
      ),
    },
  ];
  const handleModal = () => {
    setShowOverView(!showOverView);
  };
  const classname = showOverView
    ? 'iconfont icon-eye-close'
    : 'iconfont icon-eye';
  return (
    <>
      <div className={styles['title']}>
        <h1>My Nodes</h1>
        <div>
          <i className={classname} onClick={handleModal}></i>
          {showOverView ? (
            <p>Close Resource Overview</p>
          ) : (
            <p>Expand Resource Overview</p>
          )}
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
              {/* <Button>批量续费</Button>
            <Button onClick={onRefresh}><ReloadOutlined /></Button> */}
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
              placeholder="You can fuzzy search for cloud servers by ID, name, and IP. Multiple keywords are separated by commas ()"
              className={`${styles['search-input']}`}
            />
            <div className={styles['buttons']}>
              <Button className={styles['button']}>
                <i
                  className="iconfont icon-multipleselectlist"
                  style={{ fontSize: '0.8rem' }}
                ></i>
              </Button>
              <span style={{ fontSize: '0.8rem', color: '#ccf' }}>|</span>
              <Button className={styles['button']}>
                <i
                  className="iconfont icon-listblock"
                  style={{ fontSize: '0.8rem' }}
                ></i>
              </Button>
            </div>
          </Col>
        </Row>
        <JanctionTable
          className={styles['table']}
          columns={columns}
          dataSource={data}
          pagination={{
            pageSize: 5,
            position: ['bottomCenter'],
          }}
        />
      </Card>
    </>
  );
}
