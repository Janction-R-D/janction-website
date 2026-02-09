/**
 * 卡片申请表单组件
 * 职责：纯UI展示，接收props，触发回调
 *
 * 艹，这个表单只负责展示和数据收集，不处理业务逻辑
 */

import React from 'react';
import { Form, Input, Select, Button, Row, Col } from 'antd';
import { CreditCardOutlined } from '@ant-design/icons';
import { CURRENCIES, CARD_TYPE } from '@/utils/tevau';
import { emailRule, phoneRule } from '@/utils/tevau/validator';
import styles from './index.less';

const { Option } = Select;

const CardApplicationForm = ({
  onSubmit,
  loading = false,
  initialValues = {},
}) => {
  const [form] = Form.useForm();

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      onSubmit?.(values);
    } catch (err) {
      console.error('Form validation failed:', err);
    }
  };

  return (
    <div className={styles.formContainer}>
      <div className={styles.formHeader}>
        <CreditCardOutlined className={styles.icon} />
        <h2>Apply for Virtual Card</h2>
        <p>Fill in the form below to apply for your virtual card</p>
      </div>

      <Form
        form={form}
        layout="vertical"
        initialValues={{
          cardType: CARD_TYPE.VIRTUAL,
          currency: 'USD',
          ...initialValues,
        }}
        onFinish={handleSubmit}
        className={styles.form}
      >
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="First Name"
              name="firstName"
              rules={[
                { required: true, message: 'Please enter first name' },
                { min: 2, message: 'Minimum 2 characters' },
                { pattern: /^[a-zA-Z\s]+$/, message: 'Only letters allowed' },
              ]}
            >
              <Input placeholder="Enter your first name" />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              label="Last Name"
              name="lastName"
              rules={[
                { required: true, message: 'Please enter last name' },
                { min: 2, message: 'Minimum 2 characters' },
                { pattern: /^[a-zA-Z\s]+$/, message: 'Only letters allowed' },
              ]}
            >
              <Input placeholder="Enter your last name" />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item
          label="Email Address"
          name="email"
          rules={[{ required: true, message: 'Please enter email' }, emailRule]}
        >
          <Input placeholder="your@email.com" type="email" />
        </Form.Item>

        <Form.Item
          label="Phone Number"
          name="phone"
          rules={[
            { required: true, message: 'Please enter phone number' },
            phoneRule,
          ]}
        >
          <Input placeholder="+1 234 567 8900" />
        </Form.Item>

        <Form.Item
          label="Card Type"
          name="cardType"
          rules={[{ required: true }]}
        >
          <Select disabled>
            <Option value={CARD_TYPE.VIRTUAL}>Virtual Card</Option>
          </Select>
        </Form.Item>

        <Form.Item
          label="Card Currency"
          name="currency"
          rules={[{ required: true, message: 'Please select currency' }]}
        >
          <Select placeholder="Select currency">
            {CURRENCIES.map((curr) => (
              <Option key={curr.value} value={curr.value}>
                {curr.label} ({curr.symbol})
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item className={styles.submitBtn}>
          <Button
            type="primary"
            htmlType="submit"
            loading={loading}
            block
            size="large"
          >
            Submit Application
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default CardApplicationForm;
