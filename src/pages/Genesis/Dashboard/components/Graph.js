import ReactECharts from 'echarts-for-react';
export function Graph() {
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
      data: [
        '2024-09-01 10:00',
        '2024-09-01 11:00',
        '2024-09-01 12:00',
        '2024-09-01 13:00',
        '2024-09-01 14:00',
        '2024-09-01 15:00',
        '2024-09-01 16:00',
        '2024-09-01 17:00',
      ],

      axisLabel: {
        show: false,
      },
      axisLine: {
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
        data: [22.1, 82.5, 18.3, 62.9, 42.7, 13.0, 53.1223, 32.8],
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
        height: '170px',
        width: '60%',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <ReactECharts
        option={option}
        style={{ height: '240px', width: '100%' }}
      />
    </div>
  );
}
