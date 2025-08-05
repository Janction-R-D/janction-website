import React from 'react';
import ReactECharts from 'echarts-for-react';
import { useIntl } from 'umi';

const PieChart = ({ total, styles }) => {
  const intl = useIntl();
  const option = {
    tooltip: {
      trigger: 'item',
    },
    graphic: {
      type: 'text',
      left: 'center',
      top: 'center',
      style: {
        text: `${intl.formatMessage({ id: 'billing.total' })}`,
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
            name: `${intl.formatMessage({ id: 'billing.cash' })}`,
            itemStyle: { color: 'blue' },
          },
          {
            value: total?.share,
            name: `${intl.formatMessage({ id: 'billing.share' })}`,
            itemStyle: { color: 'red' },
          },
          {
            value: total?.gift,
            name: `${intl.formatMessage({ id: 'billing.gift' })}`,
            itemStyle: { color: 'yellow' },
          },
          {
            value: total?.coupon,
            name: `${intl.formatMessage({ id: 'billing.coupon' })}`,
            itemStyle: { color: 'cyan' },
          },
        ],
      },
    ],
  };

  return <ReactECharts option={option} className={styles['chart']} />;
};

export default PieChart;
