import JanctionRadio from '@/components/JanctionRadio';
import styles from './index.less';
import { PROCESSOR } from './constant';
import { CPU_GPU_OPTIONS } from '@/constant';
import SearchInput from '@/components/SeachInput';
import JanctionTable from '@/components/JanctionTable';

const Processor = (props) => {
  return (
    <div className={styles['processor-container']}>
      <div className={styles['radio']}>
        <JanctionRadio options={PROCESSOR} />
        <JanctionRadio options={CPU_GPU_OPTIONS} />
      </div>
      <SearchInput />
      <JanctionTable
        showHeader={false}
        columns={[
          {
            title: 'name',
            dataIndex: 'name',
          },
          {
            title: 'number',
            dataIndex: 'number',
          },
        ]}
      />
    </div>
  );
};

export default Processor;
