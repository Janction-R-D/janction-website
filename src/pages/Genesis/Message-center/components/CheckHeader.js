import { Button, Checkbox } from 'antd';
import styles from '../index.less';
import { useEffect } from 'react';

export function CheckHeader({
  filteredMessages,
  setAllMessages,
  setIsChecked,
  isChecked,
}) {
  const setAsReadedMessages = () => {
    const selectedMessages = filteredMessages.filter(
      (message) => message.checked === true,
    );

    const updatedMessages = filteredMessages.map((message) => {
      const isSelected = selectedMessages.find(
        (selected) => selected.key === message.key,
      );
      if (isSelected) {
        return { ...message, estado: 'Leído', checked: false };
      }
      return message;
    });

    setAllMessages(updatedMessages);
  };
  const deleteMessages = () => {
    const selectedMessages = filteredMessages.filter(
      (message) => message.checked === false,
    );

    if (selectedMessages.length <= 0) return;
    setAllMessages(selectedMessages);
  };
  useEffect(() => {
    const findIsChecked = filteredMessages.findIndex(
      (message) => message.checked === true,
    );

    if (findIsChecked !== -1) {
      setIsChecked(true);
      return;
    } else {
      setIsChecked(false);
    }
  }, [filteredMessages]);

  return (
    <div className="table-header">
      <Checkbox checked={isChecked} />
      <div>
        <Button onClick={deleteMessages}>Delete</Button>
        <Button onClick={setAsReadedMessages}>Mark as Read</Button>
      </div>
    </div>
  );
}
