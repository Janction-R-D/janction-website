import React, { useState } from 'react';
import JanctionRange from '@/components/JanctionRange';
import styles from './index.less';
import { Button, Card, Input, Select, Checkbox, Radio } from 'antd';
import MountEchart from './components/Graps';

export default function Mount() {
  const [minDuration, setMininDuration] = useState(1);
  const [maxduration, setMaxDuration] = useState(1);
  const [period, setPeriod] = useState(1);
  const tags = [
    'Machine Learning',
    'Suitable for AI training',
    'Deep Learning Optimization',
  ];
  const onMaxDurationValueChange = (value) => {
    setMaxDuration(value);
  };
  const onMinDurationValueChange = (value) => {
    setMinDuration(value);
  };
  const onPeriodValueChange = (value) => {
    setPeriod(value);
  };
  const options = [
    {
      value: '1',
      label: '1 Month',
    },
    {
      value: '2',
      label: '2 Months',
    },
    {
      value: '3',
      label: '3 Month',
    },
    {
      value: '4',
      label: '4 Months',
    },
    {
      value: '5',
      label: '5 Months',
    },
    {
      value: '6',
      label: '6 Months',
    },
  ];
  return (
    <main className={styles['main']}>
      <h1 className={styles['title']}>Device Rental Configuration</h1>
      <div className={styles['btn-box']}>
        <Button className={styles['btn-special']} type="primary">
          Device information Upload
        </Button>
      </div>
      <Card className={styles['card']}>
        <Button className={styles['btn-orange']} type="primary">
          Auto-Recognition
        </Button>
        <section className={styles['card-header']}>
          <h3>Configurable Parameters</h3>
        </section>
        <main className={styles['card-content']}>
          <ul>
            <ol>
              <li>
                <p>node-names:</p> <span>4090xxx</span>
              </li>
              <li>
                <p>Cores:</p>
                <span>8</span>
              </li>
              <li>
                <p>memory :</p>
                <span>IT</span>
              </li>
            </ol>
            <ol>
              <li>
                <p>disk:</p>
                <span>1500</span>
              </li>
              <li>
                <p>Region: </p>
                <span>Manchester,UK</span>
              </li>
              <li>
                <p>vCPU: </p> <span>ESSD Entry 40GiB</span>
              </li>
            </ol>
            <ol>
              <li>
                <p>internal storage:</p> <span>4 GiB </span>
              </li>
              <li>
                <p>Available area:</p>
                <span> 25</span>
              </li>
              <li>
                <p>Processor: </p>
                <span>intel</span>
              </li>
            </ol>
          </ul>
        </main>
      </Card>
      <Card className={styles['card']}>
        <section className={styles['card-header']}>
          <h3>Supplementary information</h3>
        </section>
        <section className={styles['card-security']}>
          <span>Custom description</span>
          <div className={styles['card-security-items']}>
            <Input
              prefix={
                <span className="icon-blue">
                  <i className="iconfont icon-add"></i>
                </span>
              }
              placeholder="Add tag"
              className={styles['card-security-input']}
            />
            <ul className={styles['card-security-keys']}>
              {tags.map((item, index) => (
                <div className={styles['card-security-key']} key={index}>
                  <div>
                    <p>{item}</p>
                  </div>
                  <span className={styles['icon-red']}>
                    <i className="iconfont icon-delete "></i>
                  </span>
                </div>
              ))}
            </ul>
          </div>
        </section>
      </Card>
      <div
        className={styles['btn-box']}
        style={{
          marginBlock: '8px',
        }}
      >
        <Button className={styles['btn-special']} type="primary">
          Prices and rental Settings
        </Button>
      </div>
      <section>
        <Card className={styles['card']}>
          <section className={styles['card-header-graph']}>
            <h3>Prices</h3>
            <MountEchart />
          </section>
          <section className={styles['card-prices']}>
            <div>
              <p>Quantity pledged (ETH)</p>
              <div className={styles['band-radio-wrapper']}>
                <Radio.Group
                  defaultValue="Hour"
                  buttonStyle="solid"
                  style={{
                    borderRadius: '24px',
                  }}
                  className={styles['band-radio']}
                >
                  <Radio.Button value="Hour" name="location">
                    Hangzhou
                  </Radio.Button>
                  <Radio.Button value="Day" name="location">
                    Day
                  </Radio.Button>
                  <Radio.Button value="Week" name="location">
                    Week
                  </Radio.Button>
                  <Radio.Button value="Month" name="location">
                    Month
                  </Radio.Button>
                  <Radio.Button value="Year" name="location">
                    Year
                  </Radio.Button>
                </Radio.Group>
              </div>
              <div className={styles['card-input']}>
                <Input type="number" placeholder="0" />
                <p>point</p>
              </div>
            </div>
          </section>
        </Card>
      </section>
      <Card className={styles['card']}>
        <div className={styles['duration']}>
          <div className={styles['duration-item']}>
            <p>Minimum lease duration</p>
            <div className={styles['duration-group']}>
              <div className={styles['input-duration']}>
                <JanctionRange
                  value={minDuration}
                  onChange={onMinDurationValueChange}
                />
              </div>
              <Select
                bordered={false}
                options={options}
                style={{
                  width: '190px',
                }}
                className={styles['select']}
                defaultActiveFirstOption={options[0].value}
              />
            </div>
          </div>
          <div className={styles['duration-item']}>
            <p>Maximum lease duration</p>
            <div className={styles['duration-group']}>
              <div className={styles['input-duration']}>
                <JanctionRange
                  value={maxduration}
                  onChange={onMaxDurationValueChange}
                />
              </div>
              <Select
                bordered={false}
                options={options}
                style={{
                  width: '190px',
                }}
                className={styles['select']}
                defaultActiveFirstOption={options[0].value}
              />
            </div>
          </div>
        </div>
        <div className={styles['duration-item']}>
          <p>Available period</p>
          <div className={styles['duration-group']}>
            <div className={styles['input-duration']}>
              <JanctionRange
                value={period}
                onChange={onPeriodValueChange}
                unit="Oclock"
              />
            </div>
          </div>
        </div>
        <section className={styles['check-side']}>
          {' '}
          <Checkbox>
            I have read and agreed to the{' '}
            <span className={styles['blue']}>relevant service terms</span>.
          </Checkbox>
          <Button className={styles['btn-orange']}>Confirm</Button>
        </section>
      </Card>
    </main>
  );
}
