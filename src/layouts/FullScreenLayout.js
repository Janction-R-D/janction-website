import RainbowKit from '@/components/RainbowKit';
import styles from './index.less';

const FullScreenLayout = (props) => {
  const { rainbowKit, children } = props;

  const renderChildren = () => {
    if (rainbowKit) {
      return <RainbowKit>{children}</RainbowKit>;
    }
    return children;
  };

  return <div id={styles['full-screen-container']}>{renderChildren()}</div>;
};

export default FullScreenLayout;
