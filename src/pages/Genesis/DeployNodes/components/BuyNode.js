import buy from '@/assets/images/genesis/buy.png';
import purchase from '@/assets/images/genesis/purchase.png';
import { ADDRESS } from '@/constant';
import { fetchBeneficiary } from '@/services/genesis/distribution';
import contract from '@/utils/contract';
import { Button, Modal } from 'antd';
import numeral from 'numeral';
import { useEffect, useState } from 'react';
import styles from './node.less';
import { history } from 'umi';
import { fetchInviteAccept } from '@/services/genesis';

export default function BuyNode({ item, initialState, inviterCode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isPay, setIsPay] = useState(false);
  const [price, setPrice] = useState(1000);
  const [addressList, setAddressList] = useState([]);
  const [benefitList, setBenefitList] = useState([]);
  const verifyUser = () => {
    if (inviterCode) {
      if (initialState?.userAccount?.address) {
        const data = {
          receive_address: initialState.userAccount.address,
          // code: '4430a4fb-bc3e-4100-a0ea-3527e8e51606',
          code: inviterCode,
        };
        console.log(data);

        return fetchInviteAccept(data)
          .then((res) => {
            console.log(res);
            setIsOpen(true);
          })
          .catch((err) => console.log(err));
      }
      history.push(`/login?inviterCode=${inviterCode}`, {
        inviterCode: inviterCode,
      });
    }
  };
  useEffect(() => {
    if (!isOpen) return;
    getPrice();
  }, [isOpen]);
  const getPrice = async () => {
    try {
      const res = await fetchBeneficiary();
      const beneficiaryAddress = (res?.split || []).map(
        (item) => item.receive_address,
      );
      const beneficiaryBenefit = (res?.split || []).map(
        (item) => (item.percentage / 100) * res?.node_price,
      );
      setPrice(res?.node_price);
      setAddressList(beneficiaryAddress);
      setBenefitList(beneficiaryBenefit);
    } catch (err) {
      console.log('『err』', err);
    }
  };

  const handleOk = () => {
    verifyUser();
  };
  const handleOkPay = () => {
    setIsPay(true);
  };
  const handleCancel = () => {
    setIsOpen(false);
  };
  const handleCancelPay = () => {
    setIsPay(false);
  };
  const handlePay = async () => {
    try {
      await contract.distribute(ADDRESS.USDT, addressList, benefitList);
      setIsOpen(false);
      setTimeout(() => {
        setIsPay(true);
      }, 500);
    } catch (err) {
      console.log('『err』', err);
    }
  };

  return (
    <>
      <div className={styles['btn']} onClick={handleOk}>
        Buy Now!
      </div>
      <PayCaard
        isPay={isPay}
        setIsPay={setIsPay}
        handleCancelPay={handleCancelPay}
        handleOkPay={handleOkPay}
      />
      <Modal
        open={isOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        className={styles['modal']}
        width={900}
        footer={false}
      >
        <div className={styles['modal-img']}>
          <img src={buy} />
        </div>
        <section className={styles['modal-info']}>
          <h2>Buy Janction Node</h2>
          <p>
            After purchasing this NFT, participate in the network of computing
            power providers!
          </p>
          <div className={styles['input-box']}>
            <i className="iconfont icon-my-nodes"></i>
            <p>{`${numeral(price).format('0,0')} USDT`}</p>
          </div>
          <div>
            <Button className={styles['buy-btn']} onClick={handlePay}>
              Click to pay
            </Button>

            <p className={styles['text-grey']}>
              Surrender your rights, <span>Enter immediately</span>
            </p>
          </div>
        </section>
      </Modal>
    </>
  );
}

function PayCaard({ isPay, setIsPay, handleCancelPay, handleOkPay }) {
  const handlePay = () => {
    setIsPay(true);
  };

  return (
    <Modal
      open={isPay}
      onOk={handleOkPay}
      onCancel={handleCancelPay}
      className={styles['modal-purchase']}
      width={900}
      footer={false}
    >
      <div className={styles['modal-img']}>
        <img src={purchase} />
        <section>
          <p>
            <i className="iconfont icon-list"></i> Details
          </p>
          <ul>
            <li>
              <p>Status:</p>
              <p>Complete</p>
            </li>
            <li>
              <p>Transaction Hash:</p>
              <p>0xe3802293</p>
            </li>
            <li>
              <p>ID:</p>
              <p>73489024hu094invm</p>
            </li>
            <li>
              <p>Contract address:</p>
              <p>4678ghrtcgmgc</p>
            </li>
          </ul>
        </section>
      </div>
      <section className={styles['modal-info']}>
        <h2>Your purchase has been processed! </h2>
        <p>Congratulations on joining the Janction Contributor Network!</p>

        <div>
          <Button className={styles['buy-btn']} onClick={handlePay}>
            Check rewards
          </Button>
        </div>
      </section>
    </Modal>
  );
}
