import React, { useMemo } from 'react';
import ReactEcharts from 'echarts-for-react';
import * as echarts from 'echarts';
import { MONTH } from '@/constant';
import useScale from '../../../../hooks/useScale';
import { balanceData } from '../data';

const Bar = (props) => {
  const { data = balanceData } = props;

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
      data: ['Leased', 'Leisure', 'Alarm', 'On-chain task', 'Off-chain task'],
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
        data: [120, 200, 150, 80, 70],
        type: 'bar',
        showBackground: true,
        backgroundStyle: {
          color: '#515153',
          borderRadius: 3,
        },
        itemStyle: {
          color: '#00bbd4',
          borderRadius: 3,
        },
        barWidth: 36,
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
