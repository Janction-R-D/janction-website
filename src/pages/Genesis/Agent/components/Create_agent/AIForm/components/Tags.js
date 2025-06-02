/** @jsxImportSource @emotion/react */
import React, { useState } from 'react';
import styled from '@emotion/styled';
import { CloseOutlined, PlusOutlined } from '@ant-design/icons';
import { useIntl } from 'umi';

export default function TagsInputGroup() {
  const [tags, setTags] = useState(['', '']);
  const { formatMessage } = useIntl();
  const handleTagChange = (index, value) => {
    if (value.length <= 4) {
      const newTags = [...tags];
      newTags[index] = value;
      setTags(newTags);
    }
  };

  const handleAddTag = () => {
    setTags([...tags, '']);
  };

  const handleRemoveTag = (index) => {
    const newTags = tags.filter((_, i) => i !== index);
    setTags(newTags);
  };

  return (
    <Container>
      {tags.map((tag, index) => (
        <InputWrapper key={index}>
          <div>
            <TagInput
              type="text"
              value={tag}
              onChange={(e) => handleTagChange(index, e.target.value)}
              onDoubleClick={() => handleRemoveTag(index)}
              placeholder={formatMessage({ id: 'create.tags_holder' })}
            />
            <CharCount>{tag.length}/4</CharCount>
          </div>
          <CloseButton onClick={() => handleRemoveTag(index)}>
            <CloseOutlined
              style={{ fontSize: '12px', color: '#aaa', padding: '10px' }}
            />
          </CloseButton>
        </InputWrapper>
      ))}
      {tags.length < 20 && (
        <InputWrapperAdd>
          <AddButton onClick={handleAddTag}>
            <PlusOutlined style={{ fontSize: '20px', color: '#fff' }} />
          </AddButton>
        </InputWrapperAdd>
      )}
    </Container>
  );
}

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr); /* 两列布局 */
  gap: 10px; /* 项目间距 */
  width: 100%;
  margin: 20px auto;
  grid-auto-rows: minmax(40px, auto); /* 设置最小行高 */
`;

const CloseButton = styled.button`
  position: absolute;
  top: -24px;
  right: -24px;
  width: 20px;
  height: 20px;
  border: none;
  border-radius: 50%;
  font-size: 12px;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  display: none; /* 默认隐藏 */
  color: #fff;
  background: #434343;
  margin: 10px;

  &:hover {
    background: #949494;

    & svg {
      color: white;
    }
  }
`;

const InputWrapper = styled.div`
  position: relative;
  margin-bottom: 10px;
  height: 40px;
  border-radius: 8px;
  padding: 4px;

  &:hover button {
    display: flex; /* hover 时让 button 显示 */
  }
`;
const InputWrapperAdd = styled.div`
  position: relative;
  margin-bottom: 10px;
  height: 40px;
  border-radius: 8px;
  padding: 4px;
`;

const TagInput = styled.input`
  width: 100%;
  height: 100%;
  padding: 8px 50px 8px 8px; /* 右边留空间放统计 */
  font-size: 16px;
  border: 1px solid #434343; /* 添加外边框 */
  border-radius: 8px;
  background-color: transparent; /* 背景透明 */
  box-sizing: border-box;

  &:hover {
    border-color: #949494;
  }

  &:focus {
    outline: none;
    border-color: #949494;
  }

  &::placeholder {
    color: #aaaaaa;
  }
`;

const CharCount = styled.span`
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  color: #aaaaaa;
  font-size: 14px;
  pointer-events: none;
`;

const AddButton = styled.button`
  grid-column: span 1; /* 跨越两列 */
  width: 100%;
  height: 100%;
  padding: 8px 16px;
  border: 1px solid #434343; /* 添加外边框 */
  background-color: transparent;
  color: #fff;
  border-radius: 8px;
  cursor: pointer;

  &:hover {
    border-color: #949494;
  }
`;
