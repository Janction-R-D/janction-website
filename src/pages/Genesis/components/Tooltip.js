import { Space, Tooltip } from 'antd';

const TooltipBox = ({ children, TooltipText, placement = 'top' }) => {
  return (
    <Space>
      <Tooltip title={TooltipText} color="black" placement={placement}>
        <span>{children}</span>
      </Tooltip>
    </Space>
  );
};
export default TooltipBox;
