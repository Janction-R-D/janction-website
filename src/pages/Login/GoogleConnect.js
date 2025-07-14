import { message } from 'antd';
import {
  ChromeOutlined,
  GoogleCircleFilled,
  GoogleOutlined,
} from '@ant-design/icons';
import styles from './index.less';
import { fetchOauth } from '@/services/login';
const origin = location.origin;
const CALLBACK_URL = `${origin}/login`;

export default function GoogleConnect({ setLoading }) {
  const handleGoogleLogin = async () => {
    setLoading(true);
    const payload = {
      platform: 'google',
      callback: CALLBACK_URL,
    };
    try {
      const { auth_url } = await fetchOauth(payload);
      if (auth_url) {
        window.location.href = auth_url;
      }
    } catch (err) {
      message.error('Could not start the login flow');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <a className={styles['login-btn']} onClick={handleGoogleLogin}>
      <GoogleOutlined />
    </a>
  );
}
