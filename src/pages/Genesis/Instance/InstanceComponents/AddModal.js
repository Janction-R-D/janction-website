import React, { useEffect, useState } from 'react';
import { Modal, Form, Input } from 'antd';
import { useIntl } from 'umi';
import { FormInputNumber } from '@/components/JanctionInput';

export default function AddModal({
  modalVisible,
  onAddRoute,
  closeModal,
  record,
}) {
  const intl = useIntl();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    console.log(record?.id);
    if (record?.id) {
      form.setFieldsValue({
        resource_id: record.id,
      });
    }
  }, [record, form]);
  return (
    <Modal
      title={intl.formatMessage({ id: 'addNewRouteModalTitle' })}
      visible={modalVisible}
      onOk={() => {
        setLoading(true);

        form
          .validateFields()
          .then((values) => {
            onAddRoute(values);
          })
          .catch(() => {})
          .finally(() => setLoading(false));
      }}
      onCancel={() => {
        closeModal();
        form.resetFields();
      }}
      okText={intl.formatMessage({ id: 'submit' })}
      cancelText={intl.formatMessage({ id: 'cancel' })}
      confirmLoading={loading}
    >
      <Form form={form} layout="vertical" name="add_route_form">
        <Form.Item
          label={intl.formatMessage({
            id: 'resourceIdLabel',
            defaultMessage: 'Resource ID',
          })}
          name="resource_id"
          rules={[
            {
              required: true,
              message: intl.formatMessage({
                id: 'resourceIdRequired',
                defaultMessage: 'Please input the resource ID!',
              }),
            },
          ]}
        >
          <Input
            placeholder={intl.formatMessage({
              id: 'resourceIdPlaceholder',
              defaultMessage: 'Enter resource ID',
            })}
          />
        </Form.Item>

        <Form.Item
          label={intl.formatMessage({
            id: 'serviceNameLabel',
            defaultMessage: 'Service Name',
          })}
          name="service_name"
          rules={[
            {
              required: true,
              message: intl.formatMessage({
                id: 'serviceNameRequired',
                defaultMessage: 'Please input the service name!',
              }),
            },
          ]}
        >
          <Input
            placeholder={intl.formatMessage({
              id: 'serviceNamePlaceholder',
              defaultMessage: 'Enter service name',
            })}
          />
        </Form.Item>

        <Form.Item
          label={intl.formatMessage({
            id: 'portLabel',
            defaultMessage: 'Port',
          })}
          name="port"
          rules={[
            {
              required: true,
              message: intl.formatMessage({
                id: 'portRequired',
                defaultMessage: 'Please input the port!',
              }),
            },
            {
              type: 'number',
              min: 1,
              max: 65535,
              message: intl.formatMessage({
                id: 'portRange',
                defaultMessage: 'Port must be between 1 and 65535',
              }),
              transform: (value) => Number(value),
            },
          ]}
        >
          <FormInputNumber
            style={{ width: '100%' }}
            placeholder={intl.formatMessage({
              id: 'portPlaceholder',
              defaultMessage: 'Enter port number',
            })}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
}
