import styles from './index.less';
import { Steps } from 'antd';

const { Step } = Steps;

const JanctionSteps = (props) => {
  const { steps, step } = props;

  return (
    <div className={styles['janction-steps']}>
      <Steps current={step} $styl>
        {steps.map((item) => (
          <Step key={item.value} title={item.title} />
        ))}
      </Steps>
    </div>
  );
};

export default JanctionSteps;
