import React, { useMemo } from 'react';
import ReactEcharts from 'echarts-for-react';
import * as echarts from 'echarts';
import { MONTH } from '@/constant';
import useScale from '../../../../hooks/useScale';
import { balanceData, pieColors } from '../data';

const Pie = (props) => {
  const { data = balanceData } = props;

  let option = {
    tooltip: {
      show: false,
    },
    legend: {
      show: false,
    },
    title: {
      text: '$1.56W',
      subtext: 'Total',
      left: 'center',
      top: 'middle',
      textStyle: { fontSize: 24, color: 'rgba(255, 255, 255, 0.9)' },
      subtextStyle: { fontSize: 12, color: 'rgba(255, 255, 255, 0.9)' },
    },
    color: pieColors,
    series: [
      {
        name: 'Access From',
        type: 'pie',
        radius: ['70%', '90%'],
        itemStyle: {
          borderRadius: 0,
        },
        label: {
          show: false,
          position: 'center',
        },
        labelLine: {
          show: false,
        },
        data: [
          { value: 1048, name: 'Search Engine' },
          { value: 735, name: 'Direct' },
          { value: 580, name: 'Email' },
        ],
      },
    ],
  };

  return (
    <div className="wp100 hp100">
      <ReactEcharts option={option} />
    </div>
  );
};

export default Pie;
