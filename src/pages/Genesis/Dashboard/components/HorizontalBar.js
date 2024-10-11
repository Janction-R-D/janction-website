import React, { useMemo } from 'react';
import ReactEcharts from 'echarts-for-react';
import * as echarts from 'echarts';
import { MONTH } from '@/constant';
import useScale from '../../../../hooks/useScale';
import { balanceData } from '../data';

const Bar = (props) => {
  // const { data = balanceData } = props;
  const { scale } = useScale();
  let data = [
    {
      name: 'xxxxxxxxxxx',
      value: (Math.random() * 10).toFixed(0),
      sum: 10,
    },
    {
      name: 'xxxxxxxxxxx',
      value: (Math.random() * 10).toFixed(0),
      sum: 10,
    },
    {
      name: 'M1 Max',
      value: (Math.random() * 10).toFixed(0),
      sum: 10,
    },
    {
      name: 'M2 Max',
      value: (Math.random() * 10).toFixed(0),
      sum: 10,
    },
    {
      name: 'M3 Max',
      value: (Math.random() * 10).toFixed(0),
      sum: 10,
    },
    {
      name: 'M4 Max',
      value: (Math.random() * 10).toFixed(0),
      sum: 10,
    },
  ];
  const getArrByKey = (data, k) => {
    let key = k || 'value';
    let res = [];
    if (data) {
      data.forEach(function (t) {
        res.push(t[key]);
      });
    }
    return res;
  };
  let opt = {
    index: 0,
  };
  let color = ['#FC619D', '#FF904D', '#48BFE3'];
  data = data.sort((a, b) => {
    return b.value - a.value;
  });

  let option = {
    grid: {
      top: '2%',
      bottom: 0,
      right: '2%',
      left: -70,
      containLabel: true,
    },
    xAxis: {
      show: false,
    },
    yAxis: [
      {
        triggerEvent: true,
        show: true,
        inverse: true,
        data: getArrByKey(data, 'name'),
        axisLine: {
          show: false,
        },
        splitLine: {
          show: false,
        },
        axisTick: {
          show: false,
        },
        axisLabel: {
          interval: 0,
          color: '#666',
          align: 'left',
          margin: 100,
          fontSize: 13,
          formatter: function (value, index) {
            if (opt.index === 0 && index < 3) {
              return (
                '{idx' + index + '|' + (1 + index) + '} {title|' + value + '}'
              );
            } else if (opt.index !== 0 && index + opt.index < 9) {
              return (
                '{idx|0' + (1 + index + opt.index) + '} {title|' + value + '}'
              );
            } else {
              return (
                '{idx|' + (1 + index + opt.index) + '} {title|' + value + '}'
              );
            }
          },
          rich: {
            idx0: {
              color: '#FB375E',
              backgroundColor: '#FFE8EC',
              borderRadius: 100,
              padding: [5, 8],
            },
            idx1: {
              color: '#FF9023',
              backgroundColor: '#FFEACF',
              borderRadius: 100,
              padding: [5, 8],
            },
            idx2: {
              color: '#01B599',
              backgroundColor: '#E1F7F3',
              borderRadius: 100,
              padding: [5, 8],
            },
            idx: {
              color: '#333',
              borderRadius: 100,
              padding: [5, 8],
            },
            title: {
              width: 165,
            },
          },
        },
      },
      {
        triggerEvent: true,
        show: true,
        inverse: true,
        data: getArrByKey(data, 'name'),
        axisLine: {
          show: false,
        },
        splitLine: {
          show: false,
        },
        axisTick: {
          show: false,
        },
        axisLabel: {
          interval: 0,
          color: '#fff',
          align: 'left',
          margin: 20,
          fontSize: 13,
          formatter: function (value, index) {
            return (
              ((data[index].value / data[index].sum) * 100).toFixed(2) + '/h'
            );
          },
        },
      },
    ],
    series: [
      {
        name: '条',
        type: 'bar',
        yAxisIndex: 0,
        data: data,
        barWidth: 10,
        itemStyle: {
          color: (val) => {
            if (val.dataIndex < 3 && opt.index === 0) {
              return color[val.dataIndex];
            } else {
              return '#1990FF';
            }
          },
          barBorderRadius: 30,
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

export default Bar;
