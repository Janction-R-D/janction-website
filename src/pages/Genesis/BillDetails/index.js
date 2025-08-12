import JanctionRangePicker from '@/components/JanctionRangePicker';
import JanctionTable from '@/components/JanctionTable';
import SearchInput from '@/components/SeachInput';
import {
  Col,
  Drawer,
  Input,
  List,
  message,
  Row,
  Space,
  TimePicker,
} from 'antd';
import { useEffect, useMemo, useState } from 'react';
import styles from './BillDetails.less';
import { fetchBillingList } from '@/services/genesis/billings';
import { Redirect, useIntl, useModel } from 'umi';
import numeral from 'numeral';
import CardBill from './components/BillCard/Card';
import { formatISODate } from '@/utils/datetime';

function BillDetails() {
  const { initialState } = useModel('@@initialState');
  const { isLessee = true } = initialState || {};
  const intl = useIntl();
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
      instance.id.toLowerCase().includes(value.toLowerCase()),
    );
    setFilteredData(filtered);
  };
  const columns = [
    {
      title: intl.formatMessage({ id: 'billing.instance' }),
      dataIndex: 'id',
    },
    {
      title: intl.formatMessage({ id: 'billing.currency' }),
      dataIndex: 'currency',
    },
    {
      title: intl.formatMessage({ id: 'billing.payment_id' }),
      dataIndex: 'payment_id',
    },
    {
      title: intl.formatMessage({ id: 'billing.amount' }),
      dataIndex: 'amount',
    },
    {
      title: intl.formatMessage({ id: 'billing.transactionHash' }),
      dataIndex: 'data',
      render: (data, record) => {
        return <span>{data?.Raw?.transactionHash || '~~'}</span>;
      },
    },
    {
      title: intl.formatMessage({ id: 'billing.type' }),
      dataIndex: 'type',
    },
    {
      title: (
        <div className="operation">
          {intl.formatMessage({ id: 'billing.operation' })}
        </div>
      ),
      dataIndex: 'operation',
      render: (_, record) => (
        <Space size="middle">
          <a onClick={() => showDrawer(record)}>
            {intl.formatMessage({ id: 'billing.details' })}
          </a>
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
    const unit = 'USTD';
    return (
      <div className={styles['total-wrapper']}>
        <span>{intl.formatMessage({ id: 'billing.total' })} </span>
        <span
          className={[styles['value'], styles['total-value']].join(' ')}
        >{`${numeral(total?.sum).format('0.00')} ${unit}`}</span>
        <span>{` = ${intl.formatMessage({ id: 'billing.cash' })} `}</span>
        <span className={styles['value']}>{`${numeral(total?.cash).format(
          '0.00',
        )} ${unit}`}</span>
        <span>{` + share bonus `}</span>
        <span className={styles['value']}>{`${numeral(total?.share).format(
          '0.00',
        )} ${unit}`}</span>
        <span>{` + ${intl.formatMessage({ id: 'billing.gift' })} `}</span>
        <span className={styles['value']}>{`${numeral(total?.gift).format(
          '0.00',
        )} ${unit}`}</span>
        <span>{` + ${intl.formatMessage({ id: 'billing.cupon' })} `}</span>
        <span className={styles['value']}>{`${numeral(total?.coupon).format(
          '0.00',
        )} ${unit}`}</span>
      </div>
    );
  };
  if (isLessee) return <Redirect to="/genesis/dashboard"></Redirect>;
  return (
    <main className={styles['billings-wrapper']}>
      <section className={styles['header-wrapper']}>
        <header>
          <h1>{intl.formatMessage({ id: 'billing.title' })}</h1>
        </header>
      </section>
      <CardBill total={total} />

      <div className={styles['table-wrapper']}>
        <Row
          justify="space-between"
          align="middle"
          className={styles['card-header']}
        >
          <div className={styles['row']}>
            <p>{intl.formatMessage({ id: 'billing.timePeriod' })}</p>
            <TimePicker
              placeholder={intl.formatMessage({ id: 'billing.allCPU' })}
              className={styles['picker']}
            />
          </div>
          <Col>
            <Input
              className={styles['input-search']}
              placeholder={intl.formatMessage({ id: 'billing.search' })}
              onChange={(e) => handleSearch(e.target.value)}
              suffix={<i className="iconfont icon-search" />}
            />
          </Col>
        </Row>
        <JanctionTable
          className={styles['billings-table']}
          columns={columns}
          dataSource={filteredData}
          pagination={false}
          scroll={{ x: 'auto' }}
        />
      </div>
      <Drawer className="drawer" width={510} onClose={onClose} open={open}>
        <div className={styles['drawer-header']}>
          <img src={require('@/assets/svgs/drawer-header.svg')} />
          <div className={styles['drawer-title']}>
            {intl.formatMessage({ id: 'billing.paymentDetails' })}
          </div>
        </div>

        <List
          className={styles['drawer-list']}
          header={
            <div>{intl.formatMessage({ id: 'billing.paymentInfo' })}</div>
          }
          bordered
          dataSource={[
            { label: 'billing.instance', value: selectedBill?.id || '~~' },
            { label: 'billing.amount', value: selectedBill?.amount || '~~' },
            {
              label: 'billing.currency',
              value: selectedBill?.currency || '~~',
            },
            {
              label: 'billing.payment_id',
              value: selectedBill?.payment_id || '~~',
            },
            { label: 'billing.type', value: selectedBill?.type || '~~' },
            {
              label: 'billing.createdAt',
              value: selectedBill?.created_at
                ? formatISODate(selectedBill.created_at)
                : '~~',
            },
            {
              label: 'billing.updatedAt',
              value: selectedBill?.updated_at
                ? formatISODate(selectedBill.updated_at)
                : '~~',
            },
            {
              label: 'billing.paidHours',
              value: selectedBill?.data?.PaidHours || '~~',
            },
            {
              label: 'billing.payer',
              value: selectedBill?.data?.Payer || '~~',
            },
            {
              label: 'billing.recipient',
              value: selectedBill?.data?.Recipient || '~~',
            },
            {
              label: 'billing.transactionHash',
              value: selectedBill?.data?.Raw?.transactionHash || '~~',
            },
            {
              label: 'billing.blockNumber',
              value: selectedBill?.data?.Raw?.blockNumber || '~~',
            },
          ]}
          renderItem={(item) => (
            <List.Item>
              <Row justify="space-between" align="middle">
                <Col>{intl.formatMessage({ id: item.label })}</Col>
                <Col>{item.value}</Col>
              </Row>
            </List.Item>
          )}
        />
      </Drawer>
    </main>
  );
}

BillDetails.wrappers = ['@/wrappers/auth'];
export default BillDetails;
