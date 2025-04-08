import JanctionCard from '@/components/JanctionCard';
import JanctionTable from '@/components/JanctionTable';
import {
  renderTableActionBar,
  renderTableColumns,
} from '@/components/JanctionTable/column';
import {
  fetchInviterList,
  fetchInviterNameUpdate,
  fetchNFTData,
  fetchPaymentHistory,
} from '@/services/root';
import { DATE_FORMAT_TYPE } from '@/utils/datetime';
import { Col, message, Row } from 'antd';
import { useEffect, useRef, useState } from 'react';
import { history } from 'umi';
import GenerateCode from './components/GenerateCode';
import InvitedUser from './components/InvitedUser';
import LabelValue from './components/LabelValue';
import ParameterSetting from './components/ParameterSetting';
import PasswordToggle from './components/PasswordToggle';
import PayDetail from './components/PayDetail';
import SplitRatioSetting from './components/SplitRatioSetting';
import StatisticCard from './components/StatisticCard';
import styles from './index.less';
import ModifyModal from './components/ModifyModal';

const Root = (props) => {
  const [record, setRecord] = useState();
  const timer = useRef();

  const [statisticData, setStatisticData] = useState();
  const [configData, setConfigData] = useState();
  const [payDetailVisible, setPayDetailVisible] = useState(false);
  const [invitedUserVisible, setInvitedUserVisible] = useState(false);
  const [psQuery, setPsQuery] = useState({ offset: 0, limit: 10 });
  const [psPage, setPsPage] = useState({ offset: 0, limit: 10 });
  const [paymentHistory, setPaymentHistory] = useState([]);
  const [paymentHistoryLoading, setPaymentHistoryLoading] = useState(false);
  const [inviterQuery, setInviterQuery] = useState({ offset: 0, limit: 10 });
  const [inviterPage, setInviterPage] = useState({ offset: 0, limit: 10 });
  const [inviterList, setInviterList] = useState([]);
  const [inviterLoading, setInviterLoading] = useState(false);
  const [splitVisible, setSplitVisible] = useState(false);
  const [inviterEdit, setInviterEdit] = useState(false);

  useEffect(() => {
    fetchData();
    if (timer.current) {
      clearInterval(timer.current);
    }
    timer.current = setInterval(() => {
      fetchData();
    }, 1000 * 10);
    return () => {
      clearInterval(timer.current);
    };
  }, []);
  const fetchData = () => {
    getNFTData();
    getPaymentHistory();
    getInviterList();
  };
  const getNFTData = async () => {
    try {
      const res = await fetchNFTData();
      dataHandle(res);
    } catch (err) {
      console.log('『err』', err);
    }
  };
  const dataHandle = (data) => {
    const { this_week, last_week, config } = data || {};
    setConfigData(config);
    if (!this_week) return;
    const handleData = {};
    Object.keys(this_week).map((item) => {
      const thisWeek = this_week[item] || 0;
      const lastWeek = last_week?.[item] || 0;
      handleData[item] = {
        value: this_week[item],
        rate: lastWeek ? (thisWeek - lastWeek) / lastWeek : thisWeek ? 1 : 0,
      };
    });
    setStatisticData(handleData);
  };
  const getPaymentHistory = async (params = {}) => {
    try {
      setPaymentHistoryLoading(true);
      const _query = { ...psQuery, ...params };
      const res = await fetchPaymentHistory(_query);
      const { items, ...extra } = res || {};
      setPaymentHistory(items || []);
      setPsPage({ ...(extra || {}), page: (_query?.offset || 0) / 10 });
      setPsQuery(_query);
      setPaymentHistoryLoading(false);
    } catch (err) {
      setPaymentHistoryLoading(false);
      console.log('『err』', err);
    }
  };

  const getInviterList = async (params = {}) => {
    try {
      setInviterLoading(true);
      const _query = { ...inviterQuery, ...params };
      const res = await fetchInviterList(_query);
      const { items, ...extra } = res || {};

      setInviterList(items || []);
      setInviterPage({ ...(extra || {}), page: (_query?.offset || 0) / 10 });
      setInviterQuery(_query);
      setInviterLoading(false);
    } catch (err) {
      setInviterLoading(false);
      console.log('『err』', err);
    }
  };

  const columns = [
    renderTableColumns('Miner ID', 'miner_id', { copy: true }),
    renderTableColumns('Transaction', 'transaction'),
    renderTableColumns('Payment Time', 'payment_time', {
      type: 'date',
      format: DATE_FORMAT_TYPE.YMDHMS,
    }),
    renderTableColumns('User Address', 'user_address'),
    renderTableColumns('Transaction Amount', 'transaction_amount'),
    renderTableColumns('Receiving Address', 'receiving_address', {
      copy: true,
    }),
    renderTableActionBar([
      {
        name: 'Detail',
        onClick: (rowData) => {
          setRecord(rowData);
          setPayDetailVisible(true);
        },
      },
    ]),
  ];

  const updateInviterName = async (params, rowData) => {
    try {
      await fetchInviterNameUpdate({
        ...params,
        inviter: rowData.inviter,
      });
      message.success('Update success!');
      getInviterList();
    } catch (err) {
      console.log('『err』', err);
      throw Error(err);
    }
  };

  const columns2 = [
    renderTableColumns('Inviter Address', 'inviter_address', { copy: true }),
    renderTableColumns('Inviter Name', 'inviter_name', { copy: true }),
    renderTableColumns('Inviter Code', 'code', {
      copy: true,
      copyTextRender: (code) => {
        const origin = location.origin;
        return `${origin}/home?inviterCode=${code}`;
      },
    }),
    renderTableColumns('Number of Invites', 'invites_number'),
    renderTableColumns('Total NFTs Purchased by Invited', 'invited_purchased'),
    renderTableColumns('Total points Earned by lnvited', 'invited_earned'),
    renderTableActionBar([
      {
        name: 'split settings',
        onClick: (rowData) => {
          setRecord(rowData);
          setSplitVisible(true);
        },
      },
      {
        name: 'invited user',
        onClick: (rowData) => {
          setRecord(rowData);
          setInvitedUserVisible(true);
        },
      },
      {
        name: 'edit',
        onClick: (rowData) => {
          setRecord({
            title: 'Inviter Name',
            key: 'nickname',
            value: rowData.inviter_name,
            inviter: rowData.inviter_address,
          });
          setInviterEdit(true);
        },
      },
    ]),
  ];

  return (
    <div className={styles['root-container']}>
      <div className={styles['root-header']}>
        <a
          className={styles['logo']}
          onClick={() => {
            history.push('/');
          }}
        >
          <img
            src={require('@/assets/images/icons/logo_name.png')}
            alt="logo"
          />
        </a>
        <h1 className={styles['header-title']}>バックエンド管理システム</h1>
        <span></span>
      </div>
      <Row gutter={[20, 20]}>
        <Col span={24}>
          <JanctionCard title="NFT mining machine dashboard">
            <Row justify="middle" gutter={16}>
              <Col className="f1">
                <StatisticCard
                  title="Number of NFTS(Miners)."
                  value={statisticData?.nft_miners?.value}
                  increaseRate={statisticData?.nft_miners?.rate}
                  desc="Compared to last week"
                />
              </Col>
              <Col className="f1">
                <StatisticCard
                  title="Number of Miner Holders."
                  value={statisticData?.nft_miner_holders?.value}
                  increaseRate={statisticData?.nft_miner_holders?.rate}
                  desc="Compared to last week"
                />
              </Col>
              <Col className="f1">
                <StatisticCard
                  title="Total Points Earned by Holders"
                  value={statisticData?.points_earned_total?.value}
                  increaseRate={statisticData?.points_earned_total?.rate}
                  desc="Compared to last week"
                />
              </Col>
              <Col className="f1">
                <StatisticCard
                  title="Miner Sales Revenue"
                  value={statisticData?.miner_sales_revenue?.value}
                  increaseRate={statisticData?.miner_sales_revenue?.rate}
                  unit="USDT"
                  precision={2}
                  desc="Compared to last week"
                />
              </Col>
              <Col className="f1">
                <StatisticCard
                  title="Transaction Fee Revenue"
                  value={statisticData?.transaction_fee_revenue?.value}
                  increaseRate={statisticData?.transaction_fee_revenue?.rate}
                  unit="USDT"
                  precision={2}
                  desc="Compared to last week"
                />
              </Col>
            </Row>
          </JanctionCard>
        </Col>
        <Col span={24}>
          <Row gutter={20}>
            <Col span={16} className="hp100">
              <JanctionCard
                title="Payment history"
                divider
                className={styles['payment-history']}
              >
                <JanctionTable
                  size="small"
                  // search
                  bordered
                  // loading={paymentHistoryLoading}
                  dataSource={paymentHistory}
                  columns={columns}
                  scroll={{ x: 'max-content' }}
                  pagination={{
                    position: ['bottomCenter'],
                    current: psPage?.page || 1,
                    total: psPage?.total || 0,
                    onChange: (page, pageSize) => {
                      getPaymentHistory({ offset: page * 10 });
                    },
                  }}
                />
              </JanctionCard>
            </Col>
            <Col span={8}>
              <Row gutter={[20, 20]} className="fd_c">
                <Col span={24} className="f1">
                  <ParameterSetting
                    onUpdate={getNFTData}
                    configData={configData}
                  />
                </Col>
                <Col span={24} className="f1">
                  <JanctionCard title="Password management" divider>
                    <LabelValue title="Password：">
                      <PasswordToggle />
                    </LabelValue>
                  </JanctionCard>
                </Col>
                <Col span={24} className="f1">
                  <JanctionCard
                    title="Generate level 1 inviter invitation code"
                    divider
                  >
                    <GenerateCode
                      onUpdate={() => getInviterList({ offset: 0 })}
                    />
                  </JanctionCard>
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>
        <Col span={24}>
          <JanctionCard title="Level 1  inviter management" divider>
            <JanctionTable
              // loading={inviterLoading}
              size="small"
              bordered
              dataSource={inviterList}
              columns={columns2}
              scroll={{ x: 'max-content' }}
              pagination={{
                position: ['bottomCenter'],
                current: inviterPage?.page || 1,
                total: inviterPage?.total || 0,
                onChange: (page, pageSize) => {
                  getInviterList({ offset: page * 10 });
                },
              }}
            />
          </JanctionCard>
        </Col>
      </Row>
      {payDetailVisible && (
        <PayDetail
          visible={payDetailVisible}
          record={record}
          onCancel={() => {
            setPayDetailVisible(false);
            setRecord();
          }}
        />
      )}
      {invitedUserVisible && (
        <InvitedUser
          visible={invitedUserVisible}
          record={record}
          onCancel={() => {
            setInvitedUserVisible(false);
            setRecord();
          }}
        />
      )}
      {splitVisible && (
        <SplitRatioSetting
          visible={splitVisible}
          record={record}
          onCancel={() => {
            setSplitVisible(false);
            setRecord();
          }}
          onSuccess={getInviterList}
        />
      )}
      {inviterEdit && (
        <ModifyModal
          title="Edit Inviter"
          visible={inviterEdit}
          record={record}
          onCancel={() => {
            setInviterEdit(false);
            setRecord();
          }}
          onOk={updateInviterName}
        />
      )}
    </div>
  );
};

Root.wrappers = ['@/wrappers/rootAuth'];
export default Root;
