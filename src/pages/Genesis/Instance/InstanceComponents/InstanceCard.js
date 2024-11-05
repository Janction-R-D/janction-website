import React, { useState } from 'react';
import styles from './instanceCard.less';
import InstanceEchart from './InstanceEchart';
import { fetchNodeOperation } from '../../../../services/genesis/instance';
import { convertMBtoGB } from '../../Dashboard/Lessors';
export default function InstanceCard({ instance }) {
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  console.log(instance);
  const handleOperation = (operation, resource, id) => {
    const payload = JSON.stringify({
      resource_id: resource,
      operation,
      id,
    });
    // This one doesn't work .. because the api send an error response
    fetchNodeOperation(payload)
      .then((res) => {
        console.log(res);
        setSuccess(true);
      })
      .catch((err) => {
        setError(true);
        console.log(err);
      })
      .finally(() => {
        setTimeout(() => {
          setError(false);
          setSuccess(false);
        }, 5000);

        window.location.reload();
      });
  };
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  };

  const instanceData = {
    key: instance?.id,
    name: instance?.name,
    Cores: instance?.node.attr.cpu,
    memory: instance?.node.attr.memory,
    status: instance?.activity.status,
    expired: formatDate(instance?.expired_at),
    created: formatDate(instance?.created_at),
    Location: instance?.node.attr.location,
    GPUrate: '0.254%',
    MemoryUsage: convertMBtoGB(instance?.activity?.memory_usage?.toFixed(2)),
    downtime: '2024-09-15 10:00:00\r\n2024-09-16 18:00:00',
    activity: instance.activity,
    resource: instance.activity.resource_id,
  };

  return (
    <article className={styles['instance-card']}>
      <section className={styles['instance-description']}>
        <div className={styles['instance-header']}>
          <section className={styles['instance-title']}>
            <div>
              <span className={styles['text-title']}>Instance ID/Name</span>
            </div>
            <div>
              <h1>{instanceData.name}</h1>
              <span>
                <Status status={instanceData.status} />
              </span>
            </div>
          </section>
          <section className={styles['instance-operation']}>
            <span>Operation</span>
            <div>
              <a>Remote connection</a>
              <a
                onClick={() => handleOperation('stop', instanceData.resource)}
                className={`${
                  instanceData.status === 'Stop'
                    ? styles['selected-status']
                    : ''
                }`}
              >
                {' '}
                Stop
              </a>
              <a
                className={`${
                  instanceData.status === 'Running'
                    ? styles['selected-status']
                    : ''
                }`}
                onClick={() => handleOperation('start', instanceData.resource)}
              >
                Start
              </a>
              <a>Renewal</a>
            </div>
          </section>
        </div>
        <div>
          <ul className={styles['instance-property']}>
            <li>
              <span>Cores & Memory</span>
              <p>{instanceData.Cores}</p>
            </li>
            <li>
              <span>Location</span>
              <p>{instanceData.Location}</p>
            </li>
            <li>
              <span>Creation Time</span>
              <p>{instanceData.created}</p>
            </li>
            <li>
              <span>Expiration Time</span>
              <p>{instanceData.expired}</p>
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
