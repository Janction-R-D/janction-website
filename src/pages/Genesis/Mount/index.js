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
  notification,
  Select,
  TimePicker,
} from 'antd';
import { useEffect, useState } from 'react';
import { history, Redirect, useIntl, useModel } from 'umi';
import Loading from './components/Loading';
import { NodeInfo } from './components/NodeInfo';
import styles from './index.less';

const options = [
  // {
  //   value: 0,
  //   label: 'Hour',
  //   max: 24,
  // },
  {
    value: 1,
    label: 'Day',
    max: 30,
  },
  {
    value: 2,
    label: 'Week',
    max: 4,
  },
  {
    value: 3,
    label: 'Month',
    max: 11,
  },
  {
    value: 4,
    label: 'Year',
    max: 10,
  },
];
function Mount() {
  const { initialState } = useModel('@@initialState');
  const { isLessee } = initialState || {};
  const { node } = history.location.state || {};
  const [searchId, setSearchId] = useState(node?.id || '');
  const [loading, setLoading] = useState(false);
  const [minDuration, setMinDuration] = useState(options[0]);
  const [maxDuration, setMaxDuration] = useState(options[options?.length - 1]);
  const [minPeriod, setMinPeriod] = useState(null);
  const [maxPeriod, setMaxPeriod] = useState(null);
  const [price, setPrice] = useState(null);
  const [userInfo, setUserInfo] = useState({});
  const [error, setError] = useState(false);
  const [errorRange, setErrorRange] = useState(false);
  const [minLease, setMinLease] = useState(1);
  const [maxLease, setMaxLease] = useState(1);
  const [tags, setTags] = useState([]);
  const [stripeAmount, setStripeAmount] = useState(null);
  const [stripeUnit, setStripeUnit] = useState('usd');
  const [nodeInfo, setNodeInfo] = useState({});
  const [agreeClause, setAgreeClause] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [supportStripe, setSupportStripe] = useState(false);
  const intl = useIntl();
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
          value: 4,
          label: 'Year',
          max: 10,
        },
      );
      setMinDuration(
        mnlease || {
          value: 1,
          label: 'Day',
          max: 30,
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
      if (res?.is_support_stripe) {
        setSupportStripe(true);
      }
      setNodeInfo(res);
    } catch (error) {
      console.log('『error』', error);
    }
  };

  useEffect(() => {
    if (minLease > maxLease && minDuration.value > maxDuration.value) {
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
    const priceNumber = Number(price);
    const stripeAmountNumber = Number(stripeAmount);

    if (!price || isNaN(priceNumber)) {
      message.warning(intl.formatMessage({ id: 'warn.enterPrice' }));
      return;
    }

    if (priceNumber <= 0) {
      message.warning(intl.formatMessage({ id: 'warn.validPrice' }));
      return;
    }
    if (maxLease <= 0) {
      message.warning(intl.formatMessage({ id: 'warn.validDuration' }));
      return;
    }
    if (minLease <= 0) {
      message.warning(intl.formatMessage({ id: 'warn.validDuration' }));
      return;
    }

    if (supportStripe) {
      if (!stripeAmount || isNaN(stripeAmountNumber)) {
        message.warning(intl.formatMessage({ id: 'warn.enterFiatPrice' }));
        return;
      }
      if (stripeAmountNumber <= 0) {
        message.warning(intl.formatMessage({ id: 'warn.enterFiatPrice' }));
        return;
      }
    }
    if (errorRange) {
      message.warning(intl.formatMessage({ id: 'warn.rangeError' }));
      return;
    }
    if (!agreeClause) {
      notification.info({
        message: intl.formatMessage({ id: 'warn.notificationTitle' }),
        description: intl.formatMessage({ id: 'warn.agreeClause' }),
        placement: 'bottomLeft',
        duration: 5,
      });

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
      stripe_currency: stripeUnit,
      stripe_price: Number(stripeAmount),
    };
    setConfirmLoading(true);
    try {
      await fetchNodesConfigUpdate(payload);
      setConfirmLoading(false);
      message.success(intl.formatMessage({ id: 'message.listSuccess' }));
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
      <section className={styles['header-wrapper']}>
        <header>
          <h1 className={styles['title']}>
            {intl.formatMessage({ id: 'config.deviceTitle' })}
          </h1>{' '}
        </header>
      </section>
      <Card className={styles['card']}>
        <section className={styles['card-header']}>
          <h3>{intl.formatMessage({ id: 'config.uploadInfo' })}</h3>
        </section>
        <main className={styles['main-card']}>
          <section className={styles['input-box-container']}>
            <div className={styles['input-box']}>
              <div className={`${styles['device-box']}`}>
                <Input
                  type="text"
                  placeholder={intl.formatMessage({
                    id: 'config.deviceIdPlaceholder',
                  })}
                  onChange={(e) => setSearchId(e.target.value)}
                  defaultValue={searchId}
                  className={styles['search-input-node']}
                  readOnly={node?.id}
                />
                <Button
                  className={styles['connect']}
                  type="primary"
                  onClick={getConfigInfo}
                  disabled={node?.id}
                >
                  {intl.formatMessage({ id: 'config.autoRecognition' })}
                </Button>
              </div>
              <JanctionTip title="Instances with less than 7 days until expiration will be displayed here" />
            </div>
          </section>
          <main className={styles['card-content']}>
            <h3>{intl.formatMessage({ id: 'config.parametersTitle' })}</h3>
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
            <h3>{intl.formatMessage({ id: 'pricing.title' })}</h3>
          </section>
          <section className={styles['card-prices']}>
            <div className={styles['duration-item']}>
              <p>{intl.formatMessage({ id: 'pricing.billing' })}</p>

              <Input
                suffix={
                  <p>USDT / {intl.formatMessage({ id: 'pricing.day' })}</p>
                }
                type="number"
                placeholder={intl.formatMessage({ id: 'pricing.enterPrice' })}
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                name="price"
                disabled={loading}
                className={styles['price-input']}
                onWheel={(e) => e.target.blur()}
              />
            </div>
            {supportStripe && (
              <div className={styles['duration-item']}>
                <p>{intl.formatMessage({ id: 'pricing.fiat' })}</p>
                <Input
                  suffix={<p>{intl.formatMessage({ id: 'pricing.day' })}</p>}
                  type="number"
                  placeholder={intl.formatMessage({ id: 'pricing.enterPrice' })}
                  value={stripeAmount}
                  onChange={(e) => setStripeAmount(e.target.value)}
                  name="stripe_price"
                  disabled={loading}
                  className={styles['price-input']}
                  onWheel={(e) => e.target.blur()}
                />

                <Select
                  value={stripeUnit}
                  onChange={(value) => setStripeUnit(value)}
                  disabled={loading}
                  className={styles['select-stripe']}
                >
                  <Option value="usd">USD</Option>
                  <Option value="jpy">JPY</Option>
                </Select>
              </div>
            )}
          </section>
        </Card>
      </section>

      <Card className={styles['card']}>
        <section className={styles['card-header']}>
          <h3>{intl.formatMessage({ id: 'rental.title' })}</h3>
        </section>
        <div className={styles['duration']}>
          <div className={styles['duration-item']}>
            <p>{intl.formatMessage({ id: 'rental.minDuration' })}</p>
            <div className={styles['duration-group']}>
              <div className={styles['input-duration']}>
                <Input
                  value={minLease}
                  defaultValue={minLease}
                  name="minimum_lease_duration"
                  onChange={onMinLeaseChange}
                  className={styles['lease-duration-input']}
                  type="number"
                  onWheel={(e) => e.target.blur()}
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
            <p>{intl.formatMessage({ id: 'rental.maxDuration' })}</p>
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
                    onWheel={(e) => e.target.blur()}
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
                  {intl.formatMessage({ id: 'rental.errorMinExceeded' })}
                </p>
              )}
            </div>
          </div>
          <div className={styles['duration-item']}>
            <p>{intl.formatMessage({ id: 'rental.availablePeriod' })}</p>
            <div className={styles['duration-group']}>
              <div className={styles['input-duration']}>
                <TimePicker.RangePicker
                  className={styles['input-time']}
                  onChange={calendarChange}
                  placeholder={[
                    intl.formatMessage({ id: 'timePicker.start' }),
                    intl.formatMessage({ id: 'timePicker.end' }),
                  ]}
                />
              </div>
            </div>
          </div>
        </div>
      </Card>
      <section className={styles['check-side']}>
        <Checkbox checked={agreeClause} onChange={onAgreeClauseChange}>
          {intl.formatMessage({ id: 'rental.agree' })}{' '}
          <span>{intl.formatMessage({ id: 'rental.terms' })}</span>
        </Checkbox>
        <Button
          loading={confirmLoading}
          className={styles['connect-btn']}
          onClick={(e) => handleSubmit(e)}
        >
          {intl.formatMessage({ id: 'rental.confirm' })}
        </Button>
      </section>
    </form>
  );
}

Mount.wrappers = ['@/wrappers/auth'];
export default Mount;
