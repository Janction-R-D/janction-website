/**
 * 实体卡申请页面
 * 职责：提交实体卡申请信息
 */

import React, { useMemo, useState } from 'react';
import { Form, Input, Select, Button, message } from 'antd';
import {
  IdcardOutlined,
  PhoneOutlined,
  MailOutlined,
  HomeOutlined,
  UserOutlined,
  GlobalOutlined,
  EnvironmentOutlined,
  ProfileOutlined,
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

const PhysicalCardApplicationPage = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [submitResult, setSubmitResult] = useState({});

  const submittedMessages = useMemo(() => {
    const messages = [
      '· Physical card application submitted successfully.',
      '· We will ship your card after review is completed.',
    ];
    if (submitResult.orderNo) {
      messages.unshift(`· Order No: ${submitResult.orderNo}`);
    }
    return messages;
  }, [submitResult.orderNo]);

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
        postalAddress: {
          address: values.postalAddress,
          firstName: values.firstName,
          lastName: values.lastName,
          city: values.postalCity,
          province: values.postalProvince,
          postCode: values.postalPostCode,
          recipientTitle: values.recipientTitle,
          countryArea: values.postalCountryArea,
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
    history.push('/genesis/dashboard');
  };

  const handleModalCancel = () => {
    setModalVisible(false);
  };

  return (
    <TevauLayout
      title="Physical Card Application"
      mobileTitle={
        <>
          Physical Card
          <br />
          Application
        </>
      }
      backgroundImage={require('@/assets/images/tevau/physicalCardApplicationBg.png')}
      mobileBackgroundImage={require('@/assets/images/tevau/physicalCardApplicationBg.png')}
    >
      <div className={styles['application-page']}>
        <Form
          form={form}
          initialValues={{ cardCode: '1005', dialCode: '852' }}
          layout="vertical"
          labelWrap
          onFinish={handleSubmit}
          className={styles['application-form']}
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
                <ProfileOutlined />
                Recipient Title
              </span>
            }
            name="recipientTitle"
            rules={[
              { required: true, message: 'Please enter recipient title' },
            ]}
          >
            <Input
              placeholder="Enter recipient title (e.g. Mr/Ms)"
              size="large"
            />
          </Form.Item>

          <Form.Item
            label={
              <span className={styles['item-label']}>
                <UserOutlined />
                Recipient Name
              </span>
            }
            required
          >
            <div className={styles['field-row']}>
              <Form.Item
                name="firstName"
                rules={[{ required: true, message: 'Please enter first name' }]}
                className={styles['field-item']}
              >
                <Input placeholder="First Name" size="large" />
              </Form.Item>
              <Form.Item
                name="lastName"
                rules={[{ required: true, message: 'Please enter last name' }]}
                className={styles['field-item']}
              >
                <Input placeholder="Last Name" size="large" />
              </Form.Item>
            </div>
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
              <span className={styles['section-label']}>Postal Address</span>
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
                name="postalCountryArea"
                rules={[
                  { required: true, message: 'Please enter country/region' },
                ]}
                className={styles['field-item']}
              >
                <Input placeholder="Country/Region" size="large" />
              </Form.Item>
              <Form.Item
                name="postalCity"
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
                <EnvironmentOutlined />
                Province
              </span>
            }
            name="postalProvince"
            rules={[{ required: true, message: 'Please enter province' }]}
          >
            <Input placeholder="Enter province" size="large" />
          </Form.Item>

          <Form.Item
            label={
              <span className={styles['item-label']}>
                <HomeOutlined />
                Address
              </span>
            }
            name="postalAddress"
            rules={[{ required: true, message: 'Please enter postal address' }]}
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
            name="postalPostCode"
            rules={[{ required: true, message: 'Please enter post code' }]}
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
              <span>Submit Physical Card Application</span>
              <ArrowIcon size={14} />
            </Button>
          </Form.Item>
        </Form>
      </div>

      <CardApplicationSubmittedModal
        visible={modalVisible}
        onCancel={handleModalCancel}
        onConfirm={handleModalConfirm}
        messages={submittedMessages}
      />
    </TevauLayout>
  );
};

export default PhysicalCardApplicationPage;
