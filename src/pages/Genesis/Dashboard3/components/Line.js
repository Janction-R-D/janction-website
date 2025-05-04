import { isEmpty } from '@/utils/lang';
import dayjs from 'dayjs';
import * as echarts from 'echarts';
import ReactEcharts from 'echarts-for-react';
import { useMemo } from 'react';
import useLesses from '../Hooks/useLesses';

const Line = (props) => {
  const { lessesData } = useLesses();

  const echartsData = useMemo(() => {
    if (isEmpty(lessesData))
      return {
        xData: [],
        yData: [],
      };
    let keys = Object.keys(lessesData.portfolio_balance || {}) || [];
    let values = Object.values(lessesData.portfolio_balance || {}) || [];
    const yData = values.map((item) => {
      const datas = Object.values(item);
      return datas;
    });
    const xData = (Object.keys(values[0] || {}) || []).map((item) =>
      dayjs(item).format('YYYY-MM-DD'),
    );
    return {
      keys,
      xData,
      yData,
    };
  }, [lessesData]);

  // const left = useMemo(() => {
  //   if (scale >= 0.7) return '4%';
  //   if (scale >= 0.5) return '4%';
  //   if (scale >= 0.3) return '8%';
  //   return '12%';
  // }, [scale]);

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
    return (echartsData?.yData || []).map((item, index) => ({
      name: echartsData?.keys?.[index],
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
  }, [echartsData]);

  let option = {
    backgroundColor: '#1b1b1d',
    legend: {
      show: true,
      top: 15,
      right: 15,
      lineStyle: {
        width: 0,
      },
      textStyle: {
        color: '#fff',
        fontSize: 14,
      },
    },
    color: colors,
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'line',
      },
      textStyle: {
        fontFamily: 'Poppins',
        color: '#fff',
        fontSize: 12,
      },
      backgroundColor: '#2d2d2d',
      borderColor: 'transparent',
    },
    grid: {
      // show: true,
      // top: '20%',
      left: 50,
      right: 50,
      // right: '3%',
      bottom: 50,
      // containLabel: true,
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: echartsData?.xData || [],
      axisLabel: {
        fontFamily: 'Poppins',
        color: '#767677',
        fontSize: 14,
        fontWeight: 400,
      },
      axisLine: false,
    },
    yAxis: {
      type: 'value',
      offset: -20,
      axisLabel: {
        fontFamily: 'Poppins',
        color: '#767677',
        fontSize: 14,
        padding: [0, 30, 0, 0],
      },

      // axisPointer: {
      //   snap: true,
      // },
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
