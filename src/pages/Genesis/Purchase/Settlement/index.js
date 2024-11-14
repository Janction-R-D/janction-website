import JanctionCountDown from '@/components/JanctionCountDown';
import styles from './index.less';
import PurchaseCard from '../components/Card';
import PayType from '../components/PayType';
import { Checkbox, Form } from 'antd';
import JanctionTable from '@/components/JanctionTable';
import { SETTLEMENT_COLUMNS } from '../extra';
import Footer from '../components/Footer';
import { history } from 'umi';

const deadline = Date.now() + 20 * 60 * 1000;

const Settlement = (props) => {
  const onFinish = () => {
    console.log('『onFinish』', onFinish);
  };

  const onPay = (callback) => {
    try {
      callback && callback();
    } catch (err) {}
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
        <Form.Item
          name="pay_type"
          rules={[{ required: true, message: 'please select pay type' }]}
        >
          <PayType />
        </Form.Item>
        <JanctionTable columns={SETTLEMENT_COLUMNS} />
      </PurchaseCard>
      <Footer isSettlement onPre={() => history.goBack()} onPay={onPay} />
    </div>
  );
};

export default Settlement;
