import JanctionRadio from '@/components/JanctionRadio';
import JanctionTable from '@/components/JanctionTable';
import SearchInput from '@/components/SeachInput';
import { useEffect, useState } from 'react';
import { BAND_COLUMNS, COMPUTE_MODE, DEFAULT_COMPUTE_MODE } from '../../extra';
import styles from './index.less';
import PurchaseSubCard from '../Card/SubCard';

const ProductList = (props) => {
  const { value, onChange } = props;
  const [list, setList] = useState([{ id: 1 }, { id: 2 }]);
  const [computeMode, setComputeMode] = useState(DEFAULT_COMPUTE_MODE.value);
  const [selectKey, setSelectKey] = useState();

  useEffect(() => {
    setSelectKey(value);
  }, [value]);

  const onComputeModeChange = (mode) => {
    setComputeMode(mode);
  };
  return (
    <PurchaseSubCard>
      <div className={styles['filter']}>
        <JanctionRadio
          defaultValue={computeMode}
          options={COMPUTE_MODE}
          onChange={onComputeModeChange}
        />
        <SearchInput />
      </div>
      <JanctionTable
        bordered={false}
        columns={BAND_COLUMNS}
        dataSource={list}
        pagination={false}
        rowKey="id"
        rowSelection={{
          selectedRowKeys: [selectKey],
          onChange: (selectedRowKeys, selectedRows) => {
            setSelectKey(selectedRowKeys[0]);
            onChange(selectedRowKeys[0]);
          },
        }}
      />
    </PurchaseSubCard>
  );
};

export default ProductList;
