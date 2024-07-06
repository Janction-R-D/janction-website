import React from 'react';
import ReactEcharts from 'echarts-for-react';
import { formatDateMD } from '@/utils/datetime';

const StepChart = ({ data }) => {
  let dataPoints;
  let dataAxis;
  console.log('chart data:', data);
  if (data) {
    dataPoints = data.map((dp) => dp.point);
    dataAxis = data.map((dp) => formatDateMD(dp.date));
  } else {
    dataPoints = [220, 182, 191, 234, 290, 330, 310, 123];
    dataAxis = ['6/1', '6/2', '6/3', '6/4', '6/5', '6/6', '6/7', '6/8'];
  }

  let option = {
    backgroundColor: 'transparent',
    grid: {
      left: 0,
      right: 0,
      bottom: '10%',
      top: '10%',
    },
    xAxis: [
      {
        data: dataAxis,
        axisLabel: {
          color: '#ffffff80',
          fontSize: 14,
        },
        axisTick: {
          show: false,
        },
        axisLine: {
          show: false,
        },
        z: 10,
      },
      {
        data: dataPoints,
        axisLabel: {
          color: '#fff',
          fontSize: 16,
        },
        axisTick: {
          show: false,
        },
        axisLine: {
          show: false,
        },
        z: 10,
      },
    ],
    yAxis: {
      axisLine: {
        show: false,
      },
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
    dataZoom: [
      {
        type: 'inside',
      },
    ],
    series: [
      {
        type: 'bar',
        showBackground: true,
        xAxisIndex: 1,
        backgroundStyle: {
          borderRadius: [50, 50, 50, 50],
          color: '#44414b',
        },
        itemStyle: {
          borderRadius: [50, 50, 50, 50],
          color: '#d9d8da',
        },
        emphasis: {
          show: false,
        },
        data: dataPoints,
      },
      {},
    ],
  };

  return (
    <div className="wp100 hp100">
      <ReactEcharts option={option} />
    </div>
  );
};

export default StepChart;
