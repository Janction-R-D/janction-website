import JanctionRangePicker from '@/components/JanctionRangePicker';
import JanctionTable from '@/components/JanctionTable';
import SearchInput from '@/components/SeachInput';
import { Col, Drawer, List, Row, Space } from 'antd';
import { useEffect, useState } from 'react';
import styles from './BillDetails.less';
import { fetchBillingList } from '@/services/genesis/billings';

function BillDetails() {
  const [open, setOpen] = useState(false);
  const [selectedBill, setSelectedBill] = useState({});
  const [list, setList] = useState([]);

  useEffect(() => {
    getList();
  }, []);

  const getList = async () => {
    try {
      const res = await fetchBillingList();
      setList(res || []);
    } catch (error) {
      console.log('『error』', error);
    }
  };

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

  const renderTotal = () => {
    const cash = 180000001;
    const share = 180000001;
    const gift = 180000001;
    const coupon = 180000001;
    const unit = '¥';
    const total = cash + share + gift + coupon;
    return (
      <div className={styles['total-wrapper']}>
        <span>Total cost </span>
        <span
          className={[styles['value'], styles['total-value']].join(' ')}
        >{`${unit} ${total}`}</span>
        <span>{` = Cash payment `}</span>
        <span className={styles['value']}>{`${unit} ${cash}`}</span>
        <span>{` + share bonus `}</span>
        <span className={styles['value']}>{`${unit} ${share}`}</span>
        <span>{` + gift money `}</span>
        <span className={styles['value']}>{`${unit} ${gift}`}</span>
        <span>{` + Coupon `}</span>
        <span className={styles['value']}>{`${unit} ${coupon}`}</span>
      </div>
    );
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
      <div className={styles['table-wrapper']}>
        {renderTotal()}
        <JanctionTable
          className={styles['billings-table']}
          columns={columns}
          dataSource={list}
          // pagination={{
          //   pageSize: 5,
          //   position: ['bottomCenter'],
          // }}
          pagination={false}
        />
      </div>
      <Drawer className="drawer" width={510} onClose={onClose} open={open}>
        <div className={styles['drawer-header']}>
          <img src={require('@/assets/svgs/drawer-header.svg')} />
          <div className={styles['drawer-title']}>{selectedBill.name}</div>
        </div>
        <List
          className={styles['drawer-list']}
          header={<div>Instance</div>}
          bordered
          dataSource={list}
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

BillDetails.wrappers = ['@/wrappers/auth'];
export default BillDetails;
