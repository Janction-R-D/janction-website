import React, { useEffect, useState } from 'react';
import { CloseOutlined, PlusOutlined } from '@ant-design/icons';
import styles from './index.less';

export default function TagsInputGroup({ value = [], onChange }) {
  const [tags, setTags] = useState(value.length ? value : ['']);

  const handleTagChange = (index, val) => {
    if (val.length <= 9) {
      const newTags = [...tags];
      newTags[index] = val;
      setTags(newTags);
      onChange?.(newTags);
    }
  };

  const handleAddTag = () => {
    const newTags = [...tags, ''];
    setTags(newTags);
    onChange?.(newTags);
  };

  const handleRemoveTag = (index) => {
    const newTags = tags.filter((_, i) => i !== index);
    setTags(newTags);
    onChange?.(newTags);
  };

  return (
    <div className={styles.container}>
      {tags.map((tag, index) => (
        <div key={index} className={styles.inputWrapper}>
          <div className={styles.inputG}>
            <input
              type="text"
              className={styles.tagInput}
              value={tag}
              onChange={(e) => handleTagChange(index, e.target.value)}
              onDoubleClick={() => handleRemoveTag(index)}
              placeholder="Add tag"
            />
            <span className={styles.charCount}>{tag.length}/9</span>
          </div>
          <button
            className={styles.closeButton}
            onClick={() => handleRemoveTag(index)}
          >
            <CloseOutlined
              style={{ fontSize: '12px', color: '#aaa', padding: '10px' }}
            />
          </button>
        </div>
      ))}
      {tags.length < 20 && (
        <div className={styles.inputWrapperAdd}>
          <button className={styles.addButton} onClick={handleAddTag}>
            <PlusOutlined style={{ fontSize: '20px', color: '#fff' }} />
          </button>
        </div>
      )}
    </div>
  );
}
