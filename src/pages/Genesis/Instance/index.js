import JanctionTable from '@/components/JanctionTable';
import SearchInput from '@/components/SeachInput';
import { Tag, Button, Space, Col, Row } from 'antd';
import {
  CheckCircleOutlined,
  MinusCircleOutlined,
  QuestionCircleOutlined,
} from '@ant-design/icons';
import { history } from 'umi';
import styles from './Instance.less';
import data from './Instance.json';

function Instance() {
  const columns = [
    {
      title: <div className="name">Instance ID / Name</div>,
      dataIndex: 'name',
      key: 'name',
      ellipsis: true,
      width: 160,
    },
    {
      title: <div className="status">Status</div>,
      dataIndex: 'status',
      key: 'status',
      ellipsis: true,
      width: 60,
      render: (text) => (
        <>
          {text === 'created' ? (
            <div className="status-created">created</div>
          ) : text === 'allow' ? (
            <div className="status-allow">allow</div>
          ) : text === 'refuse' ? (
            <div className="status-refuse">refuse</div>
          ) : text === 'offline' ? (
            <div className="status-offline">offline</div>
          ) : (
            <div>other</div>
          )}
        </>
      ),
    },
    {
      title: 'Specification',
      dataIndex: 'specification',
      key: 'specification',
      ellipsis: true,
      width: 120,
    },
    {
      title: 'Local Disk',
      dataIndex: 'disk',
      key: 'disk',
      ellipsis: true,
      width: 80,
    },
    {
      title: 'Health Status',
      key: 'healthstatus',
      dataIndex: 'healthstatus',
      width: 80,
      render: (text) => (
        <>
          {text === 'health' ? (
            <div className="status-allow">
              <CheckCircleOutlined /> health
            </div>
          ) : text === 'dubi' ? (
            <div className="status-question">
              <QuestionCircleOutlined /> dubi
            </div>
          ) : text === 'abno' ? (
            <div className="status-refuse">
              <MinusCircleOutlined /> abno
            </div>
          ) : (
            <div>other</div>
          )}
        </>
      ),
    },
    {
      title: 'Payment method',
      dataIndex: 'method',
      key: 'method',
      width: 80,
    },
    {
      title: 'Release time / Downtime',
      key: 'downtime',
      dataIndex: 'downtime',
      width: 180,
      render: (_, record) => (
        <div style={{ whiteSpace: 'pre' }}>{record.downtime}</div>
      ),
    },
    {
      title: 'SSH login',
      key: 'ssh',
      dataIndex: 'ssh',
      width: 80,
      render: (_, record) => (
        <>
          <div>command</div>
          <div>password</div>
        </>
      ),
    },
    {
      title: 'Quick tools',
      key: 'tools',
      dataIndex: 'tools',
      width: 80,
      render: (_, record) => <div>JupyterLab</div>,
    },
    {
      title: <div className="operation">Operation</div>,
      key: 'action',
      width: 100,
      render: (_, record) => (
        <Space size="middle">
          <a>edit</a>
          <a>monitor</a>
        </Space>
      ),
    },
  ];
  return (
    <>
      <div className={styles['title']}>My Nodes</div>
      <Row justify="space-between" align="middle">
        <Col span={12}>
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
        <Col>
          <Space>
            {/* <span>订阅GPU通知</span>
            <span>设置登录密钥</span>
            <span>小程序管理实例</span> */}
            <SearchInput />
          </Space>
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
    </>
  );
}

Instance.wrappers = ['@/wrappers/auth'];
export default Instance;
