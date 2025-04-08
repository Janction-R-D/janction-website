import React, { useMemo } from 'react';
import ReactEcharts from 'echarts-for-react';
import * as echarts from 'echarts';
import { MONTH } from '@/constant';
import useScale from '../../../../../hooks/useScale';
import { balanceData } from './data';

const Line = (props) => {
  const { data = balanceData } = props;
  const { scale } = useScale();

  const left = useMemo(() => {
    if (scale >= 0.7) return '3%';
    if (scale >= 0.5) return '4%';
    if (scale >= 0.3) return '8%';
    return '12%';
  }, [scale]);

  const colors = ['#73D5F4', '#FF9F5A'];
  const areaColors = [
    new echarts.graphic.LinearGradient(0, 0, 0, 1, [
      {
        offset: 0,
        color: 'rgba(115, 213, 244, 0.26)',
      },
      {
        offset: 0.6798,
        color: 'rgba(115, 213, 244, 0.24)',
      },
      {
        offset: 1,
        color: 'rgba(115, 213, 244, 0.0001)',
      },
    ]),
    new echarts.graphic.LinearGradient(0, 0, 0, 1, [
      {
        offset: 0,
        color: 'rgba(255, 159, 90, 0.1)',
      },
      {
        offset: 0.6798,
        color: 'rgba(255, 159, 90, 0.08)',
      },
      {
        offset: 1,
        color: 'rgba(255, 159, 90, 0.0001)',
      },
    ]),
  ];

  const series = useMemo(() => {
    return (data || []).map((item, index) => ({
      name: 'Earnings',
      type: 'line',
      smooth: true,
      data: item,
      symbol: 'none',
      lineStyle: {
        color: colors[index],
        width: 2,
      },
      areaStyle: {
        color: areaColors[index],
        opacity: 0.24,
      },
    }));
  }, [data]);

  let option = {
    backgroundColor: '#1b1b1d',
    legend: {
      data: ['CPU', 'GPU'],
    },
    color: colors,
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
        color: '#767677',
        fontSize: 14 * scale > 9 ? 14 * scale : 9,
        fontWeight: 400,
      },
      axisLine: false,
    },
    yAxis: {
      type: 'value',
      axisLabel: {
        fontFamily: 'Poppins',
        color: '#767677',
        fontSize: 14 * scale > 9 ? 14 * scale : 9,
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
    series,
  };

  return (
    <div className="wp100 hp100">
      <ReactEcharts option={option} />
    </div>
  );
};

export default Line;
