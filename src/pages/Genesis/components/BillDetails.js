import { useState, useRef } from 'react';
import JanctionTable from '@/components/JanctionTable';
import JanctionRangePicker from '@/components/JanctionRangePicker';
import { Col, Row, Space, Drawer, List } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';
import styles from './BillDetails.less';
import SearchInput from '@/components/SeachInput';

export default function Instance() {
  const [open, setOpen] = useState(false);
  const [selectedBill, setSelectedBill] = useState({});
  const columns = [
    {
      title: 'Instance ID / Name',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'Specification',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: 'Status',
      dataIndex: 'address',
      key: 'addre1ss',
    },
    {
      title: 'Local disk',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Health Status',
      key: 'act2ion',
    },
    {
      title: 'Payment method',
      key: 'Payment',
    },
    {
      title: <div className="operation">Operation</div>,
      key: 'operation',
      render: (_, record) => (
        <Space size="middle">
          <a onClick={() => showDrawer(record)}>Billing details</a>
        </Space>
      ),
    },
  ];
  const data = [
    {
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
    },
    {
      key: '2',
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park',
    },
    {
      key: '3',
      name: 'Joe Black',
      age: 32,
      address: 'Sydney No. 1 Lake Park',
    },
  ];
  const onOk = (value) => {
    console.log('onOk: ', value);
  };
  const showDrawer = (record) => {
    if (record) {
      setSelectedBill(record);
      setOpen(true);
    }
  };

  const onClose = () => {
    setOpen(false);
  };

  return (
    <>
      <div className={styles['title']}>Billings</div>
      <Row justify="space-between" align="middle">
        <Col>
          <Space>
            <span className={styles['time-period']}>Time period</span>
            <JanctionRangePicker
              showTime={{ format: 'HH:mm' }}
              format="YYYY-MM-DD HH:mm"
              onChange={(value, dateString) => {
                console.log('Selected Time: ', value);
                console.log('Formatted Selected Time: ', dateString);
              }}
              onOk={onOk}
            />
          </Space>
        </Col>
        <Col>
          <SearchInput />
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
      <Drawer className="drawer" width={510} onClose={onClose} open={open}>
        <div className={styles['drawer-header']}>
          <img src={require('@/assets/svgs/drawer-header.svg')} />
          <div className={styles['drawer-title']}>{selectedBill.name}</div>
        </div>
        <List
          className={styles['drawer-list']}
          header={<div>Instance</div>}
          bordered
          dataSource={data}
          renderItem={(item) => (
            <>
              <List.Item>
                <Row justify="space-between" align="middle">
                  <Col>Status</Col>
                  <Col>{item.age}</Col>
                </Row>
              </List.Item>
              <List.Item>
                <Row justify="space-between" align="middle">
                  <Col>Status</Col>
                  <Col>{item.age}</Col>
                </Row>
              </List.Item>
              <List.Item>
                <Row justify="space-between" align="middle">
                  <Col>Status</Col>
                  <Col>{item.age}</Col>
                </Row>
              </List.Item>
              <List.Item>
                <Row justify="space-between" align="middle">
                  <Col>Status</Col>
                  <Col>{item.age}</Col>
                </Row>
              </List.Item>
              <List.Item>
                <Row justify="space-between" align="middle">
                  <Col>Status</Col>
                  <Col>{item.age}</Col>
                </Row>
              </List.Item>
              <List.Item>
                <Row justify="space-between" align="middle">
                  <Col>Status</Col>
                  <Col>{item.age}</Col>
                </Row>
              </List.Item>
              <List.Item>
                <Row justify="space-between" align="middle">
                  <Col>Status</Col>
                  <Col>{item.age}</Col>
                </Row>
              </List.Item>
              <List.Item>
                <Row justify="space-between" align="middle">
                  <Col>Status</Col>
                  <Col>{item.age}</Col>
                </Row>
              </List.Item>
              <List.Item>
                <Row justify="space-between" align="middle">
                  <Col>Status</Col>
                  <Col>{item.age}</Col>
                </Row>
              </List.Item>
              <List.Item>
                <Row justify="space-between" align="middle">
                  <Col>Status</Col>
                  <Col>{item.age}</Col>
                </Row>
              </List.Item>
              <List.Item>
                <Row justify="space-between" align="middle">
                  <Col>Status</Col>
                  <Col>{item.age}</Col>
                </Row>
              </List.Item>
              <List.Item>
                <Row justify="space-between" align="middle">
                  <Col>Status</Col>
                  <Col>{item.age}</Col>
                </Row>
              </List.Item>
              <List.Item>
                <Row justify="space-between" align="middle">
                  <Col>Status</Col>
                  <Col>{item.age}</Col>
                </Row>
              </List.Item>
              <List.Item>
                <Row justify="space-between" align="middle">
                  <Col>Status</Col>
                  <Col>{item.age}</Col>
                </Row>
              </List.Item>
            </>
          )}
        />
      </Drawer>
    </>
  );
}
