import buy from '@/assets/images/genesis/buy.png';
import {
  fetchInviteAccept,
  fetchInviteVerify,
  fetchLessor,
  fetchPaymentUpdate,
} from '@/services/genesis';
import { fetchBeneficiary } from '@/services/genesis/distribution';
import contract from '@/utils/contracts';
import { Button, Input, message, Modal } from 'antd';
import numeral from 'numeral';
import { useEffect, useState } from 'react';
import { history } from 'umi';
import { useAccount } from 'wagmi';
import styles from './node.less';
import dayjs from 'dayjs';
import { delay, showValue } from '@/utils/lang';
import { ethers } from 'ethers';
import { SwiperImg } from '../../Dashboard/components/Cards';

export default function BuyNode({ mineCode, inviterCode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isComming, setIsComming] = useState(false);
  const [isPay, setIsPay] = useState(false);
  const [price, setPrice] = useState(0);
  const [addressList, setAddressList] = useState([]);
  const [benefitList, setBenefitList] = useState([]);

  const { address } = useAccount();

  useEffect(() => {
    if (!isOpen) return;
    getPrice();
  }, [isOpen]);
  const getPrice = async () => {
    try {
      const res = await fetchBeneficiary();
      if (res?.code == 40411) return;
      const beneficiaryAddress = (res?.split || []).map(
        (item) => item.receive_address,
      );
      const beneficiaryBenefit = (res?.split || []).map((item) => item.ammount);
      setPrice(res?.node_price);
      setAddressList(beneficiaryAddress);
      setBenefitList(beneficiaryBenefit);
    } catch (err) {
      console.log('『err』', err);
    }
  };

  const onBuy = async () => {
    if (address) {
      if (mineCode && !inviterCode) {
        setIsOpen(true);
        return;
      }
      await onVerifyCode();
      return;
    }
    history.push(`/login?inviterCode=${inviterCode}`, { inviterCode });
  };
  const onVerifyCode = async () => {
    try {
      // Verify Inviter Code
      const res = await fetchInviteVerify(inviterCode);
      if (res?.code == 40012 || !res?.inviter) throw Error(res?.error);
      await onBind();
    } catch (verifyError) {
      message.warning('Invalid Code', 2);
      setTimeout(() => {
        history.push(`/home?inviterCode=${inviterCode}`);
      }, 2000);
    }
  };
  const onBind = async () => {
    const data = {
      receive_address: address,
      code: inviterCode,
    };
    try {
      // Bind invitation code
      const res = await fetchInviteAccept(data);
      // 40310: already accept another invitation
      if (res?.code != 40310) {
        message.success(
          'Wallet address invitation relationship bound successfully.',
        );
      }
    } catch (bindError) {
      console.log('『bindError』', bindError);
    }
    setIsOpen(true);
  };

  const handleCancel = () => {
    setIsOpen(false);
  };

  const handleBuyNowOk = (count) => {
    setTimeout(() => {
      setIsComming(true);
    }, 500);

    setIsOpen(false);
  };

  const handlePay = async (num) => {
    try {
      const totalAmount = price * num;
      const tx = await contract.distribute(
        address,
        ethers.utils.parseUnits(`${totalAmount}`, 6),
        addressList,
        benefitList,
      );
      await fetchPaymentUpdate({ tx_hash: tx.hash });
      setIsOpen(false);
      setTimeout(() => {
        setIsPay(true);
      }, 500);
    } catch (err) {
      console.log('『err』', err);
      message.error('Failed to pay, please try again later.');
    }
  };
  const handleCancelPay = () => {
    setIsPay(false);
  };

  return (
    <>
      <div className={styles['btn']} onClick={onBuy}>
        Buy Now!
      </div>

      <BuyNow
        open={isOpen}
        price={price}
        handleOk={handlePay}
        handleCancel={handleCancel}
      />

      <CommingSoon
        open={isComming}
        handleCancel={() => {
          setIsComming(false);
        }}
      />

      <PayCard
        open={isPay}
        setIsPay={setIsPay}
        handleCancel={handleCancelPay}
      />
    </>
  );
}

