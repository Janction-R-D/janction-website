import { Button, Card, Timeline, Typography } from 'antd';
import { useEffect, useState } from 'react';
import styles from './index.less';
import { ARCHITECTURE, SYSTEM_LIST } from '@/constant';
import { AppstoreAddOutlined } from '@ant-design/icons';
const { Text } = Typography;
const DeployNode = () => {
  const [selectedValues, setSelectedValues] = useState({});
  const [architecture, setArchitecture] = useState([]);
  useEffect(() => {
    if (!selectedValues?.system) return;
    const _architecture = ARCHITECTURE.filter((item) =>
      item.sys.includes(selectedValues.system),
    );
    setArchitecture(_architecture);
    console.log(selectedValues);
  }, [selectedValues]);
  const onSysSelect = (sys) => {
    console.log(sys);
    const _architecture = ARCHITECTURE.filter((item) =>
      item.sys.includes(sys.value),
    );

    setSelectedValues({
      architecture: _architecture?.[0]?.value,
      system: sys.value,
    });
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
                <div className={styles['buttons-box']}>
                  <Button className={styles['button']}>
                    Download App <AppstoreAddOutlined color="red" />
                  </Button>
                </div>
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
