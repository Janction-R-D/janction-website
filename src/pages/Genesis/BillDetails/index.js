import JanctionRangePicker from '@/components/JanctionRangePicker';
import JanctionTable from '@/components/JanctionTable';
import SearchInput from '@/components/SeachInput';
import { Col, Drawer, List, message, Row, Space } from 'antd';
import { useEffect, useMemo, useState } from 'react';
import styles from './BillDetails.less';
import { fetchBillingList } from '@/services/genesis/billings';
import { Redirect, useModel } from 'umi';
import numeral from 'numeral';

function BillDetails() {
  const { initialState } = useModel('@@initialState');
  const { isLessee = true } = initialState || {};

  const [open, setOpen] = useState(false);
  const [selectedBill, setSelectedBill] = useState({});
  const [list, setList] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    getList();
  }, [isLessee]);

  const getList = async () => {
    try {
      const res = await fetchBillingList({
        role: isLessee ? 'tenant' : 'lessor',
      });

      setList(res || []);
      const newData = res.map((item) => ({
        ...item,
        key: item.id,
      }));
      setFilteredData(res || []);
      setFilteredData(newData || []);
    } catch (error) {
      console.log('『error』', error);
    }
  };

  const total = useMemo(() => {
    let cash = 0;
    let share = 0;
    let gift = 0;
    let coupon = 0;
    filteredData.map((item) => {
      cash += item.cash_payment || 0;
      share += item.share_bonus || 0;
      gift += item.gift_money || 0;
      coupon += item.coupon || 0;
    });
    return { sum: cash + share + gift + coupon, cash, share, gift, coupon };
  }, [filteredData]);

  const handleSearch = (value) => {
    const filtered = list?.filter((instance) =>
      instance.instance_id.toLowerCase().includes(value.toLowerCase()),
    );
    setFilteredData(filtered);
  };

  const columns = [
    {
      title: 'Instance ID / Name',
      dataIndex: 'instance_id',
    },
    {
      title: 'Specification',
      dataIndex: 'specification',
    },
    {
      title: 'Status',
      dataIndex: 'status',
    },
    {
      title: 'Local disk',
      dataIndex: 'local_disk',
    },
    {
      title: 'Health Status',
      dataIndex: 'health_status',
    },
    {
      title: 'Payment method',
      dataIndex: 'payment_method',
    },
    {
      title: <div className="operation">Operation</div>,
      dataIndex: 'operation',
      render: (_, record) => (
        <Space size="middle">
          <a onClick={() => showDrawer(record)}>Billing details</a>
        </Space>
      ),
    },
  ];

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
    const unit = 'veJCT';
    return (
      <div className={styles['total-wrapper']}>
        <span>Total cost </span>
        <span
          className={[styles['value'], styles['total-value']].join(' ')}
        >{`${numeral(total?.sum).format('0.00')} ${unit}`}</span>
        <span>{` = Cash payment `}</span>
        <span className={styles['value']}>{`${numeral(total?.cash).format(
          '0.00',
        )} ${unit}`}</span>
        <span>{` + share bonus `}</span>
        <span className={styles['value']}>{`${numeral(total?.share).format(
          '0.00',
        )} ${unit}`}</span>
        <span>{` + gift money `}</span>
        <span className={styles['value']}>{`${numeral(total?.gift).format(
          '0.00',
        )} ${unit}`}</span>
        <span>{` + Coupon `}</span>
        <span className={styles['value']}>{`${numeral(total?.coupon).format(
          '0.00',
        )} ${unit}`}</span>
      </div>
    );
  };
  if (isLessee) return <Redirect to="/genesis/dashboard"></Redirect>;
  return (
    <>
      <div className={styles['title']}>Billings</div>
      <Row justify="end" align="middle">
        <Col></Col>
        <Col>
          <SearchInput onChange={(e) => handleSearch(e.target.value)} />
        </Col>
      </Row>
      <div className={styles['table-wrapper']}>
        {renderTotal()}
        <JanctionTable
          className={styles['billings-table']}
          columns={columns}
          dataSource={filteredData}
          // pagination={{
          //   pageSize: 5,
          //   position: ['bottomCenter'],
          // }}
          pagination={false}
          scroll={{ x: 'auto' }}
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
          dataSource={filteredData}
          renderItem={(item) => (
            <>
              <List.Item>
                <Row justify="space-between" align="middle">
                  <Col>Instance ID / Name</Col>
                  <Col>{item.instance_id}</Col>
                </Row>
              </List.Item>
              <List.Item>
                <Row justify="space-between" align="middle">
                  <Col>specification</Col>
                  <Col>{item.specification}</Col>
                </Row>
              </List.Item>
              <List.Item>
                <Row justify="space-between" align="middle">
                  <Col>Status</Col>
                  <Col>{item.status}</Col>
                </Row>
              </List.Item>
              <List.Item>
                <Row justify="space-between" align="middle">
                  <Col>Local disk</Col>
                  <Col>{item.local_disk}</Col>
                </Row>
              </List.Item>
              <List.Item>
                <Row justify="space-between" align="middle">
                  <Col>Health Status</Col>
                  <Col>{item.health_status}</Col>
                </Row>
              </List.Item>
              <List.Item>
                <Row justify="space-between" align="middle">
                  <Col>Payment method</Col>
                  <Col>{item.payment_method}</Col>
                </Row>
              </List.Item>
              <List.Item>
                <Row justify="space-between" align="middle">
                  <Col>Cash payment</Col>
                  <Col>{item.cash_payment}</Col>
                </Row>
              </List.Item>
              <List.Item>
                <Row justify="space-between" align="middle">
                  <Col>Share bonus</Col>
                  <Col>{item.share_bonus}</Col>
                </Row>
              </List.Item>
              <List.Item>
                <Row justify="space-between" align="middle">
                  <Col>Gift money</Col>
                  <Col>{item.gift_money}</Col>
                </Row>
              </List.Item>
              <List.Item>
                <Row justify="space-between" align="middle">
                  <Col>Coupon</Col>
                  <Col>{item.coupon}</Col>
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
