import React, { useEffect, useState } from 'react';
import { Input } from 'antd';
import dayjs from 'dayjs';
export function NodeInfo({ nodeInfo, styles, tags, setTags }) {
  const [tagInput, setTagInput] = useState(null);
  const [showInput, setShowInput] = useState(null);
  const [error, setError] = useState(false);

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
    // setShowInput(false);
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

  const renderLabelInfo = (label, value) => {
    return (
      <li>
        <p>{label}:</p>
        <span>{value || '~'}</span>
      </li>
    );
  };

  return (
    <>
      <ul>
        <ol>
          {renderLabelInfo('identification number', nodeInfo?.id)}
          {renderLabelInfo('node-names', nodeInfo?.name)}
          {renderLabelInfo('Cores', nodeInfo?.cores)}
          {renderLabelInfo('memory', nodeInfo?.attr?.memory)}
        </ol>
        <ol>
          {renderLabelInfo('status', nodeInfo?.status_str)}
          {renderLabelInfo('arch', nodeInfo?.attr?.architechture_str)}
          {renderLabelInfo('cpu', nodeInfo?.attr?.cpu)}
          {renderLabelInfo('location', nodeInfo?.attr?.location)}
        </ol>
        <ol>
          {renderLabelInfo('networkDown', nodeInfo?.attr?.network_down)}
          {renderLabelInfo('networkUp', nodeInfo?.attr?.network_up)}
          {renderLabelInfo(
            'operatingSystem',
            nodeInfo?.attr?.operating_system_str,
          )}
          {renderLabelInfo(
            'lastConfig',
            nodeInfo?.last_start_at
              ? dayjs(nodeInfo?.last_start_at).format('YYYY-MM-DD')
              : '--',
          )}
        </ol>
      </ul>
      <section className={styles['card-security']}>
        <span>Custom description</span>
        <div className={styles['card-security-items']}>
          <div className={styles['add-tag']} onClick={handleShow}>
            <span className={styles['icon-blue']}>
              <i className="iconfont icon-add"></i>
            </span>
            Add tag ({tags.length}/6)
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
                  placeholder={`Enter a short keyword`}
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
                  <p className={styles['red']}>Please do not add duplicates.</p>
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
