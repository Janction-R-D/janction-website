import { Card, Timeline } from 'antd';
import { useEffect, useState } from 'react';
import styles from './index.less';
import { ARCHITECTURE, SYSTEM_LIST } from '@/constant';
import { links } from '@/utils/lang';

import RunNode from './components/RunNode';
import NTFBanner from './components/NTFBanner';
import { history, Redirect, useAccess, useModel } from 'umi';
import storage from '@/utils/storage';
import { useAccountEffect } from 'wagmi';

const DeployNodes = (props) => {
  const { initialState, setInitialState } = useModel('@@initialState');
  const { sessionType } = initialState || {};
  const { isLogin } = useAccess();
  const TOKEN = storage.get('TOKEN');
  const [selectedValues, setSelectedValues] = useState({});
  const [architecture, setArchitecture] = useState([]);
  const [downloadLink, setDownloadLink] = useState();
  const [loading, setLoading] = useState(false);
  const [isLinux, setIsLinux] = useState(false);
  const [nodesData, setNodesData] = useState({});

  useEffect(() => {
    setInitialState({
      ...initialState,
      isLessee: false,
    });
    if (!selectedValues?.system) return;
    const _architecture = ARCHITECTURE.filter((item) =>
      item.sys.includes(selectedValues.system),
    );

    const getLink = links.find(
      (item) => item.operatingSystem == selectedValues.system,
    );
    if (!getLink) {
      setDownloadLink(null);
      return;
    }
    setDownloadLink(getLink.appLink);
    setArchitecture(_architecture);
  }, [selectedValues]);
  const onSysSelect = (sys) => {
    const _architecture = ARCHITECTURE.filter((item) =>
      item.sys.includes(sys.value),
    );
    if (sys == 'linux') {
      setIsLinux(true);
    } else {
      setIsLinux(false);
    }
    setSelectedValues({
      architecture: _architecture?.[0]?.value,
      system: sys.value,
    });
  };
  const getNodes = async () => {};

  useAccountEffect({
    onDisconnect() {
      if (sessionType !== 'wallet') {
        storage.remove('AUTH_HEADERS');
        storage.remove('userAccount');
        setInitialState({
          ...initialState,
          userAccount: null,
        });
        return;
      }
      storage.clear();
      setInitialState({
        ...initialState,
        userAccount: null,
      });
      history.push(`/login?from=${history.location.pathname}`);
    },
  });

  return (
    <section className={styles['dashboard-wrapper']}>
      <section className={styles['header-wrapper']}>
        <header>
          <h1>Deploy Nodes</h1>
        </header>
      </section>
      <article className={styles['node_steps']}>
        <Timeline className={styles['timeline']}>
          <Timeline.Item
            dot={<span className={styles['timeline-dot']}>1</span>}
          >
            <p className={styles['timeline-step']}>Select operating system</p>
            <Card className={styles['card']}>
              <section className={styles['sys-choice']}>
                <ul className={styles['sys-list']}>
                  {SYSTEM_LIST.map((item) => (
                    <li
                      key={item.value}
                      className={
                        selectedValues?.system == item.value
                          ? styles['active']
                          : ''
                      }
                      onClick={() => onSysSelect(item)}
                    >
                      <span>{item.label}</span>
                      <i className={`iconfont icon-${item.icon}`} />
                    </li>
                  ))}
                </ul>
              </section>
            </Card>
          </Timeline.Item>
          <Timeline.Item
            dot={<span className={styles['timeline-dot']}>2</span>}
          >
            <p className={styles['timeline-step']}>
              {selectedValues?.system == 'android'
                ? 'Running on Android'
                : 'Run Node'}
            </p>

            <RunNode
              selectedValues={selectedValues}
              nodesData={nodesData}
              getNodes={getNodes}
              loading={loading}
            />
          </Timeline.Item>
        </Timeline>
      </article>
      <NTFBanner />
    </section>
  );
};

export default DeployNodes;
