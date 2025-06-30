import React, { useState } from 'react';
import { Form, Input, Button, Row, Col, message } from 'antd';
import styles from './form.less';
import { fetchCreateInquiry } from '@/services/home';

const { TextArea } = Input;

const InquiryForm = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const onFinish = async (values) => {
    try {
      setLoading(true);
      await fetchCreateInquiry(values);
      message.success('Inquiry created successfully!');
      // form.resetFields();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <h1 className={styles.title}>Inquiry</h1>
        <p className={styles.subtitle}>
          Document and
          <br />
          technical consultation
        </p>
      </div>
      <div className={styles.right}>
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          onSubmitCapture={(e) => e.preventDefault()}
        >
          <Row gutter={24}>
            <Col span={12}>
              <Form.Item
                label="Company name"
                name="company_name"
                rules={[
                  { required: true, message: 'Please enter your company name' },
                ]}
              >
                <Input placeholder="Corporation  Janction" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Name"
                name="name"
                rules={[{ required: true, message: 'Please enter your name' }]}
              >
                <Input placeholder="Enter a name" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Email address"
                name="email_address"
                rules={[
                  { required: true, message: 'Please enter your email' },
                  { type: 'email', message: 'Invalid email address' },
                ]}
              >
                <Input placeholder="example@company.com" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Phone number" name="phone_number">
                <Input placeholder="03-1234-5678" />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                label="Usage and question contents"
                name="usage_content"
                rules={[
                  { required: true, message: 'Please describe your inquiry' },
                ]}
              >
                <TextArea
                  placeholder="Describe the functions and purposes of the agent"
                  autoSize={{ minRows: 5 }}
                />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className={styles.sendButton}
              loading={loading}
            >
              Send
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default InquiryForm;
