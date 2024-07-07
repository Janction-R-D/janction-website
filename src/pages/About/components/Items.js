import styles from './index.less';

const Items = (props) => {
  const { data, className } = props;
  const { user, description = [] } = data || {};

  return (
    <div className={`${styles['items']} ${className}`}>
      <div className={styles['user-info']}>
        <div className={styles['avatar']}>
          <img
            src={require('@/assets/images/about/avatar.png')}
            alt=""
            width={65}
          />
        </div>
        <div className={styles['text']}>
          <span>{user?.name}</span>
          <span className={styles['role']}>{user?.role}</span>
        </div>
      </div>
      <div className={styles['description']}>
        <ul>
          {description.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Items;
