import React from 'react';
import styles from './index.less';
import { Empty, Tooltip } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';
import { useIntl, FormattedMessage } from 'umi';
import drop from '@/assets/images/icons/drop.png';
import rise from '@/assets/images/icons/rise.png';

const StatusTag = ({ status }) => {
  const intl = useIntl();
  const isRunning = status === 'Running';
  const isListed = status === 'Listed';
  const color = isRunning ? '#FFA94D' : isListed ? '#aaa' : '#ccc';

  return (
    <span style={{ color }}>
      {intl.formatMessage({ id: `overview.status.${status.toLowerCase()}` })}{' '}
      <Tooltip
        title={intl.formatMessage({
          id: `overview.status.${status.toLowerCase()}`,
        })}
      >
        <InfoCircleOutlined style={{ fontSize: 12 }} />
      </Tooltip>
    </span>
  );
};

const OverviewTable = ({ overview }) => {
  const intl = useIntl();
  const mappedData = overview?.map((item) => ({
    id: item.resource_id,
    status: item.status,
    cpu: item.cpu_usage,
  }));

  return (
    <div className={styles.container}>
      <div className={styles.sidebar}>
        <div className={styles.title}>
          <FormattedMessage id="overview.title" />
        </div>
        <div className={styles.desc}>
          <FormattedMessage id="overview.description" />
        </div>
      </div>
      <div className={styles.table}>
        <div className={styles.header}>
          <div>
            <FormattedMessage id="overview.deviceId" />
          </div>
          <div>
            <FormattedMessage id="overview.status" />
          </div>
          <div>
            <FormattedMessage id="overview.cpu" />
          </div>
        </div>
        {!!mappedData.length &&
          mappedData?.map((item, index) => (
            <div key={index} className={styles.row}>
              <div className={styles.cell_title}>{item.id}</div>
              <div className={styles.cell}>
                <StatusTag status={item.status} />
              </div>
              <div className={styles.cell}>{item.cpu} %</div>
            </div>
          ))}
        {!mappedData.length && (
          <div className={styles.empty}>
            <Empty />
          </div>
        )}
      </div>
    </div>
  );
};

export default OverviewTable;
