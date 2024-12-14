import JanctionCard from '@/components/JanctionCard';
import JanctionTable from '@/components/JanctionTable';
import { Col, Form, message, Row, Space } from 'antd';
import { useEffect, useState } from 'react';
import GenerateCode from './components/GenerateCode';
import LabelValue from './components/LabelValue';
import ParameterSetting from './components/ParameterSetting';
import PasswordToggle from './components/PasswordToggle';
import StatisticCard from './components/StatisticCard';
import data from './data.json';
import styles from './index.less';
import PayDetail from './components/PayDetail';
import SplitRatioSetting from './components/SplitRatioSetting';
import InvitedUser from './components/InvitedUser';
import CodeManage from './components/CodeManage';
import {
  renderTableActionBar,
  renderTableColumns,
} from '@/components/JanctionTable/column';
import { history } from 'umi';
import {
  fetchInviterList,
  fetchNFTStatistic,
  fetchPaymentHistory,
} from '@/services/root';

const Root = (props) => {
  const [editVisible, setEditVisible] = useState(false);
  const [record, setRecord] = useState();
  const [form] = Form.useForm();

  const [statisticData, setStatisticData] = useState({
    ntf_number: 1200,
    miner_number: 850,
    total_points_earned: 15000000,
    miner_sales_revenue: 12000,
    transaction_fee_revenue: 150000.12,
  });
  const [payDetailVisible, setPayDetailVisible] = useState(false);
  const [splitVisible, setSplitVisible] = useState(false);
  const [codeManageVisible, setCodeManageVisible] = useState(false);
  const [invitedUserVisible, setInvitedUserVisible] = useState(false);
  const [paymentHistory, setPaymentHistory] = useState([]);
  const [paymentHistoryLoading, setPaymentHistoryLoading] = useState(false);
  const [inviterList, setInviterList] = useState([]);
  const [inviterLoading, setInviterLoading] = useState(false);

  useEffect(() => {
    getNFTStatistic();
    getPaymentHistory();
    getInviterList();
  }, []);
  const getNFTStatistic = async () => {
    try {
      const res = await fetchNFTStatistic();
      setStatisticData(res || {});
    } catch (err) {
      console.log('『err』', err);
    }
  };
  const getPaymentHistory = async () => {
    try {
      setPaymentHistoryLoading(true);
      const res = await fetchPaymentHistory();
      setPaymentHistory(res || []);
      setPaymentHistoryLoading(false);
    } catch (err) {
      setPaymentHistoryLoading(false);
      console.log('『err』', err);
    }
  };
  const getInviterList = async () => {
    try {
      setInviterLoading(true);
      const res = await fetchInviterList();
      setInviterList(res || []);
      setInviterLoading(false);
    } catch (err) {
      setInviterLoading(false);
      console.log('『err』', err);
    }
  };

  const columns = [
    renderTableColumns('Miner ID', 'name', { copy: true }),
    renderTableColumns('Transaction', 'name'),
    renderTableColumns('Payment Time', 'name'),
    renderTableColumns('User Address', 'name'),
    renderTableColumns('Transaction Amount', 'name'),
    renderTableColumns('Receiving Address', 'name', { copy: true }),
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
  const columns2 = [
    renderTableColumns('Inviter Address', 'name', { copy: true }),
    renderTableColumns('Inviter Name', 'name', { copy: true }),
    renderTableColumns('Number of Invites', 'name'),
    renderTableColumns('Total NFTs Purchased by Invited', 'name'),
    renderTableColumns('Total points Earned by lnvited', 'guestsNumber'),
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
        name: 'Invitation code management',
        onClick: (rowData) => {
          setRecord(rowData);
          setCodeManageVisible(true);
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
                  value={statisticData?.ntf_number}
                  desc="Compared to last week"
                />
              </Col>
              <Col className="f1">
                <StatisticCard
                  title="Number of Miner Holders."
                  value={statisticData?.miner_number}
                  desc="Compared to last week"
                />
              </Col>
              <Col className="f1">
                <StatisticCard
                  title="Total Points Earned by Holders"
                  value={statisticData?.total_points_earned}
                  desc="Compared to last week"
                />
              </Col>
              <Col className="f1">
                <StatisticCard
                  title="Miner Sales Revenue"
                  value={statisticData?.miner_sales_revenue}
                  unit="USDT"
                  precision={2}
                  desc="Compared to last week"
                />
              </Col>
              <Col className="f1">
                <StatisticCard
                  title="Transaction Fee Revenue"
                  value={statisticData?.transaction_fee_revenue}
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
            <Col span={16}>
              <JanctionCard title="Payment history" divider>
                <JanctionTable
                  size="small"
                  search
                  bordered
                  loading={paymentHistoryLoading}
                  dataSource={data}
                  columns={columns}
                  pagination={{ position: ['bottomCenter'] }}
                />
              </JanctionCard>
            </Col>
            <Col span={8}>
              <Row gutter={[20, 20]} className="fd_c">
                <Col span={24} className="f1">
                  <ParameterSetting />
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
                    <GenerateCode />
                  </JanctionCard>
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>
        <Col span={24}>
          <JanctionCard title="Level 1  inviter management" divider>
            <JanctionTable
              loading={inviterLoading}
              size="small"
              bordered
              dataSource={data}
              columns={columns2}
              pagination={{ position: ['bottomCenter'] }}
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
      {codeManageVisible && (
        <CodeManage
          visible={codeManageVisible}
          record={record}
          onCancel={() => {
            setCodeManageVisible(false);
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
    </div>
  );
};

Root.wrappers = ['@/wrappers/rootAuth'];
export default Root;
