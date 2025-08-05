import { Button, Card, Divider, Form, message } from 'antd';
import React, { useEffect, useState } from 'react';
import OperatingCard from './Customized/OperatingCard';
import InternetType from './Customized/InternetType';
import Location from './Customized/Location';
import CustomizedSteps from './Customized/Steps';
import styles from './index.less';
import SliderBand from './Customized/SliderBand';
import Processor from './Customized/Processor';
import { Processors } from './Customized/Processors';
import ProductList from './Customized/ProductList';

import { motion } from 'framer-motion';
import FrameworkAi from './Customized/FrameworkAi';
import AsidePrice from './Customized/AsidePrice/AsidePrice';
import { history, useIntl } from 'umi';
import PurDuration from './PurDuration';
import { Duration } from '@/constant';
import ImagesAi from './Customized/ImagesAi';

const Customized = () => {
  const [form] = Form.useForm();
  const [formValues, setFormValues] = useState({});
  const [current, setCurrent] = useState(0);
  const [completedSteps, setCompletedSteps] = useState(new Set());
  const intl = useIntl();
  useEffect(() => {
    form.setFieldsValue(formValues);
  }, [current, formValues]);
  const onValuesChange = async (_, allValues) => {
    console.log(allValues);
    setFormValues(allValues); // Evita llamar a form.getFieldsValue()
  };

  const steps = [
    {
      title: (
        <p style={{ fontSize: '1rem' }}>
          {intl.formatMessage({ id: 'steps.operating_system' })}
        </p>
      ),
      content: (
        <>
          <Form.Item name="operating_system_str">
            <OperatingCard formValues={formValues} setCurrent={setCurrent} />
          </Form.Item>
          <Form.Item name="ai_framework">
            <FrameworkAi formValues={formValues} setCurrent={setCurrent} />
          </Form.Item>
        </>
      ),
      field: intl.formatMessage({ id: 'steps.field.os' }),
      description: intl.formatMessage({ id: 'steps.description.generic' }),
    },
    {
      title: (
        <p style={{ fontSize: '1rem' }}>
          {intl.formatMessage({ id: 'steps.internet' })}
        </p>
      ),
      content: (
        <>
          <Form.Item name="internet_type">
            <InternetType formValues={formValues} setCurrent={setCurrent} />
          </Form.Item>
          <Form.Item name="conectivity_tier">
            <SliderBand formValues={formValues} setCurrent={setCurrent} />
          </Form.Item>
        </>
      ),
      field: intl.formatMessage({ id: 'steps.field.internet' }),
      description: intl.formatMessage({ id: 'steps.description.generic' }),
    },
    {
      title: (
        <p style={{ fontSize: '1rem' }}>
          {intl.formatMessage({ id: 'steps.location' })}
        </p>
      ),
      content: (
        <Form.Item name="location">
          <Location formValues={formValues} current={current} />
        </Form.Item>
      ),
      field: intl.formatMessage({ id: 'steps.field.location' }),
      description: intl.formatMessage({ id: 'steps.description.generic' }),
    },

    {
      title: (
        <p style={{ fontSize: '1rem' }}>
          {intl.formatMessage({ id: 'steps.processor' })}
        </p>
      ),
      content: (
        <Card className={styles['processor-conf-wrapper']}>
          <Processor
            formValues={formValues}
            onChange={onValuesChange}
            current={current}
          />
          <Form.Item name="processor_model">
            <Processors formValues={formValues} current={current} />
          </Form.Item>
        </Card>
      ),
      field: intl.formatMessage({ id: 'steps.steps.field.basic_config' }),

      description: intl.formatMessage({ id: 'steps.description.generic' }),
    },
    {
      title: (
        <p style={{ fontSize: '1rem' }}>
          {intl.formatMessage({ id: 'steps.available_instance' })}
        </p>
      ),
      content: (
        <Card className={styles['processor-conf-wrapper']}>
          <Form.Item
            name="node"
            rules={[{ required: true, message: 'Please select an instance' }]}
          >
            <ProductList formValues={formValues} current={current} />
          </Form.Item>
        </Card>
      ),
      field: intl.formatMessage({ id: 'steps.steps.field.basic_config' }),
      description: intl.formatMessage({ id: 'steps.description.generic' }),
    },
    {
      title: (
        <p style={{ fontSize: '1rem' }}>
          {intl.formatMessage({ id: 'steps.image' })}
        </p>
      ),
      content: (
        <Card className={styles['processor-conf-wrapper']}>
          <p style={{ fontSize: '1rem' }}>Choose an Image</p>
          <Form.Item name="template">
            <ImagesAi formValues={formValues} current={current} />
          </Form.Item>
        </Card>
      ),
      field: intl.formatMessage({ id: 'steps.steps.field.basic_config' }),
      description: intl.formatMessage({ id: 'steps.description.generic' }),
    },
    {
      title: (
        <p style={{ fontSize: '1rem' }}>
          {intl.formatMessage({ id: 'steps.duration' })}
        </p>
      ),
      content: (
        <Card className={styles['processor-conf-wrapper']}>
          <Form.Item name="purDuration">
            <PurDuration
              formValues={formValues}
              form={form}
              setFormValues={setFormValues}
            />
          </Form.Item>
        </Card>
      ),
      field: intl.formatMessage({ id: 'steps.steps.field.purchase_duration' }),
      description: intl.formatMessage({ id: 'steps.description.generic' }),
    },
  ];
  const onValidateStep = () => {
    const fields = steps[current].content.props.children
      ? React.Children.toArray(steps[current].content.props.children)
          .filter((child) => child.type === Form.Item)
          .map((item) => item.props.name)
      : [];
    return fields;
  };
  const next = async () => {
    try {
      const fieldsToValidate = onValidateStep();
      await form.validateFields(fieldsToValidate);
      console.log(completedSteps);
      if (current > 4 && !completedSteps.has(4)) {
        message.error('Please complete steps 5 before proceeding.');
        return; // No avanzar al siguiente paso
      }

      setCompletedSteps(new Set(completedSteps).add(current));

      // Avanzar al siguiente paso si no estamos en el último
      if (current < steps.length - 1) {
        setCurrent(current + 1);
      }
    } catch (error) {
      console.error('Error during validation:', error);
    }
  };

  const prev = () => {
    if (current >= 1) {
      setCurrent(current - 1);
    }
  };
  const onConfirm = async () => {
    try {
      await form.validateFields();
      history.push('/genesis/purchase/settlement', { formValues });
    } catch (err) {
      console.log('『err』', err);
    }
  };
  return (
    <main className={styles['custom-conf-wrapper']}>
      <Form
        form={form}
        name="customized"
        onValuesChange={onValuesChange}
        className={styles['form']}
      >
        <section className={styles['form-content']}>
          <section className={styles['header-section']}>
            <h1 className={styles['title']}>
              {intl.formatMessage({ id: 'customPurchase.title' })}
            </h1>
            <p className={styles['description']}>
              {intl.formatMessage({ id: 'customPurchase.description' })}
            </p>
          </section>
          <CustomizedSteps
            current={current}
            steps={steps}
            setCurrent={setCurrent}
            onValidateStep={onValidateStep}
            form={form}
            completedSteps={completedSteps}
            formValues={formValues}
          />
          <header className={styles['header']}>
            <section className={styles['header-desc']}>
              <h2 className={styles['title']}>{steps[current].field}</h2>
            </section>
            <div className={styles['btns']}>
              {current >= 1 && (
                <Button
                  type="primary"
                  className={styles['btn-next']}
                  onClick={prev}
                >
                  <div className={styles['prev']}>
                    <i className="iconfont icon-next icon " />
                  </div>
                  {intl.formatMessage({ id: 'step.prev' })}
                </Button>
              )}
              {current < steps.length - 1 && (
                <Button
                  type="primary"
                  className={styles['btn-next']}
                  onClick={next}
                >
                  {intl.formatMessage({ id: 'step.next' })}{' '}
                  <i className="iconfont icon-next icon" />
                </Button>
              )}
            </div>
          </header>
          <motion.div
            key={current}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            {steps.map((step, index) => (
              <div
                key={index}
                style={{ display: index === current ? 'block' : 'none' }}
                aria-hidden={index !== current}
              >
                {step.content}
              </div>
            ))}
          </motion.div>
        </section>
      </Form>
      <Divider type="vertical" className={styles['divider']} />
      <AsidePrice
        formValues={formValues}
        styles={styles}
        onConfirm={onConfirm}
      />
    </main>
  );
};

export default Customized;
