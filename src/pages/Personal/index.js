import Icons from '@/components/Icons';
import { Steps } from 'antd';
import { useState } from 'react';
import DeployNode from './components/DeployNode';
import Header from './components/Header';
import styles from './index.less';
import NodeStatus from './components/NodeStatus';
import Overview from './components/Overview';
import { history } from 'umi';
import { empty } from '../../utils/lang';

const navList = [
  { name: 'Deploy Node', key: 0, icon: 'branch', width: 34, height: 34 },
  { name: 'Node Status', key: 1, icon: 'node-status', width: 34, height: 34 },
  { name: 'Points', key: 2, icon: 'points', width: 34, height: 34 },
];
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
const Personal = (props) => {
  const [curStep, setCurStep] = useState(stepsList[0]);

  const onNext = () => {
    const step = stepsList.find((item) => item.key == curStep['nextstep']);
    if (!step) return;
    setCurStep(step);
  };

  const onBack = () => {
    const step = stepsList.find((item) => item.key == curStep['prestep']);
    if (!step) return;
    setCurStep(step);
  };

  return (
    <div className={styles['personal-container']}>
      <nav>
        <hgroup className="df ai_c jc_sb">
          <img
            src={require('@/assets/images/icons/jun-icon.png')}
            alt=""
            width="52"
            height="52"
          />
          <Icons
            name="exit"
            className="poi"
            onClick={() => {
              history.goBack();
            }}
          />
        </hgroup>
        <ul>
          {navList.map((item) => (
            <li
              key={item.name}
              className={`df ai_c ${
                item.key == curStep.key && styles['active']
              }`}
            >
              <div className={styles['icon-box']}>
                <Icons name={item.icon} width={34} height={34} />
              </div>
              <span>{item.name}</span>
            </li>
          ))}
        </ul>
      </nav>
      <div className={styles['content']}>
        <Header />
        <div className={styles['next-select']}>
          <div className={styles['steps']}>
            <Steps current={curStep.key} items={stepsList} />
          </div>
          <div className={styles['button-box']}>
            {!empty(curStep.prestep) && <button onClick={onBack}>BACK</button>}
            {!empty(curStep.nextstep) && <button onClick={onNext}>NEXT</button>}
          </div>
        </div>
        {curStep.key == 0 && <DeployNode />}
        {curStep.key == 1 && <NodeStatus />}
        {curStep.key == 2 && <Overview />}
      </div>
    </div>
  );
};

export default Personal;
