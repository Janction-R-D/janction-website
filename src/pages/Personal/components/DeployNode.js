import { empty } from '@/utils/lang';
import { Steps } from 'antd';
import { useState } from 'react';
import Step2 from './GPU';
import Step3 from './RunNode';
import Step1 from './System';
import styles from './index.less';

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
    <div className={styles['deploy-node']}>
      <div>
        <div className={styles['next-select']}>
          <div className={styles['steps']}>
            <Steps
              current={curStep.key}
              items={stepsList}
              responsive={false}
              direction="horizontal"
            />
          </div>
          <div className={styles['button-box']}>
            {!empty(curStep.prestep) && (
              <button onClick={onBack} className="hvr-shrink">
                BACK
              </button>
            )}
            <button onClick={onNext} className="hvr-shrink">
              NEXT
            </button>
          </div>
        </div>
        {curStep.key == 0 && <Step1 />}
        {curStep.key == 1 && <Step2 />}
        {curStep.key == 2 && <Step3 />}
      </div>
      <div className={styles['android-button-box']}>
        {!empty(curStep.prestep) && <button onClick={onBack}>BACK</button>}
        <button onClick={onNext}>NEXT</button>
      </div>
    </div>
  );
};

export default DeployNode;
