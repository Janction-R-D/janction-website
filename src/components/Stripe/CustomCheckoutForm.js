import React, { useState } from 'react';
import { Form, Input, Select, Button, Alert, Row, Col, Checkbox } from 'antd';
import {
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
import styles from './index.less';
import { countryList } from './countries';

const { Option } = Select;

const CustomCheckoutForm = ({ clientSecret, onCancel, orderId }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [form] = Form.useForm();
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const [saveCard, setSaveCard] = useState(false);
  const [cardReady, setCardReady] = useState({
    number: false,
    expiry: false,
    cvc: false,
  });

  const handleSubmit = async () => {
    const values = await form.validateFields();
    if (!stripe || !elements) return;
    if (!cardReady.number || !cardReady.expiry || !cardReady.cvc) {
      setErrorMsg('Please complete all card fields.');
      return;
    }

    setSubmitting(true);
    setErrorMsg(null);

    try {
      const card = elements.getElement(CardNumberElement);
      const confirmOptions = {
        payment_method: {
          card,
          billing_details: {
            name: values.name,
            email: values.email,
            address: {
              country: values.country,
              postal_code: values.postal,
            },
          },
        },
        return_url: `${window.location.origin}/genesis/purchase/success?order_id=${orderId}`,
      };
      if (saveCard) {
        confirmOptions.setup_future_usage = 'off_session';
      }

      const { error } = await stripe.confirmCardPayment(
        clientSecret,
        confirmOptions,
      );
      if (error)
        setErrorMsg(error.message || 'Payment failed. Please try again.');
    } catch (err) {
      console.error('[Stripe Error]', err);
      setErrorMsg('Unexpected error. Please try again.');
    }
    setSubmitting(false);
  };

  const elementStyle = {
    base: {
      fontSize: '16px',
      color: '#ffffff',
      fontFamily: 'Arial, sans-serif',
      '::placeholder': { color: '#b0b0b0' },
      backgroundColor: 'transparent',
      iconColor: '#ffffff',
    },
    invalid: {
      color: '#ff4d4f',
    },
  };

  return (
    <div className={styles.container}>
      <h1>Complete Your Payment</h1>
      <div className={styles.badge}>
        <i className="iconfont icon-visa1" style={{ color: 'skyblue' }} />
        <i className="iconfont icon-mastercard" />
        <i
          className="iconfont icon-americanexpress"
          style={{ color: 'skyblue' }}
        />
      </div>
      <Form
        layout="vertical"
        form={form}
        onFinish={handleSubmit}
        className={styles.form}
      >
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Cardholder Name"
              name="name"
              rules={[
                {
                  required: true,
                  message: 'Please enter the cardholder name.',
                },
              ]}
            >
              {' '}
              <Input className={styles.input} placeholder="John Doe" />{' '}
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Email"
              name="email"
              rules={[
                { required: true, message: 'Please enter your email.' },
                {
                  type: 'email',
                  message: 'Please enter a valid email address.',
                },
              ]}
            >
              {' '}
              <Input
                className={styles.input}
                placeholder="you@example.com"
              />{' '}
            </Form.Item>
          </Col>
        </Row>

        <Form.Item label="Card Number" required>
          <div className={styles.cardElement}>
            <CardNumberElement
              options={{ style: elementStyle }}
              onChange={(e) =>
                setCardReady((prev) => ({ ...prev, number: e.complete }))
              }
            />
          </div>
        </Form.Item>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label="Expiry Date" required>
              <div className={styles.cardElement}>
                <CardExpiryElement
                  options={{ style: elementStyle }}
                  onChange={(e) =>
                    setCardReady((prev) => ({ ...prev, expiry: e.complete }))
                  }
                />
              </div>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="CVC" required>
              <div className={styles.cardElement}>
                <CardCvcElement
                  options={{ style: elementStyle }}
                  onChange={(e) =>
                    setCardReady((prev) => ({ ...prev, cvc: e.complete }))
                  }
                />
              </div>
            </Form.Item>
          </Col>
        </Row>

        {/* <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Country"
              name="country"
              rules={[
                { required: true, message: 'Please select your country.' },
              ]}
            >
              {' '}
              <Select
                className={styles.select}
                placeholder="Select your country"
                showSearch
                optionFilterProp="children"
              >
                {' '}
                {countryList.map((c) => (
                  <Option key={c.code} value={c.code}>
                    {c.name}
                  </Option>
                ))}{' '}
              </Select>{' '}
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Postal Code"
              name="postal"
              rules={[
                { required: true, message: 'Please enter your postal code.' },
                {
                  pattern: /^[0-9A-Za-z\s\-]+$/,
                  message: 'Invalid postal code format.',
                },
              ]}
            >
              {' '}
              <Input className={styles.input} placeholder="e.g. 10001" />{' '}
            </Form.Item>
          </Col>
        </Row> */}

        <footer>
          <Form.Item>
            <Checkbox
              checked={saveCard}
              onChange={(e) => setSaveCard(e.target.checked)}
            >
              {' '}
              Save this card for future payments{' '}
            </Checkbox>
          </Form.Item>

          {errorMsg && (
            <Alert
              message={errorMsg}
              type="error"
              showIcon
              style={{ marginBottom: 16 }}
            />
          )}

          <div className={styles.actions}>
            <Button onClick={onCancel} className={styles['cancel']}>
              Cancel
            </Button>
            <Button
              type="primary"
              htmlType="submit"
              loading={submitting}
              className={styles['pay']}
            >
              Pay now
            </Button>
          </div>
        </footer>
      </Form>
    </div>
  );
};

export default CustomCheckoutForm;
