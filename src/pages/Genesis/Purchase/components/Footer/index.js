import { convertDurationToHours, getCurrency } from '@/utils/contracts';
import { empty, isEmpty } from '@/utils/lang';
import { Button, Checkbox, message } from 'antd';
import { useMemo, useState } from 'react';
import styles from './index.less';
import { WalletOutlined } from '@ant-design/icons';
import PaymentResultModal from '../../Settlement/components/payment_result';

const Footer = (props) => {
  const {
    onPay,
    node,
    formValues,
    currencyAddress,
    tableLoading,
    modalOpen,
    setModalOpen,
    paymentStatus,
    setPaymentStatus,
    priceInfo,
  } = props;

  const [agree, setAgree] = useState(false);
  const currency = useMemo(() => {
    const goal = getCurrency().find((item) => item.value == currencyAddress);
    return goal;
  }, [currencyAddress]);

  const total = useMemo(() => {
    const { value, unit } = formValues?.purDuration || {};
    if (isEmpty(node) || !value || empty(unit)) return 0;
    const price = priceInfo?.price?.price_in_currency || '--';
    return (Number(price) / Number(currency?.rate || 1)).toFixed(2);
  }, [node, formValues, currency]);

  const onAgreeChange = (e) => {
    setAgree(e.target.checked);
  };

  const onPayBefore = () => {
    const tip = 'please read and agreed to the relevant service terms!';
    if (!agree) {
      message.warning(tip);
      throw new Error(tip);
    }
  };

  return (
    <div className={styles['footer-price']}>
      <div className={styles['confirm-info']}>
        <div>
          <Checkbox checked={agree} onChange={onAgreeChange}>
            <div className={styles['agree-tip']}>
              I have read and agreed to the <a>relevant service terms</a>.
            </div>
          </Checkbox>
        </div>
      </div>
      <div className={styles['btn']}>
        <div className={styles['price-info']}>
          <span className={styles['value']}>
            {tableLoading ? '--' : total || 0} {currency?.label}
          </span>
          <div className={styles['detail']}>
            <span>Bill Details</span>
            <i className="iconfont icon-next_page"></i>
          </div>
        </div>

        <Button
          className={styles['connect-btn']}
          onClick={() => {
            try {
              onPayBefore();
              onPay();
            } catch (err) {
              console.log('『err』', err);
            }
          }}
          type="primary"
          disabled={tableLoading}
        >
          Check to pay <WalletOutlined className={styles['icon']} />
        </Button>
        <PaymentResultModal
          open={modalOpen}
          setOpen={setModalOpen}
          status={paymentStatus}
          onClose={() => setModalOpen(false)}
          onPay={onPay}
          setPaymentStatus={setPaymentStatus}
        />
      </div>
    </div>
  );
};

export default Footer;

//
