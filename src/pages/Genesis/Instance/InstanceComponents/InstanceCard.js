import React from 'react';
import styles from './instanceCard.less';
import InstanceEchart from './InstanceEchart';
export default function InstanceCard() {
  return (
    <article className={styles['instance-card']}>
      <section className={styles['instance-description']}>
        <div className={styles['instance-header']}>
          <section className={styles['instance-title']}>
            <div>
              <span className={styles['text-title']}>Instance ID/Name</span>
            </div>
            <div>
              <h1>Instance ID-1</h1>
              <span>
                <Status status={'Running'} />
              </span>
            </div>
          </section>
          <section className={styles['instance-operation']}>
            <span>Operation</span>
            <div>
              <a>Remote connection</a>
              <a>Stop</a>
              <a className={styles['selected-status']}>Start</a>
              <a>Renewal</a>
            </div>
          </section>
        </div>
        <div>
          <ul className={styles['instance-property']}>
            <li>
              <span>Cores & Memory</span>
              <p>8 Cores</p>
            </li>
            <li>
              <span>Public IP</span>
              <p>10.90.89.167</p>
            </li>
            <li>
              <span>Creation Time</span>
              <p>2024-08-20 08:59:59</p>
            </li>
            <li>
              <span>Expiration Time</span>
              <p>2024-08-21 23:59:59</p>
            </li>
          </ul>
        </div>
      </section>
      <section className={styles['instance-graph']}>
        {' '}
        <InstanceEchart />
      </section>
    </article>
  );
}

function Status({ status }) {
  const statusConfig = {
    Running: {
      className: 'status status-running',
      icon: 'icon-check',
      text: 'Running',
    },
    Stopped: {
      className: 'status status-stopped',
      icon: 'icon-play_pause',
      text: 'Stopped',
    },
    Expired: {
      className: 'status status-expired',
      icon: 'icon-icforbidden',
      text: 'Expired',
    },
    'Expiring Soon': {
      className: 'status status-expiring-soon',
      icon: 'icon-questioncircle',
      text: 'Expiring Soon',
    },
  };

  const currentStatus = statusConfig[status];

  return (
    <>
      {currentStatus ? (
        <div className={styles[`status-running`]}>
          <i className={`iconfont ${currentStatus.icon}`}></i>{' '}
          {currentStatus.text}
        </div>
      ) : (
        <div className="status status-unknown">Unknown Status</div>
      )}
    </>
  );
}
