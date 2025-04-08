import { useEffect, useState } from 'react';
import styles from './index.less';
import textImg from './image.png';
import { fetchNewsList, fetchNewsUpdate } from '@/services/genesis';
import { Pagination, Skeleton } from 'antd';
import { isEmpty } from '@/utils/lang';
const initQuery = { current: 1, size: 20 };
const News = (props) => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState(initQuery);
  useEffect(() => {
    getList();
  }, []);
  const getList = async () => {
    try {
      setLoading(true);
      // await fetchNewsUpdate();
      const res = await fetchNewsList();
      setList(res || []);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log('『error』', error);
    }
  };
  const onPageChange = (page) => {
    setQuery({ ...query, current: page });
    //Pagination Control
    const endIndex = page * query.size;
    const startINdex = endIndex - query.size;
    const filterData = list?.slice(startINdex, endIndex);
    setList(filterData);
  };

  const renderNewsList = () => {
    return list.slice(0, 20).map((item, index) => {
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
    });
  };

  return (
    <div className={[styles['content-item'], styles['news-wrapper']].join(' ')}>
      <div className={styles['title']}>
        <span>News</span>
        {/* <a
          className={styles['extra']}
          href="https://www.bbc.com/news"
          target="__black"
        >
          <span>See All</span>
          <i className="iconfont icon-next_page"></i>
        </a> */}
      </div>
      <div className={styles['content']}>
        {loading ? (
          <>
            <Skeleton avatar active round title paragraph={{ rows: 1 }} />
            <Skeleton avatar active round title paragraph={{ rows: 1 }} />
            <Skeleton avatar active round title paragraph={{ rows: 1 }} />
            <Skeleton avatar active round title paragraph={{ rows: 1 }} />
            <Skeleton avatar active round title paragraph={{ rows: 1 }} />
          </>
        ) : (
          <>
            {renderNewsList()}
            {/* <div className={styles['pagination-wrapper']}>
              <Pagination
                current={query?.current}
                pageSize={query?.size}
                total={list?.length}
                showLessItems
                onChange={onPageChange}
              />
            </div> */}
          </>
        )}
      </div>
    </div>
  );
};

export default News;
