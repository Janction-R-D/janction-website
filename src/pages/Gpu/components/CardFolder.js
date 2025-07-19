import { useState } from 'react';
import { Button, Typography, Slider } from 'antd';
import { useIntl, history } from 'umi';
import styles from './index.less';
import CustomSelect from './CustomSelect';
import { modelsGpu } from './ModelTable';

const { Title, Text } = Typography;

export default function CardFolder() {
  const intl = useIntl();

  const t = (id) => intl.formatMessage({ id });

  const [open, setOpen] = useState(false);
  const [gpuValue, setGpuValue] = useState(modelsGpu[0]);
  const [value, setValue] = useState(60);

  const onChange = (newValue) => {
    setValue(newValue);
  };

  const onSelect = (option) => {
    setGpuValue(option);
    console.log(option);
    setOpen(false);
  };

  const getPrice = () => {
    const price = gpuValue.realPrice * 24 * value;
    return Number(price).toFixed(2);
  };

  const onNavigate = () => {
    history.push('/genesis/dashboard', { from: 'gpu-page' });
  };

  return (
    <div className={styles.card}>
      <Button className={styles.button} onClick={onNavigate}>
        {t('card.gpu')}
      </Button>

      <div className={styles.income}>
        <span className={styles.estimated}>{t('card.income')}</span>
        <div className={styles.amount}>
          {getPrice()} <span className={styles.token}>usdt</span>
        </div>
      </div>

      <div className={styles['slider-box']}>
        <div className={styles['slider-header']}>
          <span>0</span>
          <span>365</span>
        </div>
        <Slider
          min={0}
          max={365}
          marks={{ 0: '0', 365: '365' }}
          value={value}
          onChange={onChange}
          className={styles['slider']}
        />
      </div>

      <div className={styles.income}>
        <span className={styles.estimated}>{t('card.term')}</span>
        <div className={styles.day}>
          {value}{' '}
          <span className={styles.token}>
            {t(value > 1 ? 'card.days' : 'card.day')}
          </span>
        </div>
      </div>

      <div className={styles.gpuSelect}>
        <div onClick={() => setOpen(true)} className={styles.selectButton}>
          {gpuValue?.model} <i className="iconfont icon-down" />
        </div>
        <CustomSelect onSelect={onSelect} open={open} setOpen={setOpen} />
      </div>
    </div>
  );
}
