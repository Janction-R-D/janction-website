import { Input, Steps } from 'antd';
import OperatingCard from './OperatingCard';
import styles from './index.less';
const { Step } = Steps;

export default function CustomizedSteps({
  current,
  setCurrent,
  steps,
  onValidateStep,
  form,
}) {
  const onNavSteps = async (index) => {
    if (index > current) {
      try {
        const validation = onValidateStep?.();
        if (validation) {
          await form.validateFields(validation);
          setCurrent(index);
        }

        return;
      } catch (error) {
        console.log('Error during validation:', error);
        return;
      }
    }
    setCurrent(index);
  };
  return (
    <Steps
      current={current}
      className={styles['customized-steps']}
      onChange={onNavSteps}
      responsive
    >
      {steps.map((step, index) => (
        <Step key={index} title={step.title} />
      ))}
    </Steps>
  );
}
