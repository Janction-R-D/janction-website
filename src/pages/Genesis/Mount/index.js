import React, { useState } from 'react';
import { history } from 'umi';
import JanctionRange from '@/components/JanctionRange';
import styles from './index.less';
import { Button, Card, Input, Select, Checkbox, TimePicker } from 'antd';
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
  const [minLease, setMinLease] = useState(1);
  const [maxLease, setMaxLease] = useState(1);
  const [tags, setTags] = useState([
    'Machine Learning',
    'Suitable for AI training',
    'Deep Learning Optimization',
  ]);
  const options_payment = [
    { name: 'BTC', value: 'BTC' },
    { name: 'ETH', value: 'ETH' },
    { name: 'USDT', value: 'USDT' },
    { name: 'USDC', value: 'USDC' },
  ];
  const [selectedPayment, setSelectedPayment] = useState(
    options_payment[0].value,
  );

  const handleChange = (value) => {
    setSelectedPayment(value);
  };
  const AddTag = (name) => {
    if (!name || tags.length === 6) return;
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
  const onMaxLeaseChange = (e) => {
    const value = e.target.value;
    if (value > 12) return;
    setMaxLease(value);
  };
  const onMinLeaseChange = (e) => {
    const value = e.target.value;
    if (value > 11) return;
    setMinLease(value);
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
  const handleSearch = (e) => {
    e.preventDefault();
    fetchConfigInfo(searchId)
      .then((res) => {
        console.log(res);
        setUserInfo(res || {});
        setShowInfo(true);
      })
      .catch((err) => console.log(err));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);

    const payload = {
      node_id: 'd9ede8ea-379b-4d8d-9d4d-c7f21b6400df',
      tags: tags,
      minimum_lease_unit: minDuration.time,
      maximum_lease_unit: maxDuration.time,
      billing_method_token: selectedPayment,
      ...data,
    };
    console.log(payload);

    postConfigInfo(payload)
      .then((res) => {
        history.push('/genesis/instance');
      })
      .catch((err) => console.log(err));
  };
  return (
    <form className={styles['main']} onSubmit={(e) => handleSubmit(e)}>
      <h1 className={styles['title']}>Device Rental Configuration</h1>

      <Card className={styles['card']}>
        <section className={styles['card-header']}>
          <h3> Device information Upload</h3>
        </section>
        <main className={styles['main-card']}>
          <section className={styles['input-box']}>
            <div className={styles['device-box']}>
              <Input
                placeholder="Please enter the device identification number"
                onChange={(e) => setSearchId(e.target.value)}
                onPressEnter={(e) => handleSearch(e)}
                className={styles['search-input-node']}
              />
              <Button
                className={styles['create-btn']}
                type="primary"
                onClick={(e) => handleSearch(e)}
              >
                Auto-Recognition
              </Button>
            </div>
            <i className="iconfont icon-info"></i>
          </section>
          <main className={styles['card-content']}>
            <h3>Configurable Parameters</h3>
            <ul>
              <ol>
                <li>
                  <p>identification number:</p> <span> 879q43yv8hbvn</span>
                </li>
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
                  <p>status:</p>
                  <span>idle</span>
                </li>
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
                  <p>quantity:</p> <span>4</span>
                </li>
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
            <section className={styles['card-security']}>
              <span>Custom description</span>
              <div className={styles['card-security-items']}>
                <Input
                  prefix={
                    <span
                      className="icon-blue"
                      onClick={() => AddTag(tagInput)}
                    >
                      <i className="iconfont icon-add"></i>
                    </span>
                  }
                  placeholder={`Add tag(${tags.length}/6)`}
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
          </main>
        </main>
      </Card>

      <section>
        <Card className={styles['card']}>
          <section className={styles['card-header-graph']}>
            <h3>Prices</h3>
            <MountEchart styles={styles} />
          </section>
          <section className={styles['card-prices']}>
            <div className={styles['duration-item']}>
              <p>Billing price</p>

              <Input
                suffix={<p>Point/Day</p>}
                type="number"
                placeholder="0"
                name="price"
                className={styles['price-input']}
              />
            </div>
          </section>
        </Card>
      </section>

      <Card className={styles['card']}>
        <section className={styles['card-header']}>
          <h3>Rental</h3>
        </section>
        <div className={styles['duration']}>
          <div className={styles['duration-item']}>
            <p>Minimum lease duration</p>
            <div className={styles['duration-group']}>
              <div className={styles['input-duration']}>
                <Input
                  value={minLease}
                  defaultValue={minLease}
                  name="minimum_lease_duration"
                  onChange={onMinLeaseChange}
                  className={styles['lease-duration-input']}
                  type="number"
                />
              </div>
              <div className={styles['select-box']}>
                <Select
                  bordered={false}
                  options={options}
                  className={styles['select']}
                  name="minimum_lease_unit"
                  defaultValue={minDuration.time}
                />
                <p>(1-11)</p>
              </div>
            </div>
          </div>
          <div className={styles['duration-item']}>
            <p>Maximum lease duration</p>
            <div className={styles['duration-group']}>
              <div className={styles['input-duration']}>
                <Input
                  value={maxLease}
                  defaultValue={maxLease}
                  name="maximum_lease_duration"
                  onChange={onMaxLeaseChange}
                  className={styles['lease-duration-input']}
                  type="number"
                />
              </div>
              <div className={styles['select-box']}>
                <Select
                  bordered={false}
                  options={options}
                  defaultValue={maxDuration.time}
                  name="maximum_lease_unit"
                  className={styles['select']}
                />
                <p>(12)</p>
              </div>
            </div>
          </div>
          <div className={styles['duration-item']}>
            <p>Available period</p>
            <div className={styles['duration-group']}>
              <div className={styles['input-duration']}>
                <TimePicker.RangePicker className={styles['input-time']} />
              </div>
            </div>
          </div>
        </div>
      </Card>
      <section className={styles['check-side']}>
        <Checkbox>
          I have read and agreed to the{' '}
          <span className={styles['blue']}>relevant service terms</span>.
        </Checkbox>
        <button className={styles['btn-orange']}>Confirm</button>
      </section>
    </form>
  );
}
