import React from 'react';
import CpuCoreChart from './CpuCoreChart';
import CpuTotalChart from './CpuTotalChart';
import MemChart from './MemChart';

class Monitor extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <CpuCoreChart timeSpan={this.props.timeSpan} />
        <CpuTotalChart timeSpan={this.props.timeSpan} />
        <MemChart timeSpan={this.props.timeSpan} />
      </div>
    )
  }
}

export default Monitor;