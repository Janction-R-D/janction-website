import { useState, useRef } from "react";
import JanctionTable from "@/components/JanctionTable";
import JanctionRangePicker from "@/components/JanctionRangePicker";
import { Col, Row, Space, Button } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';

export default function Instance() {
  const tableRef = useRef();
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const onSelectChange = (newSelectedRowKeys) => {
    console.log('selectedRowKeys changed: ', newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  const columns = [
    {
      title: '日期',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <a>{text}</a>,
    },
    {
      title: '交易类型',
      dataIndex: 'age',
      key: 'age',
      filters: [
        {
          text: 'Joe',
          value: 'Joe',
        },
        {
          text: 'Jim',
          value: 'Jim',
        },
      ],
      onFilter: (value, record) => record.name.indexOf(value) === 0,
    },
    {
      title: '交易金额',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: '优惠金额',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: '余额支付',
      key: 'action',
    },
    {
      title: '代金券抵扣',
      key: 'action',
    },
  ];
  const data = [
    {
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
      tags: ['nice', 'developer'],
    },
    {
      key: '2',
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park',
      tags: ['loser'],
    },
    {
      key: '3',
      name: 'Joe Black',
      age: 32,
      address: 'Sydney No. 1 Lake Park',
      tags: ['cool', 'teacher'],
    },
  ];
  const onOk = (value) => {
    console.log('onOk: ', value);
  };
  return (
    <>
      <Row justify="space-between">
        <Col>
          <Space>
            账单时间：<JanctionRangePicker
              showTime={{ format: 'HH:mm' }}
              format="YYYY-MM-DD HH:mm"
              onChange={(value, dateString) => {
                console.log('Selected Time: ', value);
                console.log('Formatted Selected Time: ', dateString);
              }}
              onOk={onOk} />
          </Space>
        </Col>
        <Col>
          <Button type="link"><DownloadOutlined />导出日结账单CSV文件</Button>
        </Col>
      </Row>
      <JanctionTable tableRef={tableRef} rowSelection={rowSelection} columns={columns} dataSource={data} />
    </>
  );
}
