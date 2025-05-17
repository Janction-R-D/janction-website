import { Button, Card, Timeline, Typography } from 'antd';
import { useEffect, useState } from 'react';
import styles from './index.less';
import { ARCHITECTURE, SYSTEM_LIST } from '@/constant';
import { AppstoreAddOutlined } from '@ant-design/icons';
const { Text } = Typography;
const links = [
  {
    operatingSystem: 'windows',
    appLink:
      'https://github.com/Janction-R-D/janction-desktop-app/releases/download/untagged-265ce3654e3061615f12/JanctionApp.1.0.0.exe',
  },

  {
    operatingSystem: 'macos',
    appLink:
      'https://github.com/Janction-R-D/janction-desktop-app/releases/download/untagged-265ce3654e3061615f12/JanctionApp.1.0.0.exe',
  },
];
const DeployNode = () => {
  const [selectedValues, setSelectedValues] = useState({});
  const [architecture, setArchitecture] = useState([]);
  const [downloadLink, setDownloadLink] = useState();
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

    setSelectedValues({
      architecture: _architecture?.[0]?.value,
      system: sys.value,
    });
  };
  console.log(downloadLink);
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
                    <a
                      href={downloadLink}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button
                        className={styles['button']}
                        onClick={() => console.log(downloadLink)}
                      >
                        Download App <AppstoreAddOutlined color="red" />
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
              AKGDAIDKJHNAJKLSGI
              <i className="iconfont icon-copy" />
            </Text>
          </Timeline.Item>
        </Timeline>
      </article>
    </section>
  );
};

export default DeployNode;
