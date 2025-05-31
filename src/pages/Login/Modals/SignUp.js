import React, { useEffect, useState } from 'react';
import { Form, Input, Button, message } from 'antd';
import styles from './index.less';

const SignUp = ({
  onCancel,
  email,
  setEmail,
  sended,
  setSended,
  confirmed,
  setConfirmed,
  setIsFlipped,
  isFlipped,
  setSuccessModalVisible,
}) => {
  const [countdown, setCountdown] = useState(0);
  const [form] = Form.useForm();

  //  Función para ocultar parte del email
  const maskEmail = (email) => {
    const [local, domain] = email?.split('@');
    if (local.length <= 3) return `${local[0]}***@${domain}`;
    const visible = local.slice(0, 6);
    return `${visible}***@${domain}`;
  };

  //  Volver atrás entre los pasos
  const onBack = () => {
    if (confirmed) {
      setConfirmed(false);
    } else if (sended) {
      setSended(false);
    } else {
      setIsFlipped(false);
    }
  };

  // Resetear formulario y estados cuando isFlipped = false
  useEffect(() => {
    if (!isFlipped) {
      resetAll();
    }
  }, [isFlipped]);
  const resetAll = () => {
    form.resetFields();
    setSended(false);
    setConfirmed(false);
    setEmail('');
    setCountdown(0);
  };
  //  Countdown para reenviar código
  useEffect(() => {
    let timer;
    if (sended && countdown > 0) {
      timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [sended, countdown]);

  //  Función para enviar código
  const sendVerificationCode = () => {
    console.log('Sending verification code to:', email);
    //TODO
  };

  //  Función  para verificar código
  const verifyCode = (code) => {
    console.log('Verifying code:', code);
    //TODO
  };

  //  Función   para registrar usuario
  const registerUser = ({ email, code, password }) => {
    console.log('Registering user:', { email, code, password });
    //  TODO
    onCancel();
    setTimeout(() => {
      resetAll();
      setSuccessModalVisible(true);
    }, 500);
  };

  const handleSignUp = (values) => {
    if (!sended) {
      if (!email) {
        message.error('Please enter your email before requesting a code.');
        return;
      }
      sendVerificationCode();
      setSended(true);
      setCountdown(60);
    } else if (!confirmed) {
      if (!values.code) {
        message.error('Please enter the verification code.');
        return;
      }
      verifyCode(values.code);
      setConfirmed(true);
      form.setFieldsValue({ code: values.code }); // mantener valor del code
    } else {
      if (!values.password) {
        message.error('Please enter a password.');
        return;
      }
      registerUser({
        email,
        code: form.getFieldValue('code'),
        password: values.password,
      });
      setIsFlipped(false); // Volver a login si todo va bien
    }
  };

  return (
    <div className={`${styles.cardBack} ${styles.visible}`}>
      <div className={styles.closeIcon_right}>
        <div className={styles['icon']}>
          <i className="iconfont icon-next" style={{ fontSize: '14px' }} />
        </div>
        <div onClick={onBack}>Back</div>
      </div>
      <span className={styles.closeIcon_left} onClick={onCancel}>
        ✕
      </span>
      <div className={styles.left}>
        <div className={styles.header}>
          {!sended && <h2>Sign up</h2>}
          {sended && !confirmed && <h2>Authentication</h2>}
          {sended && confirmed && <h2>Set password</h2>}
          {!sended && (
            <p>Please enter your email account to register password</p>
          )}
          {sended && !confirmed && (
            <p>
              The verification code has been sent to {maskEmail(email)}. Please
              check your inbox.
            </p>
          )}
          {sended && confirmed && (
            <p>Please enter a password consisting of 6–12 letters/numbers</p>
          )}
        </div>

        <Form
          form={form}
          layout="vertical"
          onFinish={handleSignUp}
          className={styles.form}
        >
          {!sended && (
            <Form.Item
              name="email"
              rules={[
                { required: true, message: 'Email is required' },
                {
                  type: 'email',
                  message: 'Please enter a valid email address',
                },
              ]}
              initialValue={email}
            >
              <Input
                className={styles['input-search']}
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Item>
          )}

          {sended && !confirmed && (
            <Form.Item
              name="code"
              rules={[{ required: true, message: 'Code is required' }]}
            >
              <div className={styles.verificationRow}>
                <Input
                  className={styles['input-search']}
                  placeholder="Code"
                  style={{ flex: 1 }}
                />
                <Button
                  type="link"
                  disabled={countdown > 0}
                  onClick={handleSignUp} // reutilizamos el submit
                  style={{ marginLeft: 8, padding: 0 }}
                >
                  {countdown > 0 ? `Resend in ${countdown}s` : 'Resend code'}
                </Button>
              </div>
            </Form.Item>
          )}

          {sended && confirmed && (
            <Form.Item
              name="password"
              rules={[{ required: true, message: 'Password is required' }]}
            >
              <Input.Password
                className={styles['input-search']}
                placeholder="Password"
              />
            </Form.Item>
          )}

          <div className={styles.button_box}>
            <Button
              type="primary"
              htmlType="submit"
              block
              className={styles.button}
            >
              {sended ? 'Submit' : 'Obtain verification code'}
              <div className={styles['icon']}>
                <i
                  className="iconfont icon-next"
                  style={{ fontSize: '10px' }}
                />
              </div>
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default SignUp;
