import React from 'react';
import { connect } from 'react-redux';
import { Spin } from 'antd';
import { selectMonitor } from 'app/selectors/orm/influxdb';
import { getOption } from './common';

import ReactEchartsCore from 'echarts-for-react/lib/core';
import echarts from 'echarts';

function CpuTotalChart(props) {
  if (props.monitor.vcpuTotal.loading ||
    props.monitor.vcpuCore.loading ||
    props.monitor.vmem.loading) {
    return(
      <Spin />
    )
  } else {
    return(
      <ReactEchartsCore
        echarts={echarts}
        style={{height: '260px'}}
        option={getOption(props.monitor.vcpuTotal.data, props.timeSpan)}
      />
    )
  }
}

const mapStateToProps = (state) => {
  return {
    monitor: selectMonitor(state),
  }
};
export default connect(mapStateToProps, null)(CpuTotalChart);