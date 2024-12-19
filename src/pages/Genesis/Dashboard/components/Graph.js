import ReactECharts from 'echarts-for-react';
import { useMemo } from 'react';
import { isEmpty } from '@/utils/lang';

export function Graph({ data, lessorsData }) {
  console.log(data);
  const echartsData = useMemo(() => {
    if (isEmpty(lessorsData))
      return {
        xData: [],
        yData: [],
      };
    // const data = {
    //   '2024-12-19': 10,
    //   '2024-12-20': 20,
    //   '2024-12-22': 10,
    //   '2024-12-25': 30,
    // };
    let keys = Object.keys(data || {}) || [];
    let values = Object.values(data || {}) || [];

    return {
      keys,
      values,
    };
  }, [data]);
  console.log(echartsData);
  const option = {
    tooltip: {
      trigger: 'axis',
      formatter: function (params) {
        const date = params[0].name;
        const price = params[0].value;
        return `Time: ${date}<br/>Price: ¥${price}`;
      },
      label: {
        backgroundColor: '#19191A',
      },
    },
    xAxis: {
      type: 'category',
      data: echartsData.keys,

      axisLabel: {
        show: false,
      },
      axisLine: {
        show: false,
      },
      axisTick: {
        show: false,
      },
    },
    yAxis: {
      type: 'value',
      splitLine: {
        show: false,
      },
      axisLabel: {
        show: false,
      },
    },
    series: [
      {
        data: echartsData.values,
        areaStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              { offset: 0, color: 'rgba(0, 170, 255, 1)' },
              { offset: 1, color: 'rgba(0, 170, 255, 0)' },
            ],

            global: false,
          },
        },
        type: 'line',
      },
    ],
  };
  return (
    <div
      style={{
        height: '200px',
        width: '60%',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <ReactECharts option={option} style={{ height: '100%', width: '90%' }} />
    </div>
  );
}
