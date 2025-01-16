import { Button, Checkbox } from 'antd';
import { useEffect, useState } from 'react';

export function CheckHeader({
  filteredMessages,
  setAllMessages,
  setIsChecked,
  isChecked,
}) {
  const [isAllcheck, setIsAllCheck] = useState(false);
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
  const checkIsAllChecked = () => {
    const filterChecked = filteredMessages.filter(
      (sms) => sms.checked === false,
    );

    if (filterChecked.length > 0) {
      setIsAllCheck(false);
      return;
    }
    setIsAllCheck(true);
  };
  useEffect(() => {
    const findIsChecked = filteredMessages.findIndex(
      (message) => message.checked === true,
    );
    checkIsAllChecked();
    if (findIsChecked !== -1) {
      setIsChecked(true);

      return;
    } else {
      setIsChecked(false);
    }
  }, [filteredMessages]);

  const handleClick = () => {
    if (isChecked) {
      const newMessages = filteredMessages.map((sms) => ({
        ...sms,
        checked: false,
      }));
      setAllMessages(newMessages);
      return;
    }
    const newMessages = filteredMessages.map((sms) => ({
      ...sms,
      checked: true,
    }));
    setAllMessages(newMessages);
  };
  return (
    <div className="table-header">
      <Checkbox
        checked={isChecked}
        onClick={handleClick}
        className={`${isAllcheck ? '' : 'isCheckSome'}`}
      />
      <div>
        <Button onClick={deleteMessages} disabled={!isChecked}>
          Delete
        </Button>
        <Button onClick={setAsReadedMessages} disabled={!isChecked}>
          Mark as Read
        </Button>
      </div>
    </div>
  );
}
