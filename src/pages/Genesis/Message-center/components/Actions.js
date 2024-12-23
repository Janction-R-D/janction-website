import React from 'react';
import { Button, message } from 'antd';

export default function Actions({
  text,
  record,
  setAllMessages,
  filteredMessages,
}) {
  const onDelete = () => {
    const newMessages = filteredMessages.filter(
      (message) => message.key !== record.key,
    );
    setAllMessages(newMessages);
  };
  const onReaded = () => {
    const indexMessage = filteredMessages.findIndex(
      (item) => item.key === record.key,
    );
    const newArrays = [...filteredMessages];
    newArrays[indexMessage] = { ...newArrays[indexMessage], estado: 'Leído' };

    setAllMessages(newArrays);
  };
  return (
    <div className="actions">
      <p className={`${record.estado !== 'Leído' ? 'readed-sms' : ''}`}>
        {text}
      </p>
      <div className="buttons">
        <Button type="link" onClick={onDelete}>
          Delete
        </Button>
        <Button type="link" onClick={onReaded}>
          Mark as Read
        </Button>
      </div>
    </div>
  );
}
