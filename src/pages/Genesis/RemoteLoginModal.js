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
      className={styles['modal']}
      bodyStyle={{ backgroundColor: 'white' }}
      footer={false}
    >
      <Form className={styles['form']}>
        <header>
          <p className={styles['text-title']}>连接 - V100-8C-32G</p>
          <CloseOutlined
            className={styles['icon-close']}
            onClick={() => setShowModal(false)}
          />
        </header>
        <div className={styles['methods']}>
          <div className={styles['btn']}>
            <div className={styles['btn-text']}>SSH</div>
          </div>
          <div className={styles[('btn', 'active-method')]}>
            <div className={styles['btn-text']}>SFTP</div>
          </div>
        </div>
        <div className={styles['group-label']}>
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
        <div className={styles[('method-links ', ' group-label')]}>
          <p>连接方式</p>
          <div className={styles['method-box']}>
            <section className={styles['method-link-option']}>
              <p
                onClick={() =>
                  setLinkMode({
                    name: 'web',
                    options: ['Web SFTP', ' Web SMTP'],
                  })
                }
                className={
                  linkMode.name === 'web' ? styles['active-method-link'] : ''
                }
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
                  linkMode.name === 'client' ? styles['active-method-link'] : ''
                }
              >
                <DesktopOutlined />
                客户端
              </p>
            </section>
            {linkMode.options.map((item, index) => (
              <label className={styles['method-link-label']} key={index}>
                <input
                  type="radio"
                  name={linkMode.name}
                  value={item}
                  id={item}
                  defaultChecked={index === 0}
                  data-id="web"
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
        <div className={styles['group-label']}>
          <p>记住选择</p>
          <div className={styles['terms']}>
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
