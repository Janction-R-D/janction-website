import React, { useState } from 'react';
import { history } from 'umi';
import { NodeInfo } from './components/NodeInfo';
import styles from './index.less';
import { Button, Card, Input, Select, Checkbox, TimePicker } from 'antd';
import MountEchart from './components/Graps';
import { fetchConfigInfo, postConfigInfo } from '@/services/genesis';
import Loading from './components/Loading';
export default function Mount() {
  const [searchId, setSearchId] = useState('');
  const [loading, setLoading] = useState(false);
  const [minDuration, setMinDuration] = useState({ number: 1, time: 'Month' });
  const [maxDuration, setMaxDuration] = useState({ number: 1, time: 'Year' });
  const [userInfo, setUserInfo] = useState(null);
  const [error, setError] = useState(false);
  const [minLease, setMinLease] = useState(1);
  const [maxLease, setMaxLease] = useState(1);

  const handleChange = (value) => {
    setSelectedPayment(value);
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

    if (searchId === '') return;
    setLoading(true);
    fetchConfigInfo(searchId)
      .then((res) => {
        console.log(res);
        if (res.error) {
          throw new Error('Node not found');
        }
        setUserInfo(res || {});
      })
      .catch((err) => {
        console.log(err);
        setError(true);
        setTimeout(() => {
          setError(false);
          console.log('object');
        }, 3000);
      })
      .finally(() => {
        setTimeout(() => {
          setError(false);
          setLoading(false);
          console.log('object');
        }, 3000);
      });
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
            <div
              className={`${styles['device-box']} ${
                error ? styles['search-input-error'] : ''
              }`}
            >
              <Input
                type="text"
                placeholder="Please enter the device identification number"
                onChange={(e) => setSearchId(e.target.value)}
                onPressEnter={(e) => handleSearch(searchId)}
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
            {userInfo?.node_id ? (
              <NodeInfo styles={styles} />
            ) : (
              <Loading loading={loading} />
            )}
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
