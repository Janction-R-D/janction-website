import React from 'react';
import { Button, Col, Row, Card, Input } from 'antd';
import data from './resources.json';
import styles from './resources.less';
import ResourceTable from './ResourceTable';
export default function Resources() {
  return (
    <Card className={styles['card-table']}>
      <Row justify="end" align="middle">
        <Col
          span={10}
          xs={24}
          sm={24}
          md={24}
          lg={10}
          xl={10}
          style={{ display: 'flex', gap: '16px' }}
        >
          <Input
            suffix={
              <i className="iconfont icon-search" style={{ fontSize: '1vw' }} />
            }
            placeholder="Search by time and quantity"
            className={styles['search-input']}
          />
        </Col>
      </Row>

      <ResourceTable data={data} />
    </Card>
  );
}
