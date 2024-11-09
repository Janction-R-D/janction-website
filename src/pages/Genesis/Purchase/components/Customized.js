import { Checkbox, Radio } from 'antd';
import { useEffect, useState } from 'react';
import {
  APPLICATION,
  CONFIGURATIONS,
  DEFAULT_CONFIGURATION,
  PRIMARY_BAND,
  REGION,
} from '../extra';
import styles from './index.less';
import { SYSTEM_LIST } from '@/constant';
import JanctionRange from '@/components/JanctionRange';
import Settlement from './Settlement';
import RegionSelect from './RegionSelect';
import Footer from './Footer';
import JanctionDivider from '@/components/JanctionDivider';
import JanctionRadio from '@/components/JanctionRadio';

const Customized = (props) => {
  const [activeConf, setActiveConf] = useState(DEFAULT_CONFIGURATION);
  const [active_c_o, setActiveCO] = useState(DEFAULT_CONFIGURATION.options[0]);
  const [active_i, setActiveI] = useState(SYSTEM_LIST[0]);
  const [active_ap, setActiveAp] = useState(APPLICATION[0]);
  const [active_r, setActiveR] = useState(REGION[0]);
  const [ipv4, setIpv4] = useState(false);
  const [bandWidth, setBindWidth] = useState(1);

  useEffect(() => {
    setActiveCO(activeConf.options[0]);
  }, [activeConf]);

  const onConfigurationChange = (configuration) => {
    setActiveConf(configuration);
  };
  const onOptionChange = (option) => {
    setActiveCO(option);
  };
  const onIpv4Checked = (e) => {
    setIpv4(e.target.checked);
  };
  const onBandWidthValueChange = (value) => {
    setBindWidth(value);
  };

  return (
    <div
      className={[styles['config-wrapper'], styles['customized-wrapper']].join(
        ' ',
      )}
    >
      <section className={styles['config-item']}>
        <h1 className={styles['title']}>Basic configuration</h1>
        <JanctionDivider />
        <div className={styles['basic-config']}>
          <section className={styles['instance']}>
            <h2 className={styles['sub-title']}>Instance specification</h2>
            <div className={styles['configuration-nav']}>
              {CONFIGURATIONS.map((item) => (
                <div
                  className={[
                    styles['configuration-nav-item'],
                    activeConf.value == item.value &&
                      styles['configuration-nav-active-item'],
                  ].join(' ')}
                  key={item.value}
                  onClick={() => onConfigurationChange(item)}
                >
                  {`${item.name}(${item.cpu}vcpu${item.memory}GiB)`}
                </div>
              ))}
            </div>
            <div className={styles['configuration-options']}>
              {activeConf.options.map((item) => (
                <div
                  className={[
                    styles['configuration-option'],
                    active_c_o.key == item.key &&
                      styles['configuration-active-option'],
                  ].join(' ')}
                  onClick={() => onOptionChange(item)}
                  key={item.key}
                >
                  <div className={styles['head']}>
                    <div className={styles['title']}>Economy type</div>
                    <div className={styles['info']}>
                      {`${activeConf.cpu}vcpu${activeConf.memory}GiB | ESSD Entry ${activeConf.disk}GiB`}
                    </div>
                  </div>
                  <div className={styles['info']}>
                    <div className={styles['head']}>
                      <div className={styles['icon']}>
                        <i className={`iconfont icon-${item.icon}`}></i>
                      </div>
                      <span>Economy type</span>
                    </div>
                    <p className={styles['desc']}>{item.desc}</p>
                    <div className={styles['price']}>
                      <span className={styles['value']}>{item.price}</span>
                      <span className={styles['unit']}>/{item.unit}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
          <section className={styles['image']}>
            <h2 className={styles['sub-title']}>Image</h2>
            <div className={styles['content']}>
              {SYSTEM_LIST.map((item) => (
                <div
                  className={[
                    styles['item'],
                    active_i.value == item.value && styles['active-item'],
                  ].join(' ')}
                  onClick={() => setActiveI(item)}
                >
                  <div className={styles['icon']}>
                    <i className={`iconfont icon-${item.icon}`}></i>
                  </div>
                  <span>{item.label}</span>
                </div>
              ))}
            </div>
          </section>
          <section className={styles['application']}>
            <h2 className={styles['sub-title']}>Pre-installed application</h2>
            <div className={styles['content']}>
              {APPLICATION.map((item) => (
                <div
                  className={[
                    styles['item'],
                    active_ap.value == item.value && styles['active-item'],
                  ].join(' ')}
                  onClick={() => setActiveAp(item)}
                >
                  <span>{item.name}</span>
                </div>
              ))}
            </div>
          </section>
          <RegionSelect />
        </div>
      </section>
      <section className={styles['config-item']}>
        <h1 className={styles['title']}>Bandwidth</h1>
        <JanctionDivider />
        <div className={styles['band-config']}>
          <div className={styles['item']}>
            <div className={styles['name']}>Public IP</div>
            <div className={styles['vlaue']}>
              <Checkbox checked={ipv4} onChange={onIpv4Checked}>
                <span>
                  Assign a public <a>IPv4</a> address
                </span>
              </Checkbox>
            </div>
          </div>
          <div className={styles['item']}>
            <div className={styles['name']}>Bandwidth value</div>
            <div className={styles['value']}>
              <JanctionRadio
                options={PRIMARY_BAND}
                unit="Mbps"
                onChange={() => {}}
              />
              <div>
                <JanctionRange
                  value={bandWidth}
                  onChange={onBandWidthValueChange}
                  unit="Mbps"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      <Settlement />
      <Footer isLast />
    </div>
  );
};

export default Customized;
