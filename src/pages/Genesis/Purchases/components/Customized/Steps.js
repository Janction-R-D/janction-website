import { Input, Steps } from 'antd';
import OperatingCard from './OperatingCard';
import styles from './index.less';
const { Step } = Steps;

export default function CustomizedSteps({ current, steps }) {
  return (
    <Steps current={current} className={styles['customized-steps']} responsive>
      {steps.map((step, index) => (
        <Step key={index} title={step.title} />
      ))}
    </Steps>
  );
}
