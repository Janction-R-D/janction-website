import React, { useState } from 'react';
import { Button, Select, Typography } from 'antd';
const { Option } = Select;
const { Title, Text } = Typography;
import styles from './index.less';
import CustomSelect from './CustomSelect';
export default function CardFolder() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('Nvidia RTX 4090');

  const onSelect = (option) => {
    setValue(option);
    setOpen(false);
  };

  return (
    <div className={styles.card}>
      <Button className={styles.button}>Provide GPU</Button>
      <div className={styles.income}>
        <span className={styles.estimated}>Estimated income</span>
        <div className={styles.amount}>
          5.65 <span className={styles.token}>veJCT</span>
        </div>
      </div>
      <div className={styles.gpuSelect}>
        <div onClick={() => setOpen(true)} className={styles.selectButton}>
          {value} <i className="iconfont icon-down" />
        </div>
        <CustomSelect onSelect={onSelect} open={open} setOpen={setOpen} />
        {/* <Select defaultValue="Nvidia RTX 4090" className={styles.select}>
          <Option value="Nvidia RTX 4090">Nvidia RTX 4090</Option>
          <Option value="Nvidia RTX 3080">Nvidia RTX 3080</Option>
        </Select> */}
      </div>
    </div>
  );
}
