import moment from 'moment';

export const getOption = (monitorResults, timeSpan) => {

  let timeFormat = 'YYYY-MM-DD HH:mm:ss';
  let maxTime = moment().format(timeFormat);
  let minTime = '';

  switch(timeSpan) {
    case '1hour':
      minTime = moment(maxTime).subtract(1, 'h').format(timeFormat);
      break;
    case '6hours':
      minTime = moment(maxTime).subtract(6, 'h').format(timeFormat);
      break;
    case '1day':
      minTime = moment(maxTime).subtract(1, 'd').format(timeFormat);
      break;
    case '1month':
      minTime = moment(maxTime).subtract(1, 'M').format(timeFormat);
      break;
    case '6months':
      minTime = moment(maxTime).subtract(6, 'M').format(timeFormat);
      break;
    case '1year':
      minTime = moment(maxTime).subtract(1, 'y').format(timeFormat);
      break;
    default:
      minTime = ''
  }

  let seriesData = [];
  monitorResults.forEach(item => {
    if (item.hasOwnProperty('series')) {
      item.series.forEach(s => {
        let name = s.tags['type'] + '/' + s.tags['type_instance'];
        let data = s.values;
        seriesData.push({
          name,
          data,
          type: 'line',
          smooth: true,
          showSymbol: false,
          hoverAnimation: false,
          lineStyle: {
            normal: {
              width: 1
            }
          },
          // areaStyle: {
          //   normal: {
          //     color: 'rgba(128, 128, 128, 0.5)'
          //   }
          // }
        })
      })
    }
  });


  let legendData = [];
  if (seriesData.length >0) {
    seriesData.forEach(item => {
      legendData.push(item.name)
    })
  }

  return {
    title: {
      text: ''
    },
    tooltip: {
      trigger: 'axis',
      padding: 10,
      textStyle: {
        fontSize: 12
      },
      formatter: function(params) {
        params = params[0];
        let date = moment(params.data[0]).format(timeFormat);
        let value = params.seriesName + ': ' + params.data[1].toFixed(4);
        return `${date}<br />${value}`;
      }
    },
    legend: {
      data: legendData
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: {
      type: 'time',
      boundaryGap: false,
      min: minTime,
      max: maxTime
      // data: xAxisData,
    },
    yAxis: {
      type: 'value'
    },
    series: seriesData
  }
};

