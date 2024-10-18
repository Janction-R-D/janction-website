import ReactEcharts from 'echarts-for-react';
import React from 'react';
import { ALARAM_STATE, STATE_CONS } from '../data';

const VerticalBar = (props) => {
  const { data } = props;

  const xAxisData = Object.keys(data || {}).map((item) => STATE_CONS[item]);
  const seriesData = Object.keys(data || {}).map((key) => ({
    value: data[key],
    itemStyle: {
      color: key == ALARAM_STATE ? '#EE385C' : '#00bbd4',
    },
  }));
  let option = {
    grid: {
      left: '0%', // Ajusta el margen izquierdo del gráfico
      right: '0%', // Ajusta el margen derecho del gráfico
      bottom: '18px', // Ajusta el margen inferior del gráfico
      top: '0%', // Ajusta el margen superior del gráfico
      containLabel: true,
    },
    xAxis: {
      type: 'category',
      axisTick: {
        show: false,
      },
      axisLine: {
        show: false,
      },
      splitLine: {
        show: false,
      },
      axisLabel: {
        fontFamily: 'PingFang SC',
        fontSize: 11,
        lineHeight: 15,
        color: 'rgba(255, 255, 255, 0.64)',
        margin: 20,
      },
      data: xAxisData,
    },
    yAxis: {
      type: 'value',
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
    series: [
      {
        data: seriesData,
        type: 'bar',
        showBackground: true,
        backgroundStyle: {
          color: '#202123',
          borderRadius: 10,
        },
        itemStyle: {
          color: '#00bbd4',
          borderRadius: [0, 0, 10, 10],
        },
        barWidth: 36,
      },
    ],
  };

  return (
    <div className="wp100 hp100">
      <ReactEcharts option={option} />
    </div>
  );
};

export default VerticalBar;
