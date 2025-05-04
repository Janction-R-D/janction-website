import ReactEcharts from 'echarts-for-react';
import React from 'react';
import { pieColors } from '../data';

const Pie = (props) => {
  const { data } = props;

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
        data,
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
