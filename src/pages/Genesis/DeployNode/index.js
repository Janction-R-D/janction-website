import { Button, Card, Timeline, Typography } from 'antd';
import { useEffect, useState } from 'react';
import styles from './index.less';
import { ARCHITECTURE, SYSTEM_LIST } from '@/constant';
import { AppstoreAddOutlined, RedoOutlined } from '@ant-design/icons';
import { copy, links } from '@/utils/lang';
import { fetchNodesRegister } from '@/services/genesis';
const { Text } = Typography;

const DeployNode = () => {
  const [selectedValues, setSelectedValues] = useState({});
  const [architecture, setArchitecture] = useState([]);
  const [downloadLink, setDownloadLink] = useState();
  const [loading, setLoading] = useState(false);
  const [isLinux, setIsLinux] = useState(false);
  const [nodesData, setNodesData] = useState();
  useEffect(() => {
    getNodes();
  }, []);
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
  const getNodes = async () => {
    try {
      setLoading(true);
      const res = await fetchNodesRegister();
      console.log(res);
      setNodesData(res);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log('『error』', error);
    }
  };
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
            <p className={styles['timeline-step']}>Download App</p>
            <Card className={styles['card']}>
              <section className={styles['sys-choice']}>
                <p className={styles['sys-title']}>
                  Choose your Operating System
                </p>

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
                {selectedValues?.system !== 'android' && (
                  <>
                    <p className={styles['sys-title']}>Choose Architecture</p>

                    <ul className={styles['gpu-cpu']}>
                      {architecture.map((item) => (
                        <li
                          className={` ${
                            selectedValues?.architecture == item.value &&
                            styles['active']
                          }
                  }`}
                          key={item.value}
                          onClick={() => {
                            setSelectedValues({
                              ...selectedValues,
                              architecture: item.value,
                            });
                          }}
                        >
                          <span>{item.name}</span>
                        </li>
                      ))}
                    </ul>
                  </>
                )}
                {downloadLink && (
                  <div className={styles['buttons-box']}>
                    <a href={downloadLink} download>
                      <Button
                        className={styles['button']}
                        onClick={() => console.log(downloadLink)}
                      >
                        Download App{' '}
                        <span className={styles.icon}>
                          <AppstoreAddOutlined color="red" />
                        </span>
                      </Button>
                    </a>
                  </div>
                )}
              </section>
            </Card>
          </Timeline.Item>
          <Timeline.Item
            dot={<span className={styles['timeline-dot']}>2</span>}
          >
            <p className={styles['timeline-step']}>Generate Token ID</p>
            <Text className={styles['token_id']}>
              {nodesData?.node_id || '--'}
              <div>
                <RedoOutlined
                  rotate={90}
                  spin={loading}
                  loading={loading}
                  className={styles['poi']}
                  onClick={getNodes}
                />
                <i
                  className="iconfont icon-copy"
                  onClick={() => {
                    console.log(nodesData);
                    if (isLinux) {
                      if (!nodesData?.node_id)
                        return message.warning(
                          'Data missing, please click refresh to get and try again!',
                        );
                    } else if (!nodesData?.node_id && !nodesData?.token) {
                      return message.warning(
                        'Data missing, please click refresh to get and try again!',
                      );
                    }
                    copy(nodesData?.node_id);
                  }}
                />
              </div>
            </Text>
          </Timeline.Item>
        </Timeline>
      </article>
    </section>
  );
};

export default DeployNode;
