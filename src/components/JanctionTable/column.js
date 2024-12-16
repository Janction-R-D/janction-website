import { Button, Popconfirm, Space } from 'antd';
import styles from './index.less';
import { showValue, copy as copyValue, empty, showDate } from '@/utils/lang';

const renderConfirm = (record, btn, index) => {
  const {
    title,
    okText,
    cancelText,
    onClick,
    onCancel,
    placement,
    color,
    ...extra
  } = typeof btn.format === 'function' ? btn.format(record, index) : btn;

  const disabled =
    typeof extra.disabled === 'function'
      ? extra.disabled(record, index)
      : extra.disabled;

  return (
    <Popconfirm
      title={title}
      onConfirm={(e) => {
        e.stopPropagation();
        if (disabled) return;
        onClick && onClick(record, index);
      }}
      onCancel={(e) => {
        e.stopPropagation();
        onCancel && onCancel(record, index);
      }}
      okText={okText || 'Ok'}
      cancelText={cancelText || 'Cancel'}
      placement={placement || 'top'}
      {...extra}
    >
      <a
        onClick={(e) => e.stopPropagation()}
        style={{ color }}
        className={[
          styles['table-btn'],
          disabled && styles['table-btn-disabled'],
        ].join(' ')}
      >
        {btn.name}
      </a>
    </Popconfirm>
  );
};

const renderOther = (record, btn, index) => {
  const { onClick, color } =
    typeof btn.format === 'function' ? btn.format(record, index) : btn;

  const disabled =
    typeof btn.disabled === 'function'
      ? btn.disabled(record, index)
      : btn.disabled;

  return (
    <a
      onClick={(e) => {
        e.stopPropagation();
        if (disabled) return;
        onClick && onClick(record, index);
      }}
      style={{ color }}
      className={[
        styles['table-btn'],
        disabled && styles['table-btn-disabled'],
      ].join(' ')}
    >
      {btn.name}
    </a>
  );
};

export function renderButtons(list, record = {}, index) {
  const filters = list.filter(
    (btn) =>
      !(typeof btn.hide === 'function' ? btn.hide(record, index) : btn.hide),
  );
  return (
    <Space size={16}>
      {filters.map((btn, i) => {
        return (
          // eslint-disable-next-line react/no-array-index-key
          <span key={i}>
            {btn.type == 'confirm'
              ? renderConfirm(record, btn, index)
              : renderOther(record, btn, index)}
          </span>
        );
      })}
    </Space>
  );
}

export function renderTableActionBar(list = [], extra = {}) {
  return {
    title: 'Operation',
    dataIndex: 'actionBar',
    key: 'actionBar',
    fixed: 'right',
    render: (text, record, index) => renderButtons(list, record, index),
    ...extra,
  };
}

export function renderTableColumns(title, dataIndex, extra = {}) {
  const { copy, copyTextRender, type, format } = extra;
  const render = (text, record, index) => {
    if (typeof extra.render === 'function') {
      return extra.render(text, record, index);
    }
    const copyText = copyTextRender ? copyTextRender(text, record) : text;
    return (
      <div className="dif ai_c gap5">
        <span>{type == 'date' ? showDate(text, format) : showValue(text)}</span>
        {!empty(text) && copy && (
          <i
            className="iconfont icon-copy poi"
            onClick={() => copyValue(copyText)}
          ></i>
        )}
      </div>
    );
  };
  return {
    title,
    dataIndex,
    key: dataIndex,
    width: extra.width,
    ...extra,
    render,
  };
}
