import React from 'react';
import ReactEcharts from 'echarts-for-react';

const DevicePie = (props) => {
  const { scale } = props;

  let option = {
    title: {
      text: 'Put words here...',
      subtext: 'Put words here...',
      left: 'center',
      top: '44%',
      textStyle: {
        fontFamily: 'Poppins',
        fontWeight: 700,
        fontSize: scale * 32,
        lineHeight: scale * 48,
        color: '#FFFFFF',
      },
      subtextStyle: {
        fontFamily: 'Poppins',
        fontWeight: 500,
        fontSize: scale * 20,
        lineHeight: scale * 30,
        color: 'rgba(255, 255, 255, 0.5)',
      },
    },
    legend: {
      show: false,
    },
    tooltip: {
      trigger: 'item',
    },
    color: [
      '#73D5F4',
      'rgba(217, 172, 162, 1)',
      'rgba(217, 172, 162, 0.8)',
      'rgba(217, 172, 162, 0.6)',
      'rgba(217, 172, 162, 0.4)',
      'rgba(217, 172, 162, 0.2)',
    ],
    series: [
      {
        name: '',
        type: 'pie',
        radius: ['62%', '70%'],
        center: ['50%', 'center'],
        itemStyle: {
          normal: {
            borderRadius: '50%',
            borderColor: 'transparent',
            borderWidth: scale * 20,
            label: {
              position: 'outter',
              fontFamily: 'Poppins',
              fontWeight: 500,
              fontSize: scale * 32,
              lineHeight: scale * 48,
              color: '#FFFFFF',
              formatter: '{d}%',
            },
            labelLine: {
              show: false,
            },
          },
        },
        data: [
          { value: 2338, name: 'GeForce RTX 3080' },
          { value: 1002, name: 'GeForce RTX 3090' },
          { value: 784, name: 'M2 MAX' },
          { value: 448, name: 'GeForce RTX 3070' },
          { value: 128, name: 'GeForce RTX 4090' },
          { value: 38, name: 'other' },
        ],
      },
    ],
  };

  return (
    <div className="wp100 hp100">
      <ReactEcharts option={option} />
    </div>
  );
};

export default DevicePie;
