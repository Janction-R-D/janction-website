import { Table } from 'antd';
import { useState } from 'react';
import { newsData } from './data';
import textImg from './image.png';
import styles from './index.less';
import data from './Instance.json';
import numeral from 'numeral';
import Line from './Line';

const Dashboard = (props) => {
  const [news, setNews] = useState(newsData);
  const [watchList, setWatchList] = useState([]);
  const [recommendList, setRecommendList] = useState([]);

  const detailColumns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text) => (
        <div className={styles['name-column']}>
          <div className={styles['icon']}>
            <i className="iconfont icon-nvidia"></i>
          </div>
          <div className={styles['info']}>
            <span className={styles['name']}>Name</span>
            <span className={styles['value']}>{text}</span>
          </div>
        </div>
      ),
    },
    {
      title: 'Balance',
      dataIndex: 'count',
      key: 'age',
      render: (text, record) => (
        <div className={styles['info']}>
          <span className={styles['name']}>{record.balance}</span>
          <span className={styles['value']}>{`${text}${
            record.unit || ''
          }`}</span>
        </div>
      ),
    },
    {
      title: 'Price',
      dataIndex: 'price',
      render: (text, record) => (
        <div className={styles['info']}>
          <span className={styles['name']}>
            {numeral(text || 0).format('$0,0')}
          </span>
          <span
            className={record.pricechange > 0 ? styles['up'] : styles['down']}
          >{`${numeral(record.pricechange || 0).format('0,0%')}`}</span>
        </div>
      ),
    },
    {
      title: 'Allocation',
      dataIndex: 'pricechange',
      render: (text) => numeral(text || 0).format('0,0%'),
    },
  ];
  const watchColumns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'Balance',
      dataIndex: 'balance',
      render: (text) => numeral(text || 0).format('$0,0'),
    },
    {
      title: 'Change',
      dataIndex: 'pricechange',
      key: 'addre1ss',
      render: (text) => numeral(text || 0).format('0,0%'),
    },
    {
      title: 'Market cap',
      dataIndex: 'pricechange',
      render: (text) => numeral(text || 0).format('0,0%'),
    },
    {
      title: 'Watch',
      dataIndex: 'address',
      key: 'address',
      render: (text) => (
        <div className={styles['action']}>
          <span>Buy</span>
          <i className="iconfont icon-next_page"></i>
        </div>
      ),
    },
  ];

  return (
    <div className={styles['dashboard-wrapper']}>
      <h1>Dashboard</h1>
      <div className={styles['dashboard-content']}>
        <div
          className={[styles['content-item'], styles['balance-wrapper']].join(
            ' ',
          )}
        >
          <div className={styles['title']}>
            <span>Title</span>
          </div>
          <div className={styles['content']}>
            <Line />
          </div>
        </div>
        <div
          className={[styles['content-item'], styles['news-wrapper']].join(' ')}
        >
          <div className={styles['title']}>
            <span>News</span>
            <div className={styles['extra']}>
              <span>See All</span>
              <i className="iconfont icon-next_page"></i>
            </div>
          </div>
          <div className={styles['content']}>
            {news.map((item) => (
              <div className={styles['news-item']}>
                <div className={styles['pic']}>
                  <img src={textImg} alt="" />
                </div>
                <div className={styles['info']}>
                  <p className={styles['title']}>{item.title}</p>
                  <p className={styles['desc']}>{item.desc}</p>
                  <div className={styles['more']}>
                    <span>Learn More</span>
                    <i className="iconfont  icon-next_page"></i>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div
          className={[styles['content-item'], styles['recommend-wrapper']].join(
            ' ',
          )}
        >
          <div className={styles['title']}>
            <span>Details</span>
            <div className={styles['extra']}>
              <span>See All</span>
              <i className="iconfont icon-next_page"></i>
            </div>
          </div>
          <div className={styles['content']}>
            <Table
              bordered={false}
              className={styles['table']}
              columns={detailColumns}
              dataSource={data}
              pagination={false}
            />
          </div>
        </div>
        <div
          className={[styles['content-item'], styles['collect-wrapper']].join(
            ' ',
          )}
        >
          <div className={styles['title']}>
            <span>Watchlist</span>
            <div className={styles['extra']}>
              <span>See All</span>
              <i className="iconfont icon-next_page"></i>
            </div>
          </div>
          <div className={styles['content']}>
            <Table
              bordered={false}
              className={styles['table']}
              columns={watchColumns}
              dataSource={data}
              pagination={false}
            ></Table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
