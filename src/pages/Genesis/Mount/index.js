import React, { useEffect, useState } from 'react';
import { history, Redirect, useModel } from 'umi';
import { NodeInfo } from './components/NodeInfo';
import styles from './index.less';
import { Button, Card, Input, Select, Checkbox, TimePicker } from 'antd';
import MountEchart from './components/Graps';
import { fetchConfigInfo, postConfigInfo } from '@/services/genesis';
import Loading from './components/Loading';
import TooltipBox from '../components/Tooltip';
import JanctionTip from '@/components/JanctionTip';

export default function Mount() {
  const { initialState } = useModel('@@initialState');
  const { isLessee } = initialState || {};
  const { node } = history.location.state || {};
  console.log(node);
  const [searchId, setSearchId] = useState(node.deviceId || '');
  const [loading, setLoading] = useState(false);
  const [minDuration, setMinDuration] = useState({ value: 1, label: 'Month' });
  const [maxDuration, setMaxDuration] = useState({ value: 4, label: 'Year' });
  const [minPeriod, setMinPeriod] = useState(null);
  const [maxPeriod, setMaxPeriod] = useState(null);
  const [price, setPrice] = useState(null);
  const [userInfo, setUserInfo] = useState({});
  const [error, setError] = useState(false);
  const [errorRange, setErrorRange] = useState(false);
  const [minLease, setMinLease] = useState(1);
  const [maxLease, setMaxLease] = useState(1);
  const [tags, setTags] = useState([]);
  const options = [
    {
      value: 1,
      label: 'Hour',
    },
    {
      value: 2,
      label: 'Day',
    },
    {
      value: 3,
      label: 'Week',
    },
    {
      value: 4,
      label: 'Month',
    },
    {
      value: 5,
      label: 'Year',
    },
  ];
  const onMaxDurationValueChange = (value) => {
    const [newValue] = options.filter((item) => item.value == value);
    setMaxDuration(newValue);
  };
  const onMinDurationValueChange = (value) => {
    const [newValue] = options.filter((item) => item.value == value);
    setMinDuration(newValue);
  };
  useEffect(() => {
    if (searchId === '') return;
    setLoading(true);
    setError(false);
    fetchConfigInfo(searchId)
      .then((res) => {
        console.log(res);
        if (res.error) {
          throw new Error('Node not found');
        }
        setUserInfo(res || {});
        setTags(res.tags || []);
        setPrice(res.price || 0);
        setMaxLease(res.maximum_lease_duration || 1);
        setMinLease(res.minimum_lease_duration || 1);

        const [mxlease] = options.filter(
          (item) => item.label.toLowerCase() == res?.maximum_lease_unit,
        );
        const [mnlease] = options.filter(
          (item) => item.label.toLowerCase() == res?.minimum_lease_unit,
        );
        console.log(mxlease, mnlease);
        setMaxDuration(mxlease || {});
        setMinDuration(mnlease || {});
      })
      .catch((err) => {
        console.log(err);
        setError(true);
        setUserInfo({});
      })
      .finally(() => {
        setLoading(false);
        setTimeout(() => {
          setError(false);
        }, 2500);
      });
  }, []);
  useEffect(() => {
    if (minLease > maxLease || minDuration.value > maxDuration.value) {
      setErrorRange(true);
    } else if (minDuration.value == maxDuration.value && minLease >= maxLease) {
      setErrorRange(true);
    } else {
      setErrorRange(false);
    }
  }, [maxDuration, minDuration, maxLease, minLease]);
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

  const handleSearch = (e) => {
    e.preventDefault();
    console.log(searchId);
    if (searchId === '') return;
    setLoading(true);
    setError(false);
    fetchConfigInfo(searchId)
      .then((res) => {
        console.log(res);
        if (res.error) {
          throw new Error('Node not found');
        }
        setUserInfo(res || {});
        setTags(res.tags || []);
        setPrice(res.price || 0);
        setMaxLease(res.maximum_lease_duration || 1);
        setMinLease(res.minimum_lease_duration || 1);

        const [mxlease] = options.filter(
          (item) => item.label.toLowerCase() == res?.maximum_lease_unit,
        );
        const [mnlease] = options.filter(
          (item) => item.label.toLowerCase() == res?.minimum_lease_unit,
        );
        console.log(mxlease, mnlease);
        setMaxDuration(mxlease || {});
        setMinDuration(mnlease || {});
      })
      .catch((err) => {
        console.log(err);
        setError(true);
        setUserInfo({});
      })
      .finally(() => {
        setLoading(false);
        setTimeout(() => {
          setError(false);
        }, 2500);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!price || !userInfo.node_id) return;
    const payload = {
      node_id: 'd9ede8ea-379b-4d8d-9d4d-c7f21b6400df',
      tags: tags,
      price: Number(price),
      minimum_lease_unit: minDuration.label,
      maximum_lease_unit: maxDuration.label,
      minimum_lease_duration: minLease,
      maximum_lease_duration: maxLease,
      available_period_up: maxPeriod,
      available_period_down: minPeriod,
    };
    console.log(payload);
    return;
    postConfigInfo(payload)
      .then((res) => {
        history.push('/genesis/instance');
      })
      .catch((err) => console.log(err));
  };
  function formatTime(date) {
    const d = new Date(date);

    const hours = d.getHours().toString().padStart(2, '0');
    const minutes = d.getMinutes().toString().padStart(2, '0');
    const seconds = d.getSeconds().toString().padStart(2, '0');

    return `${hours}:${minutes}:${seconds}`;
  }
  const calendarChange = (value) => {
    const [a, b] = value;
    const newMinPeriod = formatTime(a._d);
    const newMaxPeriod = formatTime(b._d);

    setMaxPeriod(newMaxPeriod);
    setMinPeriod(newMinPeriod);
  };

  if (isLessee || !node) return <Redirect to="/genesis/dashboard"></Redirect>;

  return (
    <form className={styles['main']} onSubmit={(e) => handleSubmit(e)}>
      <h1 className={styles['title']}>Device Rental Configuration</h1>

      <Card className={styles['card']}>
        <section className={styles['card-header']}>
          <h3> Device information Upload</h3>
        </section>
        <main className={styles['main-card']}>
          <section className={styles['input-box-container']}>
            <div className={styles['input-box']}>
              <div
                className={`${styles['device-box']} ${
                  error ? styles['search-input-error'] : ''
                }`}
              >
                <Input
                  type="text"
                  placeholder="Please enter the device identification number"
                  onChange={(e) => setSearchId(e.target.value)}
                  onPressEnter={(e) => handleSearch(e, searchId)}
                  defaultValue={searchId}
                  className={styles['search-input-node']}
                  readOnly={node.deviceId}
                />
                <Button
                  className={styles['create-btn']}
                  type="primary"
                  onClick={(e) => handleSearch(e)}
                  disabled={node.deviceId || searchId.length < 10}
                >
                  Auto-Recognition
                </Button>
              </div>
              <JanctionTip title="Instances with less than 7 days until expiration will be displayed here" />
            </div>
            {error && (
              <p className={styles['red']}>
                Please check if your number is correct.
              </p>
            )}
          </section>
          <main className={styles['card-content']}>
            <h3>Configurable Parameters</h3>
            {userInfo?.node_id ? (
              <NodeInfo styles={styles} tags={tags} setTags={setTags} />
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
                placeholder="Enter a price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
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
                  defaultValue={minDuration.label}
                  value={minDuration.label}
                  onChange={(value) => onMinDurationValueChange(value)}
                />
                <p>(1-11)</p>
              </div>
            </div>
          </div>
          <div className={styles['duration-item']}>
            <p>Maximum lease duration</p>
            <div className={styles['duration-box']}>
              <div
                className={`${styles['duration-group']} ${
                  errorRange ? styles['search-input-error'] : ''
                }`}
              >
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
                    defaultValue={maxDuration.label}
                    value={maxDuration.label}
                    name="maximum_lease_unit"
                    className={styles['select']}
                    onChange={(value) => onMaxDurationValueChange(value)}
                  />

                  <p>(At least 12)</p>
                </div>
              </div>
              {errorRange && (
                <p className={styles['red']}>
                  Please fill in a time greater than the minimum period.
                </p>
              )}
            </div>
          </div>
          <div className={styles['duration-item']}>
            <p>Available period</p>
            <div className={styles['duration-group']}>
              <div className={styles['input-duration']}>
                <TimePicker.RangePicker
                  className={styles['input-time']}
                  onChange={calendarChange}
                />
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
        <Button
          className={styles['create-btn']}
          onClick={(e) => handleSubmit(e)}
        >
          Confirm
        </Button>
      </section>
    </form>
  );
}
