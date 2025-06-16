import React from 'react';
import ReactECharts from 'echarts-for-react';
import styles from './graph.less';
const Graph = () => {
  // Datos de ejemplo
  const data1 = [120, 132, 101, 134, 90, 230, 210];
  const data2 = [220, 182, 191, 234, 290, 330, 310];

  const option = {
    backgroundColor: 'transparent',
    grid: {
      left: '0%', // Ajusta el margen izquierdo del gráfico
      right: '0%', // Ajusta el margen derecho del gráfico
      bottom: '18px', // Ajusta el margen inferior del gráfico
      top: '40px', // Ajusta el margen superior del gráfico
      containLabel: true,
    },
    tooltip: {
      trigger: 'axis',
    },
    legend: {
      data: ['Línea A', 'Línea B'],
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'],
      axisTick: {
        show: false, // Ocultar marcas en el eje X
      },
      axisLine: {
        lineStyle: {
          show: false,
        },
      },
      axisLabel: {
        show: false,
      },
      splitLine: {
        show: false, // Ocultar las líneas de cuadrícula verticales
      },
    },
    yAxis: {
      type: 'value',
      axisLabel: {
        show: false,
      },
      splitLine: {
        show: false, // Ocultar las líneas de cuadrícula horizontales
      },
    },
    series: [
      {
        name: 'Línea A',
        type: 'line',
        areaStyle: {
          color: 'rgba(255, 99, 132, 0.3)', // Color de fondo para la Línea A
        },
        itemStyle: {
          color: 'rgba(255, 99, 132, 1)', // Color de la línea
        },
        symbol: 'none',
        data: data1,
      },
      {
        name: 'Línea B',
        type: 'line',
        areaStyle: {
          color: 'rgba(54, 162, 235, 0.3)', // Color de fondo para la Línea B
        },
        symbol: 'none',
        itemStyle: {
          color: 'rgba(54, 162, 235, 1)', // Color de la línea
        },
        data: data2,
      },
    ],
    legend: {
      show: false, // Ocultar la leyenda (botones para activar/desactivar líneas)
    },
  };

  return (
    <div className={styles['article']}>
      <ReactECharts
        option={option}
        className={styles['Graph']}
        style={{ height: '100%', width: '100%' }}
      />
    </div>
  );
};

export default Graph;
