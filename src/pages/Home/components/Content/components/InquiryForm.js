import React, { useState } from 'react';
import { Form, Input, Button, Row, Col, message } from 'antd';
import styles from './form.less';
import { fetchCreateInquiry } from '@/services/home';
import { useIntl } from 'umi';

const { TextArea } = Input;

const InquiryForm = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const intl = useIntl();

  const onFinish = async (values) => {
    try {
      setLoading(true);
      await fetchCreateInquiry(values);
      message.success(intl.formatMessage({ id: 'inquiry.successMessage' }));
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
        <h1 className={styles.title}>
          {intl.formatMessage({ id: 'inquiry.title' })}
        </h1>
        <p className={styles.subtitle}>
          {intl
            .formatMessage({ id: 'inquiry.subtitle' })
            .split('\n')
            .map((line, idx) => (
              <React.Fragment key={idx}>
                {line}
                <br />
              </React.Fragment>
            ))}
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
            <Col xs={24} sm={12}>
              <Form.Item
                label={intl.formatMessage({ id: 'inquiry.companyLabel' })}
                name="company_name"
                rules={[
                  {
                    required: true,
                    message: intl.formatMessage({
                      id: 'inquiry.companyRequired',
                    }),
                  },
                ]}
              >
                <Input
                  placeholder={intl.formatMessage({
                    id: 'inquiry.companyPlaceholder',
                  })}
                />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item
                label={intl.formatMessage({ id: 'inquiry.nameLabel' })}
                name="name"
                rules={[
                  {
                    required: true,
                    message: intl.formatMessage({ id: 'inquiry.nameRequired' }),
                  },
                ]}
              >
                <Input
                  placeholder={intl.formatMessage({
                    id: 'inquiry.namePlaceholder',
                  })}
                />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item
                label={intl.formatMessage({ id: 'inquiry.emailLabel' })}
                name="email_address"
                rules={[
                  {
                    required: true,
                    message: intl.formatMessage({
                      id: 'inquiry.emailRequired',
                    }),
                  },
                  {
                    type: 'email',
                    message: intl.formatMessage({ id: 'inquiry.emailInvalid' }),
                  },
                ]}
              >
                <Input
                  placeholder={intl.formatMessage({
                    id: 'inquiry.emailPlaceholder',
                  })}
                />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item
                label={intl.formatMessage({ id: 'inquiry.phoneLabel' })}
                name="phone_number"
              >
                <Input
                  placeholder={intl.formatMessage({
                    id: 'inquiry.phonePlaceholder',
                  })}
                />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                label={intl.formatMessage({ id: 'inquiry.usageLabel' })}
                name="usage_content"
                rules={[
                  {
                    required: true,
                    message: intl.formatMessage({
                      id: 'inquiry.usageRequired',
                    }),
                  },
                ]}
              >
                <TextArea
                  placeholder={intl.formatMessage({
                    id: 'inquiry.usagePlaceholder',
                  })}
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
              {intl.formatMessage({ id: 'inquiry.sendButton' })}
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default InquiryForm;
