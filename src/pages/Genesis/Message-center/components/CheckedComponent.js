import { Checkbox } from 'antd';
import { useState } from 'react';
export function CheckedComponent({
  text,
  record,
  setAllMessages,
  filteredMessages,
}) {
  const [isCheck, setIsCheck] = useState(false);
  const handleSelect = () => {
    setIsCheck((prevState) => !prevState);

    const findIndexMessage = filteredMessages.findIndex(
      (item) => item.key === record.key,
    );

    const newMessages = [...filteredMessages];
    newMessages[findIndexMessage] = {
      ...newMessages[findIndexMessage],
      checked: isCheck ? false : true,
    };

    setAllMessages(newMessages);
  };

  return (
    <div className={` tipo ${record.estado !== 'Leído' ? 'readed-sms' : ''}`}>
      <Checkbox onClick={handleSelect} checked={record.checked}>
        <p>{text}</p>
      </Checkbox>
    </div>
  );
}
