import React, { useEffect, useState } from 'react';
import styles from './index.less';
import { Button, Card, Checkbox, Input, Radio } from 'antd';
import ProfileHeader from '@/components/ProfileHeader';

import { DatePicker } from 'antd';
import data from './mesages.json';
import JanctionTable from '@/components/JanctionTable';

export default function MessageCenter() {
  const { RangePicker } = DatePicker;
  const [allMessages, setAllMessages] = useState(data.messages);
  const [time, setTime] = useState(['2023-12-01', '2024-12-30']);
  const [filter, setFilter] = useState({
    type: 'all',
    date: ['2023-12-01', '2024-12-30'],
  });
  function formatDate(originalDateStr) {
    const date = new Date(originalDateStr);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;
    return formattedDate;
  }
  const handleChangeTime = (e) => {
    const times = e.map((moment) => {
      return formatDate(moment._d);
    });
    setTime(times);
    setFilter((prevState) => ({
      ...prevState,
      date: times,
    }));
    console.log(filter);
  };
  const onSortChange = (e) => {
    const sortField = e.target.value;
    setFilter((prevState) => ({
      ...prevState,
      type: sortField,
    }));
    console.log(filter);
    // const _messages = messages.sort((a, b) => b[sortField] - a[sortField]);
    // setMessages([..._messages]);
  };
  const columns = [
    {
      title: () => (
        <div className="table-header">
          <Checkbox></Checkbox>
          <div>
            <Button onClick={deleteMessages}>Delete</Button>
            <Button onClick={setAsReadedMessages}>Mark as Read</Button>
          </div>
        </div>
      ),
      dataIndex: 'tipo',
      key: 'tipo',
      render: (text, record) => (
        <CheckedComponent
          text={text}
          record={record}
          setAllMessages={setAllMessages}
        />
      ),
    },
    {
      dataIndex: 'descripcion',
      key: 'descripcion',
      render: (text, record) => <p className="descripcion">{text}</p>,
    },

    {
      dataIndex: 'fecha',
      key: 'fecha',
      render: (text, record) => (
        <div className="actions">
          <p>{text}</p>
          <div className="buttons">
            <Button type="link">Delete</Button>
            <Button type="link">Mark as Read</Button>
          </div>
        </div>
      ),
    },
  ];
  const filterMessages = () => {
    return allMessages.filter((message) => {
      return (
        (message.tipo.toLowerCase() === filter.type.toLowerCase() ||
          filter.type === 'all') &&
        new Date(filter.date[1]) >= new Date(message.fecha) &&
        new Date(filter.date[0]) <= new Date(message.fecha)
      );
    });
  };
  const deleteMessages = () => {
    const selectedMessages = filteredMessages.filter(
      (message) => checked === false,
    );
    if (selectedMessages.length <= 0) return;
    setAllMessages(selectedMessages);
  };
  const setAsReadedMessages = () => {
    const selectedMessages = filteredMessages.filter(
      (message) => message.estado !== 'Leído',
    );
    if (selectedMessages.length <= 0) return;
    setAllMessages(selectedMessages);
  };
  const filteredMessages = filterMessages();
  console.log(filteredMessages);
  return (
    <main className={styles['main-container']}>
      <h1>Message Center</h1>
      <Card className={styles['card-messages']}>
        <section className={styles['activity-filter-container']}>
          <Radio.Group
            defaultValue="all"
            buttonStyle="solid"
            className={styles['filters']}
            onChange={onSortChange}
          >
            <Radio.Button value="all">All</Radio.Button>
            <Radio.Button value="service">service</Radio.Button>
            <Radio.Button value="activity">activity</Radio.Button>
            <Radio.Button value="product">product</Radio.Button>
            <Radio.Button value="transaction">transaction</Radio.Button>
          </Radio.Group>
          <div className={styles['activity-filter']}>
            <label>
              <p>Time Horizon</p>
              <RangePicker
                onChange={handleChangeTime}
                className={styles['activity-range']}
                suffixIcon={<i className="iconfont icon-shizhongclock74"></i>}
              />
            </label>
            <Input
              suffix={
                <i
                  className="iconfont icon-search"
                  style={{ fontSize: '1vw' }}
                />
              }
              placeholder="Search by time and quantity"
              onChange={(e) => handleSearch(e.target.value)}
              className={styles['search-input']}
            />
          </div>
        </section>
        <JanctionTable
          bordered={false}
          className={styles['table']}
          columns={columns}
          dataSource={filteredMessages}
          pagination={{
            pageSize: 5,
            position: ['bottomCenter'],
          }}
          scroll={{ x: 'auto' }}
        />
      </Card>
    </main>
  );
}

function CheckedComponent({ text, record }) {
  console.log(record.estado);
  return (
    <div className="tipo">
      <Checkbox>
        <p>{text}</p>
      </Checkbox>
    </div>
  );
}
