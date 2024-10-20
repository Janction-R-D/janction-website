import React, { useEffect, useState } from 'react';
import { Select, Input, Button, Radio } from 'antd';
import styles from './index.less';
import JanctionTable from '@/components/JanctionTable';
import TimeCounter from './components/TimerCounter';
import CounterQuantity from './components/CounterQuantity';
import FoterPrice from './components/FoterPrice';
import { DEFAULT_PURCHASE_TYPE, PURCHASES } from './extra';
import Customized from './components/Customized';
import Quick from './components/Quick';

function Purchase() {
  const [activePurType, setActivePurType] = useState(DEFAULT_PURCHASE_TYPE);
  const [totalAmount, setTotalAmount] = useState(0);
  const [selectedInstance, setInstance] = useState({
    name: 'Architecture',
    price: 20,
    value: 'x86 computing',
  });
  const [instancesFamily, setFamily] = useState({
    name: 'instance',
    price: 80,
    value: 'Standard',
  });
  const [selectedModel, setModel] = useState({
    key: '1',
    price: 10,
    vCPU: 'SA5.MEDIUM2 Xxxx',
  });

  useEffect(() => {
    const getTotalPrice = () => {
      let total =
        selectedInstance.price * instancesFamily.price * selectedModel.price;
      return total.toFixed(2);
    };
    setTotalAmount(getTotalPrice());
  }, [selectedInstance, instancesFamily, selectedModel]);

  const onPurTypeChange = (type) => {
    setActivePurType(type);
  };

  const options = [
    { value: 'jack', label: 'Jack' },
    { value: 'lucy', label: 'Lucy' },
    { value: 'Yiminghe', label: 'yiminghe' },
    { value: 'disabled', label: 'Disabled', disabled: true },
  ];
  const optionsRadio = [
    {
      name: 'Architecture',
      price: 20,
      value: 'x86 computing',
    },
    {
      name: 'Architecture',
      price: 40,
      value: 'ARM Computing',
    },
    {
      name: 'Architecture',
      price: 60,
      value: 'Heterogenious continius',
    },
    {
      name: 'Architecture',
      price: 80,
      value: 'Bare Metal instance',
    },
  ];
  const instanceFamily = [
    {
      name: 'instance',
      price: 80,
      value: 'Standard',
    },
    {
      name: 'instance',
      price: 85,
      value: 'MEM-optimized',
    },
    {
      name: 'instance',
      price: 90,
      value: 'Compute',
    },
    {
      name: 'instance',
      price: 95,
      value: 'High IO',
    },
    {
      name: 'instance',
      price: 100,
      value: 'Big Data',
    },
    {
      name: 'instance',
      price: 110,
      value: 'Be Fast',
    },
    {
      name: 'instance',
      price: 120,
      value: 'Preferential',
    },
  ];
  const model = {
    name: 'SA5.8XLARGE128',
    value: 'SA5.8XLARGE128',
  };

  const columns = [
    {
      title: <div className="name">Instance </div>,
      dataIndex: 'name',
      key: 'name',
      ellipsis: true,
      width: 160,
    },

    {
      title: 'Specification vCPU',
      dataIndex: 'vCPU',
      key: 'vCPU',
      width: 130,
    },
    {
      title: 'MEM',
      dataIndex: 'MEM',
      key: 'MEM',
      ellipsis: true,
      width: 100,
    },

    {
      title: 'CPU Clock Speed Turbo Boost',
      key: 'CPU',
      dataIndex: 'CPU',
      width: 80,
      ellipsis: true,
    },
    {
      title: 'Processor',
      key: 'Processor',
      dataIndex: 'Processor',
      width: 80,
      ellipsis: true,
    },
    {
      title: 'Private network bandwidth ',
      dataIndex: 'Private',
      key: 'Private',
      width: 80,
      ellipsis: true,
    },
    {
      title: 'Packets in/out',
      dataIndex: 'Packets',
      key: 'Packets',
      width: 150,
    },
    {
      title: <div className="operation">Operation</div>,
      dataIndex: 'operations',
      key: 'operations',
      width: 180,
    },
  ];
  const data = [
    {
      key: '1',
      price: 300,
      vCPU: 'SA5.MEDIUM2 Xxxx',
      name: (
        <label
          className={styles['instance-label']}
          key={'SA5.MEDIUM2 Xxxx'}
          htmlFor={'SA5.MEDIUM2 Xxxx'}
        >
          <input
            type="radio"
            name="instance-model"
            value={'SA5.MEDIUM2 Xxxx'}
            defaultChecked
            id={'SA5.MEDIUM2 Xxxx'}
            onClick={() =>
              setModel({ key: '1', price: 300, vCPU: 'SA5.MEDIUM2 Xxxx' })
            }
          />
          <p>Instance ID</p>
        </label>
      ),

      MEM: 'Xxxx',
      CPU: 'Xxxx',
      Processor: 'Xxxx',
      Private: 'Xxxx',
      Packets: 'Xxxx',
      operations: <div className="operation-text">Operation</div>,
    },
    {
      key: '2',
      price: 400,
      vCPU: 'SA5.SMALL2 Xxxx',
      name: (
        <label
          className={styles['instance-label']}
          key={'SA5.SMALL2 Xxxx'}
          htmlFor={'SA5.SMALL2 Xxxx'}
        >
          <input
            type="radio"
            name="instance-model"
            value={'SA5.SMALL2 Xxxx'}
            id={'SA5.SMALL2 Xxxx'}
            onClick={() =>
              setModel({ key: '2', price: 400, vCPU: 'SA5.MEDIUM2 Xxxx' })
            }
          />
          <p>Instance ID</p>
        </label>
      ),

      MEM: 'Xxxx',
      CPU: 'Xxxx',
      Processor: 'Xxxx',
      Private: 'Xxxx',
      Packets: 'Xxxx',
      operations: <div className="operation-text">Operation</div>,
    },
  ];
  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };

  return (
    <main className={styles['main-container']}>
      <section>
        <h1 className={styles['text__title']}>Configure instance</h1>

        <div className={styles['purchase-type-nav']}>
          {PURCHASES.map((item) => (
            <div
              key={item.value}
              className={[
                styles['nav-item'],
                activePurType == item.value && styles['nav-active-item'],
              ].join(' ')}
              onClick={() => onPurTypeChange(item.value)}
            >
              {item.name}
            </div>
          ))}
        </div>

        {activePurType == PURCHASES[0].value && <Customized />}
        {activePurType == PURCHASES[1].value && <Quick />}
      </section>
    </main>
  );
}

Purchase.wrappers = ['@/wrappers/auth'];
export default Purchase;
