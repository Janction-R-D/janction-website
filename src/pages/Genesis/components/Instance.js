import { useState, useRef } from "react";
import JanctionTable from "@/components/JanctionTable";
import SearchInput from "@/components/SeachInput";
import { Tooltip, Tag, Button, Space, Col, Row } from 'antd';
import { QuestionCircleOutlined, ReloadOutlined } from '@ant-design/icons';
import { history } from 'umi';

export default function Instance() {
  const tableRef = useRef();
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const onSelectChange = (newSelectedRowKeys) => {
    console.log('selectedRowKeys changed: ', newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  const columns = [
    {
      title: '实例ID/名称',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <a>{text}</a>,
    },
    {
      title: '状态',
      dataIndex: 'age',
      key: 'age',
      filters: [
        {
          text: 'Joe',
          value: 'Joe',
        },
        {
          text: 'Jim',
          value: 'Jim',
        },
      ],
      onFilter: (value, record) => record.name.indexOf(value) === 0,
    },
    {
      title: '规格详情',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: '本地磁盘',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: '健康状态',
      key: 'tags',
      dataIndex: 'tags',
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
      title: '付费方式',
      dataIndex: 'age',
      key: 'age',
      filters: [
        {
          text: 'Joe',
          value: 'Joe',
        },
        {
          text: 'Jim',
          value: 'Jim',
        },
      ],
      onFilter: (value, record) => record.name.indexOf(value) === 0,
    },
    {
      title: (
        <>
          释放时间/停机时间
          <Tooltip title="租用时间/到期时间">
            <QuestionCircleOutlined />
          </Tooltip>
        </>
      ),
      key: 'action',
    },
    {
      title: 'SSH登录',
      key: 'action',
    },
    {
      title: '快捷工具',
      key: 'action',
    },
    {
      title: '操作',
      key: 'action',
    },
  ];
  const data = [
    {
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
      tags: ['nice', 'developer'],
    },
    {
      key: '2',
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park',
      tags: ['loser'],
    },
    {
      key: '3',
      name: 'Joe Black',
      age: 32,
      address: 'Sydney No. 1 Lake Park',
      tags: ['cool', 'teacher'],
    },
  ];
  const onRefresh = () => {
    console.log('refresh', tableRef);
    tableRef.current.reload()
  };
  return (
    <>
      <Space>
        <blod>容器实例</blod>
        <span>实例连续关机15天会释放实例，实例释放会导致数据清空且不可恢复，释放前实例在数据在。</span>
      </Space>
      <Row>
        <Col span={12}>
          <Space>
            <Button type="primary" onClick={() => history.push('/genesis/create')}>租用新实例</Button>
            <Button>批量续费</Button>
            <Button onClick={onRefresh}><ReloadOutlined /></Button>
          </Space>
        </Col>
        <Row justify="end">
          <Col span={24}>
            <Space>
              <span>订阅GPU通知</span>
              <span>设置登录密钥</span>
              <span>小程序管理实例</span>
              <SearchInput />
            </Space>
          </Col>
        </Row>
      </Row>
      <JanctionTable tableRef={tableRef} rowSelection={rowSelection} columns={columns} dataSource={data} />
    </>
  );
}
