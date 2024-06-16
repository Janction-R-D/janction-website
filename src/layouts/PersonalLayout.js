import RainbowKit from '@/components/RainbowKit';
import styles from './index.less';

const PersonalLayout = (props) => {
  const { rainbowKit, children } = props;

  const renderChildren = () => {
    if (rainbowKit) {
      return (
        <RainbowKit>
          <main>{children}</main>
        </RainbowKit>
      );
    }
    return <main>{children}</main>;
  };

  return <div id={styles['personal-container']}>{renderChildren()}</div>;
};

export default PersonalLayout;
