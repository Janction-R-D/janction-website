import React, { useState } from 'react';
import { Form, Input, message } from 'antd';
import JanctionModal from '@/components/JanctionModal';
import { FormInput } from '@/components/JanctionInput';
import { fetchPostStripeUsers } from '@/services/root';

const isValidEthAddress = (address) => /^0x[a-fA-F0-9]{40}$/.test(address);

const StripeUserModal = (props) => {
  const { visible, onCancel, setUserCreate, fetchStripe, title } = props;
  const [loading, setLoading] = useState([]);
  const [form] = Form.useForm();
  const onOk = () => {
    setUserCreate(false);
  };
  const handleSubmit = async () => {
    try {
      setLoading(true);
      const values = await form.validateFields();
      const address = values.address.trim();
      await fetchPostStripeUsers({ user_id: address });
      message.success('User created successfully!');
      onOk();
      fetchStripe();
      form.resetFields();
    } catch (errorInfo) {
      console.log('Error de validación:', errorInfo);
    } finally {
      setLoading(false);
    }
  };

  return (
    <JanctionModal
      open={visible}
      title={title || 'Modify the configuration'}
      centered
      width={506}
      onOk={handleSubmit}
      onCancel={() => {
        form.resetFields();
        onCancel();
      }}
      confirmLoading={loading}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          label="Wallet Address"
          name="address"
          rules={[
            {
              required: true,
              message: 'Por favor, introduce la dirección de la billetera.',
            },
            {
              validator: (_, value) => {
                if (!value || isValidEthAddress(value.trim())) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error('Dirección de billetera no válida.'),
                );
              },
            },
          ]}
        >
          <FormInput placeholder="0x..." />
        </Form.Item>
      </Form>
    </JanctionModal>
  );
};

export default StripeUserModal;
