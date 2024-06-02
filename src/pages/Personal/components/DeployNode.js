import { Steps } from 'antd';
import Step1 from './System';
import Step2 from './GPU';
import Overview from './Overview';
import { empty } from '@/utils/lang';
import styles from './index.less';
import { useState } from 'react';

const stepsList = [
  {
    key: 0,
    nextstep: 1,
  },
  {
    key: 1,
    nextstep: 2,
    prestep: 0,
  },
  {
    key: 2,
    prestep: 1,
  },
];
const DeployNode = (props) => {
  const [curStep, setCurStep] = useState(stepsList[0]);

  const onBack = () => {
    const step = stepsList.find((item) => item.key == curStep['prestep']);
    if (!step) return;
    setCurStep(step);
  };

  const onNext = () => {
    const step = stepsList.find((item) => item.key == curStep['nextstep']);
    if (!step) return;
    setCurStep(step);
  };

  return (
    <>
      <div className={styles['next-select']}>
        <div className={styles['steps']}>
          <Steps current={curStep.key} items={stepsList} />
        </div>
        <div className={styles['button-box']}>
          {!empty(curStep.prestep) && <button onClick={onBack}>BACK</button>}
          {!empty(curStep.nextstep) && <button onClick={onNext}>NEXT</button>}
        </div>
      </div>
      {curStep.key == 0 && <Step1 />}
      {curStep.key == 1 && <Step2 />}
      {curStep.key == 2 && <Overview />}
    </>
  );
};

export default DeployNode;
