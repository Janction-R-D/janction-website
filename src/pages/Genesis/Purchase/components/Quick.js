import JanctionRadio from '@/components/JanctionRadio';
import JanctionRange from '@/components/JanctionRange';
import JanctionTable from '@/components/JanctionTable';
import SearchInput from '@/components/SeachInput';
import { SYSTEM_LIST } from '@/constant';
import { PlusOutlined } from '@ant-design/icons';
import { Button, Checkbox, Input, Select, Steps, Table } from 'antd';
import { useState } from 'react';
import {
  BAND_COLUMNS,
  COMPUTE_MODE,
  DEFAULT_COMPUTE_MODE,
  IP_FILTERS,
  PORT_PROTOCOL,
  SUMMARY,
  VERSIONS,
} from '../extra';
import BandWidth from './BandWidth';
import styles from './index.less';
import RegionSelect from './RegionSelect';
import Settlement from './Settlement';
import Footer from './Footer';
import JanctionDivider from '@/components/JanctionDivider';
import PurchaseCard from './Card';
import PurchaseSubCard from './Card/SubCard';
import JanctionSelect from '@/components/JanctionSelect';
import LabelVal from './Card/LabelVal';
import JanctionInput from '@/components/JanctionInput';

const { Step } = Steps;

const Step1 = () => {
  const [computeMode, setComputeMode] = useState(DEFAULT_COMPUTE_MODE.value);
  const [list, setList] = useState([]);
  const [activeIp, setActiveIp] = useState(SYSTEM_LIST[0]);

  const onComputeModeChange = (mode) => {
    setComputeMode(mode);
  };

  return (
    <>
      <PurchaseCard title="Basic configuration">
        <PurchaseSubCard title="Region">
          <RegionSelect />
        </PurchaseSubCard>
      </PurchaseCard>

      <PurchaseCard title="Basic configuration">
        <div className={styles['band-config']}>
          <div className={styles['filter']}>
            <JanctionRadio
              defaultValue={computeMode}
              options={COMPUTE_MODE}
              onChange={onComputeModeChange}
            />
            <SearchInput />
          </div>
          <JanctionTable
            bordered={false}
            columns={BAND_COLUMNS}
            dataSource={list}
            pagination={false}
          />
          <PurchaseSubCard title="Public IP">
            <div className={styles['ip']}>
              <div className={styles['filter']}>
                <JanctionRadio
                  defaultValue={computeMode}
                  options={IP_FILTERS}
                  onChange={onComputeModeChange}
                />
                <SearchInput />
              </div>
              <div className={styles['list']}>
                {SYSTEM_LIST.map((item) => (
                  <div
                    className={[
                      styles['item'],
                      activeIp.value == item.value && styles['active-item'],
                    ].join(' ')}
                    onClick={() => setActiveIp(item)}
                  >
                    <div className={styles['icon']}>
                      <i className={`iconfont icon-${item.icon}`}></i>
                    </div>
                    <span>{item.label}</span>
                  </div>
                ))}
                <div className={[styles['item'], styles['more']].join(' ')}>
                  <i className="iconfont icon-down"></i>
                  <span>More</span>
                </div>
              </div>
            </div>
          </PurchaseSubCard>
          <JanctionSelect
            options={VERSIONS}
            placeholder="Select version"
            className="w300"
          />
        </div>
      </PurchaseCard>
    </>
  );
};

const Step2 = () => {
  const [list, setList] = useState([{}]);

  const onChange = () => {};

  const columns = [
    {
      title: 'use',
      dataIndex: 'platform',
    },
    {
      title: 'type',
      dataIndex: 'progress',
      render: () => {
        return <JanctionSelect placeholder="please select type" />;
      },
    },
    {
      title: 'capacity',
      dataIndex: 'cpu_usage',
      render: () => {
        return <JanctionRange onChange={onChange} />;
      },
    },
    {
      title: 'quantity',
      dataIndex: 'energy',
      render: () => {
        return <JanctionRange onChange={onChange} />;
      },
    },
    {
      title: 'architecture - classification',
      dataIndex: 'disk_usage',
    },
    {
      title: 'operate',
      dataIndex: 'uptime',
    },
  ];

  return (
    <>
      <PurchaseCard title="Storage">
        <JanctionTable
          bordered={false}
          columns={columns}
          dataSource={list}
          pagination={false}
          footer={() => (
            <div className={styles['janction-table-footer']}>
              <a href="#">
                <PlusOutlined />
                <span>Add data disk</span>
              </a>
              <span>You can also add 18 data disks</span>
            </div>
          )}
        />
      </PurchaseCard>
      <BandWidth />
      <PurchaseCard title="Security group">
        <LabelVal name="Name">
          <JanctionInput placeholder="Please enter name" />
        </LabelVal>
        <LabelVal name="Enable IPv4 port/protocol">
          <Checkbox.Group options={PORT_PROTOCOL} defaultValue={['Apple']} />
        </LabelVal>
      </PurchaseCard>
    </>
  );
};

const Step3 = () => {
  return (
    <>
      <PurchaseCard title="Configuration summary">
        {SUMMARY.map((item) => (
          <LabelVal name={item.name} key={item.name}>
            {item.value}
          </LabelVal>
        ))}
      </PurchaseCard>
      <Settlement />
    </>
  );
};

const Quick = (props) => {
  const [step, setStep] = useState(0);

  const onNext = () => {
    setStep(step + 1);
  };
  const onPre = () => {
    setStep(step - 1);
  };

  const onConfirm = () => {};

  return (
    <div
      className={[styles['config-wrapper'], styles['quick-wrapper']].join(' ')}
    >
      <section className={styles['config-item']}>
        <div className={styles['janction-step']}>
          <Steps current={step}>
            <Step title="Select the basic configuration" />
            <Step title="Instance & Image" />
            <Step title="Final confirmation" />
          </Steps>
        </div>
      </section>
      {step == 0 && <Step1 />}
      {step == 1 && <Step2 />}
      {step == 2 && <Step3 />}
      <Footer
        isFirst={step == 0}
        isLast={step == 2}
        onPre={onPre}
        onNext={onNext}
        onConfirm={onConfirm}
      />
    </div>
  );
};

export default Quick;
