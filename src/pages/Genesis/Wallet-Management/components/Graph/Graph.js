import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';

const Graph = () => {
  const chartRef = useRef(null);

  useEffect(() => {
    const chartInstance = echarts.init(chartRef.current, null, {
      backgroundColor: 'transparent',
    });

    // Datos reales con fechas y valores
    const data = [
      // { date: 'april 12', value: 10 },
      // { date: 'april 13', value: 25 },
    ];

    const options = {
      xAxis: {
        type: 'category',
        data: data.map((item) => item.date),
        axisLine: {
          show: true,
          lineStyle: { color: 'rgba(255, 255, 255, 0.3)' },
        },
        axisTick: { show: false },
        axisLabel: { color: 'rgba(255, 255, 255, 0.45)' },
      },
      yAxis: {
        type: 'value',
        axisLine: {
          show: true,
          lineStyle: { color: 'rgba(255, 255, 255, 0.2)' },
        },
        axisTick: { show: false },
        splitLine: {
          show: true,
          lineStyle: { color: 'rgba(255, 255, 255, 0.2)' },
        },
        axisLabel: {
          color: 'rgba(255, 255, 255, 0.2)',
          inside: true,
          verticalAlign: 'bottom',
        },
      },
      series: data.length
        ? [
            {
              data: data.map((item) => item.value),
              type: 'line',
              smooth: true,
              lineStyle: { color: '#fff' },
              areaStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: 'rgba(255, 255, 255, 0.3)' },
                  { offset: 1, color: 'rgba(255, 255, 255, 0)' },
                ]),
              },
              symbol: 'none',
            },
          ]
        : [],
      graphic: !data.length
        ? {
            type: 'text',
            left: 'center',
            top: 'middle',
            style: {
              text: 'No data',
              fill: '#aaa',
              font: '16px sans-serif',
            },
          }
        : undefined,
      grid: {
        left: '0%',
        right: '0%',
        bottom: '0%',
        top: '0%',
        containLabel: true,
      },
      backgroundColor: 'transparent',
    };

    chartInstance.setOption(options);

    const resizeChart = () => {
      chartInstance.resize();
    };
    window.addEventListener('resize', resizeChart);

    return () => {
      window.removeEventListener('resize', resizeChart);
      chartInstance.dispose();
    };
  }, []);

  return <div ref={chartRef} style={{ width: '100%', height: '100%' }} />;
};

export default Graph;
