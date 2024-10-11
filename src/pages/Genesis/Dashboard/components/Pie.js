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
    color: pieColors,
    series: [
      {
        name: 'Access From',
        type: 'pie',
        radius: ['50%', '70%'],
        itemStyle: {
          borderRadius: 0,
          borderWidth: 5,
          borderColor: '#242426',
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
