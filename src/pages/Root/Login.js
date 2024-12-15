import { Button, message } from 'antd';
import styles from './index.less';
import { useMemo, useState } from 'react';
import { history, Redirect, useAccess, useModel } from 'umi';
import storage from '@/utils/storage';
import { fetchRootUserLogin } from '@/services/login';

const Login = (props) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [valid, setValid] = useState(false);
  const { initialState, setInitialState } = useModel('@@initialState');

  const { isRootLogin } = useAccess();

  const validateInputs = (callback) => {
    const newErrors = {};
    if (!username.trim()) {
      newErrors.username = 'Username is required';
    }

    if (!password.trim()) {
      newErrors.password = 'Password is required';
    }
    callback && callback(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const errors = useMemo(() => {
    let errors = { username: '', password: '' };
    if (!valid) return errors;
    validateInputs((newErrors) => (errors = newErrors));
    return errors;
  }, [valid, username, password]);

  const onLogin = async () => {
    setValid(true);
    if (!validateInputs()) {
      message.error('Validation failed. Please check your inputs.');
      return;
    }
    try {
      await fetchRootUserLogin({ username, password });
      const expires = 60 * 60 * 10 * 1000;
      const str = btoa(`${username}:${password}`);
      storage.set({
        name: 'ROOT_AUTH',
        value: `Basic ${str}`,
        expires,
      });
      setInitialState({
        ...initialState,
        rootAccount: true,
      });
      history.push('/root');
    } catch (err) {
      console.log('『err』', err);
      message.warning('Check whether the user name or password is correct!');
    }
  };

  if (isRootLogin) return <Redirect to="/root"></Redirect>;

  return (
    <div className={styles['login-box']}>
      <h2>𝐋𝐨𝐠𝐢𝐧</h2>
      <form>
        <div className={styles['user-box']}>
          <input
            type="text"
            name="username"
            value={username}
            required
            onChange={(e) => {
              setUsername(e.target.value);
              if (valid) validateInputs();
            }}
          />
          <label>Username</label>
          {errors.username && (
            <div className={styles['error']}>{errors.username}</div>
          )}
        </div>
        <div className={styles['user-box']}>
          <input
            type="password"
            name="password"
            value={password}
            required
            autocomplete="new-password"
            onChange={(e) => {
              setPassword(e.target.value);
              if (valid) validateInputs();
            }}
          />
          <label>Password</label>
          {errors.password && (
            <div className={styles['error']}>{errors.password}</div>
          )}
        </div>
        <div className={styles['submit']}>
          <Button ghost onClick={onLogin}>
            Login
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Login;
