import React, { useCallback, useEffect, useState } from 'react';
import welcome from '@/assets/images/home/welcome.png';
import { Button, Input, message, Modal } from 'antd';
import styles from './index.less';
import { fetchInviteVerify } from '@/services/genesis';
import { history, useLocation } from 'umi';
import debounce from 'lodash/debounce';

export default function WelcomeCard() {
  const location = useLocation();

  const codeLink = location.search.split('=')[1];
  const isCodeLink = codeLink?.length > 1;
  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState(false);
  const [code, setCode] = useState(isCodeLink ? codeLink : '');
  const handleOk = () => {
    setIsOpen(true);
  };
  const handleCancel = () => {
    setIsOpen(false);
  };
  const handleChange = (e) => {
    if (error) {
      setError(false);
    }
    setCode(e.target.value);
    debounceError(e.target.value);
  };
  useEffect(() => {
    if (!isCodeLink) return;
    handleOk();
  }, []);
  const handleVerify = (code) => {
    fetchInviteVerify(code)
      .then((res) => {
        if (res?.code !== 40012 && res?.inviter) {
          history.push(`/deployNodes?inviterCode=${code}`);
          return;
        }
        message.warning(res.msg);
        setError(true);
      })
      .catch((err) => {
        message.warning('Invalid Code');
        setError(true);
      });
  };
  const debounceError = useCallback(
    debounce((value) => {
      if (!value) return;
      handleVerify(value);
    }, 2000),
    [],
  );
  const handleSubmit = () => {
    handleVerify(code);
  };
  return (
    <Modal
      open={isOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      className={styles['modal']}
      width={900}
      footer={false}
    >
      <div className={styles['modal-img']}>
        <img src={welcome} />
      </div>
      <section className={styles['modal-info']}>
        <h2>Welcome to Janction!</h2>
        <div className={styles['input-box']}>
          <Input
            defaultValue={code}
            onChange={handleChange}
            placeholder="Enter the invitation code（optional）"
            className={styles['input']}
            style={{ border: error ? '1px solid #f2933e' : '' }}
            bordered={error}
          />
          {!error ? (
            <p>*Invitation code is required</p>
          ) : (
            <p style={{ color: '#f2933e' }}>Invalid Code</p>
          )}
        </div>
        <Button
          className={styles['buy-btn']}
          disabled={code.length <= 0}
          onClick={handleSubmit}
        >
          Join Janction network
        </Button>
        <p className={styles['footer-text']}>
          Surrender your rights, <span>Enter immediately</span>
        </p>
      </section>
    </Modal>
  );
}
