import React, { useEffect, useMemo, useState } from 'react';
import dayjs from 'dayjs';
import data from './constant.json';
import { Card, Checkbox } from 'antd';
import styles from './index.less';
import { fetchNodesList } from '@/services/genesis';
import { getNodeStatusMatch, isEmpty } from '@/utils/lang';

const formatDate = (isoString, format = 'YYYY-MM-DD HH:mm:ss') => {
  if (!isoString) return '--';
  return dayjs(isoString).format(format);
};
export default function Instances({ value, onChange, formValues }) {
  const [list, setList] = useState([]);
  const [selectKey, setSelectKey] = useState();
  const handleCheckboxChange = (newValue) => {
    if (newValue !== value) {
      onChange?.(newValue); // Actualiza el formulario
    }
  };

  useEffect(() => {
    // getList();
  }, []);
  const getList = async () => {
    try {
      const res = await fetchNodesList();
      setList(
        (res || []).filter((node) => {
          const { isListed } = getNodeStatusMatch(node);
          console.log(isListed);
          return isListed;
        }),
      );
    } catch (error) {
      console.log('『error』', error);
    }
  };
  const dataSource = useMemo(() => {
    if (isEmpty(list)) return [];
    if (isEmpty(formValues)) return list;
    const {
      operating_system_str,
      architechture_str,
      internet_type,
      network_down,
      location,
      processor,
    } = formValues;
    let _list = [...list];
    _list = _list.filter((item) => {
      let sys =
        !operating_system_str ||
        item.attr?.operating_system_str == operating_system_str;
      let arch =
        !architechture_str || item.attr?.architechture_str == architechture_str;
      let internet =
        !internet_type || item.attr?.internet_type == internet_type;
      let network = !network_down || item.attr?.network_down >= network_down;
      let _location =
        !location ||
        location.length == 0 ||
        location.includes(item.attr?.location);
      const chip = [
        ...(item?.attr?.cpu_chip || []),
        ...(item?.attr?.gpu_chip || []),
      ];
      let _processor =
        !(!isEmpty(processor) && !isEmpty(chip)) ||
        hasIntersection(processor, chip);
      const flag =
        sys && arch && internet && network && _location && _processor;
      console.log('『flag』', flag);

      return flag;
    });
    return _list;
  }, [list, formValues]);
  return (
    <div className={styles['image-conf-wrapper']}>
      <p> Recommended Instances</p>
      <section className={styles['image-conf-cards']}>
        {/* //sustituir data por datasource */}
        {data.instances.map((item) => {
          console.log(value?.id === item?.id);
          return (
            <Card
              key={item.id}
              className={[
                styles['item'],
                value?.id === item.id && styles['active-item'],
              ].join(' ')}
              onClick={() => handleCheckboxChange(item)}
            >
              <section className={styles['item-header']}>
                <div className={styles['des-group']}>
                  <span className={styles['des-text']}>{item.name || '~'}</span>
                </div>
                <div className={styles['header-right']}>
                  <Checkbox
                    className={styles['rounded-check']}
                    checked={value?.id === item.id} // Vincula con el estado de Form
                    onChange={() => handleCheckboxChange(item)}
                  />
                </div>
              </section>
              <article>
                <div className={styles['des-group']}>
                  <span>CPU</span>
                  <span className={styles['des-text']}>
                    {item.attr.cpu_clip || '~'}
                  </span>
                </div>
                <div className={styles['des-group']}>
                  <span>GPU</span>
                  <span className={styles['des-text']}>
                    {item.attr.gpu_clip || '~'}
                  </span>
                </div>
                <div className={styles['des-group']}>
                  <span>Memory</span>
                  <span className={styles['des-text']}>{item.attr.memory}</span>
                </div>
                <div className={styles['des-group']}>
                  <span>Location</span>
                  <span className={styles['des-text']}>
                    {item.attr.location || '~'}
                  </span>
                </div>
                <div className={styles['des-group']}>
                  <span>Cores</span>
                  <span className={styles['des-text']}>
                    {item.attr.cpu || '~'}
                  </span>
                </div>
                <div className={styles['des-group']}>
                  <span>Created</span>
                  <span className={styles['des-text']}>
                    {formatDate(item.updated_at)}
                  </span>
                </div>
                <div className={styles['des-group']}>
                  <span>Updated at</span>
                  <span className={styles['des-text']}>
                    {formatDate(item.updated_at)}
                  </span>
                </div>
              </article>
              <div>
                <p>ID</p>
                <span className={styles['des-text']}>{item.id}</span>
              </div>
            </Card>
          );
        })}
      </section>
    </div>
  );
}
