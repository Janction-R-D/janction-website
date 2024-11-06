import React, { useState } from 'react';
import { Input } from 'antd';
export function NodeInfo({ styles }) {
  const [tagInput, setTagInput] = useState(null);
  const [showInput, setShowInput] = useState(null);
  const [tags, setTags] = useState([
    'Machine Learning',
    'Suitable for AI training',
    'Deep Learning Optimization',
  ]);
  const AddTag = (name) => {
    if (!name || tags.length === 6) return;
    const newTags = [...tags, name];
    setTags(newTags);
    setShowInput(false);
  };
  const removeTag = (name) => {
    const newTags = tags.filter((tag) => tag !== name);
    setTags(newTags);
  };
  return (
    <>
      <ul>
        <ol>
          <li>
            <p>identification number:</p> <span> 879q43yv8hbvn</span>
          </li>
          <li>
            <p>node-names:</p> <span>4090xxx</span>
          </li>
          <li>
            <p>Cores:</p>
            <span>8</span>
          </li>
          <li>
            <p>memory :</p>
            <span>IT</span>
          </li>
        </ol>
        <ol>
          <li>
            <p>status:</p>
            <span>idle</span>
          </li>
          <li>
            <p>disk:</p>
            <span>1500</span>
          </li>
          <li>
            <p>Region: </p>
            <span>Manchester,UK</span>
          </li>
          <li>
            <p>vCPU: </p> <span>ESSD Entry 40GiB</span>
          </li>
        </ol>
        <ol>
          <li>
            <p>quantity:</p> <span>4</span>
          </li>
          <li>
            <p>internal storage:</p> <span>4 GiB </span>
          </li>
          <li>
            <p>Available area:</p>
            <span> 25</span>
          </li>
          <li>
            <p>Processor: </p>
            <span>intel</span>
          </li>
        </ol>
      </ul>
      <section className={styles['card-security']}>
        <span>Custom description</span>
        <div className={styles['card-security-items']}>
          <div
            className={styles['add-tag']}
            onClick={() => setShowInput(!showInput)}
          >
            <span className={styles['icon-blue']}>
              <i className="iconfont icon-add"></i>
            </span>
            Add tag ({tags.length}/6)
          </div>
          <ul className={styles['card-security-keys']}>
            {showInput && (
              <Input
                prefix={
                  <span className="icon-blue" onClick={() => AddTag(tagInput)}>
                    <i className="iconfont icon-add"></i>
                  </span>
                }
                placeholder={`Enter a short keyword`}
                className={styles['card-security-input']}
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onPressEnter={() => {
                  AddTag(tagInput);
                  setTagInput('');
                }}
              />
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
