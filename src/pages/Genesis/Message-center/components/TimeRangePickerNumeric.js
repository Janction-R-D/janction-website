import React, { useState } from 'react';
import { DatePicker, message } from 'antd';
import dayjs from 'dayjs';
import styles from './timezone.less';
import { formatDateYMD } from '@/utils/datetime';
import { formatDate } from '..';
const TimeRangePickerNumeric = ({ setTime, setFilter }) => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const handleStartChange = (date) => {
    if (endDate == null) {
      setStartDate(date?._d);
      return;
    }
    const newStartDate = formatDate(date._d);
    const times = [newStartDate, endDate];

    setTime(times);
    setFilter((prevState) => ({
      ...prevState,
      date: times,
    }));
  };

  const handleEndChange = (date) => {
    if (startDate && date && !date.isAfter(startDate)) {
      message.error('End date must be after start date!');
      return;
    }
    const newEndDate = formatDate(date?._d);
    const newStartDate = formatDate(startDate);
    setEndDate(newEndDate);
    const times = [newStartDate, newEndDate];

    setTime(times);
    setFilter((prevState) => ({
      ...prevState,
      date: times,
    }));
  };

  return (
    <div className={styles['time-container']}>
      <DatePicker
        format="YYYY-MM-DD"
        onChange={handleStartChange}
        placeholder="Start date..."
        bordered={false}
        suffixIcon={false}
        className={styles['date-time']}
        placement="center"
        disabledDate={(current) => current && current.isAfter(dayjs(), 'date')}
      />

      <DatePicker
        format="YYYY-MM-DD"
        onChange={handleEndChange}
        placeholder="End date..."
        bordered={false}
        suffixIcon={false}
        placement="bottomLeft"
        disabledDate={(current) => current && current.isAfter(dayjs(), 'date')}
      />
    </div>
  );
};

export default TimeRangePickerNumeric;
