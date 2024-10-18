import React, { useMemo } from 'react';
import ReactEcharts from 'echarts-for-react';
import * as echarts from 'echarts';
import { MONTH } from '@/constant';
import useScale from '../../../../hooks/useScale';
import { balanceData } from '../data';

const Bar = (props) => {
  const { data = balanceData } = props;
  const getBarColor = (value) => {
    return value > 20 ? '#00bbd4' : '#EE385C';
  };
  const seriesData = [120, 200, 150, 10, 80, 70].map((value) => ({
    value,
    itemStyle: {
      color: getBarColor(value),
    },
  }));
  let option = {
    xAxis: {
      type: 'category',
      axisTick: {
        show: false,
      },
      axisLine: {
        show: false,
      },
      splitLine: {
        show: false,
      },
      axisLabel: {
        fontFamily: 'PingFang SC',
        fontSize: 11,
        lineHeight: 15,
        color: 'rgba(255, 255, 255, 0.64)',
        margin: 20,
      },
      data: [
        'Conversion',
        'Leisure',
        'Leased',
        'Alarm',
        'On-chain task',
        'Off-chain task',
      ],
    },
    yAxis: {
      type: 'value',
      axisTick: {
        show: false,
      },
      axisLabel: {
        show: false,
      },
      splitLine: {
        show: false,
      },
    },
    series: [
      {
        data: seriesData,
        type: 'bar',
        showBackground: true,
        backgroundStyle: {
          color: '#515153',
          borderRadius: 10,
        },

        barWidth: 30,
      },
    ],
  };

  return (
    <div className="wp100 hp100">
      <ReactEcharts option={option} />
    </div>
  );
};

export default Bar;
