import { Table } from 'antd';
import { useState } from 'react';
import { newsData } from './data';
import textImg from './image.png';
import styles from './index.less';
import data from './Instance.json';
import numeral from 'numeral';
import Line from './components/Line';
import Invite from './components/Invite';
import useLesses from './Hooks/useLesses';
import { history } from 'umi';

const Lessees = (props) => {
  const [news, setNews] = useState(newsData);
  const { lessesData } = useLesses();
  const { portfolio_balance: balance, details, watchlist } = lessesData || {};

  const detailsData = details?.map((item) => ({
    Name: item?.Name,
    Balance: item?.Balance,
    Price: item?.Price,
    Allocation: item?.Allocation,
    Brand: item?.Brand,
    Description: item?.Description,
    PriceChanges: item?.PriceChanges,
  }));
  const watchlistData = watchlist?.map((item) => ({
    Name: item?.Name,
    Balance: item?.Balance,
    MarketCap: item?.MarketCap,
    Change: item?.Change,
    Brand: item?.Brand,
    Description: item?.Description,
  }));

  const onBuy = (rowData) => {
    history.push('/genesis/purchase', {
      isQuick: true,
      node: rowData,
    });
  };

  const detailColumns = [
    {
      title: 'Name',
      dataIndex: 'Name',
      key: 'Name',
      render: (text, record) => (
        <div className={styles['name-column']}>
          <div className={styles['icon']}>
            {record.Brand === 'Apple' && (
              <i className="iconfont icon-nvidia green"></i>
            )}
            {record.Brand === 'Brand 2' && (
              <i className="iconfont icon-linux white"></i>
            )}
          </div>
          <div className={styles['info']}>
            <span className={styles['name']}>Name</span>
            <span className={styles['value']}>{text}</span>
          </div>
        </div>
      ),
    },
    {
      title: 'Purchase price',
      dataIndex: 'Balance',
      key: 'Balance',
      render: (text, record) => (
        <div className={styles['info']}>
          {/* <span className={styles['name']}>{record.Balance}</span> */}
          <span className={(styles['value'], styles['white'])}>
            ${`${text}${record.unit || ''}`}
          </span>
        </div>
      ),
    },
    {
      title: 'Rental price',
      dataIndex: 'Price',
      render: (text, record) => (
        <div className={styles['info']}>
          <span className={styles['name']}>
            {numeral(text || 0).format('$0,0')}
          </span>
          <span
            className={record.PriceChanges > 0 ? styles['up'] : styles['down']}
          >
            {`${record.PriceChanges > 0 ? '+' : ''}${numeral(
              record.PriceChanges || 0,
            ).format('0,0')}`}
            %
          </span>
        </div>
      ),
    },
    {
      title: 'Market shares',
      dataIndex: 'Allocation',
      render: (text) => <p>{numeral(text || 0).format('0,0')}%</p>,
    },
  ];
  const watchColumns = [
    {
      title: 'Name',
      dataIndex: 'Name',
      key: 'Name',
      render: (text, record) => (
        <div className={styles['name-column-2']}>
          <div className={styles['icon-2']}>
            <i className="iconfont icon-nvidia green"></i>
          </div>
          <div className={styles['info']}>
            <span className={styles['name']}>Name</span>
            <span className={styles['value']}>{text}</span>
          </div>
        </div>
      ),
    },
    {
      title: 'Rental price',
      dataIndex: 'Balance',
      render: (text) => (
        <p className={styles['white']}>{numeral(text || 0).format('$0,0')}</p>
      ),
    },
    {
      title: 'Change',
      dataIndex: 'Change',
      key: 'Change',
      render: (text) => {
        if (text < 0) {
          return (
            <p className={styles['red']}>{numeral(text || 0).format('0,0')}%</p>
          );
        }
        return (
          <p className={styles['green']}>
            +{numeral(text || 0).format('0,0')}%
          </p>
        );
      },
    },
    {
      title: 'market shares',
      dataIndex: 'MarketCap',
      render: (text) => (
        <p className={styles['white']}>{numeral(text || 0).format('$0,0')}</p>
      ),
    },
    {
      title: 'operation',
      dataIndex: 'Watch',
      key: 'Watch',
      render: (text, rowData) => (
        <div className={styles['action']} onClick={() => onBuy(rowData)}>
          <span>Buy</span>
          <i className="iconfont icon-next_page"></i>
        </div>
      ),
    },
  ];

  return (
    <div className={styles['dashboard-wrapper']}>
      <h1>Dashboard</h1>
      <Invite />
      <div className={styles['dashboard-content']}>
        <div
          className={[styles['content-item'], styles['balance-wrapper']].join(
            ' ',
          )}
        >
          <div className={styles['title']}>
            <span>Running time</span>
          </div>
          <div className={styles['content']}>
            <Line balance={balance} />
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
              dataSource={detailsData}
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
            <span>Recommendation list</span>
            <div className={styles['extra']}>
              <span>See All</span>
              <i className="iconfont icon-next_page"></i>
            </div>
          </div>
          <div className={styles['content']}>
            <Table
              bordered={false}
              className={styles['table-2']}
              columns={watchColumns}
              dataSource={watchlistData}
              pagination={false}
            ></Table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Lessees;
