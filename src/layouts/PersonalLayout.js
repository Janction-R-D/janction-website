import RainbowKit from '@/components/RainbowKit';
import styles from './index.less';

const PersonalLayout = (props) => {
  const { children } = props;

  return (
    <div id={styles['personal-container']}>
      <RainbowKit>
        <main>{children}</main>
      </RainbowKit>
    </div>
  );
};

export default PersonalLayout;
