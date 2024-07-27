import React, { useEffect, useMemo, useState } from 'react';
import ReactEcharts from 'echarts-for-react';
import { formatDateMD } from '@/utils/datetime';

const StepChart = ({ data }) => {
  const [dataPoints, setDataPoints] = useState([]);
  const [dataAxis, setDataAxis] = useState([]);

  useEffect(() => {
    if (!data) {
      setDataPoints([]);
      setDataAxis([]);
      return;
    }
    let _dataPoints = [];
    let _dataAixs = [];
    data.map((dp) => {
      _dataPoints.push(dp.point);
      _dataAixs.push(formatDateMD(dp.date));
    });
    setDataAxis(_dataAixs);
    setDataPoints(_dataPoints);
  }, [data]);

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
