import styles from '../index.less';
import { useState } from 'react';
import StepChart from './StepChart';
import Step2 from './GPU';
import Step3 from './RunNode';
import Step1 from './System';

const stepsList = [
  {
    value: 1,
    name: 'Step 1',
    info: 'Select operating system',
    nextstep: 2,
  },
  {
    value: 2,
    name: 'Step 2',
    info: 'Check GPU',
    nextstep: 3,
    prestep: 1,
  },
  {
    value: 3,
    name: 'Step 3',
    info: 'Run Node',
    prestep: 2,
  },
];
const Nodes = (props) => {
  const [curStep, setCurStep] = useState(stepsList[0]);

  const onBack = () => {
    const step = stepsList.find((item) => item.value == curStep['prestep']);
    if (!step) return;
    setCurStep(step);
  };

  const onNext = () => {
    const step = stepsList.find((item) => item.value == curStep['nextstep']);
    if (!step) return;
    setCurStep(step);
  };

  return (
    <>
      <div className={styles['steps']}>
        <div className={styles['step-echart']}>
          <StepChart data={curStep.value} />
        </div>
        <div className={styles['step-info']}>
          <h1>{curStep.name}</h1>
          <p>{curStep.info}</p>
        </div>
        <div className={styles['pre-next-btn']}>
          <button onClick={onBack}>
            <i className={styles['pre']}></i>
            <span>Pre</span>
          </button>
          <button onClick={onNext}>
            <span>Next</span>
            <i className={styles['next']}></i>
          </button>
        </div>
      </div>
      <div className={styles['step-content']}>
        {curStep.value == 1 && <Step1 />}
        {curStep.value == 2 && <Step2 />}
        {curStep.value == 3 && <Step3 />}
      </div>
    </>
  );
};

Nodes.wrappers = ['@/wrappers/auth'];
export default Nodes;
