import { Button, Checkbox, message } from 'antd';
import { useEffect, useMemo, useState } from 'react';
import styles from './index.less';
import { isEmpty } from '@/utils/lang';
import { PAY_CURRENCY } from '@/constant';
import { durationMultiplier } from '@/utils/contract';

const Footer = (props) => {
  const {
    loading,
    isConfirm,
    isSettlement,
    onPre,
    onConfirm,
    onPay,
    node,
    formValues,
    currencyAddress,
  } = props;

  const [agree, setAgree] = useState(false);

  const total = useMemo(() => {
    if (!formValues) return;
    const { duration } = formValues;
    console.log(duration);
    if (isEmpty(node) || !duration?.value || !duration?.unit) return 0;

    let _unitDuration;
    if (duration?.unit === 'Day') {
      _unitDuration = 0;
    } else if (duration?.unit == 'Week') {
      _unitDuration = 1;
    } else if (duration?.unit == 'Month') {
      _unitDuration = 2;
    }
    const _total =
      node?.price * duration?.value * durationMultiplier(_unitDuration, true);
    return (Number(_total) / Number(currency?.rate || 1)).toFixed(2);
  }, [node, formValues, currency]);

  const currency = useMemo(() => {
    const goal = PAY_CURRENCY.find((item) => item.value == currencyAddress);
    return goal;
  }, currencyAddress);

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
        {isSettlement && (
          <>
            <div>
              <Checkbox checked={agree} onChange={onAgreeChange}>
                <div className={styles['agree-tip']}>
                  I have read and agreed to the <a>relevant service terms</a>.
                </div>
              </Checkbox>
            </div>
            <div className={styles['price-info']}>
              <span className={styles['value']}>
                {total || 0} {currency?.label}
              </span>
              <div className={styles['detail']}>
                <span>Bill Details</span>
                <i className="iconfont icon-next_page"></i>
              </div>
            </div>
          </>
        )}
      </div>
      <div className={styles['btn']}>
        {isConfirm && (
          <div className={styles['confirm']} onClick={() => onConfirm()}>
            <Button loading={loading}>Confirm the order</Button>
          </div>
        )}
        {isSettlement && (
          <div className={styles['pre']}>
            <Button onClick={() => onPre()}>Previous</Button>
          </div>
        )}
        {isSettlement && (
          <div
            className={styles['pay']}
            onClick={() => {
              try {
                onPayBefore();
                onPay();
              } catch (err) {
                console.log('『err』', err);
              }
            }}
          >
            <Button>Check to pay</Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Footer;
