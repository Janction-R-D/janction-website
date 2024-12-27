import '@/assets/images/explore/statistic_bg.png';
import first from '@/assets/images/explore/first.png';
import second from '@/assets/images/explore/second.png';
import third from '@/assets/images/explore/third.png';
import line_charts from '@/assets/images/explore/line_charts.png';
import ranking_bg from '@/assets/images/explore/ranking_bg.webp';
import '@/assets/images/explore/total_bg.png';
import '@/assets/images/explore/total_android_bg.png';
import '@/assets/images/explore/device_item_android_bg.png';
import '@/assets/images/explore/device_item_bg.png';
import '@/assets/images/explore/table_bg.png';
import '@/assets/images/explore/table_android_bg.png';
import { ConfigProvider, Table, Pagination } from 'antd';
import { useEffect, useState } from 'react';
import JactionEmpty from '../../components/JactionEmpty';
import {
  fetchPointsList,
  fetchPointsTotal,
  fetchRanking,
} from '../../services/explore/point';
import styles from './index.less';
import numeral from 'numeral';
import { renderBackgroudImg } from '@/utils/lang';
import { rankList } from './data';

const rankingImg = {
  1: first,
  2: second,
  3: third,
};

const Points = (props) => {
  // Leaderboard's data
  const [rankData, setRankData] = useState();
  // Points's data
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState({ page: 1, size: 15 });
  const [total, setTotal] = useState(0);
  const [pointsList, setPointsList] = useState();
  const [pointsTotal, setPointsTotal] = useState(0);

  useEffect(() => {
    getRaking();
    getPointsList();
    getPointsTotal();
  }, []);

  const getRaking = async () => {
    try {
      const res = await fetchRanking();
      setRankData(res);
    } catch (err) {
      console.log('『err』', err);
    }
  };

  const getPointsList = async (values) => {
    const params = { ...query, ...values };
    setLoading(true);
    try {
      const res = await fetchPointsList(params);
      setQuery(params);
      setPointsList(res.list);
      setTotal(res.total);
    } catch (err) {
      console.log('『err』', err);
    }
    setLoading(false);
  };

  const getPointsTotal = async () => {
    try {
      const res = await fetchPointsTotal();
      setPointsTotal(res || 0);
    } catch (err) {
      console.log('『err』', err);
    }
  };

  const columns = [
    {
      title: 'User',
      dataIndex: 'chain_id',
    },
    {
      title: 'Job Id',
      dataIndex: 'sumed_jobs',
    },
    {
      title: 'Finished Time',
      dataIndex: 'create_at',
    },
    {
      title: 'Reward Points',
      dataIndex: 'sumed_points',
    },
    {
      title: 'Tx Hash',
      dataIndex: 'tx_hash',
      render: (text) => {
        return (
          <div className={styles['tx-hash']}>
            <i className={styles['status']}></i>
            <span>{text}</span>
            <i className="iconfont icon-next_page"></i>
          </div>
        );
      },
    },
    {
      title: 'Platform',
      dataIndex: 'platform',
    },
  ];

  return (
    <div className={styles['points-wrapper']}>
      <div className={[styles['wrapper'], styles['ranking-wrapper']].join(' ')}>
        <h1>Leaderboard</h1>
        <div className={styles['content']}>
          {rankList.map((item, index) => (
            <div
              key={index}
              className={styles['ranking-info']}
              style={renderBackgroudImg(ranking_bg)}
            >
              <div className={styles['title']}>
                <span>{item.title}</span>
              </div>
              <div className={styles['list']}>
                {(rankData?.[item.type] || []).map((rankingItem, index) => (
                  <div className={styles[`ranking-${index}`]}>
                    <img src={rankingImg[index + 1]} />
                    <span
                      className={`${styles['username']} ell`}
                      title={rankingItem.wallet_address}
                    >
                      {rankingItem.wallet_address}
                    </span>
                    <span className={styles['total']}>
                      {numeral(rankingItem.point || 0).format('$0,0')}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className={[styles['wrapper'], styles['table-wrapper']].join(' ')}>
        <div className={styles['header']}>
          <h1>Points</h1>
          <div className={styles['total']}>
            <div className="df ai_c">
              <img src={line_charts} alt="" />
              <span className={styles['name']}>Total Points</span>
              <span className={styles['value']}>
                {numeral(pointsTotal).format('0,0')}+
              </span>
            </div>
          </div>
        </div>
        <div className={styles['content']}>
          <ConfigProvider renderEmpty={() => <JactionEmpty />}>
            <Table
              loading={loading}
              columns={columns}
              dataSource={pointsList}
              pagination={false}
              scroll={{ x: 'max-content' }}
            ></Table>
          </ConfigProvider>
        </div>
        <div className={styles['pagination-wrapper']}>
          <Pagination
            current={query?.page}
            size={query?.size}
            total={total}
            showLessItems={true}
            showSizeChanger={false}
            onChange={(page) => {
              getPointsList({ page: page });
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Points;
