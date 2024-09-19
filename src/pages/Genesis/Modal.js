import { CloseOutlined } from '@ant-design/icons';
import { Button, Card, Select } from 'antd';

import './create.less';
export default function Modal({ setShowModal }) {
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
  return (
    <section className="modal-container">
      <div className="modal">
        <Card
          style={{
            width: 600,
            height: 380,
            backgroundColor: 'white',
            color: 'black',
          }}
        >
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
                labelRender={labelRender}
                defaultValue="1"
                options={options}
              />
            </label>
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
                labelRender={labelRender}
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
              <input type="checkbox" />
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
        </Card>
      </div>
    </section>
  );
}
const labelRender = (props) => {
  const { label, value } = props;
  if (label) {
    return value;
  }
  return <span>No option match</span>;
};
