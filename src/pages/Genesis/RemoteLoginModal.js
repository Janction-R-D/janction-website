import {
  CloseOutlined,
  DesktopOutlined,
  GlobalOutlined,
} from '@ant-design/icons';
import { Button, Card, Select, Form } from 'antd';
import styles from './RemoteLoginModal.less';
import { useState } from 'react';
import { Modal } from 'antd';

export default function RemoteLoginModal({ setShowModal, showModal }) {
  const [linkMode, setLinkMode] = useState({
    name: 'web',
    options: ['Web SFTP', ' Web SMTP'],
  });
  const options = [
    {
      value: '1',
      label: 'Not Identified',
    },
    {
      value: '2',
      label: 'pem-janction-server(ubuntu)',
    },
    {
      value: '3',
      label: 'pem-janction-server(Windows)',
    },
    {
      value: '4',
      label: 'pem-janction-server(MacBook)',
    },
  ];

  const handleOk = () => {
    setShowModal(false);
  };
  const handleCancel = () => {
    setShowModal(false);
  };
  return (
    <Modal
      open={showModal}
      onOk={handleOk}
      onCancel={handleCancel}
      className="modal"
      bodyStyle={{ backgroundColor: 'white' }}
      footer={false}
    >
      <Form className={styles['form']}>
        <header>
          <p className="text-title">连接 - V100-8C-32G</p>
          <CloseOutlined
            className={styles['icon-close']}
            onClick={() => setShowModal(false)}
          />
        </header>
        <div className="methods">
          <div className="btn">
            <Button type="text" className={styles['btn-text']}>
              SSH
            </Button>
          </div>
          <div className="btn active-method">
            <Button type="text" className={styles['btn-text']}>
              SFTP
            </Button>
          </div>
        </div>
        <div className="group-label">
          <label>
            <p>选择账号</p>
            <Select
              bordered={false}
              className={styles['modal-select']}
              labelrender={labelrender}
              defaultValue="1"
              options={options}
            />
          </label>
        </div>
        <div className="method-links  group-label">
          <p>连接方式</p>
          <div className="method-box">
            <section className="method-link-option">
              <p
                onClick={() =>
                  setLinkMode({
                    name: 'web',
                    options: ['Web SFTP', ' Web SMTP'],
                  })
                }
                className={linkMode.name === 'web' ? 'active-method-link ' : ''}
              >
                <GlobalOutlined />
                Web
              </p>
              <p
                onClick={() =>
                  setLinkMode({
                    name: 'client',
                    options: ['client FTP', ' client SMTP'],
                  })
                }
                className={
                  linkMode.name === 'client' ? 'active-method-link ' : ''
                }
              >
                <DesktopOutlined />
                客户端
              </p>
            </section>
            {linkMode.options.map((item, index) => (
              <label className="method-link-label" key={index}>
                <input
                  type="radio"
                  name={linkMode.name}
                  value={item}
                  id={item}
                  data-id="web"
                  className="show-input"
                />
                <span>{item}</span>
              </label>
            ))}
          </div>
        </div>
        <div>
          <label>
            <Select
              bordered={false}
              className={styles['modal-select']}
              labelrender={labelrender}
              defaultValue="1"
              options={[
                {
                  value: '1',
                  label: '高级选项',
                },
              ]}
            />
          </label>
        </div>
        <div className="group-label">
          <p>记住选择</p>
          <div className="terms">
            <input type="checkbox" name="check" />
            <p>下次自动登录 （右击资严连接可以重新选择）</p>
          </div>
        </div>
        <Button className={styles['btn-new']}>连接</Button>
      </Form>
    </Modal>
  );
}
const labelrender = (props) => {
  const { label, value } = props;
  if (label) {
    return <div>{value}</div>;
  }
  return <span>No option match</span>;
};
