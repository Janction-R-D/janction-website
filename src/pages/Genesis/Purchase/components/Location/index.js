import { Checkbox, Tabs } from 'antd';
import { useEffect, useMemo, useState } from 'react';
import PurchaseCheckBox from '../PurchaseCheckBox';
import { CONTINEXT } from './constant';
import styles from './index.less';

const Location = (props) => {
  const { value, onChange } = props;

  const [list, setList] = useState([]);

  useEffect(() => {
    const _list = CONTINEXT.map((item) => {
      const ids = (item.children || [])?.map((child) => child.value);
      return { ...item, ids };
    });
    setList(_list);
  }, []);

  const onAllCheckChange = (val, tabItem) => {
    let newArray = [...list];
    newArray = newArray.map((item) => {
      if (item.value == tabItem.value) {
        let checked = item.checked;
        return {
          ...item,
          checkedIds: checked ? [] : item.ids,
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
      if (item.value == tabItem.value) {
        const someChecked = item.ids.some((_item) => val.includes(_item));
        const checked = item.ids.every((_item) => val.includes(_item));
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
    return (
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
              <span>{item.enLabel}</span>
            </div>
          ),
          key: item.value,
          children: (
            <PurchaseCheckBox
              value={item.checkedIds}
              options={item.children?.map((item) => ({
                ...item,
                label: item.enLabel,
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
