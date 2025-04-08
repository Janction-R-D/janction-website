import { fetchBindEmail } from '@/services/genesis';
import reg from '@/utils/reg';
import { Button, Form, Input, message, Modal } from 'antd';
import styles from './modal.less';
import { useModel } from 'umi';

const BindEmail = (props) => {
  const { open, onCancel, userInfo, closeAll } = props;
  const [form] = Form.useForm();

  const { getUserInfo } = useModel('common');

  const onOk = () => {
    form
      .validateFields()
      .then((values) => {
        onBind(values);
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
      await getUserInfo();
      closeAll();
    } catch (error) {
      console.log('『error』', error);
    }
  };

  return (
    <Modal
      open={open}
      title="Bind email"
      onCancel={() => {
        form.resetFields();
        onCancel();
      }}
      footer={false}
      onOk={onOk}
      height={300}
      width={400}
      className={styles['card-modal-email']}
    >
      <div className={styles['card-emails']}>
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
            <Input
              bordered={false}
              className={styles['email-box']}
              placeholder="Please enter email"
            />
          </Form.Item>
        </Form>
      </div>
      <footer className={styles['buttons']}>
        <Button className={styles['cancel-btn']} onClick={onCancel}>
          Cancel
        </Button>
        <Button className={styles['create-btn']} onClick={onOk}>
          Verify
        </Button>
      </footer>
    </Modal>
  );
};

export default BindEmail;
