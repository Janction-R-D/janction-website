import React from 'react';
import ReactEcharts from 'echarts-for-react';
import { MONTH } from '@/constant';

const Bar = (props) => {
  // useEffect(() => {
  //   window.addEventListener('resize', function () {
  //     myChart.resize();
  //   });
  // }, []);

  let option = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
      },
    },
    grid: {
      top: '5%',
      bottom: '8%',
      left: '8%',
      right: '5%',
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: MONTH.map((item) => item.label),
      axisLabel: {
        color: '#92929D',
        fontSize: 17.79,
      },
      axisLine: false,
    },
    yAxis: {
      type: 'value',
      axisLabel: {
        formatter: '${value}',
        color: '#92929D',
        fontSize: 17.79,
        padding: [0, 30, 0, 0],
      },

      axisPointer: {
        snap: true,
      },
      splitLine: false,
    },
    series: [
      {
        name: 'Earnings',
        type: 'line',
        smooth: true,
        data: [300, 280, 250, 260, 270, 300, 550, 500, 400, 390, 380, 390],
        symbol: 'none',
        lineStyle: {
          color: '#fff',
          width: 4,
        },
        markArea: {
          itemStyle: {
            color: '#333333',
          },
          data: [
            [
              {
                xAxis: 'Jan',
              },
              {
                xAxis: 'Feb',
              },
            ],
            [
              {
                xAxis: 'Mar',
              },
              {
                xAxis: 'Apr',
              },
            ],
            [
              {
                xAxis: 'May',
              },
              {
                xAxis: 'Jun',
              },
            ],
            [
              {
                xAxis: 'Jul',
              },
              {
                xAxis: 'Aug',
              },
            ],
            [
              {
                xAxis: 'Sep',
              },
              {
                xAxis: 'Oct',
              },
            ],
            [
              {
                xAxis: 'Nov',
              },
              {
                xAxis: 'Dec',
              },
            ],
          ],
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
