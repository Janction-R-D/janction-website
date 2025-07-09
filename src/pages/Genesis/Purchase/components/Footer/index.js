import React, { useState, useMemo } from 'react';
import { Button, Checkbox, message, Modal } from 'antd';
import { WalletOutlined } from '@ant-design/icons';
import PaymentResultModal from '../../Settlement/components/payment_result';
import ModalInfo from '../../Settlement/components/ModalInfo';
import StripePayment from '../../Settlement/components/Stripe/StripePayment';
import { convertDurationToHours, getCurrency } from '@/utils/contracts';
import { empty, isEmpty } from '@/utils/lang';
import styles from './index.less';
import PaymentMethodModal from '../PaymentMethod';

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
    isWarning,
    onWarningCancel,
    onOk,
    getPrice,
    paytype,
  } = props;

  const [agree, setAgree] = useState(false);
  // const [payNowModalVisible, setPayNowModalVisible] = useState(false);
  const [visible, setVisible] = useState(false);

  const currency = useMemo(() => {
    const goal = paytype.find((item) => item.value == currencyAddress);
    return goal;
  }, [currencyAddress]);

  const total = useMemo(() => {
    const { value, unit } = formValues?.purDuration || {};
    if (isEmpty(node) || !value || empty(unit)) return 0;
    const price = getPrice() || '--';
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

  // const openPayNowModal = () => {
  //   try {
  //     onPayBefore();
  //     setPayNowModalVisible(true);
  //   } catch (err) {
  //     console.log('『err』', err);
  //   }
  // };

  const handlePayWithMetaMask = async () => {
    // setPayNowModalVisible(false);
    try {
      onPayBefore();
      onPay();
    } catch (error) {
      console.log(error);
    }
  };

  // const handlePayWithFiat = () => {
  //   setPayNowModalVisible(false);
  //   setStripeModalVisible(true);
  // };

  // const handleStripeModalClose = () => {
  //   setStripeModalVisible(false);
  // };

  return (
    <div className={styles['footer-price']}>
      <div className={styles['confirm-info']}>
        <Checkbox checked={agree} onChange={onAgreeChange}>
          <div className={styles['agree-tip']}>
            I have read and agreed to the <a>relevant service terms</a>.
          </div>
        </Checkbox>
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

        {/* <Button
          className={styles['connect-btn']}
          onClick={openPayNowModal}
          type="primary"
          disabled={tableLoading}
        >
          Pay Now <WalletOutlined className={styles['icon']} />
        </Button> */}

        {currency.value !== 'Stripe' && (
          <Button
            className={styles['connect-btn']}
            type="primary"
            onClick={handlePayWithMetaMask}
            disabled={tableLoading}
          >
            Pay with MetaMask <WalletOutlined className={styles['icon']} />
          </Button>
        )}

        {currency.value == 'Stripe' && (
          //  !allowStripe &&
          <StripePayment
            total={total}
            formValues={formValues}
            onPayBefore={onPayBefore}
            visible={visible}
            setVisible={setVisible}
            // setMainModal={setPayNowModalVisible}
            tableLoading={tableLoading}
          />
        )}

        <PaymentResultModal
          open={modalOpen}
          setOpen={setModalOpen}
          status={paymentStatus}
          onClose={() => setModalOpen(false)}
          onPay={onPay}
          setPaymentStatus={setPaymentStatus}
        />
        <ModalInfo open={isWarning} onClose={onWarningCancel} onOk={onOk} />
      </div>
    </div>
  );
};

export default Footer;
