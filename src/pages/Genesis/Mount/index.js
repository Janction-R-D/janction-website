import JanctionTip from '@/components/JanctionTip';
import {
  fetchNodesConfigInfo,
  fetchNodesConfigUpdate,
  fetchNodesInfo,
} from '@/services/genesis';
import {
  Button,
  Card,
  Checkbox,
  Input,
  message,
  Select,
  TimePicker,
} from 'antd';
import { useEffect, useState } from 'react';
import { history, Redirect, useModel } from 'umi';
import Loading from './components/Loading';
import { NodeInfo } from './components/NodeInfo';
import styles from './index.less';
import { max } from 'lodash';

const options = [
  {
    value: 1,
    label: 'Hour',
    max: 24,
  },
  {
    value: 2,
    label: 'Day',
    max: 30,
  },
  {
    value: 3,
    label: 'Week',
    max: 4,
  },
  {
    value: 4,
    label: 'Month',
    max: 11,
  },
  {
    value: 5,
    label: 'Year',
    max: 10,
  },
];
export default function Mount() {
  const { initialState } = useModel('@@initialState');
  const { isLessee } = initialState || {};
  const { node } = history.location.state || {};
  const [searchId, setSearchId] = useState(node?.id || '');
  const [loading, setLoading] = useState(false);
  const [minDuration, setMinDuration] = useState(options[0]);
  const [maxDuration, setMaxDuration] = useState(options[4]);
  const [minPeriod, setMinPeriod] = useState(null);
  const [maxPeriod, setMaxPeriod] = useState(null);
  const [price, setPrice] = useState(null);
  const [userInfo, setUserInfo] = useState({});
  const [error, setError] = useState(false);
  const [errorRange, setErrorRange] = useState(false);
  const [minLease, setMinLease] = useState(1);
  const [maxLease, setMaxLease] = useState(1);
  const [tags, setTags] = useState([]);
  const [nodeInfo, setNodeInfo] = useState();
  const [agreeClause, setAgreeClause] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const onMaxDurationValueChange = (value, option) => {
    setMaxDuration(option);
  };
  const onMinDurationValueChange = (value, option) => {
    setMinDuration(option);
  };
  useEffect(() => {
    if (searchId === '') return;
    getConfigInfo();
    getNodeInfo();
  }, [searchId]);
  const getConfigInfo = async () => {
    try {
      if (!searchId) return;
      setError(false);
      setLoading(true);
      const res = await fetchNodesConfigInfo({ node_id: searchId });
      setUserInfo(res || {});
      setTags(res?.tags || []);
      setPrice(res?.price || 0);
      setMaxLease(res?.maximum_lease_duration || 1);
      setMinLease(res?.minimum_lease_duration || 1);

      const [mxlease] = options.filter(
        (item) => item.label.toLowerCase() == res?.maximum_lease_unit,
      );
      const [mnlease] = options.filter(
        (item) => item.label.toLowerCase() == res?.minimum_lease_unit,
      );
      setMaxDuration(
        mxlease || {
          value: 2,
          label: 'Day',
          max: 24,
        },
      );
      setMinDuration(
        mnlease || {
          value: 1,
          label: 'Hour',
          max: 24,
        },
      );
      setError(false);
      setLoading(false);
    } catch (error) {
      console.log('『error』', error);
      setError(true);
      setUserInfo({});
    } finally {
      setLoading(false);
    }
  };
  const getNodeInfo = async () => {
    try {
      const res = await fetchNodesInfo({ node_id: searchId });
      setNodeInfo(res);
    } catch (error) {
      console.log('『error』', error);
    }
  };

  useEffect(() => {
    if (minLease > maxLease || minDuration.value > maxDuration.value) {
      setErrorRange(true);
    } else if (minDuration.value == maxDuration.value && minLease >= maxLease) {
      setErrorRange(true);
    } else if (minLease < maxLease || minDuration.value < maxDuration.value) {
      setErrorRange(false);
    } else {
      setErrorRange(false);
    }
  }, [maxDuration, minDuration, maxLease, minLease]);

  const onMaxLeaseChange = (e) => {
    let label = maxDuration.max;
    const value = e.target.value;
    if (value > label) return;
    setMaxLease(value);
  };
  const onMinLeaseChange = (e) => {
    let label = minDuration.max;
    const value = e.target.value;
    if (value > label) return;
    setMinLease(value);
  };

  const onAgreeClauseChange = (e) => {
    setAgreeClause(e.target.checked);
  };

  const handleSubmit = async (e) => {
    // e.preventDefault();
    if (!price) {
      message.warning('Please enter price!');
      return;
    }
    if (errorRange) {
      message.warning('Please fill in a time greater than the minimum period.');
      return;
    }
    if (!agreeClause) {
      message.warning('Please read the terms first and agree!');
      return;
    }
    if (!node?.id && !userInfo?.id) return;

    const payload = {
      node_id: node.id || userInfo.node_id,
      tags: tags,
      price: Number(price),
      minimum_lease_unit: minDuration.label,
      maximum_lease_unit: maxDuration.label,
      minimum_lease_duration: Number(minLease),
      maximum_lease_duration: Number(maxLease),
      available_period_up: maxPeriod,
      available_period_down: minPeriod,
    };
    setConfirmLoading(true);
    try {
      await fetchNodesConfigUpdate(payload);
      setConfirmLoading(false);
      message.success('list success!');
      history.push('/genesis/instance');
    } catch (error) {
      setConfirmLoading(false);
    }
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
    <form className={styles['main']}>
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
                  defaultValue={searchId}
                  className={styles['search-input-node']}
                  readOnly={node?.id}
                />
                <Button
                  className={styles['create-btn']}
                  type="primary"
                  onClick={getConfigInfo}
                  disabled={node?.id}
                >
                  Auto-Recognition
                </Button>
              </div>
              <JanctionTip title="Instances with less than 7 days until expiration will be displayed here" />
            </div>
            {/* {error && (
              <p className={styles['red']}>
                Please check if your number is correct.
              </p>
            )} */}
          </section>
          <main className={styles['card-content']}>
            <h3>Configurable Parameters</h3>
            {!loading && nodeInfo ? (
              <NodeInfo
                styles={styles}
                nodeInfo={nodeInfo}
                tags={tags}
                setTags={setTags}
              />
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
            {/* <MountEchart styles={styles} /> */}
          </section>
          <section className={styles['card-prices']}>
            <div className={styles['duration-item']}>
              <p>Billing price</p>

              <Input
                suffix={<p>USDT/Day</p>}
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
                  value={minDuration.value}
                  defaultValue={minDuration}
                  onChange={onMinDurationValueChange}
                />
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
                    value={maxDuration.value}
                    name="maximum_lease_unit"
                    className={styles['select']}
                    onChange={onMaxDurationValueChange}
                  />
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
        <Checkbox checked={agreeClause} onChange={onAgreeClauseChange}>
          I have read and agreed to the{' '}
          <span className={styles['blue']}>relevant service terms</span>.
        </Checkbox>
        <Button
          loading={confirmLoading}
          className={styles['create-btn']}
          onClick={(e) => handleSubmit(e)}
        >
          Confirm
        </Button>
      </section>
    </form>
  );
}
