/**
 * 卡片列表组件
 * 职责：展示卡片列表，触发操作回调
 *
 * 艹，卡片列表的容器组件，纯UI展示
 */

import React from 'react';
import { Empty, Spin, Row, Col, Pagination } from 'antd';
import CardItem from './CardItem';
import styles from './index.less';

const CardList = ({
  cards = [],
  loading = false,
  pagination,
  onCardClick,
  onUpgrade,
  onFreeze,
  onPageChange,
}) => {
  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <Spin size="large" tip="Loading cards..." />
      </div>
    );
  }

  if (!cards || cards.length === 0) {
    return (
      <div className={styles.emptyContainer}>
        <Empty
          description="No cards found"
          image={Empty.PRESENTED_IMAGE_SIMPLE}
        />
      </div>
    );
  }

  return (
    <div className={styles.cardListContainer}>
      <Row gutter={[16, 16]}>
        {cards.map((card) => (
          <Col xs={24} sm={12} lg={8} xl={6} key={card.id}>
            <CardItem
              card={card}
              onClick={() => onCardClick?.(card)}
              onUpgrade={() => onUpgrade?.(card)}
              onFreeze={(freeze) => onFreeze?.(card, freeze)}
            />
          </Col>
        ))}
      </Row>

      {pagination && pagination.total > 0 && (
        <div className={styles.paginationContainer}>
          <Pagination
            current={pagination.current}
            pageSize={pagination.pageSize}
            total={pagination.total}
            onChange={onPageChange}
            showSizeChanger
            showTotal={(total) => `Total ${total} cards`}
          />
        </div>
      )}
    </div>
  );
};

export default CardList;
