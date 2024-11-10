import home from '@/assets/images/icons/go-home.png';
import styles from './404.less';
import { renderBackgroudImg } from '@/utils/lang';
const EmptyPage = (props) => {
  const { history } = props;
  return (
    <div className="empty-page-wrapper">
      <div className={styles['content']}>
        <img src="/404.webp" width="100%" />
        <div className={styles['error-box']}>
          <p className={styles['error-text']}>
            We can't find the page you're looking for :(
          </p>
        </div>
        <a
          onClick={() => {
            history.push('/');
          }}
          className={styles['go-home']}
          style={renderBackgroudImg(home)}
        ></a>
      </div>
    </div>
  );
};

export default EmptyPage;
