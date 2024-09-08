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
import { fetchUserCreditsInfo } from '../../services/explore/point';
import styles from './index.less';
import numeral from 'numeral';
import { renderBackgroudImg } from '@/utils/lang';

const rankingImg = {
  1: first,
  2: second,
  3: third,
};

const Points = (props) => {
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState({ page: 1, size: 15 });
  const [total, setTotal] = useState(0);
  const [pointsList, setPointsList] = useState([
    {
      username: 'Sam Johaannes',
      jobId: '123891h12as118883j',
      finishedTime: 'Aug 02, 2024 10:00:02 UTC',
      rewardPoints: '888,888,888.88',
      txHash: '0xc72c5c324422e7',
      platform: 'CPU',
    },
    {
      username: 'GeForce RTX 3090',
      jobId: '123891h12as118883j',
      finishedTime: 'Aug 02, 2024 10:00:02 UTC',
      rewardPoints: '888,888,888.88',
      txHash: '0xc72c5c324422e7',
      platform: 'CPU',
    },
    {
      username: 'M2 MAX',
      jobId: '123891h12as118883j',
      finishedTime: 'Aug 02, 2024 10:00:02 UTC',
      rewardPoints: '888,888,888.88',
      txHash: '0xc72c5c324422e7',
      platform: 'CPU',
    },
    {
      username: 'GeForce RTX 3070',
      jobId: '123891h12as118883j',
      finishedTime: 'Aug 02, 2024 10:00:02 UTC',
      rewardPoints: '888,888,888.88',
      txHash: '0xc72c5c324422e7',
      platform: 'CPU',
    },
    {
      username: 'GeForce RTX 4090',
      jobId: '123891h12as118883j',
      finishedTime: 'Aug 02, 2024 10:00:02 UTC',
      rewardPoints: '888,888,888.88',
      txHash: '0xc72c5c324422e7',
      platform: 'CPU',
    },
    {
      username: 'GeForce RTX 4090',
      jobId: '123891h12as118883j',
      finishedTime: 'Aug 02, 2024 10:00:02 UTC',
      rewardPoints: '888,888,888.88',
      txHash: '0xc72c5c324422e7',
      platform: 'CPU',
    },
    {
      username: 'GeForce RTX 4090',
      jobId: '123891h12as118883j',
      finishedTime: 'Aug 02, 2024 10:00:02 UTC',
      rewardPoints: '888,888,888.88',
      txHash: '0xc72c5c324422e7',
      platform: 'CPU',
    },
    {
      username: 'GeForce RTX 4090',
      jobId: '123891h12as118883j',
      finishedTime: 'Aug 02, 2024 10:00:02 UTC',
      rewardPoints: '888,888,888.88',
      txHash: '0xc72c5c324422e7',
      platform: 'CPU',
    },
  ]);
  const [ranking, setRanking] = useState([]);

  useEffect(() => {
    getRaking();
    getPointsList();
  }, []);

  const getRaking = async () => {
    const res = await fetchUserCreditsInfo();
    setRanking(
      res.data || [
        {
          type: 'daily',
          title: 'Daily Rank',
          rankingList: [
            { userName: 'User Name', total: 230881290 },
            { userName: 'User Name', total: 220881290 },
            { userName: 'User Name', total: 210881290 },
          ],
        },
        {
          type: 'total',
          title: 'Total Rank',
          rankingList: [
            { userName: 'User Name', total: 430881290 },
            { userName: 'User Name', total: 420881290 },
            { userName: 'User Name', total: 410881290 },
          ],
        },
        {
          type: 'month',
          title: 'Month Rank',
          rankingList: [
            { userName: 'User Name', total: 330881290 },
            { userName: 'User Name', total: 320881290 },
            { userName: 'User Name', total: 310881290 },
          ],
        },
      ],
    );
  };

  const getPointsList = async (values) => {
    const params = { ...query, ...values };
    setLoading(true);
    const res = await fetchUserCreditsInfo(params);
    setLoading(false);
    setQuery(params);
    setTotal(res.total || 100);
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
          {ranking.map((item) => (
            <div
              className={styles['ranking-info']}
              style={renderBackgroudImg(ranking_bg)}
            >
              <div className={styles['title']}>
                <span>{item.title}</span>
              </div>
              <div className={styles['list']}>
                {item.rankingList.map((rankingItem, index) => (
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
              getPointsList({ current: page });
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Points;
