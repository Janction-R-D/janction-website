import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Divider, message, Statistic } from 'antd';
import styles from './index.less';
import RainbowConnect from '../RainbowConnect';
import GoogleConnect from '../GoogleConnect';
import GithubConnect from '../GithubConnect';
import {
  fetchEmailLogin,
  fetchProviderLog,
  fetchVerifyCode,
} from '@/services/login';
import LoginButton from './LoginButton';
import storage from '@/utils/storage';
import { history, useModel } from 'umi';
import { expires } from '@/utils/lang';
const origin = location.origin;
const CALLBACK_URL = `${origin}/login`;
const { Countdown } = Statistic;

const Login = ({
  onCancel,
  setIsFlipped,
  setLoading,
  mode,
  setMode,
  loading,
}) => {
  const { setInitialState, initialState } = useModel('@@initialState');
  const [form] = Form.useForm();
  const [deadline, setDeadline] = useState(null);
  const [ldng, setLdng] = useState(false);
  const [methods, setMethods] = useState([]);

  // useEffect(() => {
  //   getProviders();
  // }, []);
  // const getProviders = async () => {
  //   try {
  //     const { platforms } = await fetchProviderLog();
  //     setMethods(platforms);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  const handleLogin = async (values) => {
    setLdng(true);
    try {
      console.log('Logging in with:', values);
      const loginReq = await fetchVerifyCode(values);
      saveToken(loginReq);
    } catch (err) {
      console.log(err);
    } finally {
      setLdng(false);
    }
  };

  // const onSign = () => {
  //   setIsFlipped(true);
  //   setMode('signup');
  // };

  // const onRecover = () => {
  //   setIsFlipped(true);
  //   setMode('recover');
  // };

  const handleSendCode = async () => {
    const email = form.getFieldValue('email');
    if (!email) {
      message.warning('Please enter your email first');
      return;
    }
    const payload = {
      email,
      callback: CALLBACK_URL,
    };
    const getCode = await fetchEmailLogin(payload);
    console.log(getCode);
    console.log('Sending verification code to:', email);
    message.success('Verification code sent!');
    setDeadline(Date.now() + 120 * 1000); // 60 segundos
  };
  const saveToken = async (params) => {
    try {
      const { session, user } = params || {};
      storage.set({
        name: 'TOKEN',
        value: session.token,
        expires,
      });
      storage.set({
        name: 'USER_ACCOUNT',
        value: user,
        expires,
      });
      storage.set({
        name: 'SESSION_TYPE',
        value: 'email',
        expires,
      });

      message.success('User logged successfully!');
      setInitialState({
        ...initialState,
        sessionType: 'email',
      });
      setTimeout(() => {
        history.push('/genesis/rol', {
          type: 'google',
        });
      }, 1200);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className={`${styles.cardFront} ${styles.visible}`}>
      <div className={styles.left}>
        <h2>Welcome back to Janction</h2>
        <p>Sign in to continue your journey</p>
        <div className={styles.socialButtons}>
          <Button size="large" className={styles.btn_icon} disabled={loading}>
            <RainbowConnect setLoading={setLoading} />
          </Button>

          <Button size="large" className={styles.btn_icon} disabled={loading}>
            <GoogleConnect setLoading={setLoading} />
          </Button>

          <Button size="large" className={styles.btn_icon} disabled={loading}>
            <GithubConnect setLoading={setLoading} />
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
            rules={[{ required: true, message: 'Email is required' }]}
          >
            <Input
              className={styles['input-search']}
              placeholder="Email"
              disabled={loading}
              autoComplete="false"
            />
          </Form.Item>

          <Form.Item
            name="code"
            rules={[
              { required: true, message: 'Verification code is required' },
            ]}
          >
            <Input
              className={styles['input-search']}
              placeholder="Verification Code"
              suffix={
                deadline && deadline > Date.now() ? (
                  <Countdown
                    value={deadline}
                    format="s"
                    onFinish={() => setDeadline(null)}
                    valueStyle={{ fontSize: 12 }}
                  />
                ) : (
                  <Button
                    size="small"
                    type="link"
                    onClick={handleSendCode}
                    disabled={loading}
                  >
                    Get Code
                  </Button>
                )
              }
            />
          </Form.Item>

          <div className={styles.button_box}>
            <Button
              type="primary"
              htmlType="submit"
              block
              className={styles.button}
              loading={ldng}
            >
              Login{' '}
              <div className={styles['icon']}>
                <i
                  className="iconfont icon-next"
                  style={{ fontSize: '10px' }}
                />
              </div>
            </Button>
            {/* <LoginButton ldng={ldng} /> */}
          </div>
        </Form>

        {/* <div className={styles.footerLinks}>
          <a onClick={onSign}>Sign up</a> |{' '}
          <a onClick={onRecover}>Forgot Password?</a>
        </div> */}
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
