import { Space, Tooltip } from 'antd';

const TooltipBox = ({ children, TooltipText }) => {
  return (
    <Space>
      <Tooltip title={`${TooltipText}`} color="black" rounded>
        <span>{children}</span>
      </Tooltip>
    </Space>
  );
};
export default TooltipBox;
