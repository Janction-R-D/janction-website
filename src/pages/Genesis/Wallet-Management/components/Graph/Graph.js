import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';

const Graph = () => {
  const chartRef = useRef(null);

  useEffect(() => {
    const chartInstance = echarts.init(chartRef.current, null, {
      backgroundColor: 'transparent',
    });

    const options = {
      xAxis: {
        type: 'category',
        data: [
          'April 1st',
          'April 2nd',
          'April 3rd',
          'April 4th',
          'April 5th',
          'April 6th',
          'April 7th',
        ],
        axisLine: {
          show: false,
          lineStyle: { color: 'rgba(255, 255, 255, 0.3)' },
        },
        axisTick: { show: false },
        axisLabel: { color: 'rgba(255, 255, 255, 0.45)' },
      },
      yAxis: {
        type: 'value',
        axisLine: {
          show: false,
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
      series: [
        {
          data: [0, 100, 800, 1400, 1100, 880, 1100, 1200],
          type: 'line',
          smooth: true,
          lineStyle: { color: '#fff' },
          areaStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: 'rgba(255, 255, 255, 0.3)' },
              { offset: 1, color: 'rgba(255, 255, 255, 0)' },
            ]),
          },
          symbol: 'none', // Elimina los puntos sobre la línea
        },
      ],
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

    // Función para redimensionar el gráfico al cambiar el tamaño del contenedor
    const resizeChart = () => {
      chartInstance.resize();
    };

    // Agregar event listener para redimensionar el gráfico cuando el tamaño del contenedor cambia
    window.addEventListener('resize', resizeChart);

    return () => {
      // Limpiar el event listener cuando el componente se desmonte
      window.removeEventListener('resize', resizeChart);
      chartInstance.dispose();
    };
  }, []);

  return <div ref={chartRef} style={{ width: '100%', height: '100%' }} />;
};

export default Graph;
