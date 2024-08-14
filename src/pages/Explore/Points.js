import first from '@/assets/images/explore/first.png';
import second from '@/assets/images/explore/second.png';
import '@/assets/images/explore/statistic_bg.png';
import third from '@/assets/images/explore/third.png';
import line_charts from '@/assets/images/explore/line_charts.png';
import total_bg from '@/assets/images/explore/total_bg.png';
import ranking_bg from '@/assets/images/explore/ranking_bg.png';
import table_bg from '@/assets/images/explore/table_bg.png';
import { ConfigProvider, Table, Pagination } from 'antd';
import { useEffect, useState } from 'react';
import JactionEmpty from '../../components/JactionEmpty';
import { fetchUserCreditsInfo } from '../../services/explore/point';
import styles from './main.less';
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
      username: 'GeForce RTX 3080',
      type: 'nvidia',
      price: '2338/hr',
    },
    {
      username: 'GeForce RTX 3090',
      type: 'nvidia',
      price: '1002/hr',
    },
    {
      username: 'M2 MAX',
      type: 'macos',
      price: '784/hr',
    },
    {
      username: 'GeForce RTX 3070',
      type: 'nvidia',
      price: '448/hr',
    },
    {
      username: 'GeForce RTX 4090',
      type: 'nvidia',
      price: '128/hr',
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
          title: 'daily Rank',
          rankingList: [
            { userName: 'User Name', total: 230881290 },
            { userName: 'User Name', total: 220881290 },
            { userName: 'User Name', total: 210881290 },
          ],
        },
        {
          type: 'total',
          title: 'total Rank',
          rankingList: [
            { userName: 'User Name', total: 430881290 },
            { userName: 'User Name', total: 420881290 },
            { userName: 'User Name', total: 410881290 },
          ],
        },
        {
          type: 'month',
          title: 'month Rank',
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
      dataIndex: 'type',
    },
    {
      title: 'Finished Time',
      dataIndex: 'price',
    },
    {
      title: 'Reward Points',
      dataIndex: 'chipOrGpu',
    },
    {
      title: 'Tx Hash',
      dataIndex: 'chipOrGpu',
    },
    {
      title: 'Platform',
      dataIndex: 'chipOrGpu',
    },
  ];

  return (
    <div className={styles['points-wrapper']}>
      <div className={[styles['wrapper'], styles['ranking-wrapper']].join(' ')}>
        <h1>Put title here...</h1>
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
          <h1>Put title here...</h1>
          <div className={styles['total']} style={renderBackgroudImg(total_bg)}>
            <div className="df ai_c">
              <img src={line_charts} alt="" />
              <span className={styles['name']}>Total Points</span>
              <span className={styles['value']}>112,893 +</span>
            </div>
          </div>
        </div>
        <div className={styles['content']} style={renderBackgroudImg(table_bg)}>
          <ConfigProvider renderEmpty={() => <JactionEmpty />}>
            <Table
              loading={loading}
              columns={columns}
              dataSource={pointsList}
              pagination={false}
            ></Table>
          </ConfigProvider>
        </div>
        <div className={styles['pagination-wrapper']}>
          <Pagination
            current={query?.current}
            size={query?.size}
            total={total}
            showLessItems
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
