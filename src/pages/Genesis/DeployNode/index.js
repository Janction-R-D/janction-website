import { Card, Timeline } from 'antd';
import { useEffect, useState } from 'react';
import styles from './index.less';
import { ARCHITECTURE, SYSTEM_LIST } from '@/constant';
import { links } from '@/utils/lang';
import { fetchNodesRegister } from '@/services/genesis';
import RunNode from './components/RunNode';
import { Redirect, useModel } from 'umi';

const DeployNode = () => {
  const [selectedValues, setSelectedValues] = useState({});
  const [architecture, setArchitecture] = useState([]);
  const [downloadLink, setDownloadLink] = useState();
  const [loading, setLoading] = useState(false);
  const [isLinux, setIsLinux] = useState(false);
  const [isWin, setIsWin] = useState(false);
  const [nodesData, setNodesData] = useState();
  const { initialState } = useModel('@@initialState');

  const { isLessee } = initialState || {};
  function detectSystem() {
    const ua = navigator.userAgent.toLowerCase();

    if (ua.includes('windows')) {
      setIsWin(true);
      return 'windows';
    }
    if (ua.includes('mac os') || ua.includes('macintosh')) return 'macos';
    if (ua.includes('linux')) return 'linux';

    return 'unkown';
  }

  useEffect(() => {
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
    console.log(sys);
    if (sys.value == 'windows') {
      setIsWin(true);
    } else if (sys !== 'windows') {
      setIsWin(false);
    }
    if (sys.value == 'linux') {
      setIsLinux(true);
    } else {
      setIsLinux(false);
    }
    setSelectedValues({
      architecture: _architecture?.[0]?.value,
      system: sys.value,
    });
  };
  const getNodes = async () => {
    const system = detectSystem();
    if (system !== 'unkown') {
      const _architecture = ARCHITECTURE.filter((item) =>
        item.sys.includes(system),
      );
      setSelectedValues({
        system,
        architecture: _architecture?.[0]?.value,
      });
      setIsLinux(system === 'linux');
    }

    try {
      setLoading(true);
      const res = await fetchNodesRegister();
      setNodesData(res);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log('『error』', error);
    }
  };

  if (isLessee) return <Redirect to="/genesis/nodes"></Redirect>;
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
              loading={loading}
              isWin={isWin}
            />
          </Timeline.Item>
        </Timeline>
      </article>
    </section>
  );
};

export default DeployNode;
DeployNode.wrappers = ['@/wrappers/auth'];
