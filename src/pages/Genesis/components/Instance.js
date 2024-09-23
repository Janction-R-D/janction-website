import { useState, useRef } from 'react';
import JanctionTable from '@/components/JanctionTable';
import SearchInput from '@/components/SeachInput';
import { Tooltip, Tag, Button, Space, Col, Row } from 'antd';
import { QuestionCircleOutlined, ReloadOutlined } from '@ant-design/icons';
import { history } from 'umi';
import styles from './Instance.less';
import { custom } from 'viem';

export default function Instance() {
  const tableRef = useRef();
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const onSelectChange = (newSelectedRowKeys) => {
    console.log('selectedRowKeys changed: ', newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };
  // 选择框
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
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
            <div className='status-created'>created</div>
          ) : text === 'allow' ? (
            <div className="status-allow">allow</div>
          ) : text === 'refuse' ? (
            <div className='status-refuse'>refuse</div>
          ) : text === 'offline' ? (
            <div className='status-offline'>offline</div>
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
      key: 'tags',
      dataIndex: 'tags',
      width: 80,
      render: (_, { tags }) => (
        <>
          {tags.map((tag) => {
            let color = tag.length > 5 ? 'geekblue' : 'green';
            if (tag === 'loser') {
              color = 'volcano';
            }
            return (
              <Tag color={color} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
      title: 'Payment method',
      dataIndex: 'age',
      key: 'age',
      width: 80,
    },
    {
      title: 'Release time / Downtime',
      key: 'action',
      width: 180,
    },
    {
      title: 'SSH login',
      key: 'action',
      width: 80,
    },
    {
      title: 'Quick tools',
      key: 'action',
      width: 80,
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
  const data = [
    {
      key: '1',
      name: 'Instance ID',
      status: 'created',
      specification: 'c5.large',
      disk: '100G',
      age: 32,
      address: 'New York No. 1 Lake Park',
      tags: ['nice', 'developer'],
    },
    {
      key: '2',
      name: 'Jim Green',
      status: 'allow',
      specification: 'c5.large',
      disk: '100G',
      age: 42,
      address: 'London No. 1 Lake Park',
      tags: ['loser'],
    },
    {
      key: '3',
      name: 'Joe Black',
      status: 'refuse',
      specification: 'c5.large',
      disk: '100G',
      age: 32,
      address: 'Sydney No. 1 Lake Park',
      tags: ['cool', 'teacher'],
    },
    {
      key: '4',
      name: 'John Bsdnf,sdlkfjlskdjflksdjflk dsf rown',
      status: 'offline',
      specification: 'c5.large',
      disk: '100G',
      age: 32,
      address: 'New York No. 1 Lake Park',
      tags: ['nice', 'developer'],
    },
    {
      key: '5',
      name: 'Jim Green',
      status: 'offline',
      specification: 'c5.large',
      disk: '100G',
      age: 42,
      address: 'London No. 1 Lake Park',
      tags: ['loser'],
    },
    {
      key: '6',
      name: 'Joe Black',
      status: 'offline',
      specification: 'c5.large',
      disk: '100G',
      age: 32,
      address: 'Sydney No. 1 Lake Park',
      tags: ['cool', 'teacher'],
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
