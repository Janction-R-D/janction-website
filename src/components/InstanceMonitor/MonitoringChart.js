import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';
import styles from './index.less';

const MonitoringChart = ({ data, label, unit }) => {
  const chartRef = useRef();

  useEffect(() => {
    const chart = echarts.init(chartRef.current);

    const option = {
      tooltip: {
        trigger: 'axis',
        backgroundColor: '#1f1f1f',
        borderColor: '#3EC7FF',
        textStyle: { color: '#fff' },
      },
      grid: { left: 0, right: 0, bottom: 0, top: 10, containLabel: true },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: data.map((_, i) => i + 1),
        axisLine: { lineStyle: { color: '#3EC7FF' } },
        axisLabel: { color: '#aaa', fontSize: 10 },
      },
      yAxis: {
        type: 'value',
        axisLabel: {
          formatter: `{value}${unit}`,
          color: '#aaa',
          fontSize: 10,
        },
        splitLine: {
          lineStyle: {
            color: '#444',
            type: 'dashed',
          },
        },
      },
      series: [
        {
          name: label,
          type: 'line',
          smooth: true,
          data,
          symbol: 'circle',
          symbolSize: 6,
          lineStyle: { color: '#3EC7FF' },
          itemStyle: { color: '#3EC7FF', borderColor: '#1F1F1F' },
          areaStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: 'rgba(62, 199, 255, 0.5)' },
              { offset: 1, color: 'rgba(62, 199, 255, 0)' },
            ]),
          },
        },
      ],
    };

    chart.setOption(option);
    return () => chart.dispose();
  }, [data, label, unit]);

  return <div ref={chartRef} className={styles.chart} />;
};

export default MonitoringChart;
