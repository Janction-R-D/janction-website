import styles from './index.less';

const SocialsLinks = (props) => {
  return (
    <div className={styles['socials-links']}>
      <div className={['hvr-grow', styles['x']].join(' ')}></div>
      <div className={['hvr-grow', styles['discord']].join(' ')}></div>
      <div className={['hvr-grow', styles['github']].join(' ')}></div>
    </div>
  );
};

export default SocialsLinks;
