import '@/assets/images/explore/statistic_bg.png';
import first from '@/assets/images/explore/first.png';
import second from '@/assets/images/explore/second.png';
import third from '@/assets/images/explore/third.png';
import line_charts from '@/assets/images/explore/line_charts.png';
import ranking_bg from '@/assets/images/explore/ranking_bg.png';
import '@/assets/images/explore/total_bg.png';
import '@/assets/images/explore/total_android_bg.png';
import '@/assets/images/explore/device_item_android_bg.png';
import '@/assets/images/explore/device_item_bg.png';
import '@/assets/images/explore/table_bg.png';
import '@/assets/images/explore/table_android_bg.png';
import { ConfigProvider, Table, Pagination } from 'antd';
import { useEffect, useState } from 'react';
import JactionEmpty from '../../components/JactionEmpty';
import { fetchPointsList, fetchRanking } from '../../services/explore/point';
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

  useEffect(() => {
    getRaking();
    getPointsList();
  }, []);

  const getRaking = async () => {
    const res = await fetchRanking();
    setRankData(res);
  };

  const getPointsList = async (values) => {
    const params = { ...query, ...values };
    setLoading(true);
    setQuery(params);
    const res = await fetchPointsList(params);
    setPointsList(res.list);
    setLoading(false);
    setTotal(res.total);
  };

  const columns = [
    {
      title: 'User',
      dataIndex: 'username',
    },
    {
      title: 'Job Id',
      dataIndex: 'jobId',
    },
    {
      title: 'Finished Time',
      dataIndex: 'finishedTime',
    },
    {
      title: 'Reward Points',
      dataIndex: 'rewardPoints',
    },
    {
      title: 'Tx Hash',
      dataIndex: 'txHash',
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
          {rankList.map((item) => (
            <div
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
                      title={rankingItem.userName}
                    >
                      {rankingItem.userName}
                    </span>
                    <span className={styles['total']}>
                      {numeral(rankingItem.total || 0).format('$0,0')}
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
              <span className={styles['value']}>112,893 +</span>
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
