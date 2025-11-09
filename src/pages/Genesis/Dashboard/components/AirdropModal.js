import { Modal, Input, message } from 'antd';
import { useState, useEffect } from 'react';
import styles from './index.less';
import airdropBg from '@/assets/images/airdrop/airdrop_bg.png';
import airdropArrow from '@/assets/images/airdrop/airdrop_arrow.png';
import airdropDown from '@/assets/images/airdrop/airdrop_down.png';
import { fetchJctSign } from '@/services/genesis';

const AirdropModal = ({ open, onClose, totalAirdrop = 0, airdropData }) => {
  const [fromAmount, setFromAmount] = useState('0.00');
  const [toAmount, setToAmount] = useState('0.00');
  const [loading, setLoading] = useState(false);

  // 当弹窗打开且有空投数据时，初始化输入框
  useEffect(() => {
    if (open && airdropData) {
      const airdropValue = airdropData.airdrop || 0;
      setFromAmount(String(airdropValue));
      setToAmount(String(airdropValue));
    }
  }, [open, airdropData]);

  const handleConfirm = async () => {
    // 验证输入
    const jctAmount = parseFloat(toAmount);
    if (isNaN(jctAmount) || jctAmount <= 0) {
      message.error('请输入有效的JCT数量');
      return;
    }

    if (jctAmount > totalAirdrop) {
      message.error('输入的JCT数量不能超过可领取的空投数量');
      return;
    }

    setLoading(true);
    try {
      // 调用签名接口
      const result = await fetchJctSign({ jct: jctAmount });
      message.success('签名成功！');
      console.log('签名结果:', result);
      onClose();
      // 可以在这里添加后续处理逻辑，比如刷新数据
    } catch (error) {
      console.error('签名失败:', error);
      message.error(error?.message || '签名失败，请重试');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      closable={false}
      centered
      width={540}
      className={styles['airdrop-modal']}
      destroyOnClose
    >
      <div className={styles['airdrop-content']}>
        {/* 关闭按钮 */}
        <div className={styles['close-btn']} onClick={onClose}>
          <i className="iconfont icon-close" />
        </div>

        {/* 顶部图片区域 */}
        <div className={styles['airdrop-header']}>
          <h2 className={styles['airdrop-title']}>Claim Your Airdrop</h2>
          <img
            src={airdropBg}
            alt="airdrop"
            className={styles['airdrop-header-img']}
          />
        </div>

        {/* Total Airdrop Point */}
        {/* <div className={styles['airdrop-total']}>
          <span className={styles['total-label']}>Total Airdrop Point</span>
          <div className={styles['total-value']}>
            <span className={styles['total-amount']}>{totalAirdrop}</span>
            <span className={styles['total-unit']}>veJCT</span>
          </div>
        </div> */}

        {/* From 输入框 */}
        <div
          className={`${styles['airdrop-input-group']} ${styles['from-input']}`}
        >
          <div className={styles['input-label']}>From</div>
          <div className={styles['input-wrapper']}>
            <div className={styles['input-left']}>
              <span className={styles['currency-label']}>veJCT</span>
            </div>
            <div className={styles['airdrop-input']}>
              <span>{fromAmount}</span>
            </div>
          </div>
        </div>

        {/* 中间按钮 */}
        <div className={styles['airdrop-down-btn']}>
          <img src={airdropDown} alt="down" className={styles['down-icon']} />
        </div>

        {/* To 输入框 */}
        <div className={styles['airdrop-input-group']}>
          <div className={styles['input-label']}>To</div>
          <div className={styles['input-wrapper']}>
            <div className={styles['input-left']}>
              <span className={styles['currency-label']}>JCT</span>
            </div>
            <div className={styles['input-right-wrapper']}>
              <div className={styles['airdrop-input']}>
                <span>
                  {toAmount} {toAmount ? '*0.85' : ''}
                </span>
              </div>
              <span className={styles['fee-text']}>15% fee</span>
            </div>
          </div>
        </div>

        {/* 确认按钮 */}
        <div
          className={`${styles['confirm-button']} ${
            loading ? styles['confirm-button-loading'] : ''
          }`}
          onClick={handleConfirm}
        >
          <span>{loading ? 'Signing...' : 'Comfirm'}</span>
          {!loading && (
            <img
              src={airdropArrow}
              alt="arrow"
              className={styles['confirm-arrow']}
            />
          )}
        </div>
      </div>
    </Modal>
  );
};

export default AirdropModal;
