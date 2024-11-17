import { Button, Checkbox, message } from 'antd';
import { useState } from 'react';
import styles from './index.less';

const Footer = (props) => {
  const { isFirst, isLast, isSettlement, onConfirm, onPre, onNext, onPay } =
    props;

  const [agree, setAgree] = useState(false);
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
              <span className={styles['value']}>$34.669</span>
              <div className={styles['detail']}>
                <span>Bill Details</span>
                <i className="iconfont icon-next_page"></i>
              </div>
            </div>
          </>
        )}
      </div>
      <div className={styles['btn']}>
        {!isFirst && (
          <div className={styles['pre']}>
            <Button onClick={() => onPre()}>Previous</Button>
          </div>
        )}
        {!(isSettlement || isLast) && (
          <div className={styles['next']}>
            <Button onClick={() => onNext()}>Next</Button>
          </div>
        )}
        {isLast && (
          <div className={styles['confirm']} onClick={() => onConfirm()}>
            <Button>Confirm the order</Button>
          </div>
        )}
        {isSettlement && (
          <div className={styles['pay']} onClick={() => onPay(onPayBefore)}>
            <Button>Check to pay</Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Footer;
