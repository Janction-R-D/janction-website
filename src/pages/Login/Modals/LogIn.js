import React from 'react';
import { Form, Input, Button, Divider } from 'antd';
import styles from './index.less';
import RainbowConnect from '../RainbowConnect';
import { ChromeOutlined } from '@ant-design/icons';
import GoogleConnect from '../GoogleConnect';

const Login = ({
  onCancel,
  setIsFlipped,
  setLoading,
  mode,
  setMode,
  loading,
}) => {
  const [form] = Form.useForm();

  const handleLogin = (values) => {
    console.log('Logging in with:', values);
  };
  const onSign = () => {
    setIsFlipped(true);
    setMode('signup');
    console.log('signup');
  };
  const onRecover = () => {
    setIsFlipped(true);
    setMode('recover');
    console.log('recover');
  };

  return (
    <div className={`${styles.cardFront} ${styles.visible}`}>
      <div className={styles.left}>
        <h2>Welcome back to Janction</h2>
        <p>Sign in to continue your journey</p>
        <div className={styles.socialButtons}>
          <Button size="large" className={styles.btn_icon}>
            <RainbowConnect setLoading={setLoading} />
          </Button>

          <Button size="large" className={styles.btn_icon} loading={loading}>
            <GoogleConnect setLoading={setLoading} />
          </Button>
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
          <Form.Item
            name="email"
            rules={[{ required: true, message: 'email is required' }]}
          >
            <Input
              className={styles['input-search']}
              placeholder="Email"
              disabled
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: 'password is required' }]}
          >
            <Input.Password
              className={styles['input-search']}
              placeholder="Password"
              disabled
            />
          </Form.Item>
          <div className={styles.button_box}>
            <Button
              type="primary"
              htmlType="submit"
              block
              className={styles.button}
              disabled
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
          <a onClick={onSign}>Sign up</a> |{' '}
          <a onClick={onRecover}>Forgot Password?</a>
        </div>
      </div>
      <div className={styles.right}>
        <span className={styles.closeIcon} onClick={onCancel}>
          ✕
        </span>
        <div className={styles.imageWrapper}>
          <video
            src="/videos/login.mp4"
            autoPlay
            loop
            muted
            playsInline
            className={styles.video}
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
