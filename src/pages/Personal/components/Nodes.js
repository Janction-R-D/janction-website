import { SYSTEM_LIST } from '@/constant';
import { message } from 'antd';
import { useState } from 'react';
import styles from '../index.less';
import Step3 from './RunNode';
import StepChart from './StepChart';
import Step1 from './System';

const DEFAULT = {
  system: SYSTEM_LIST[0].value,
};
const stepsList = [
  {
    value: 1,
    name: 'Step 1',
    info: 'Select operating system',
    nextstep: 2,
  },
  // {
  //   value: 2,
  //   name: 'Step 2',
  //   info: 'Check GPU',
  //   nextstep: 3,
  //   prestep: 1,
  // },
  {
    value: 2,
    name: 'Step 2',
    info: 'Run Node',
    prestep: 1,
  },
];
const Nodes = (props) => {
  const [curStep, setCurStep] = useState(stepsList[0]);
  const [selectedValues, setSelectedValues] = useState(DEFAULT);

  const onBack = () => {
    const step = stepsList.find((item) => item.value == curStep['prestep']);
    if (!step) return;
    setCurStep(step);
  };

  const onNext = () => {
    const step = stepsList.find((item) => item.value == curStep['nextstep']);
    if (!step) return;
    if (!selectedValues?.system) {
      message.warning('Please choose your operating system!');
      return;
    }
    if (selectedValues.system !== 'android' && !selectedValues?.architecture) {
      message.warning('Please choose Architecture!');
      return;
    }
    setCurStep(step);
  };

  return (
    <>
      <div className={styles['steps']}>
        <div className={styles['step-echart']}>
          <StepChart data={curStep.value} max={stepsList.length} />
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
        {curStep.value == 1 && (
          <Step1
            selectedValues={selectedValues}
            setSelectedValues={setSelectedValues}
          />
        )}
        {/* {curStep.value == 2 && <Step2 />} */}
        {curStep.value == 2 && <Step3 selectedValues={selectedValues} />}
      </div>
    </>
  );
};

Nodes.wrappers = ['@/wrappers/auth'];
export default Nodes;
