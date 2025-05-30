import { Input, message, Steps } from 'antd';
import OperatingCard from './OperatingCard';
import styles from './index.less';
const { Step } = Steps;

export default function CustomizedSteps({
  current,
  setCurrent,
  steps,
  onValidateStep,
  form,
  completedSteps,
  formValues,
}) {
  const onNavSteps = async (index) => {
    // if (index >= 5 && !completedSteps.has(4)) {
    //   message.warning('Please complete steps 5 before proceeding.');
    //   return;
    // }
    if (!formValues?.node && index >= 5 && !completedSteps.has(4)) {
      message.warning('Please complete steps 5 before proceeding.');
      return;
    }
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
