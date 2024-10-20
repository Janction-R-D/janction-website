import { useState } from 'react';
import styles from './index.less';
import {
  Steps,
  Divider,
  Radio,
  Table,
  Select,
  Button,
  Input,
  Checkbox,
} from 'antd';
import RegionSelect from './RegionSelect';
import {
  BAND_COLUMNS,
  COMPUTE_MODE,
  DEFAULT_COMPUTE_MODE,
  PORT_PROTOCOL,
  REGION,
  SUMMARY,
  VERSIONS,
} from '../extra';
import { SYSTEM_LIST } from '../../../../constant';
import Settlement from './Settlement';
import JanctionRange from '@/components/JanctionRange';
import { PlusOutlined } from '@ant-design/icons';
import BandWidth from './BandWidth';

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
      <section className={styles['config-item']}>
        <h1 className={styles['title']}>Basic configuration</h1>
        <Divider />
        <RegionSelect />
      </section>
      <section className={styles['config-item']}>
        <h1 className={styles['title']}>Bandwidth</h1>
        <Divider />
        <div className={styles['band-config']}>
          <Radio.Group
            defaultValue={computeMode}
            className={styles['janction-radio']}
            onChange={(e) => onComputeModeChange(e.target.value)}
          >
            {COMPUTE_MODE.map((item) => (
              <Radio.Button value={item.value} key={item.value}>
                {item.label}
              </Radio.Button>
            ))}
          </Radio.Group>
          <Table
            bordered={false}
            className={styles['janction-table']}
            columns={BAND_COLUMNS}
            dataSource={list}
            pagination={false}
          ></Table>
          <div className={styles['ip']}>
            <div className={styles['filter']}></div>
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
          <div
            className={[
              styles['jaction-select'],
              styles['version-select'],
            ].join(' ')}
          >
            <Select placeholder="Select version" options={VERSIONS}></Select>
          </div>
        </div>
      </section>
    </>
  );
};

const Step2 = () => {
  const [list, setList] = useState([{}]);

  const columns = [
    {
      title: '用途',
      dataIndex: 'platform',
    },
    {
      title: '类型',
      dataIndex: 'progress',
      render: () => {
        return (
          <div className={[styles['jaction-select']].join(' ')}>
            <Select placeholder="请选择类型" options={VERSIONS}></Select>
          </div>
        );
      },
    },
    {
      title: '容量',
      dataIndex: 'cpu_usage',
      render: () => {
        return <JanctionRange />;
      },
    },
    {
      title: '数量',
      dataIndex: 'energy',
      render: () => {
        return <JanctionRange />;
      },
    },
    {
      title: '架构-分类',
      dataIndex: 'disk_usage',
    },
    {
      title: '操作',
      dataIndex: 'uptime',
    },
  ];

  return (
    <>
      <section className={styles['config-item']}>
        <h1 className={styles['title']}>Storage</h1>
        <Divider />
        <div className={styles['band-config']}>
          <Table
            bordered={false}
            className={styles['janction-table']}
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
          ></Table>
        </div>
      </section>
      <BandWidth />
      <section className={styles['config-item']}>
        <h1 className={styles['title']}>Bandwidth</h1>
        <Divider />
        <div className={styles['band-config']}>
          <div className={styles['item']}>
            <div className={styles['name']}>Name</div>
            <div className={styles['value']}>
              <div className={styles['jaction-input']}>
                <Input placeholder="Please enter name" />
              </div>
            </div>
          </div>
          <div className={styles['item']}>
            <div className={styles['name']}>Enable IPv4 port/protocol</div>
            <div className={styles['value']}>
              <Checkbox.Group
                options={PORT_PROTOCOL}
                defaultValue={['Apple']}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

const Step3 = () => {
  return (
    <>
      <section className={styles['config-item']}>
        <h1 className={styles['title']}>Management settings</h1>
        <Divider />
        <div className={styles['band-config']}>
          <div className={styles['vertical-item']}>
            <div className={styles['name']}>Confirm password</div>
            <div className={styles['value']}>
              <Checkbox.Group
                options={PORT_PROTOCOL}
                defaultValue={['Apple']}
              />
              <p className={styles['desc']}>
                Root has the highest permission of the operating system. Using
                root as the login name may cause security risks. It is
                recommended that you use user as the login name.
              </p>
            </div>
          </div>
          <div className={styles['item']}>
            <div className={styles['name']}>Login password</div>
            <div className={styles['value']}>
              <div className={styles['jaction-input']}>
                <Input.Password placeholder="Please enter password" />
              </div>
            </div>
          </div>
          <div className={styles['item']}>
            <div className={styles['name']}>Confirm Password</div>
            <div className={styles['value']}>
              <div className={styles['jaction-input']}>
                <Input.Password placeholder="Please enter password" />
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className={styles['config-item']}>
        <h1 className={styles['title']}>Configuration summary</h1>
        <Divider />
        <div className={styles['band-config']}>
          {SUMMARY.map((item) => (
            <div className={styles['item']} key={item.name}>
              <div className={styles['name']}>{item.name}</div>
              <div className={styles['value']}>
                <span>{item.value}</span>
              </div>
            </div>
          ))}
        </div>
      </section>
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
      {step < 2 && (
        <div className={styles['footer']}>
          {step > 0 && (
            <div className={styles['pre']}>
              <Button onClick={onPre}>Previous</Button>
            </div>
          )}
          {step < 2 && (
            <div className={styles['next']}>
              <Button onClick={onNext}>Next</Button>
            </div>
          )}
        </div>
      )}
      {step == 2 && <Settlement onPre={onPre} />}
    </div>
  );
};

export default Quick;
