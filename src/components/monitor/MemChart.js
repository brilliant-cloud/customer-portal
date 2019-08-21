import React from 'react';
import { connect } from 'react-redux';
import { selectMonitor } from 'app/selectors/orm/influxdb'
import { getOption } from './common';
import { Spin } from 'antd';

import ReactEchartsCore from 'echarts-for-react/lib/core';
import echarts from 'echarts';

function MemChart(props) {
  if (props.monitor.vmem.loading ||
    props.monitor.vcpuCore.loading ||
    props.monitor.vcpuTotal.loading) {
    return(
      <Spin />
    )
  } else {
    return(
      <ReactEchartsCore
        echarts={echarts}
        style={{height: '260px'}}
        option={getOption(props.monitor.vmem.data, props.timeSpan)}
      />
      )
  }
}

const mapStateToProps = (state) => {
  return {
    monitor: selectMonitor(state)
  }
};

export default connect(mapStateToProps, null)(MemChart);