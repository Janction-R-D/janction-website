import React from 'react';
import ReactEcharts from 'echarts-for-react';
import * as echarts from 'echarts';

const StepChart = (props) => {
  const { data = 2, max = 3 } = props;

  let option = {
    backgroundColor: 'transparent',
    title: {
      text: `{a|${[data]}} {b|of 2}`,
      textStyle: {
        color: '#fff',
        fontSize: 24,
        rich: {
          a: {
            color: '#fff',
            fontSize: 24,
          },
          b: {
            color: 'rgba(255,255,255,0.5)',
            fontSize: 24,
          },
        },
      },
      left: 'center',
      top: 'center',
    },
    tooltip: {
      show: false,
    },
    angleAxis: {
      max,
      clockwise: true,
      show: false,
      startAngle: 90,
    },
    radiusAxis: {
      type: 'category',
      show: false,
    },
    polar: [
      {
        center: ['50%', '50%'],
        radius: '100%',
        clip: true,
      },
    ],
    series: [
      {
        type: 'bar',
        z: 10,
        data: [data],
        coordinateSystem: 'polar',
        roundCap: true,
        barWidth: 25,
        itemStyle: {
          normal: {
            borderWidth: 1,
            borderColor: new echarts.graphic.LinearGradient(0, 0, 1, 1, [
              {
                offset: 0,
                color: '#316CAE',
              },
              {
                offset: 0.5,
                color: '#A63D9A',
              },
              {
                offset: 1,
                color: '#C6815D',
              },
            ]),
            color: 'rgba(0, 0, 0, 0.5)',
            opacity: 1,
            shadowBlur: 5,
          },
        },
      },
      {
        type: 'pie',
        radius: ['55%', '46%'],
        startAngle: 110,
        hoverAnimation: false,
        clockWise: true,
        itemStyle: {
          normal: {
            color: new echarts.graphic.LinearGradient(0, 0, 1, 1, [
              {
                offset: 0,
                color: '#316CAE',
              },
              {
                offset: 0.5,
                color: '#A63D9A',
              },
              {
                offset: 1,
                color: '#C6815D',
              },
            ]),
          },
        },
        tooltip: {
          show: false,
        },
        label: {
          show: false,
        },
        data: [100],
      },
    ],
  };

  return (
    <div className="wp100 hp100">
      <ReactEcharts option={option} />
    </div>
  );
};

export default StepChart;
