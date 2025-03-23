import { Checkbox, Empty, Tabs } from 'antd';
import { useEffect, useMemo, useState } from 'react';
import PurchaseCheckBox from '../PurchaseCheckBox';
import useContinents from '@/hooks/useContinents';
import styles from './index.less';
import { isEmpty } from '@/utils/lang';

const Location = (props) => {
  const { value, onChange } = props;

  const continents = useContinents();

  const [list, setList] = useState([]);

  useEffect(() => {
    if (isEmpty(continents)) return;
    const _list = Object.keys(continents).map((continent) => {
      const codes = (continents[continent] || [])?.map((child) => child.code);
      return { continent, children: continents[continent], codes };
    });
    setList(_list);
  }, [continents]);

  const onAllCheckChange = (val, tabItem) => {
    let newArray = [...list];
    newArray = newArray.map((item) => {
      if (item.continent == tabItem.continent) {
        let checked = item.checked;
        return {
          ...item,
          checkedIds: checked ? [] : item.codes,
          checked: checked ? false : true,
          someChecked: checked ? false : true,
          indeterminate: false,
        };
      }
      return item;
    });
    setList(newArray);
  };

  const onCheckChange = (val, tabItem) => {
    let newArray = [...list];
    newArray = newArray.map((item) => {
      if (item.continent == tabItem.continent) {
        const someChecked = item.codes.some((_item) => val.includes(_item));
        const checked = item.codes.every((_item) => val.includes(_item));
        return {
          ...item,
          checkedIds: val,
          checked,
          someChecked,
          indeterminate: someChecked && !checked,
        };
      }

      return item;
    });
    const checkedIds = newArray.flatMap((item) => item.checkedIds || []);
    setList(newArray);
    onChange(checkedIds);
  };

  const tabs = useMemo(() => {
    return isEmpty(list) ? (
      <Empty />
    ) : (
      <Tabs
        onChange={onChange}
        items={list.map((item) => ({
          label: (
            <div className="df gap10">
              <Checkbox
                indeterminate={item.indeterminate}
                checked={item.checked}
                onChange={(val) => onAllCheckChange(val, item)}
              ></Checkbox>
              <span>{item.continent}</span>
            </div>
          ),
          key: item.continent,
          children: (
            <PurchaseCheckBox
              value={item.checkedIds}
              options={item.children?.map((item) => ({
                ...item,
                value: item.code,
                label: item.name,
              }))}
              onChange={(val) => onCheckChange(val, item)}
            />
          ),
        }))}
      />
    );
  }, [list]);

  return <div className={styles['location-wrapper']}>{tabs}</div>;
};

export default Location;
