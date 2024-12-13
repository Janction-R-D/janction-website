import { FormInput, FormInputNumber } from '@/components/JanctionInput';
import JanctionModal from '@/components/JanctionModal';
import { Col, Form, InputNumber, Row } from 'antd';
import { useState } from 'react';
import LabelValue from './LabelValue';
import styles from './index.less';

const SplitRatioSetting = (props) => {
  const { visible, onCancel, record } = props;

  const [form] = Form.useForm();

  const Com = record?.type == 'number' ? FormInputNumber : FormInput;

  const onOk = async () => {
    const value = await form.validateFields();
    console.log('『value』', value);
  };

  return (
    <JanctionModal
      open={visible}
      title="Split ratio setting"
      centered
      width={480}
      onOk={onOk}
      onCancel={onCancel}
    >
      <Form
        form={form}
        layout="vertical"
        initialValues={record}
        className={styles['split-form']}
      >
        <Row gutter={[32, 32]}>
          <Col span={24}>
            <LabelValue title="Level 1 ratio">
              <Form.Item name="level1">
                <FormInputNumber />
              </Form.Item>
              <span>%</span>
            </LabelValue>
          </Col>
          <Col span={24}>
            <LabelValue title="Level 2 ratio">
              <Form.Item name="level2">
                <FormInputNumber />
              </Form.Item>
              <span>%</span>
            </LabelValue>
          </Col>
          <Col span={24}>
            <LabelValue title="Level 3 ratio">
              <Form.Item name="level3">
                <FormInputNumber />
              </Form.Item>
              <span>%</span>
            </LabelValue>
          </Col>
          <Col span={24}>
            <LabelValue title="Level 4 ratio">
              <Form.Item name="level4">
                <FormInputNumber />
              </Form.Item>
              <span>%</span>
            </LabelValue>
          </Col>
          <Col span={24}>
            <LabelValue title="Level 5 ratio">
              <Form.Item name="level5">
                <FormInputNumber />
              </Form.Item>
              <span>%</span>
            </LabelValue>
          </Col>
          <Col span={24}>
            <LabelValue title="Level 6 ratio">
              <Form.Item name="level6">
                <FormInputNumber />
              </Form.Item>
              <span>%</span>
            </LabelValue>
          </Col>
        </Row>
      </Form>
    </JanctionModal>
  );
};

export default SplitRatioSetting;
