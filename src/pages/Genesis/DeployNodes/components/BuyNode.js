import buy from '@/assets/images/genesis/buy.png';
import purchase from '@/assets/images/genesis/purchase.png';
import { ADDRESS } from '@/constant';
import { fetchBeneficiary } from '@/services/genesis/distribution';
import contract from '@/utils/contract';
import { Button, Input, message, Modal } from 'antd';
import numeral from 'numeral';
import { useEffect, useState } from 'react';
import styles from './node.less';
import { history } from 'umi';
import { fetchInviteAccept, fetchInviteVerify } from '@/services/genesis';
import { useAccount } from 'wagmi';

export default function BuyNode({ inviterCode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isComming, setIsComming] = useState(false);
  const [isPay, setIsPay] = useState(false);
  const [price, setPrice] = useState(0);
  const [addressList, setAddressList] = useState([]);
  const [benefitList, setBenefitList] = useState([]);
  const [qty, setQty] = useState(1);

  const { address } = useAccount();

  const verifyUser = async () => {
    if (inviterCode) {
      if (address) {
        const data = {
          receive_address: address,
          code: inviterCode,
        };
        console.log(data);
        try {
          // Verify Inviter Code
          const res = await fetchInviteVerify(inviterCode);
          if (res && !res.error) {
            localStorage.setItem('inviterCode', inviterCode);
            try {
              // Bind invitation code
              await fetchInviteAccept(data);
              setIsOpen(true);
            } catch (bindError) {
              console.log(bindError);
              // message.warning('Error accepting invite', 2);
              message.warning(
                'The wallet address has been successfully linked.',
              );
            }
          } else {
            throw Error(res?.error);
          }
        } catch (verifyError) {
          message.warning('Invalid Code', 2);
          setTimeout(() => {
            console.log(verifyError);
            history.push(`/home?inviterCode=${inviterCode}`);
          }, 2000);
        }
      } else {
        history.push(`/login?inviterCode=${inviterCode}`, {
          inviterCode: inviterCode,
        });
      }
    }
  };
  useEffect(() => {
    if (!isOpen) return;
    getPrice();
  }, [isOpen]);
  const getPrice = async () => {
    try {
      const res = await fetchBeneficiary();
      if (res?.code == 40411) {
        message.warning(res.msg);
        return;
      }
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
  const handleChange = (e) => {
    setQty(e.target.value);
  };
  const handleAdd = () => {
    setQty(qty + 1);
  };
  const handleDiff = () => {
    if (qty <= 1) return;
    setQty(qty);
  };

  const handleOk = () => {
    verifyUser();
  };
  const handleOkPay = () => {
    setIsPay(true);
  };
  const handleCancel = () => {
    setQty(1);
    setIsOpen(false);
  };
  const handleCancelPay = () => {
    setIsPay(false);
  };
  const handleCancelComming = () => {
    setIsComming(false);
  };
  const handleOkComming = () => {
    setTimeout(() => {
      setIsComming(true);
    }, 500);

    setIsOpen(false);
  };

  const handlePay = async () => {
    try {
      await contract.distribute(address, price, addressList, benefitList);
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
      <CommingSoon
        isComming={isComming}
        setIsComming={setIsComming}
        handleCancelComming={handleCancelComming}
        handleOkComming={handleOkComming}
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
              <Input
                type="number"
                value={qty}
                min={1}
                onChange={handleChange}
              />
              <Button className={styles['input-btn']} onClick={handleAdd}>
                +
              </Button>
            </div>
          </div>

          <div>
            <Button className={styles['buy-btn']} onClick={handleOkComming}>
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

function CommingSoon({
  isComming,
  setIsComming,
  handleCancelComming,
  handleOkComming,
}) {
  return (
    <Modal
      open={isComming}
      onOk={handleOkComming}
      onCancel={handleCancelComming}
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
