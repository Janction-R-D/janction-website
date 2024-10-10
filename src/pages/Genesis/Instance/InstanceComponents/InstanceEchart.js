import React from 'react';
import ReactECharts from 'echarts-for-react';
export default function InstanceEchart() {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        height: '150px',
        maxWidth: '450px', // Limitar el ancho máximo
        margin: '0 auto',
        backgroundColor: '#1E1E1E',
        padding: '10px', // Mayor padding para más espacio
        borderRadius: '10px',
      }}
    >
      <ExpirationGraph />
      <span
        style={{
          width: '2px', // Ajusta el ancho de la barra
          backgroundColor: '#A0A0A0', // Color de la barra
          margin: '0 20px', // Espaciado alrededor de la barra
          height: '100%', // Ocupa todo el alto posible
        }}
      ></span>{' '}
      <MemoryUsage />
    </div>
  );
}

function MemoryUsage() {
  const option = {
    title: {
      text: 'Memory Usage Rate',

      left: '0%',
      top: '7%',
      textStyle: {
        color: '#A0A0A0',
        fontSize: 14,
      },
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        label: {
          backgroundColor: '#19191A',
        },
      },
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true,
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: [
        '2020-12-01',
        '2020-12-02',
        '2020-12-03',
        '2020-12-04',
        '2020-12-05',
        '2020-12-17',
        '2020-12-18',
        '2020-12-19',
        '2020-12-20',
      ],
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
      axisLine: {
        lineStyle: {
          color: '#A0A0A0',
          //   show: false,
        },
      },
      axisLabel: {
        show: false,
      },
      splitLine: {
        show: false, // Ocultar las líneas de cuadrícula horizontales
      },
    },
    series: [
      {
        name: 'Expiration',
        type: 'line',
        stack: 'Total',
        data: [18, 12, 10, 11, 12, 13, 11, 16, 12, 80],
        areaStyle: {
          // Definición del gradiente de azul a transparente
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              { offset: 0, color: ' rgba(255, 0, 0, 0.5 )' }, // Azul completo en la parte superior
              { offset: 1, color: 'rgba(255, 0, 0, 0)' }, // Transparente en la parte inferior
            ],
            global: false, // false para aplicar el gradiente de forma local
          },
        },
        lineStyle: {
          color: 'red',
        },
        showSymbol: false,
        smooth: true,
      },
    ],
    graphic: [
      {
        type: 'text',
        left: '0%',
        top: '10%',
        textStyle: {
          color: '#A0A0A0',
          fontSize: 14,
        },
      },
      {
        type: 'text',
        right: '0%', // Centrado horizontalmente
        top: '10%', // Ajusta esta posición según lo que necesites
        style: {
          text: '10%',
          fill: '#fff',
          font: 'bolder 14px sans-serif',
        },
      },
    ],
  };
  return (
    <ReactECharts option={option} style={{ height: '200px', width: '100%' }} />
  );
}
function ExpirationGraph() {
  const option = {
    title: {
      text: 'Expiration Time',

      left: '0%',
      top: '10%',
      textStyle: {
        color: '#A0A0A0',
        fontSize: 14,
      },
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        label: {
          backgroundColor: '#19191A',
        },
      },
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true,
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: [
        '2020-12-01',
        '2020-12-02',
        '2020-12-03',
        '2020-12-04',
        '2020-12-05',
        '2020-12-06',
        '2020-12-07',
        '2020-12-08',
        '2020-12-09',
        '2020-12-10',
        '2020-12-11',
        '2020-12-12',
        '2020-12-13',
        '2020-12-14',
        '2020-12-15',
        '2020-12-16',
        '2020-12-17',
        '2020-12-18',
        '2020-12-19',
        '2020-12-20',
      ],
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
      axisLine: {
        lineStyle: {
          color: '#A0A0A0',
          //   show: false,
        },
      },
      axisLabel: {
        show: false,
      },
      splitLine: {
        show: false, // Ocultar las líneas de cuadrícula horizontales
      },
    },
    series: [
      {
        name: 'Expiration',
        type: 'line',
        stack: 'Total',
        data: [
          65, 70, 68, 72, 75, 78, 74, 80, 85, 90, 88, 92, 94, 96, 99, 100, 95,
          93, 97, 98,
        ],
        areaStyle: {
          // Definición del gradiente de azul a transparente
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              { offset: 0, color: 'rgba(0, 170, 255, 1)' }, // Azul completo en la parte superior
              { offset: 1, color: 'rgba(0, 170, 255, 0)' }, // Transparente en la parte inferior
            ],
            global: false, // false para aplicar el gradiente de forma local
          },
        },
        lineStyle: {
          color: '#00aaff',
        },
        showSymbol: false,
        smooth: true,
      },
    ],
    graphic: [
      {
        type: 'text',
        left: '0%',
        top: '7%',
        textStyle: {
          color: '#A0A0A0',
          fontSize: 14,
        },
      },
      {
        type: 'text',
        right: '0%', // Centrado horizontalmente
        top: '10%', // Ajusta esta posición según lo que necesites
        style: {
          text: '75%',
          fill: '#fff',
          font: 'bolder 14px sans-serif',
        },
      },
    ],
  };
  return (
    <ReactECharts option={option} style={{ height: '200px', width: '100%' }} />
  );
}
