import { fetchBindEmail } from '@/services/genesis';
import reg from '@/utils/reg';
import { Form, Input, message, Modal } from 'antd';

const BindEmail = (props) => {
  const { visible, onCancel, userInfo } = props;
  const [form] = Form.useForm();

  const onOk = () => {
    form
      .validateFields()
      .then((values) => {
        onBind({ users: values });
      })
      .catch((info) => {
        console.log('Validate Failed:', info);
      });
  };

  const onBind = async (payload) => {
    try {
      await fetchBindEmail(payload);
      form.resetFields();
      message.success('Binding successful!');
      onCancel();
    } catch (error) {
      message.error('Something went wrong, please try again later!');
      console.log('『error』', error);
    }
  };

  return (
    <Modal
      open={visible}
      title="Bind email"
      onCancel={() => {
        form.resetFields();
        onCancel();
      }}
      onOk={onOk}
    >
      <Form
        form={form}
        name="form_in_modal"
        initialValue={{ email: userInfo?.email }}
      >
        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: 'Please enter email' },
            {
              pattern: reg.email,
              message: 'Please enter the correct email address!',
            },
          ]}
        >
          <Input placeholder="Please enter email" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default BindEmail;
