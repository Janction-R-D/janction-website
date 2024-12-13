import JanctionCard from '@/components/JanctionCard';
import JanctionTable from '@/components/JanctionTable';
import { Col, Form, message, Row, Space } from 'antd';
import { useState } from 'react';
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

const Root = (props) => {
  const [editVisible, setEditVisible] = useState(false);
  const [record, setRecord] = useState();
  const [form] = Form.useForm();

  const [statisticData, setStatisticData] = useState({
    ntf_number: 1200,
    miner_number: 850,
    total_points_earned: 15000000,
    miner_sales_revenue: 12000,
    transaction_fee_revenue: 15000000.12,
  });
  const [payDetailVisible, setPayDetailVisible] = useState(false);
  const [splitVisible, setSplitVisible] = useState(false);
  const [codeManageVisible, setCodeManageVisible] = useState(false);
  const [invitedUserVisible, setInvitedUserVisible] = useState(false);

  const onOk = () => {
    const values = form.getFieldsValue();
    alert(JSON.stringify(values));
    message.success('edit success!');
  };

  const columns = [
    {
      title: 'Primary inviter',
      dataIndex: 'name',
    },
    {
      title: 'Number of guests',
      dataIndex: 'guestsNumber',
    },
    {
      title: 'Address',
      dataIndex: 'address',
    },
    {
      title: 'Action',
      dataIndex: '',
      key: 'x',
      render: (text, rowData) => (
        <a
          onClick={() => {
            setRecord(rowData);
            setPayDetailVisible(true);
          }}
        >
          Detail
        </a>
      ),
    },
  ];
  const columns2 = [
    {
      title: 'Primary inviter',
      dataIndex: 'name',
    },
    {
      title: 'Number of guests',
      dataIndex: 'guestsNumber',
    },
    {
      title: 'Address',
      dataIndex: 'address',
    },
    {
      title: 'Action',
      dataIndex: '',
      key: 'x',
      render: (text, rowData) => (
        <Space>
          <a
            onClick={() => {
              setRecord(rowData);
              setSplitVisible(true);
            }}
          >
            split settings
          </a>
          <a
            onClick={() => {
              setRecord(rowData);
              setInvitedUserVisible(true);
            }}
          >
            invited user
          </a>
          <a
            onClick={() => {
              setRecord(rowData);
              setCodeManageVisible(true);
            }}
          >
            Invitation code management
          </a>
        </Space>
      ),
    },
  ];

  return (
    <div className={styles['root-container']}>
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
                  dataSource={data}
                  columns={columns}
                  pagination={false}
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
              dataSource={data}
              columns={columns2}
              pagination={false}
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

export default Root;
