import React, { useEffect, useState } from 'react';
import { Input } from 'antd';
import dayjs from 'dayjs';
import { useIntl } from 'umi';

export function NodeInfo({ nodeInfo, styles, tags, setTags }) {
  const [tagInput, setTagInput] = useState(null);
  const [showInput, setShowInput] = useState(null);
  const [error, setError] = useState(false);
  const intl = useIntl();

  const AddTag = (name) => {
    if (!name || tags.length === 6) return;

    const verifyTag = tags.filter((tag) => tag.trim() === name.trim());
    if (verifyTag.length > 0) {
      setError(true);
      setTimeout(() => {
        setError(false);
      }, 2000);
      return;
    }
    const newTags = [name, ...tags];
    setTags(newTags);
    setTagInput('');
    if (newTags.length >= 6) {
      setShowInput(false);
    }
  };

  const removeTag = (name) => {
    const newTags = tags.filter((tag) => tag !== name);
    setTags(newTags);
  };

  const handleShow = () => {
    if (tags.length >= 6) return;
    setShowInput(!showInput);
  };

  const renderLabelInfo = (labelKey, value) => (
    <li>
      <p>{intl.formatMessage({ id: labelKey })}:</p>
      <span>{value || '~'}</span>
    </li>
  );

  return (
    <>
      <ul>
        <ol>
          {renderLabelInfo('node.id', nodeInfo?.id)}
          {renderLabelInfo('node.memory', nodeInfo?.attr?.memory)}
          {renderLabelInfo(
            'node.gpuChip',
            nodeInfo?.attr?.gpu_chip
              ? `${nodeInfo?.attr?.gpu_chip?.[0]} * ${nodeInfo?.attr?.gpu_chip?.length}`
              : '~',
          )}
        </ol>
        <ol>
          {renderLabelInfo('node.status', nodeInfo?.status_str)}
          {renderLabelInfo('node.arch', nodeInfo?.attr?.architechture_str)}
          {renderLabelInfo('node.cpu', nodeInfo?.attr?.cpu)}
          {renderLabelInfo(
            'node.cpuChip',
            nodeInfo?.attr?.cpu_chip
              ? `${nodeInfo?.attr?.cpu_chip?.[0]} * ${nodeInfo?.attr?.cpu_chip?.length}`
              : '~',
          )}
          {renderLabelInfo('node.location', nodeInfo?.attr?.location)}
        </ol>
        <ol>
          {renderLabelInfo('node.networkDown', nodeInfo?.attr?.network_down)}
          {renderLabelInfo('node.networkUp', nodeInfo?.attr?.network_up)}
          {renderLabelInfo('node.os', nodeInfo?.attr?.operating_system_str)}
          {renderLabelInfo(
            'node.lastConfig',
            nodeInfo?.last_start_at
              ? dayjs(nodeInfo?.last_start_at).format('YYYY-MM-DD')
              : '--',
          )}
        </ol>
      </ul>
      <section className={styles['card-security']}>
        <span>{intl.formatMessage({ id: 'node.customDesc' })}</span>
        <div className={styles['card-security-items']}>
          <div className={styles['add-tag']} onClick={handleShow}>
            <span className={styles['icon-blue']}>
              <i className="iconfont icon-add"></i>
            </span>
            {intl.formatMessage({ id: 'node.addTag' }, { count: tags.length })}
          </div>
          <ul className={styles['card-security-keys']}>
            {showInput && (
              <div className={styles['input-duration']}>
                <Input
                  prefix={
                    <span
                      className="icon-blue"
                      onClick={() => AddTag(tagInput)}
                    >
                      <i className="iconfont icon-add"></i>
                    </span>
                  }
                  placeholder={intl.formatMessage({
                    id: 'node.inputPlaceholder',
                  })}
                  className={`${styles['card-security-input']} ${
                    error ? styles['search-input-error'] : ''
                  }`}
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onPressEnter={() => {
                    AddTag(tagInput);
                  }}
                />
                {error && (
                  <p className={styles['red']}>
                    {intl.formatMessage({ id: 'node.duplicateError' })}
                  </p>
                )}
              </div>
            )}
            {tags.map((item, index) => (
              <div className={styles['card-security-key']} key={index}>
                <div>
                  <p>{item}</p>
                </div>
                <span
                  className={styles['icon-red']}
                  onClick={() => removeTag(item)}
                >
                  <i className="iconfont icon-delete "></i>
                </span>
              </div>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
