import JanctionCountDown from '@/components/JanctionCountDown';
import JanctionTable from '@/components/JanctionTable';
import { fetchMarketRent } from '@/services/genesis';
import contract from '@/utils/contract';
import { Form, message } from 'antd';
import { useEffect, useState } from 'react';
import { history } from 'umi';
import { useAccount } from 'wagmi';
import PurchaseCard from '../components/Card';
import Footer from '../components/Footer/index1';
import PayType from '../components/PayType';
import { SETTLEMENT_COLUMNS } from '../extra';
import styles from './index.less';
import { ADDRESS, PAY_CURRENCY } from '@/constant';

const Settlement = (props) => {
  const [deadline, setDeadline] = useState();

  const { formValues } = history.location.state || {};

  console.log('『formValues』', formValues);

  const [loading, setLoading] = useState(false);
  const [currency, setCurrency] = useState(ADDRESS.JCT);

  useEffect(() => {
    setDeadline(Date.now() + 20 * 60 * 1000);
  }, []);

  const onFinish = () => {
    console.log('『onFinish』', onFinish);
  };

  const onRent = async (values) => {
    try {
      await fetchMarketRent(values);
      message.success('Successful hire!');
    } catch (err) {
      console.log('『err』', err);
      throw new Error(err);
    }
  };

  const onPay = async () => {
    try {
      console.log('『values』', formValues);
      console.log('『currency』', currency);
      setLoading(true);
      await contract.rent(
        node.user_id,
        node.id,
        currency,
        formValues.purchase_duration_unit,
      );
      await onRent({
        tx_id: tx.hash,
        node_id: node.id,
        ...values,
      });
      setLoading(false);
      history.push('/genesis/instance');
    } catch (error) {
      setLoading(false);
      console.error('操作合约失败：', error);
      message.error('Operation contract failed, please try again!');
    }
  };

  return (
    <div className={styles['settlement-wrapper']}>
      <h1>
        <span>Confirm product information</span>
        <a>
          <i className="iconfont icon-pre_page"></i>
          <span>Back to modify configuration</span>
        </a>
      </h1>
      <JanctionCountDown
        deadline={deadline}
        onFinish={onFinish}
        format="mm:ss"
      />
      <PurchaseCard title="Price detail">
        <PayType value={currency} onChange={(e) => setCurrency(e)} />
        <JanctionTable
          columns={SETTLEMENT_COLUMNS}
          dataSource={[formValues?.node || {}]}
          pagination={false}
        />
      </PurchaseCard>
      <Footer isSettlement onPre={() => history.goBack()} onPay={onPay} />
    </div>
  );
};

export default Settlement;
