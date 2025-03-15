import { Button, Card, Form } from 'antd';
import React, { useState } from 'react';
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

const Customized = () => {
  const [form] = Form.useForm();
  const [formValues, setFormValues] = useState({});
  const [current, setCurrent] = useState(0);

  const onValuesChange = async (_, allValues) => {
    setFormValues(allValues); // Evita llamar a form.getFieldsValue()
  };

  const steps = [
    {
      title: 'Operating System',
      content: (
        <>
          <Form.Item
            name="operating_system_str"
            rules={[
              { required: true, message: 'Please select an Operating System' },
            ]}
          >
            <OperatingCard formValues={formValues} setCurrent={setCurrent} />
          </Form.Item>
          <Form.Item name="ai_framework">
            <FrameworkAi formValues={formValues} setCurrent={setCurrent} />
          </Form.Item>
        </>
      ),
      field: 'Operating System',
      description:
        'Mobile is convenient, and large users can provide flexible computing power',
    },
    {
      title: 'Internet',
      content: (
        <>
          <Form.Item
            name="internet_type"
            rules={[
              { required: true, message: 'Please select a type of internet' },
            ]}
          >
            <InternetType formValues={formValues} setCurrent={setCurrent} />
          </Form.Item>
          <Form.Item
            name="network_down"
            rules={[{ required: true, message: 'Please select an value' }]}
          >
            <SliderBand formValues={formValues} setCurrent={setCurrent} />
          </Form.Item>
        </>
      ),
      field: 'Internet',
      description:
        'Mobile is convenient, and large users can provide flexible computing power.',
    },
    {
      title: 'Location',
      content: (
        <Form.Item
          name="location"
          rules={[{ required: true, message: 'Please select a Location' }]}
        >
          <Location formValues={formValues} setCurrent={setCurrent} />
        </Form.Item>
      ),
      field: 'Location',
      description:
        'Mobile is convenient, and large users can provide flexible computing power.',
    },
    {
      title: 'Processor',
      content: (
        <Card className={styles['processor-conf-wrapper']}>
          <Processor formValues={formValues} onChange={onValuesChange} />
          <Form.Item
            name="processor_model"
            rules={[
              { required: true, message: 'Please select a processor model' },
            ]}
          >
            <Processors formValues={formValues} />
          </Form.Item>
        </Card>
      ),
      field: 'Basic configuration',
      description: '',
    },
    {
      title: 'Available Instance',
      content: (
        <Card className={styles['processor-conf-wrapper']}>
          <Form.Item
            name="node"
            rules={[{ required: true, message: 'Please select an instance' }]}
          >
            <ProductList formValues={formValues} />
          </Form.Item>
        </Card>
      ),
      field: 'Basic configuration',
      description: '',
    },
  ];

  const next = async () => {
    try {
      // Obtiene los nombres de los campos del paso actual
      const fieldsToValidate = steps[current].content.props.children
        ? React.Children.toArray(steps[current].content.props.children)
            .filter((child) => child.type === Form.Item)
            .map((item) => item.props.name)
        : [];

      await form.validateFields(fieldsToValidate); // Valida solo los campos del paso actual

      if (current < steps.length - 1) {
        setCurrent(current + 1);
      }
    } catch (error) {
      console.log('Error en la validación:', error);
    }
  };
  const back = () => {
    if (current > 0) {
      setCurrent(current - 1);
    }
  };

  const onFinish = (values) => {
    console.log(values);
  };

  return (
    <main className={styles['custom-conf-wrapper']}>
      <Form
        form={form}
        name="customized"
        onFinish={onFinish}
        onValuesChange={onValuesChange}
        className={styles['form']}
      >
        <section className={styles['form-content']}>
          <CustomizedSteps current={current} steps={steps} />
          <header className={styles['header']}>
            <section className={styles['header-desc']}>
              <h2 className={styles['title']}>{steps[current].field}</h2>
              <p>{steps[current].description}</p>
            </section>

            {current < steps.length - 1 ? (
              <Button
                type="primary"
                className={styles['btn-next']}
                onClick={next}
              >
                Next Step
              </Button>
            ) : (
              <Button
                type="primary"
                className={styles['btn-next']}
                htmlType="submit"
              >
                Confirm
              </Button>
            )}
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
              >
                {step.content}
              </div>
            ))}
          </motion.div>
        </section>
      </Form>
      <AsidePrice formValues={formValues} styles={styles} />
    </main>
  );
};

export default Customized;
