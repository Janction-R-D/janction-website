import numeral from 'numeral';
import styles from './index.less';
import { EditOutlined } from '@ant-design/icons';
import { empty, copy as copyValue } from '@/utils/lang';

const LabelValue = (props) => {
  const {
    title,
    value,
    unit,
    format,
    copy,
    children,
    onEdit,
    align = 'center',
  } = props;

  const onCopy = () => {
    copyValue(value);
  };

  return (
    <div className={styles['value-item']} style={{ alignItems: align }}>
      <span className={styles['title']}>{title}</span>
      {children || (
        <div className={styles['value']}>
          <span>
            {empty(value)
              ? '~'
              : `${format ? numeral(value).format('0,0.0') : value} ${
                  unit || ''
                }`}
          </span>
          {copy && <i className="iconfont icon-copy" onClick={onCopy}></i>}
          {onEdit && (
            <EditOutlined className={styles['edit-icon']} onClick={onEdit} />
          )}
        </div>
      )}
    </div>
  );
};

export default LabelValue;
