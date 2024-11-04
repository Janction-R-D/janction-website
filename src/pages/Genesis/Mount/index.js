import React, { useState } from 'react';
import { history } from 'umi';
import JanctionRange from '@/components/JanctionRange';
import styles from './index.less';
import { Button, Card, Input, Select, Checkbox, Radio } from 'antd';
import MountEchart from './components/Graps';
import { fetchConfigInfo, postConfigInfo } from '@/services/genesis';
export default function Mount() {
  const [searchId, setSearchId] = useState('');
  const [walletAddress, setWalletAddress] = useState('');
  const [minDuration, setMinDuration] = useState({ number: 1, time: 'Month' });
  const [maxDuration, setMaxDuration] = useState({ number: 1, time: 'Year' });
  const [userInfo, setUserInfo] = useState(null);
  const [showInfo, setShowInfo] = useState(false);
  const [tagInput, setTagInput] = useState(null);
  const [maxPeriod, setMaxPeriod] = useState(1);
  const [minPeriod, setMinPeriod] = useState(1);
  const [tags, setTags] = useState([
    'Machine Learning',
    'Suitable for AI training',
    'Deep Learning Optimization',
  ]);
  const AddTag = (name) => {
    if (name == '') return;
    const newTags = [...tags, name];
    setTags(newTags);
  };
  const removeTag = (name) => {
    const newTags = tags.filter((tag) => tag !== name);
    setTags(newTags);
  };
  const onMaxDurationValueChange = (value) => {
    setMaxDuration((prevState) => ({ number: value, ...prevState }));
  };
  const onMinDurationValueChange = (value) => {
    setMinDuration((prevState) => ({ number: value, ...prevState }));
  };
  const onMinPeriodValueChange = (value) => {
    setMinPeriod(value);
  };
  const onMaxPeriodValueChange = (value) => {
    setMaxPeriod(value);
  };

  const options = [
    {
      value: '1',
      label: 'Day',
    },
    {
      value: '2',
      label: 'Week',
    },
    {
      value: '3',
      label: 'Month',
    },
    {
      value: '4',
      label: 'Year',
    },
  ];
  const handleSearch = () => {
    fetchConfigInfo(searchId)
      .then((res) => {
        console.log(res);
        setUserInfo(res);
        setShowInfo(true);
      })
      .catch((err) => console.log(err));
  };
  const options_payment = [{ name: 'USDC', value: 'USDC' }];
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('holaa');
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);

    const payload = {
      node_id: 'd9ede8ea-379b-4d8d-9d4d-c7f21b6400df',
      tags: tags,
      minimum_lease_unit: minDuration.time,
      maximum_lease_unit: maxDuration.time,
      billing_method_token: 'USDC',
      ...data,
    };
    postConfigInfo(payload)
      .then((res) => {
        console.log(res);
        // history.push()
      })
      .catch((err) => console.log(err));
  };
  return (
    <form className={styles['main']} onSubmit={(e) => handleSubmit(e)}>
      <h1 className={styles['title']}>Device Rental Configuration</h1>
      <div className={styles['btn-box']}>
        <Button className={styles['btn-special']} type="primary">
          Device information Upload
        </Button>
      </div>
      <Card className={styles['card']}>
        <div className={styles['device-box']}>
          <Input
            suffix={
              <i className="iconfont icon-search" style={{ fontSize: '1vw' }} />
            }
            placeholder="Please enter the device identification number"
            onChange={(e) => setSearchId(e.target.value)}
            onPressEnter={handleSearch}
            className={styles['search-input']}
          />
          <Button
            className={styles['btn-orange']}
            type="primary"
            onClick={handleSearch}
          >
            Auto-Recognition
          </Button>
        </div>

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
                <span className="icon-blue" onClick={() => AddTag(tagInput)}>
                  <i className="iconfont icon-add"></i>
                </span>
              }
              placeholder="Add tag"
              className={styles['card-security-input']}
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onPressEnter={() => {
                AddTag(tagInput);
                setTagInput('');
              }}
            />
            <ul className={styles['card-security-keys']}>
              {tags.map((item, index) => (
                <div className={styles['card-security-key']} key={index}>
                  <div>
                    <p>{item}</p>
                  </div>
                  <span
                    className={styles['icon-red']}
                    onClick={() => removeTag(item)}
                  >
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
                  defaultValue="Month"
                  buttonStyle="solid"
                  style={{
                    borderRadius: '24px',
                  }}
                  className={styles['band-radio']}
                  name="billing_mode"
                >
                  <Radio.Button value="Day" name="billing_mode">
                    Day
                  </Radio.Button>
                  <Radio.Button value="Week" name="billing_mode">
                    Week
                  </Radio.Button>
                  <Radio.Button value="Month" name="billing_mode">
                    Month
                  </Radio.Button>
                  <Radio.Button value="Year" name="billing_mode">
                    Year
                  </Radio.Button>
                </Radio.Group>
              </div>
              <div className={styles['card-input']}>
                <Input type="number" placeholder="0" name="price" />
                <p>point</p>
              </div>
            </div>
          </section>
        </Card>
      </section>
      <div
        className={styles['btn-box']}
        style={{
          marginBlock: '8px',
        }}
      >
        <Button className={styles['btn-special']} type="primary">
          Billing method
        </Button>
      </div>
      <Card className={styles['card']}>
        <div className={styles['duration']}>
          <div className={styles['duration-item']}>
            <p>Minimum lease duration</p>
            <div className={styles['duration-group']}>
              <div className={styles['input-duration']}>
                <JanctionRange
                  value={minDuration.number}
                  defaultValue={minDuration.number}
                  name="minimum_lease_duration"
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
                name="minimum_lease_unit"
                defaultValue={minDuration.time}
              />
            </div>
          </div>
          <div className={styles['duration-item']}>
            <p>Maximum lease duration</p>
            <div className={styles['duration-group']}>
              <div className={styles['input-duration']}>
                <JanctionRange
                  value={maxDuration.number}
                  defaultValue={maxDuration.number}
                  name="maximum_lease_duration"
                  onChange={onMaxDurationValueChange}
                />
              </div>
              <label>
                <Select
                  bordered={false}
                  options={options}
                  style={{
                    width: '190px',
                  }}
                  value={maxDuration.time}
                  defaultValue={maxDuration.time}
                  name="maximum_lease_unit"
                  className={styles['select']}
                />
              </label>
            </div>
          </div>
        </div>
        <div className={styles['duration-item']}>
          <p>Available period</p>
          <div className={styles['duration-group']}>
            <div className={styles['input-duration']}>
              <JanctionRange
                value={minPeriod}
                onChange={onMinPeriodValueChange}
                name="available_period_down"
              />
            </div>
            <div className={styles['input-duration']}>
              <JanctionRange
                value={maxPeriod}
                onChange={onMaxPeriodValueChange}
                unit="Oclock"
                name="available_period_up"
              />
            </div>
          </div>
        </div>
        <section className={styles['check-side']}>
          <section className={styles['currency_box']}>
            <div>
              <p className={styles['currency_text']}>
                cryptocurrencies for receiving payments
              </p>

              <Select
                bordered={false}
                options={options_payment}
                style={{
                  width: '190px',
                }}
                name="billing_method_token"
                defaultValue={options_payment[0].value}
                className={styles['select']}
              />
            </div>
            <div>
              <p>payee's wallet address</p>
            </div>
            <Input
              className={styles['search-input']}
              placeholder="Please enter  your wallet adress"
              value={walletAddress}
              onChange={(e) => setWalletAddress(e.target.value)}
              name="billing_method_address"
            />
          </section>
          <div className={styles['checked-box']}>
            <Checkbox>
              I have read and agreed to the{' '}
              <span className={styles['blue']}>relevant service terms</span>.
            </Checkbox>
            <button className={styles['btn-orange']}>Confirm</button>
          </div>
        </section>
      </Card>
    </form>
  );
}
