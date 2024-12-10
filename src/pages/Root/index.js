import {
  Button,
  Col,
  Form,
  Input,
  InputNumber,
  message,
  Row,
  Skeleton,
  Statistic,
} from 'antd';
import styles from './index.less';
import JanctionTable from '@/components/JanctionTable';
import data from './data.json';
import { useState } from 'react';
import EditModal from './EditModal';
import { DotChartOutlined } from '@ant-design/icons';

const Root = (props) => {
  const [editVisible, setEditVisible] = useState(false);
  const [record, setRecord] = useState();
  const [form] = Form.useForm();

  const onOk = () => {
    const values = form.getFieldsValue();
    alert(JSON.stringify(values));
    message.success('edit success!');
  };

  const columns = [
    {
      title: 'Primary inviter',
      dataIndex: 'name',
    },
    {
      title: 'Number of guests',
      dataIndex: 'guestsNumber',
    },
    {
      title: 'Address',
      dataIndex: 'address',
    },
    {
      title: 'Action',
      dataIndex: '',
      key: 'x',
      render: (text, rowData) => (
        <a
          onClick={() => {
            setRecord(rowData);
            setEditVisible(true);
          }}
        >
          Edit
        </a>
      ),
    },
  ];

  return (
    <div className={styles['root-container']}>
      <div className="mb20">
        <h1>Overview</h1>
      </div>
      <Row justify="middle" gutter={16}>
        <Col span={8}>
          <Statistic title="Number of NFTS sold" value={112893} />
        </Col>
        <Col span={8}>
          <Statistic title="Number of holders" value={20012} />
        </Col>
        <Col span={8}>
          <Statistic
            title="Holders receive a total of points"
            value={45040650}
          />
        </Col>
        <Col span={8}>
          <Statistic title="NFT sale proceeds" value={56939412} precision={2} />
        </Col>
        <Col span={8}>
          <Statistic title="Fee income" value={7869554} precision={2} />
        </Col>
      </Row>
      <div className="mt20">
        <div className="mb20">
          <h1>Primary inviter</h1>
        </div>
        <JanctionTable dataSource={data} columns={columns} pagination={false} />
      </div>
      <div className="mt20">
        <div className="mb20">
          <h1>Integral growth rate</h1>
        </div>
        <Skeleton.Node active>
          <DotChartOutlined style={{ fontSize: 40, color: '#bfbfbf' }} />
        </Skeleton.Node>
      </div>
      <div className="mt20">
        <div className="mb20">
          <h1>Configuration</h1>
        </div>
        <Form form={form} layout="vertical" initialValues={record}>
          <Row>
            <Col span={24}>
              <Form.Item label="Server transaction fee" name="serverFee">
                <InputNumber style={{ width: '100%' }} min={0} />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item label="NTF fee" name="ntfFee">
                <InputNumber style={{ width: '100%' }} min={0} addonAfter="%" />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Button onClick={onOk}>Save</Button>
            </Col>
          </Row>
        </Form>
      </div>

      {editVisible && (
        <EditModal
          visible={editVisible}
          record={record}
          onCancel={() => {
            setEditVisible(false);
            setRecord();
          }}
        />
      )}
    </div>
  );
};

export default Root;
