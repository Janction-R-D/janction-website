import styles from './index.less';
import Icons from '@/components/Icons';
import { useState } from 'react';
import { Steps, Checkbox } from 'antd';

const DeployNode = (props) => {
  const [sysList, setSysList] = useState([
    { id: 1, name: 'Docker (recommend)' },
    { id: 2, name: 'MAC' },
    { id: 3, name: 'Linux' },
    { id: 4, name: 'Windows' },
  ]);
  const [sysSelected, setSysSelected] = useState();

  const onSysChange = (sys) => {
    setSysSelected(sys.slice(-1));
  };

  return (
    <section className={styles['sys-choice']}>
      <hgroup>
        <h1>Choose your Operating System</h1>
        <span>This is the prompt text</span>
      </hgroup>
      <Checkbox.Group
        style={{ width: '100%' }}
        value={sysSelected}
        onChange={onSysChange}
      >
        <ul className={styles['sys-list']}>
          {sysList.map((item) => (
            <li key={item?.id} className="df ai_c jc_c">
              <Checkbox
                value={item.id}
                className={styles['check-box']}
              ></Checkbox>
              <span>{item.name}</span>
            </li>
          ))}
        </ul>
      </Checkbox.Group>
    </section>
  );
};

export default DeployNode;
