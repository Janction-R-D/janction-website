import './index.less';

const StepButton = ({
  onClick,
  text,
  padding = [12, 32],
  height = 48,
  disabled = false,
}) => {
  const style = {
    height: `${height}px`,
    padding: `${padding[0]}px ${padding[1]}px`,
  };

  return (
    <button
      className="step-button"
      onClick={onClick}
      disabled={disabled}
      style={style}
    >
      <span>{text}</span>
    </button>
  );
};

export default StepButton;
