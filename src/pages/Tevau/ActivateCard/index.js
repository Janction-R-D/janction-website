/**
 * 激活卡片页面
 * 职责：激活虚拟卡
 */

import React, { useMemo, useState } from 'react';
import { Form, Input, Select, Button, message } from 'antd';
import {
  IdcardOutlined,
  NumberOutlined,
  PhoneOutlined,
  MailOutlined,
  GlobalOutlined,
  HomeOutlined,
} from '@ant-design/icons';
import { history } from 'umi';
import TevauLayout from '@/layouts/TevauLayout';
import ArrowIcon from '@/components/Tevau/ArrowIcon';
import CardApplicationSubmittedModal from '@/components/Tevau/CardApplicationSubmittedModal';
import { submitCard } from '@/services/tevau/card';
import { handleTevauError } from '@/utils/tevau';
import storage from '@/utils/storage';
import postCodeIcon from '@/assets/images/tevau/postCode.png';
import styles from './index.less';
import '@/styles/common/button.less';

const { Option } = Select;
const DIAL_CODE_OPTIONS = ['852', '86', '1', '44', '65'];

const ActivateCardPage = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [submitResult, setSubmitResult] = useState({});

  const submittedMessages = useMemo(() => {
    const messages = [
      '· Virtual card application submitted successfully.',
      '· The card will appear in your card list after review.',
    ];
    if (submitResult.cardId) {
      messages.unshift(`· Card ID: ${submitResult.cardId}`);
    }
    return messages;
  }, [submitResult.cardId]);

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      const userCode = storage.get('TEVAU_USER_CODE');
      if (!userCode) {
        throw new Error('User code not found. Please complete register first.');
      }

      const payload = {
        userCode,
        cardCode: Number(values.cardCode),
        dialCode: Number(values.dialCode),
        phoneNumber: values.phoneNumber,
        email: values.email,
        billingAddress: {
          address: values.billingAddress,
          countryArea: values.billingCountryArea,
          city: values.billingCity,
          postCode: values.billingPostCode,
        },
      };

      const response = await submitCard(payload);
      if (!response?.ok || response?.code !== 0) {
        throw new Error(response?.msg || 'Card application failed');
      }

      setSubmitResult(response?.data || {});
      setModalVisible(true);
    } catch (error) {
      message.error(handleTevauError(error));
    } finally {
      setLoading(false);
    }
  };

  const handleModalConfirm = () => {
    setModalVisible(false);
    // 确认后跳转
    history.push('/genesis/dashboard');
  };

  const handleModalCancel = () => {
    setModalVisible(false);
  };

  return (
    <div className={styles['activate-page']}>
      <TevauLayout title="Activate Card" mobileTitle={<>Activate Card</>}>
        <Form
          form={form}
          initialValues={{ cardCode: '1004', dialCode: '852' }}
          layout="vertical"
          labelWrap
          onFinish={handleSubmit}
          className={styles['activate-form']}
        >
          <Form.Item
            label={
              <span className={styles['item-label']}>
                <IdcardOutlined />
                Card Code
              </span>
            }
            name="cardCode"
            rules={[
              { required: true, message: 'Please enter card code' },
              { pattern: /^\d+$/, message: 'Card code must be numeric' },
            ]}
          >
            <Input placeholder="Enter card code" size="large" />
          </Form.Item>

          <Form.Item
            label={
              <span className={styles['item-label']}>
                <PhoneOutlined />
                Phone
              </span>
            }
            required
          >
            <div className={styles['field-row']}>
              <Form.Item
                name="dialCode"
                rules={[{ required: true, message: 'Please select dial code' }]}
                className={styles['field-item']}
              >
                <Select placeholder="Dial Code" size="large">
                  {DIAL_CODE_OPTIONS.map((code) => (
                    <Option key={code} value={code}>
                      +{code}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item
                name="phoneNumber"
                rules={[
                  { required: true, message: 'Please enter phone number' },
                  {
                    pattern: /^[0-9]{5,20}$/,
                    message: 'Please enter valid phone number',
                  },
                ]}
                className={styles['field-item']}
              >
                <Input placeholder="Phone Number" size="large" />
              </Form.Item>
            </div>
          </Form.Item>

          <Form.Item
            label={
              <span className={styles['item-label']}>
                <MailOutlined />
                Email
              </span>
            }
            name="email"
            rules={[
              { required: true, message: 'Please enter email' },
              { type: 'email', message: 'Please enter a valid email' },
            ]}
          >
            <Input placeholder="Enter email address" size="large" />
          </Form.Item>

          <Form.Item
            className={styles['section-divider']}
            label={
              <span className={styles['section-label']}>Billing Address</span>
            }
            colon={false}
          />

          <Form.Item
            label={
              <span className={styles['item-label']}>
                <GlobalOutlined />
                Region
              </span>
            }
            required
          >
            <div className={styles['field-row']}>
              <Form.Item
                name="billingCountryArea"
                rules={[
                  { required: true, message: 'Please enter country/region' },
                ]}
                className={styles['field-item']}
              >
                <Input placeholder="Country/Region" size="large" />
              </Form.Item>
              <Form.Item
                name="billingCity"
                rules={[{ required: true, message: 'Please enter city' }]}
                className={styles['field-item']}
              >
                <Input placeholder="City" size="large" />
              </Form.Item>
            </div>
          </Form.Item>

          <Form.Item
            label={
              <span className={styles['item-label']}>
                <HomeOutlined />
                Address
              </span>
            }
            name="billingAddress"
            rules={[
              { required: true, message: 'Please enter billing address' },
            ]}
          >
            <Input.TextArea
              placeholder="Enter address"
              autoSize={{ minRows: 5 }}
            />
          </Form.Item>

          <Form.Item
            label={
              <span className={styles['item-label']}>
                <img
                  src={postCodeIcon}
                  alt="Post code"
                  className={styles['post-code-icon']}
                />
                Post Code
              </span>
            }
            name="billingPostCode"
            rules={[
              { required: true, message: 'Please enter billing post code' },
            ]}
          >
            <Input placeholder="Enter post code" size="large" />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              className="tevau-btn"
              style={{ width: '100%', height: '60px' }}
            >
              <span>Apply Virtual Card</span>
              <ArrowIcon size={14} />
            </Button>
          </Form.Item>
        </Form>

        <CardApplicationSubmittedModal
          visible={modalVisible}
          onCancel={handleModalCancel}
          onConfirm={handleModalConfirm}
          messages={submittedMessages}
        />
      </TevauLayout>
    </div>
  );
};

export default ActivateCardPage;
