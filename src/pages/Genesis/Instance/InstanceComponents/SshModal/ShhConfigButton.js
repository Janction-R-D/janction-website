import { Button, message } from 'antd';
import styles from './index.less';
export default function SshConfigButton({ data, resourceId }) {
  const { host, port, user } = data || {};
  const handleCopy = () => {
    if (!host) {
      message.warning('SSH CODE is missing, please refresh and try again');
      return;
    }
    const sshConfig = `Host ${resourceId}
     HostName ${host}
     Port ${port}
     User ${user}
    `;

    navigator.clipboard
      .writeText(sshConfig)
      .then(() => {
        message.success('SSH config copied to clipboard!');
      })
      .catch(() => {
        message.error('Failed to copy.');
      });
  };

  return (
    <Button
      type="primary"
      onClick={handleCopy}
      className={styles['connect-btn']}
    >
      Copy SSH Config
    </Button>
  );
}
