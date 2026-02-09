/**
 * 卡片管理页面
 * 职责：展示用户的所有卡片，提供管理功能
 *
 * 艹，这个页面组合了Hooks和Components，实现卡片管理功能
 */

import React, { useState } from 'react';
import { history } from 'umi';
import { Card, Button, Modal, message, Space, Select } from 'antd';
import { PlusOutlined, ReloadOutlined } from '@ant-design/icons';
import CardList from '@/components/Tevau/CardList';
import CardDetailModal from '@/components/Tevau/CardDetailModal';
import UpgradeCardModal from '@/components/Tevau/UpgradeCardModal';
import { useCardList, useCardUpgrade, useCardDetail } from '@/hooks/tevau';
import { CARD_STATUS, CARD_TYPE } from '@/utils/tevau';
import styles from './index.less';

const { Option } = Select;

const CardsManagementPage = () => {
  // 使用Hooks管理业务逻辑
  const { loading, cards, pagination, filter, refresh, changePage } =
    useCardList(true);
  const { upgradeCard, loading: upgrading } = useCardUpgrade();
  const { toggleFreeze } = useCardDetail(null, false);

  const [selectedCard, setSelectedCard] = useState(null);
  const [detailModalVisible, setDetailModalVisible] = useState(false);
  const [upgradeModalVisible, setUpgradeModalVisible] = useState(false);

  /**
   * 查看卡片详情
   */
  const handleCardClick = (card) => {
    setSelectedCard(card);
    setDetailModalVisible(true);
  };

  /**
   * 升级为实体卡
   */
  const handleUpgrade = (card) => {
    setSelectedCard(card);
    setUpgradeModalVisible(true);
  };

  /**
   * 确认升级
   */
  const handleUpgradeConfirm = async (upgradeData) => {
    const result = await upgradeCard(selectedCard.id, upgradeData);

    if (result.success) {
      setUpgradeModalVisible(false);
      refresh(); // 刷新列表
      message.success('Card upgraded successfully!');
    }
  };

  /**
   * 冻结/解冻卡片
   */
  const handleFreeze = (card, freeze) => {
    Modal.confirm({
      title: `${freeze ? 'Freeze' : 'Unfreeze'} Card?`,
      content: `Are you sure you want to ${
        freeze ? 'freeze' : 'unfreeze'
      } this card?`,
      onOk: async () => {
        const { id } = card;
        // 这里需要创建一个临时的useCardDetail来操作
        // 实际应用中可能需要单独的冻结API
        message.info('Freeze/Unfreeze functionality to be implemented');
        refresh();
      },
    });
  };

  /**
   * 申请新卡
   */
  const goToApply = () => {
    history.push('/genesis/tevau/apply');
  };

  /**
   * 筛选卡片
   */
  const handleFilterChange = (field, value) => {
    filter({ [field]: value });
  };

  return (
    <div className={styles.cardsPageContainer}>
      <Card
        title={
          <div className={styles.cardTitle}>
            <span>My Virtual Cards</span>
            <Space>
              <Select
                placeholder="Filter by Status"
                style={{ width: 150 }}
                allowClear
                onChange={(value) => handleFilterChange('status', value)}
              >
                <Option value={CARD_STATUS.ACTIVE}>Active</Option>
                <Option value={CARD_STATUS.FROZEN}>Frozen</Option>
                <Option value={CARD_STATUS.CLOSED}>Closed</Option>
              </Select>

              <Select
                placeholder="Filter by Type"
                style={{ width: 150 }}
                allowClear
                onChange={(value) => handleFilterChange('type', value)}
              >
                <Option value={CARD_TYPE.VIRTUAL}>Virtual</Option>
                <Option value={CARD_TYPE.PHYSICAL}>Physical</Option>
              </Select>

              <Button icon={<ReloadOutlined />} onClick={refresh}>
                Refresh
              </Button>

              <Button
                type="primary"
                icon={<PlusOutlined />}
                onClick={goToApply}
              >
                Apply New Card
              </Button>
            </Space>
          </div>
        }
        className={styles.mainCard}
      >
        <CardList
          cards={cards}
          loading={loading}
          pagination={pagination}
          onCardClick={handleCardClick}
          onUpgrade={handleUpgrade}
          onFreeze={handleFreeze}
          onPageChange={changePage}
        />
      </Card>

      {/* 卡片详情弹窗 */}
      <CardDetailModal
        visible={detailModalVisible}
        card={selectedCard}
        onClose={() => setDetailModalVisible(false)}
      />

      {/* 升级实体卡弹窗 */}
      <UpgradeCardModal
        visible={upgradeModalVisible}
        card={selectedCard}
        onConfirm={handleUpgradeConfirm}
        onCancel={() => setUpgradeModalVisible(false)}
        loading={upgrading}
      />
    </div>
  );
};

export default CardsManagementPage;
CardsManagementPage.wrappers = ['@/wrappers/auth'];
