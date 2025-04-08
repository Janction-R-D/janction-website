import React, { useMemo } from 'react';
import ReactEcharts from 'echarts-for-react';
import useScale from '../../../hooks/useScale';

const DevicePie = (props) => {
  const { data = [] } = props;
  const { scale, isPC } = useScale();

  const series = useMemo(() => {
    return [
      {
        name: '',
        type: 'pie',
        radius: ['58%', '66%'],
        center: ['50%', 'center'],
        percentPrecision: 0,
        itemStyle: {
          normal: {
            borderRadius: '50%',
            borderColor: 'transparent',
            borderWidth: scale * 20,
            label: {
              position: 'outter',
              fontFamily: 'Poppins',
              fontWeight: 500,
              fontSize: scale * (isPC ? 32 : 12),
              lineHeight: scale * (isPC ? 48 : 18),
              color: '#FFFFFF',
              formatter: '{d}%',
              // distanceToLabelLine: 0,
            },
            labelLine: {
              show: false,
            },
          },
        },
        data: data,
      },
    ];
  }, [data]);

  let option = {
    title: {
      text: 'Device Status',
      subtext: 'Public GPU Nodes',
      left: 'center',
      top: '44%',
      textStyle: {
        fontFamily: 'Poppins',
        fontWeight: 700,
        fontSize: scale * (isPC ? 32 : 14),
        lineHeight: scale * (isPC ? 48 : 21),
        color: '#FFFFFF',
      },
      subtextStyle: {
        fontFamily: 'Poppins',
        fontWeight: 500,
        fontSize: scale * (isPC ? 20 : 12),
        lineHeight: scale * (isPC ? 30 : 18),
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
    series,
  };

  return (
    <div className="wp100 hp100">
      <ReactEcharts option={option} />
    </div>
  );
};

export default DevicePie;
