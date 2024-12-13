import JanctionModal from '@/components/JanctionModal';
import LabelValue from './LabelValue';
import styles from './index.less';

const PayDetail = (props) => {
  const { visible, onCancel, record } = props;

  return (
    <JanctionModal
      open={visible}
      title={`Payment Detail：${record?.id}`}
      centered
      width={706}
      onCancel={onCancel}
      cancelText="Close"
      footerCenter
    >
      <div className={styles['pay-detail']}>
        <LabelValue title="Payment time：" value="2024-12-10 14:24" />
        <LabelValue
          title="The amount of the transaction："
          value="0x1234567890ABCDEF1234567890ABCDEF12345678"
        />
        <LabelValue
          title="The amount of the transaction："
          value="0.5"
          unit="USDT"
        />
        <LabelValue
          title="Receiving address："
          value="0x1234567890ABCDEF1234567890ABCDEF12345678"
        />
        <LabelValue title="Transaction status：" value="Done" />
        <LabelValue title="Commission charge :" value="0.5" unit="USDT" />
        <LabelValue title="Miner ID：" value="324543454" />
        <LabelValue
          title="Transaction hash："
          value="0x1234567890ABCDEF1234567890ABCDEF12345678"
        />
      </div>
    </JanctionModal>
  );
};

export default PayDetail;
