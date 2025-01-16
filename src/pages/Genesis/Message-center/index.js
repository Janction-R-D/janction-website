import JanctionTable from '@/components/JanctionTable';
import { Card, DatePicker, Input, Radio } from 'antd';
import { useEffect, useState } from 'react';
import Actions from './components/Actions';
import { CheckHeader } from './components/CheckHeader';
import { CheckedComponent } from './components/CheckedComponent';
import styles from './index.less';
import data from './mesages.json';
import TimeRangePickerNumeric from './components/TimeRangePickerNumeric';
import useScale from '@/hooks/useScale';

export function formatDate(originalDateStr) {
  const date = new Date(originalDateStr);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const formattedDate = `${year}-${month}-${day}`;
  return formattedDate;
}
export default function MessageCenter() {
  const { RangePicker } = DatePicker;
  const { isPC } = useScale();
  const [allMessages, setAllMessages] = useState(data.messages);
  const [time, setTime] = useState(['2023-12-01', '2024-12-30']);
  const [isChecked, setIsChecked] = useState(false);
  const [filter, setFilter] = useState({
    type: 'all',
    date: ['2023-12-01', '2024-12-30'],
  });

  const handleChangeTime = (e) => {
    const times = e.map((moment) => {
      return formatDateYMD(moment._d);
    });
    setTime(times);
    setFilter((prevState) => ({
      ...prevState,
      date: times,
    }));
  };

  const onSortChange = (e) => {
    const sortField = e.target.value;
    setFilter((prevState) => ({
      ...prevState,
      type: sortField,
    }));
  };
  const columns = [
    {
      title: () => (
        <CheckHeader
          setIsChecked={setIsChecked}
          filteredMessages={filteredMessages}
          setAllMessages={setAllMessages}
          isChecked={isChecked}
        />
      ),
      dataIndex: 'tipo',
      key: 'tipo',
      render: (text, record) => (
        <CheckedComponent
          text={text}
          record={record}
          setAllMessages={setAllMessages}
          filteredMessages={filteredMessages}
        />
      ),
    },
    {
      dataIndex: 'descripcion',
      key: 'descripcion',
      render: (text, record) => {
        return (
          <p
            className={`descripcion ${
              record.estado !== 'Leído' ? 'readed-sms' : ''
            }`}
          >
            {text}
          </p>
        );
      },
    },

    {
      dataIndex: 'fecha',
      key: 'fecha',
      render: (text, record) => (
        <Actions
          setAllMessages={setAllMessages}
          filteredMessages={filteredMessages}
          text={text}
          record={record}
        />
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

  const filteredMessages = filterMessages();

  useEffect(() => {
    const mappedMessages = allMessages.map((message) => {
      return {
        ...message,
        checked: false,
      };
    });
    setAllMessages(mappedMessages);
  }, []);
  const onChange = (dates, dateStrings) => {
    console.log('Selected dates:', dates);
    console.log('Formatted dates:', dateStrings);
  };
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
            scroll={{ x: 'auto' }}
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

              {isPC ? (
                <RangePicker
                  onChange={handleChangeTime}
                  className={styles['activity-range']}
                  placement="bottomRight"
                  suffixIcon={<i className="iconfont icon-shizhongclock74"></i>}
                />
              ) : (
                <TimeRangePickerNumeric
                  setTime={setTime}
                  setFilter={setFilter}
                />
              )}
            </label>
            <Input
              suffix={
                <i
                  className="iconfont icon-search"
                  style={{ fontSize: '14px' }}
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
