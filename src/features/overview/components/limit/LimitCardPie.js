import React from 'react';
import ReactEchartsCore from 'echarts-for-react/lib/core';
import echarts from 'echarts';

let cardColors = {
  instances: '#24CAA1',
  ram: '#EB4B4B',
  cores: '#2EB7F3'
};

const getOption = (data, colorKey) => {
  let dataStyle = {
    normal: {
      label: {
        show: false
      },
      labelLine: {
        show: false
      }
    }
  };

  let usedHolderStyle = {
    normal: {
      color: cardColors[colorKey]
    }
  };

  let unusedHolderStyle = {
    normal: {
      color: '#ECECEC'
    }
  };

  let usedPercent = data.in_use / data.limit;
  usedPercent = (parseFloat(usedPercent.toFixed(2)) * 100).toFixed(0) + '%';
  return {
    title: {
      text: usedPercent,
      textStyle: {
        color: '#505A66',
        fontSize: 18
      },
      x: 'center',
      y: 'center',
    },
    series: [{
      name: 'Line 1',
      type: 'pie',


      clockWise: true,


      radius: [30, 35],


      itemStyle: dataStyle,


      hoverAnimation: false,

      data: [{
        value: data.in_use,
        name: 'Used',
        itemStyle: usedHolderStyle
      }, {
        value: data.limit - data.in_use,
        name: 'Unused',
        itemStyle: unusedHolderStyle
      }]
    }]
  };
};

function LimitCardPie(props) {
  return (
    <ReactEchartsCore
      style={{display: 'inline-block',
        backgroundColor: '#fff',
        float: 'left',
        height: '100px',
        width: '100px'}}
      echarts={echarts}
      option={getOption(props.data, props.color)}
    />
  )
}

export default LimitCardPie;
