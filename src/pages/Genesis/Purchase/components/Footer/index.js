import { Button, Checkbox } from 'antd';
import { useState } from 'react';
import styles from './index.less';

const Footer = (props) => {
  const { isFirst, isLast, onConfirm, onPre, onNext } = props;

  const [agree, setAgree] = useState(false);
  const onAgreeChange = (e) => {
    setAgree(e.target.checked);
  };
  return (
    <div className={styles['footer-price']}>
      <div className={styles['confirm-info']}>
        {isLast && (
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
            <Button onClick={onPre}>Previous</Button>
          </div>
        )}
        {!isLast && (
          <div className={styles['next']}>
            <Button onClick={onNext}>Next</Button>
          </div>
        )}
        {isLast && (
          <div className={styles['confirm']} onClick={onConfirm}>
            <Button>Confirm the order</Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Footer;