function BuyNow({ open, price, handleCancel, handleOk }) {
  const [qty, setQty] = useState(1);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setQty(e.target.value);
  };
  const handleAdd = () => {
    setQty(qty + 1);
  };
  const handleDiff = () => {
    if (qty <= 1) return;
    setQty(qty - 1);
  };

  return (
    <Modal
      open={open}
      onCancel={handleCancel}
      className={styles['modal']}
      width={900}
      footer={false}
    >
      <div className={styles['modal-img']}>
        <img src={buy} />
      </div>
      <section className={styles['modal-info']}>
        <div>
          <h2>Buy Janction Node</h2>
          <p>
            After purchasing this NFT, participate in the network of computing
            power providers!
          </p>
        </div>
        <div className={styles['input-box']}>
          <p>
            <i className="iconfont icon-my-nodes"></i>
            {`${numeral(price).format('0,0')} USDT`}
          </p>
          <div className={styles['input-box-container']}>
            <Button className={styles['input-btn']} onClick={handleDiff}>
              -
            </Button>
            <Input type="number" value={qty} min={1} onChange={handleChange} />
            <Button className={styles['input-btn']} onClick={handleAdd}>
              +
            </Button>
          </div>
        </div>

        <div>
          <Button
            disabled={!price}
            loading={loading}
            className={styles['buy-btn']}
            onClick={async () => {
              if (loading) return;
              setLoading(true);
              await handleOk(qty);
              setLoading(false);
            }}
          >
            Click to pay
          </Button>

          <p className={styles['text-grey']}>
            Surrender your rights, <span>Enter immediately</span>
          </p>
        </div>
      </section>
    </Modal>
  );
}

function CommingSoon({ open, handleCancel }) {
  return (
    <Modal
      open={open}
      onCancel={handleCancel}
      className={styles['modal']}
      width={900}
      footer={false}
    >
      <div className={styles['modal-img']}>
        <img src={buy} />
      </div>
      <section className={styles['modal-info']}>
        <h2 style={{ textAlign: 'center' }}>Comming soon...</h2>
      </section>
    </Modal>
  );
}

function PayCard({ open, handleCancel }) {
  const [detail, setDetail] = useState();

  useEffect(() => {
    if (!open) return;
    getLatestData();
  }, [open]);
  const getLatestData = async () => {
    try {
      const res = await fetchLessor();
      const data = res?.nft_summary?.detail || [];
      const latestData = data.reduce((latest, current) => {
        return dayjs(current.time).isAfter(dayjs(latest.time))
          ? current
          : latest;
      });
      setDetail(latestData);
    } catch (err) {
      console.log('『err』', err);
      return null;
    }
  };

  return (
    <Modal
      open={open}
      onCancel={handleCancel}
      className={styles['modal-purchase']}
      width={900}
      footer={false}
    >
      <div className={styles['modal-img']}>
        <SwiperImg item={detail} />
        <section>
          <p>
            <i className="iconfont icon-list"></i> Details
          </p>
          <ul>
            <li>
              <p>Status:</p>
              <p>{detail ? 'Complete' : 'Not found'}</p>
            </li>
            <li>
              <p>Transaction Hash:</p>
              <p title={detail?.transaction_hash}>
                {showValue(detail?.transaction_hash)}
              </p>
            </li>
            <li>
              <p>ID:</p>
              <p title={detail?.token_id}>{showValue(detail?.token_id)}</p>
            </li>
            <li>
              <p>Contract address:</p>
              <p title={detail?.contract}>{showValue(detail?.contract)}</p>
            </li>
          </ul>
        </section>
      </div>
      <section className={styles['modal-info']}>
        <h2>Your purchase has been processed! </h2>
        <p>Congratulations on joining the Janction Contributor Network!</p>

        <div>
          <Button
            className={styles['buy-btn']}
            onClick={async () => {
              message.loading({ content: 'Loading...', duration: 1 });
              await delay(1000);
              history.push('/genesis/dashboard');
            }}
          >
            Check rewards
          </Button>
        </div>
      </section>
    </Modal>
  );
}
