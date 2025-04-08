import JanctionTable from '@/components/JanctionTable';
import numeral from 'numeral';
import { useEffect, useState } from 'react';
import { history } from 'umi';
import Line from './components/Line';
import { newsData } from './data';
import useLesses from './Hooks/useLesses';
import styles from './index.less';
import News from './components/News';
import Invitation from './components/Invitation';
import ModalUpload from './components/UploadCard/ModalUpload';
import { fetchUserConfig } from '@/services/genesis';

const brandDetails = {
  apple: { icon: 'macos', color: 'white' },
  linux: { icon: 'linux', color: 'white' },
  nvidia: { icon: 'nvidia', color: 'green' },
  windows: { icon: 'windows', color: 'white' },
  android: { icon: 'android', color: 'green' },
  intel: { icon: 'intel', color: 'blue' },
  amd: { icon: 'amd', color: 'green' },
};
const Lessees = (props) => {
  const [news, setNews] = useState(newsData);
  const [avModalOpen, setAvModaOpen] = useState(false);
  const [userConf, setUserConf] = useState({});
  const { lessesData } = useLesses();
  const { portfolio_balance: balance, details, watchlist } = lessesData || {};

  const detailsData = details?.map((item, index) => ({
    key: index,
    Name: item?.name,
    Balance: item?.balance,
    Price: item?.price,
    Allocation: item?.allocation,
    Brand: item?.brand?.toLowerCase(),
    Description: item?.description,
    PriceChanges: item?.price_changes,
  }));
  const watchlistData = watchlist?.map((item, index) => ({
    key: index,
    Name: item?.name,
    Balance: item?.balance,
    MarketCap: item?.market_cap,
    Change: item?.change,
    Brand: item?.brand?.toLowerCase(),
    Description: item?.description,
    nodeId: item?.id,
  }));

  const onBuy = (rowData) => {
    if (!rowData.MarketCap) return;
    history.push('/genesis/purchase', {
      isQuick: true,
      nodeId: rowData.nodeId,
      path: history.location.pathname,
    });
  };

  const handleOk = () => {
    setAvModaOpen(true);
  };
  useEffect(() => {
    getUserConfig();
  }, []);
  const getUserConfig = async () => {
    try {
      const res = await fetchUserConfig();
      setUserConf(res);
      if (!res?.default_avatar_status && res?.pass_newbie_guide) {
        setAvModaOpen(true);
      }
    } catch (err) {
      console.log(err);
    }
  };
  const detailColumns = [
    {
      title: 'Name',
      dataIndex: 'Name',
      key: 'Name',
      render: (text, record) => {
        if (!text) return '--';
        const name = text.split(' ');
        let firstName = name[0];
        let model = name?.slice(1)?.join(' ');
        return (
          <div className={styles['name-column']}>
            <div className={styles['icon']}>
              {brandDetails[record.Brand] && (
                <i
                  className={`iconfont icon-${
                    brandDetails[record.Brand.toLowerCase()].icon
                  } ${brandDetails[record.Brand].color}`}
                ></i>
              )}
            </div>
            <div className={styles['info']}>
              <span className={styles['name']}>{firstName.toUpperCase()}</span>
              <span className={styles['value']}>{model.toUpperCase()}</span>
            </div>
          </div>
        );
      },
    },
    {
      title: 'Purchase price',
      dataIndex: 'Balance',
      key: 'Balance',
      render: (text, record) => {
        return (
          <div className={styles['info']}>
            {/* <span className={styles['name']}>{record.Balance}</span> */}
            <span className={(styles['value'], styles['white'])}>
              ${`${record.Allocation}${record.unit || ''}`}
            </span>
          </div>
        );
      },
    },
    {
      title: 'Rental price',
      dataIndex: 'Price',
      render: (text, record) => {
        return (
          <div className={styles['info']}>
            <span className={styles['name']}>
              {numeral(text || 0).format('$0.00')}
            </span>
            <span
              className={
                record.PriceChanges > 0 ? styles['up'] : styles['down']
              }
            >
              {`${record.PriceChanges > 0 ? '+' : ''}${numeral(
                record.PriceChanges || 0,
              ).format('0,0')}`}
              %
            </span>
          </div>
        );
      },
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
      render: (text, record) => {
        if (!text) return '--';
        const name = text?.split(' ');
        let firstName = name?.[0];
        let model = name?.slice(1).join(' ');

        return (
          <div className={styles['name-column-2']}>
            <div className={styles['icon-2']}>
              {brandDetails[record.Brand] && (
                <i
                  className={`iconfont icon-${
                    brandDetails[record.Brand].icon
                  } ${brandDetails[record.Brand].color}`}
                ></i>
              )}
            </div>
            <div className={styles['info']}>
              <span className={styles['name']}>{firstName}</span>
              <span className={styles['value']}>{model?.toUpperCase()}</span>
            </div>
          </div>
        );
      },
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
      render: (text, rowData, index) => (
        <div
          className={[
            styles['action'],
            !rowData.MarketCap && styles['disabled'],
            ,
          ].join(' ')}
          onClick={() => onBuy(rowData)}
        >
          <span>Buy</span>
          <i className="iconfont icon-next_page"></i>
        </div>
      ),
    },
  ];

  return (
    <div className={styles['dashboard-wrapper']}>
      {/* <Invite /> */}
      <Invitation />
      <ModalUpload
        avModalOpen={avModalOpen}
        handleOk={handleOk}
        setAvModaOpen={setAvModaOpen}
        userConf={userConf}
        setUserConf={setUserConf}
      />
      <div id="thank-you"></div>
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
        <News />
        <div
          className={[styles['content-item'], styles['recommend-wrapper']].join(
            ' ',
          )}
        >
          <div className={styles['title']}>
            <span>Details</span>
            {/* <div className={styles['extra']}>
              <span>See All</span>
              <i className="iconfont icon-next_page"></i>
            </div> */}
          </div>
          <div className={styles['content']}>
            <JanctionTable
              bordered={false}
              className={styles['table']}
              columns={detailColumns}
              dataSource={detailsData}
              pagination={false}
              scroll={{ x: 'auto' }}
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
            {/* <div className={styles['extra']}>
              <span>See All</span>
              <i className="iconfont icon-next_page"></i>
            </div> */}
          </div>
          <div className={styles['content']}>
            <JanctionTable
              bordered={false}
              className={styles['table-2']}
              columns={watchColumns}
              dataSource={watchlistData}
              pagination={false}
              scroll={{ x: 'auto' }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Lessees;
