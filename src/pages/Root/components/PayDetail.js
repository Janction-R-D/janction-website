import JanctionModal from '@/components/JanctionModal';
import LabelValue from './LabelValue';
import styles from './index.less';

const PayDetail = (props) => {
  const { visible, onCancel, record } = props;

  return (
    <JanctionModal
      open={visible}
      title={`Payment Detail:${record?.miner_id || '~'}`}
      centered
      width={706}
      onCancel={onCancel}
      cancelText="Close"
      footerCenter
    >
      <div className={styles['pay-detail']}>
        <LabelValue title="Payment time:" value={record?.payment_time} />
        <LabelValue title="User's address:" value={record?.user_address} />
        <LabelValue
          title="The amount of the transaction:"
          value={record?.transaction_amount}
          unit="USDT"
        />
        <LabelValue
          title="Receiving address:"
          value={record?.receiving_address}
        />
        <LabelValue title="Transaction status:" value={record?.transaction} />
        <LabelValue
          title="Commission charge :"
          value={record?.commission_charge}
          unit="USDT"
        />
        <LabelValue title="Miner ID:" value={record?.miner_id} />
        <LabelValue
          title="Transaction hash:"
          value={record?.transaction_hash}
        />
      </div>
    </JanctionModal>
  );
};

export default PayDetail;
