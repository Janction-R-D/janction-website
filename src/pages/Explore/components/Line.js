import React, { useMemo } from 'react';
import ReactEcharts from 'echarts-for-react';
import * as echarts from 'echarts';
import { MONTH } from '@/constant';
import useScale from '../../../hooks/useScale';

const Line = (props) => {
  const { data } = props;
  const { scale } = useScale();

  const left = useMemo(() => {
    if (scale >= 0.7) return '3%';
    if (scale >= 0.5) return '4%';
    if (scale >= 0.3) return '8%';
    return '12%';
  }, [scale]);

  let option = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
      },
      textStyle: {
        fontFamily: 'Poppins',
        color: '#fff',
        fontSize: 12 * scale,
      },
      backgroundColor: '#2d2d2d',
      borderColor: 'transparent',
    },
    grid: {
      top: '10%',
      left,
      right: '3%',
      bottom: '9%',
      containLabel: true,
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: MONTH.map((item) => item.label),
      axisLabel: {
        fontFamily: 'Poppins',
        color: '#FFFFFF',
        fontSize: 24 * scale > 9 ? 24 * scale : 9,
        fontWeight: 400,
      },
      axisLine: false,
    },
    yAxis: {
      type: 'value',
      axisLabel: {
        fontFamily: 'Poppins',
        color: '#FFFFFF',
        fontSize: 24 * scale > 9 ? 24 * scale : 9,
        padding: [0, 30, 0, 0],
      },

      axisPointer: {
        snap: true,
      },
      splitLine: {
        lineStyle: {
          color: '#454545',
          type: 'dashed',
        },
      },
    },
    series: [
      {
        name: 'Earnings',
        type: 'line',
        smooth: true,
        data,
        symbol: 'none',
        lineStyle: {
          width: 3,
          color: new echarts.graphic.LinearGradient(0, 0, 1, 1, [
            {
              offset: 0,
              color: '#111213',
            },
            {
              offset: 0.5,
              color: '#c453b8',
            },
            {
              offset: 1,
              color: '#111213',
            },
          ]),
        },
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: '#316CAE',
            },
            {
              offset: 0.4235,
              color: 'rgba(221, 92, 204, 0.5)',
            },
            {
              offset: 0.997,
              color: 'rgba(64, 46, 65, 0)',
            },
          ]),
          opacity: 0.24,
        },
      },
    ],
  };

  return (
    <div className="wp100 hp100">
      <ReactEcharts option={option} />
    </div>
  );
};

export default Line;
