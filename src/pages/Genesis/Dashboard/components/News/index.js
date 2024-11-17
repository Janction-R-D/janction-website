import { useEffect, useState } from 'react';
import styles from './index.less';
import textImg from './image.png';
import { fetchNewsList, fetchNewsUpdate } from '@/services/genesis';
import { isEmpty } from '@/utils/lang';

const News = (props) => {
  const [list, setList] = useState([]);

  useEffect(() => {
    getList();
  }, []);
  const getList = async () => {
    try {
      // await fetchNewsUpdate();
      const res = await fetchNewsList();
      console.log('『res』', res);
      setList(res || []);
    } catch (error) {
      console.log('『error』', error);
    }
  };

  return (
    <div className={[styles['content-item'], styles['news-wrapper']].join(' ')}>
      <div className={styles['title']}>
        <span>News</span>
        <a
          className={styles['extra']}
          href="https://www.bbc.com/news"
          target="__black"
        >
          <span>See All</span>
          <i className="iconfont icon-next_page"></i>
        </a>
      </div>
      <div className={styles['content']}>
        {list.map((item, index) => {
          let banner = textImg;
          const thumbnail = item?.extensions?.media?.thumbnail || [];
          if (!!thumbnail.length) {
            const url = thumbnail[0]?.attrs?.url;
            if (url) banner = url;
          }
          return (
            <div className={styles['news-item']} key={index}>
              <div className={styles['pic']}>
                <img src={banner} alt="" />
              </div>
              <div className={styles['info']}>
                <p className={styles['title']}>{item.title}</p>
                <p className={styles['desc']}>{item.desc}</p>
                <a href={item.link} target="__black" className={styles['more']}>
                  <span>Learn More</span>
                  <i className="iconfont  icon-next_page"></i>
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default News;
