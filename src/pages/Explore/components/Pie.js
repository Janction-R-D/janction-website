import React from 'react';
import ReactEcharts from 'echarts-for-react';

const Pie = (props) => {
  let option = {
    tooltip: {
      trigger: 'item',
    },
    legend: false,
    series: [
      {
        type: 'pie',
        radius: '80%',
        data: [
          {
            value: 30,
            name: 'Linux',
            selected: true,
          },
          {
            value: 15,
            name: 'Android',
            itemStyle: {
              borderColor: '#121212',
              borderWidth: 9,
            },
          },
          {
            value: 35,
            name: 'Mac',
            itemStyle: {
              borderColor: '#121212',
              borderWidth: 9,
            },
          },
          {
            value: 20,
            name: 'Windows',
            itemStyle: {
              borderColor: '#121212',
              borderWidth: 9,
            },
          },
        ],
        label: {
          normal: {
            position: 'inner',
            formatter: '{a|{d}%}\n{b|{b}}',
            rich: {
              a: {
                color: '#fff',
                fontSize: '16px',
                padding: [0, 0, 0, 10],
              },
              b: {
                color: '#fff',
                fontSize: '13px',
                lineHeight: 18,
              },
            },
          },
        },
        clockwise: false,
        selectedMode: 'multiple',
        selectedOffset: 15,
        emphasis: {
          label: false,
        },
      },
    ],
  };

  return (
    <div className="wp100 hp100">
      <ReactEcharts option={option} />
    </div>
  );
};

export default Pie;
