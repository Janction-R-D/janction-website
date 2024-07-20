import React, { useEffect, useRef, useState } from 'react';
import ReactEcharts from 'echarts-for-react';

const Pie = (props) => {
  const { data } = props;
  const timerRef = useRef();
  const defaultPalette = ['#DD5CCC', '#611FFC', '#00DFDF', '#00A3DF'];
  const radius = ['30%', '80%'];
  const pieOption = {
    color: defaultPalette,
    series: [
      {
        type: 'pie',
        id: 'distribution',
        radius: radius,
        label: {
          show: false,
        },
        universalTransition: true,
        animationDurationUpdate: 1000,
        data: data,
      },
    ],
  };
  const parliamentOption = (function () {
    let sum = data.reduce(function (sum, cur) {
      return sum + cur.value;
    }, 0);
    let angles = [];
    let startAngle = -Math.PI / 2;
    let curAngle = startAngle;
    data.forEach(function (item) {
      angles.push(curAngle);
      curAngle += (item.value / sum) * Math.PI * 2;
    });
    angles.push(startAngle + Math.PI * 2);
    function parliamentLayout(startAngle, endAngle, totalAngle, r0, r1, size) {
      let rowsCount = Math.ceil((r1 - r0) / size);
      let points = [];
      let r = r0;
      for (let i = 0; i < rowsCount; i++) {
        // Recalculate size
        let totalRingSeatsNumber = Math.round((totalAngle * r) / size);
        let newSize = (totalAngle * r) / totalRingSeatsNumber;
        for (
          let k = Math.floor((startAngle * r) / newSize) * newSize;
          k < Math.floor((endAngle * r) / newSize) * newSize - 1e-6;
          k += newSize
        ) {
          let angle = k / r;
          let x = Math.cos(angle) * r;
          let y = Math.sin(angle) * r;
          points.push([x, y]);
        }
        r += size;
      }
      return points;
    }
    return {
      series: {
        type: 'custom',
        id: 'distribution',
        data: data,
        coordinateSystem: undefined,
        universalTransition: true,
        animationDurationUpdate: 1000,
        renderItem: function (params, api) {
          var idx = params.dataIndex;
          var viewSize = Math.min(api.getWidth(), api.getHeight());
          var r0 = ((parseFloat(radius[0]) / 100) * viewSize) / 2;
          var r1 = ((parseFloat(radius[1]) / 100) * viewSize) / 2;
          var cx = api.getWidth() * 0.5;
          var cy = api.getHeight() * 0.5;
          var size = viewSize / 50;
          var points = parliamentLayout(
            angles[idx],
            angles[idx + 1],
            Math.PI * 2,
            r0,
            r1,
            size + 3,
          );
          return {
            type: 'group',
            children: points.map(function (pt) {
              return {
                type: 'circle',
                autoBatch: true,
                shape: {
                  cx: cx + pt[0],
                  cy: cy + pt[1],
                  r: size / 2,
                },
                style: {
                  fill: defaultPalette[idx % defaultPalette.length],
                },
              };
            }),
          };
        },
      },
    };
  })();

  const [currentOption, setCurrentOption] = useState(pieOption);

  useEffect(() => {
    if (!data?.length) {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
      return;
    }
    timerRef.current = setInterval(function () {
      setCurrentOption((_currentOption) => {
        if (_currentOption == pieOption) {
          return parliamentOption;
        }
        return pieOption;
      });
    }, 2000);
    return () => {
      clearInterval(timerRef.current);
      timerRef.current = null;
    };
  }, [data]);

  return (
    <div className="wp100 hp100">
      <ReactEcharts option={currentOption} />
    </div>
  );
};

export default Pie;
