/**
 * 实体卡申请页面
 * 职责：提交实体卡申请信息
 */

import React, { useState } from 'react';
import { Form, Input, Select, DatePicker, Button, message, Grid } from 'antd';
import { history } from 'umi';
import TevauLayout from '@/layouts/TevauLayout';
import ArrowIcon from '@/components/Tevau/ArrowIcon';
import CardApplicationSubmittedModal from '@/components/Tevau/CardApplicationSubmittedModal';
import styles from './index.less';
import '@/styles/common/button.less';

const { Option } = Select;

const PhysicalCardApplicationPage = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const screens = Grid.useBreakpoint();

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      console.log('Physical card application values:', values);
      setModalVisible(true);
    } catch (error) {
      console.error('Physical card application error:', error);
      message.error('Submission failed. Please try again.');
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
      <Form
        form={form}
        layout={!screens.md ? 'vertical' : 'horizontal'}
        labelCol={!screens.md ? undefined : { span: 6 }}
        wrapperCol={!screens.md ? undefined : { span: 18 }}
        labelWrap
        onFinish={handleSubmit}
        className={styles['application-form']}
      >
        <Form.Item
          label="Phone"
          name="phone"
          rules={[
            { required: true, message: 'Please enter phone number' },
            {
              pattern: /^[0-9+\-\s()]+$/,
              message: 'Please enter a valid phone number',
            },
          ]}
        >
          <Input placeholder="Enter phone number" size="large" />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: 'Please enter email' },
            { type: 'email', message: 'Please enter a valid email' },
          ]}
        >
          <Input placeholder="Enter email address" size="large" />
        </Form.Item>

        <Form.Item
          label="Birthday"
          name="birthday"
          rules={[{ required: true, message: 'Please select birthday' }]}
        >
          <DatePicker
            placeholder="Select birthday"
            size="large"
            style={{ width: '100%' }}
            format="YYYY-MM-DD"
          />
        </Form.Item>

        <Form.Item
          label="Country/Region"
          name="country"
          rules={[{ required: true, message: 'Please select country/region' }]}
        >
          <Select placeholder="Please select" size="large">
            <Option value="US">United States</Option>
            <Option value="CN">China</Option>
            <Option value="UK">United Kingdom</Option>
            <Option value="CA">Canada</Option>
            <Option value="AU">Australia</Option>
          </Select>
        </Form.Item>

        <Form.Item
          label="City"
          name="city"
          rules={[{ required: true, message: 'Please select city' }]}
        >
          <Select placeholder="Please select" size="large">
            <Option value="newyork">New York</Option>
            <Option value="beijing">Beijing</Option>
            <Option value="london">London</Option>
            <Option value="toronto">Toronto</Option>
            <Option value="sydney">Sydney</Option>
          </Select>
        </Form.Item>

        <Form.Item
          label="Address"
          name="address"
          rules={[{ required: true, message: 'Please enter address' }]}
        >
          <Input.TextArea
            placeholder="Enter full address"
            rows={3}
            size="large"
          />
        </Form.Item>

        <Form.Item
          label="Post code"
          name="postCode"
          rules={[{ required: true, message: 'Please enter post code' }]}
        >
          <Input placeholder="Enter post code" size="large" />
        </Form.Item>

        <Form.Item
          wrapperCol={!screens.md ? undefined : { offset: 6, span: 18 }}
        >
          <Button
            type="primary"
            htmlType="submit"
            loading={loading}
            className="tevau-btn"
            style={{ width: '100%', height: '60px' }}
          >
            <span>Submit Application</span>
            <ArrowIcon size={14} />
          </Button>
        </Form.Item>
      </Form>

      <CardApplicationSubmittedModal
        visible={modalVisible}
        onCancel={handleModalCancel}
        onConfirm={handleModalConfirm}
        messages={[
          '· Submitted successfully. Please check your tracking information.',
          '· You can click the card icon to view the latest logistics information for your physical card.',
        ]}
      />
    </TevauLayout>
  );
};

export default PhysicalCardApplicationPage;
