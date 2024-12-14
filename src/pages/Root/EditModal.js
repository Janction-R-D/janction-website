import { Col, Form, Input, InputNumber, message, Modal, Row } from 'antd';
import JanctionTable from '@/components/JanctionTable';
import { useRef, useState } from 'react';

const EditModal = (props) => {
  const { visible, onCancel, record } = props;
  const [form] = Form.useForm();

  const onSubmit = () => {
    const values = form.getFieldsValue();
    alert(JSON.stringify(values));
    message.success('edit success!');
    onCancel();
  };

  return (
    <Modal visible={visible} onCancel={onCancel} onOk={onSubmit}>
      <Form form={form} layout="vertical" initialValues={record}>
        <Row>
          <Col span={24}>
            <Form.Item label="Invitation code" name="code">
              <Input />
            </Form.Item>
          </Col>
          <Col>
            <h2>Fractional flow ratio</h2>
          </Col>
          <Col span={24}>
            <Form.Item label="level 1" name="level1">
              <InputNumber
                style={{ width: '100%' }}
                min={0}
                max={50}
                addonAfter="%"
              />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item label="level 2" name="level2">
              <InputNumber
                style={{ width: '100%' }}
                min={0}
                max={50}
                addonAfter="%"
              />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item label="level 3" name="level3">
              <InputNumber
                style={{ width: '100%' }}
                min={0}
                max={50}
                addonAfter="%"
              />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item label="level 4" name="level4">
              <InputNumber
                style={{ width: '100%' }}
                min={0}
                max={50}
                addonAfter="%"
              />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item label="level 5" name="level5">
              <InputNumber
                style={{ width: '100%' }}
                min={0}
                max={50}
                addonAfter="%"
              />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item label="level 6" name="level6">
              <InputNumber
                style={{ width: '100%' }}
                min={0}
                max={50}
                addonAfter="%"
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default EditModal;
