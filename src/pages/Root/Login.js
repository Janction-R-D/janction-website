import {
  fetchRootAuthChallenge,
  fetchRootAuthVerify,
  fetchRootRegisterChallenge,
  fetchRootRegisterVerify,
} from '@/services/root';
import { client } from '@passwordless-id/webauthn';
import { Button, message } from 'antd';
import { useEffect, useState } from 'react';
import { Redirect, useAccess, useLocation } from 'umi';
import styles from './index.less';

const Login = (props) => {
  const [loading, setLoading] = useState(false);

  const location = useLocation();
  const { reg_user_id } = location.query || {};

  const { isRootLogin } = useAccess();

  useEffect(() => {
    if (reg_user_id) {
      onRegister();
      return;
    }
    onAuth();
  }, []);

  const onRegister = async () => {
    try {
      setLoading(true);
      const response = await fetchRootRegisterChallenge(reg_user_id);

      const credential = await client.register({
        ...(response?.publicKey || {}),
        domain: response?.publicKey?.rp.id,
      });

      await fetchRootRegisterVerify(reg_user_id, credential);

      message.success('registered successfully!');

      onAuth();
    } catch (err) {
      setLoading(false);
      console.error('fail to register:', err);
    }
  };

  const onAuth = async () => {
    try {
      setLoading(true);
      const response = await fetchRootAuthChallenge();

      const credential = await client.authenticate({
        ...(response?.publicKey || {}),
        domain: response?.publicKey?.rpId,
      });

      if (credential?.response?.userHandle) {
        const userHandleBase64Decoded = atob(credential.response.userHandle);
        credential.response.userHandle = userHandleBase64Decoded;
      }

      await fetchRootAuthVerify(credential);

      message.success('login successfully!');

      window.location.replace('/root');

      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.error('login failure:', err);
    }
  };

  if (isRootLogin) return <Redirect to="/root"></Redirect>;

  return (
    <div className={styles['login-box']}>
      <h2>𝐋𝐨𝐠𝐢𝐧</h2>
      <div className={styles['submit']}>
        <Button
          loading={loading}
          ghost
          onClick={() => {
            if (loading) return;
            onAuth();
          }}
        >
          Authenticate
        </Button>
      </div>
      <p className={styles['tip']}>
        If the login window does not pop up automatically, please click the
        Authenticate button manually to log in.
      </p>
    </div>
  );
};

export default Login;
