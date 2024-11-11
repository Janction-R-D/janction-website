import { useEffect, useState } from 'react';
import { CONFIGURATIONS, DEFAULT_CONFIGURATION } from '../../extra';
import styles from './index.less';

const Specification = (props) => {
  const { value, onChange } = props;
  const [activeConf, setActiveConf] = useState(DEFAULT_CONFIGURATION);
  const [active_c_o, setActiveCO] = useState();

  useEffect(() => {
    setActiveCO(value);
  }, [value]);

  useEffect(() => {
    setActiveCO(activeConf.options[0].key);
    onChange(activeConf.options[0].key);
  }, [activeConf]);

  const onConfigurationChange = (configuration) => {
    setActiveConf(configuration);
  };
  const onOptionChange = (option) => {
    setActiveCO(option);
    onChange(option.key);
  };

  return (
    <div className={styles['specification-wrapper']}>
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
              active_c_o == item.key && styles['configuration-active-option'],
            ].join(' ')}
            onClick={() => onOptionChange(item.key)}
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
    </div>
  );
};

export default Specification;
