import {
  CloseOutlined,
  DesktopOutlined,
  GlobalOutlined,
} from '@ant-design/icons';
import { Button, Card, Select, Form } from 'antd';
import './create.less';
import { useState } from 'react';
import { Modal } from 'antd';

export default function RemoteLoginModal({ setShowModal, showModal }) {
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

  const [linkMode, setLinkMode] = useState({
    name: 'web',
    options: ['Web SFTP', ' Web SMTP'],
  });
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
      <Form style={{ color: '#000' }}>
        <header>
          <p className="text-title">连接 - V100-8C-32G</p>
          <CloseOutlined
            style={{ fontSize: '1.3rem', cursor: 'pointer' }}
            onClick={() => setShowModal(false)}
          />
        </header>
        <div className="methods">
          <div className="btn  ">
            <Button
              type="text"
              style={{
                color: '#000',
                fontWeight: 'bold',
                fontSize: '1.2rem',
              }}
            >
              SSH
            </Button>
          </div>
          <div className="btn active-method">
            <Button
              type="text"
              style={{
                color: '#000',
                fontWeight: 'bold',
                fontSize: '1.2rem',
              }}
            >
              SFTP
            </Button>
          </div>
        </div>
        <div>
          <label>
            <p>选择账号</p>
            <Select
              style={{
                width: '100%',
                border: 'none',
                outline: 'none',
                marginTop: '8px',
                borderBottom: 'solid 1px black',
                color: '#000',
              }}
              labelrender={labelrender}
              defaultValue="1"
              options={options}
            />
          </label>
        </div>
        <div className="method-links">
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

        <div
          style={{
            marginTop: '8px',
          }}
        >
          <label>
            <Select
              style={{
                width: '100%',
                border: 'none',
                outline: 'none',
                marginTop: '8px',
                borderBottom: 'solid 1px black',
                color: '#000',
              }}
              labelrender={labelrender}
              defaultValue="1"
              options={[
                {
                  value: '1',
                  label: '选择账号',
                },
              ]}
            />
          </label>
        </div>
        <div style={{ marginBlock: '8px' }}>
          <p>记住选择</p>
          <div className="terms">
            <input type="checkbox" name="check" />
            <p>下次自动登录 （右击资严连接可以重新选择）</p>
          </div>
        </div>
        <Button
          style={{
            backgroundColor: '#529340',
            color: 'white',
            width: '100%',
            marginBlock: '8px',
          }}
        >
          连接
        </Button>
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
