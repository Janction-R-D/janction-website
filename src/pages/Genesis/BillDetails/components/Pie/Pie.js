import React from 'react';
import ReactECharts from 'echarts-for-react';

const PieChart = ({ total, styles }) => {
  const option = {
    tooltip: {
      trigger: 'item',
    },
    graphic: {
      type: 'text',
      left: 'center',
      top: 'center',
      style: {
        text: 'Total cost',
        textAlign: 'center',
        fill: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
      },
    },
    series: [
      {
        name: 'Access From',
        type: 'pie',
        radius: ['70%', '90%'], // donut shape
        avoidLabelOverlap: false,
        label: {
          show: false,
          position: 'center',
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 10,
            fontWeight: 'bold',
          },
        },
        labelLine: {
          show: false,
        },
        data: [
          {
            value: total?.cash,
            name: 'Cash payment',
            itemStyle: { color: 'blue' },
          },
          {
            value: total?.share,
            name: 'Share bonus',
            itemStyle: { color: 'red' },
          },
          {
            value: total?.gift,
            name: 'Gift money',
            itemStyle: { color: 'yellow' },
          },
          {
            value: total?.coupon,
            name: 'Coupon',
            itemStyle: { color: 'cyan' },
          },
        ],
      },
    ],
  };

  return <ReactECharts option={option} className={styles['chart']} />;
};

export default PieChart;
