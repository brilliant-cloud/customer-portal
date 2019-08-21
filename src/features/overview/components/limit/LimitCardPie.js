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

      // 是否顺时针排布
      clockWise: true,

      // 饼图的内半径
      radius: [30, 35],

      // 图形样式，有 normal 和 emphasis 两个状态。
      // normal 是图形在默认状态下的样式；
      // emphasis 是图形在高亮状态下的样式
      itemStyle: dataStyle,

      // 是否开启 hover 在扇区上的放大动画效果
      hoverAnimation: false,

      data: [{
        value: data.in_use,
        name: '已用',
        itemStyle: usedHolderStyle
      }, {
        value: data.limit - data.in_use,
        name: '未用',
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
