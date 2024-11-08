import React from 'react';
import ReactECharts from 'echarts-for-react';
import { BandRadioGroup } from './BandRadioGroup';

export default function MountEchart({ styles }) {
  return (
    <div
      style={{
        padding: '10px',
        marginBottom: '12px',
        borderRadius: '10px',
      }}
    >
      <ExpirationGraph styles={styles} />
    </div>
  );
}

function ExpirationGraph({ styles }) {
  const option = {
    title: {
      text: 'Price',
      left: '2px',
      top: '8px',
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
        show: true, // Mostrar las etiquetas del eje x
        color: '#A0A0A0', // Color de las etiquetas
        style: {
          marginBottom: '5px',
        },
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
        },
      },
      axisLabel: {
        show: true, // Mostrar las etiquetas del eje y
        color: '#A0A0A0', // Color de las etiquetas
      },
      splitLine: {
        show: true,
        lineStyle: {
          color: '#444', // Color de las líneas de cuadrícula
          type: 'dashed', // Tipo de línea (puede ser 'solid', 'dashed', etc.)
        },
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
          fill: '#fff',
          font: 'bolder 14px sans-serif',
        },
      },
    ],
  };
  return (
    <section className={styles['grap-box']}>
      <ReactECharts option={option} />
      <div className={styles['grap-inputs']}>
        <BandRadioGroup styles={styles} />
      </div>
    </section>
  );
}
