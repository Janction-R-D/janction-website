import React from 'react';
import { Modal, Form, Input, Button, Divider } from 'antd';
import {
  GoogleOutlined,
  GithubOutlined,
  WalletOutlined,
  ChromeOutlined,
} from '@ant-design/icons';
import styles from './index.less';
import RainbowConnect from '../RainbowConnect';
// import video from '@/assets/videos/login.mp4';

const LoginModal = ({ open, onCancel, setLoading }) => {
  const [form] = Form.useForm();

  const handleLogin = (values) => {
    console.log('Logging in with:', values);
    // aquí conectas con tu backend
  };

  return (
    <Modal
      open={open}
      footer={null}
      closable={false}
      className={styles.loginModal}
      width={800}
      centered={true}
    >
      <div className={styles.modalContent}>
        <div className={styles.left}>
          <h2>Welcome back to Janction</h2>
          <p>Sign in to continue your journey</p>
          <div className={styles.socialButtons}>
            <Button size="large" className={styles.btn_icon}>
              <RainbowConnect setLoading={setLoading} />
            </Button>

            <Button
              icon={<ChromeOutlined />}
              size="large"
              className={styles.btn_icon}
            />
          </div>
          <div className={styles.divider_box}>
            <Divider plain>Or use your email</Divider>
          </div>
          <Form
            form={form}
            onFinish={handleLogin}
            layout="vertical"
            className={styles.form}
          >
            <Form.Item name="email" rules={[{ required: true }]}>
              <Input className={styles['input-search']} placeholder="Email" />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[{ required: true, message: 'password is required' }]}
            >
              <Input.Password
                className={styles['input-search']}
                placeholder="Password"
              />
            </Form.Item>

            <div className={styles.button_box}>
              <Button
                type="primary"
                htmlType="submit"
                block
                className={styles.button}
              >
                Login{' '}
                <div className={styles['icon']}>
                  <i
                    className="iconfont icon-next"
                    style={{ fontSize: '10px' }}
                  />
                </div>
              </Button>
            </div>
          </Form>
          <div className={styles.footerLinks}>
            <a>Sign up</a> | <a>Forgot Password?</a>
          </div>
        </div>

        <div className={styles.right}>
          <span className={styles.closeIcon} onClick={onCancel}>
            ✕
          </span>
          <div className={styles.imageWrapper}>
            <video
              src={'/videos/login.mp4'}
              autoPlay
              loop
              muted
              playsInline
              className={styles.video}
            />
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default LoginModal;
