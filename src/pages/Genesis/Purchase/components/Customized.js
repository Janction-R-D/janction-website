import { Button, Card, Divider, Form } from 'antd';
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
import { history } from 'umi';
import PurDuration from './PurDuration';

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
          <Form.Item name="operating_system_str">
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
          <Form.Item name="internet_type">
            <InternetType formValues={formValues} setCurrent={setCurrent} />
          </Form.Item>
          <Form.Item name="conectivity_tier">
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
        <Form.Item name="location">
          <Location formValues={formValues} current={current} />
        </Form.Item>
      ),
      field: 'Location',
      description:
        'Mobile is convenient, and large users can provide flexible computing power.',
    },
    {
      title: 'Duration',
      content: (
        <Card className={styles['processor-conf-wrapper']}>
          <Form.Item name="purDuration">
            <PurDuration formValues={formValues} />
          </Form.Item>
        </Card>
      ),
      field: 'Purchase Duration',
      description:
        'Mobile is convenient, and large users can provide flexible computing power.',
    },
    {
      title: 'Processor',
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
            <ProductList formValues={formValues} current={current} />
          </Form.Item>
        </Card>
      ),
      field: 'Basic configuration',
      description: '',
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
      // Obtiene los nombres de los campos del paso actual
      const fieldsToValidate = onValidateStep();
      await form.validateFields(fieldsToValidate); // Valida solo los campos del paso actual

      if (current < steps.length - 1) {
        setCurrent(current + 1);
      }
    } catch (error) {
      console.log('Error during validation:', error);
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
            <h1 className={styles['title']}>Customized purchase</h1>
            <p className={styles['description']}>
              Tailor your server with custom hardware, network, and software
              configurations for optimal performance and scalability.
            </p>
          </section>
          <CustomizedSteps
            current={current}
            steps={steps}
            setCurrent={setCurrent}
            onValidateStep={onValidateStep}
            form={form}
          />
          <header className={styles['header']}>
            <section className={styles['header-desc']}>
              <h2 className={styles['title']}>{steps[current].field}</h2>
            </section>

            {current < steps.length - 1 && (
              <Button
                type="primary"
                className={styles['btn-next']}
                onClick={next}
              >
                Next Step
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
