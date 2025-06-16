import { message } from 'antd';
import { GithubOutlined } from '@ant-design/icons';
import styles from './index.less';
import { fetchOauth } from '@/services/login';
const origin = location.origin;
const CALLBACK_URL = `${origin}/login`;

export default function GithubConnect({ setLoading }) {
  const handleGoogleLogin = async () => {
    setLoading(true);
    const payload = {
      platform: 'github',
      callback: CALLBACK_URL,
    };
    try {
      const { auth_url } = await fetchOauth(payload);
      if (auth_url) {
        window.location.href = auth_url;
      }
    } catch (err) {
      message.error('Operation failed, please try again later!');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <a className={styles['login-btn']} onClick={handleGoogleLogin}>
      <GithubOutlined />
    </a>
  );
}
