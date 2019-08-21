import React from 'react';
import { connect } from 'react-redux';
import { Tabs, Radio } from 'antd';
import ConsoleLog from 'components/console-log';
import Monitor from 'components/monitor';
import { getMonitor } from 'app/orm/influxdb/monitor/actions';
import { MONITOR_TIME_SPAN, MONITOR_TIME_STEP } from 'features/common/constants';
import { filterTimeSpan } from 'features/instance/actions';
import styles from './index.css';

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const TabPane = Tabs.TabPane;

class DetailTabs extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      timeSpan: '1hour'
    }
  }

  handleTabClick = (key, timeRange) => {
    timeRange = timeRange ? timeRange : '1hour';
    if (key === 'monitor') {
      this.props.dispatch(
        getMonitor(
          this.props.instanceID, MONITOR_TIME_SPAN[timeRange], MONITOR_TIME_STEP[timeRange]
        )
      )
    }
  };

  handleChangeRadio = (event) => {
    event.preventDefault();
    // this.props.dispatch(filterTimeSpan(event.target.value));
    this.setState({
      timeSpan: event.target.value
    });
    this.handleTabClick('monitor', event.target.value);
  };

  render() {
    return (
      <Tabs
        animated={false}
        onChange={this.handleChange}
        onTabClick={this.handleTabClick}
        className={styles.detailtabs}
      >
        <TabPane tab="Console Log" key="log">
          <ConsoleLog />
        </TabPane>

        <TabPane tab="Monitor" key="monitor">
          <RadioGroup
            defaultValue="1hour"
            onChange={this.handleChangeRadio}
          >
            <RadioButton value="1hour">Last Hour</RadioButton>
            <RadioButton value="6hours">Last Six Hours</RadioButton>
            <RadioButton value="1day">Last Day</RadioButton>
            <RadioButton value="1month">Last Month</RadioButton>
            <RadioButton value="6months">Last Six Months</RadioButton>
            <RadioButton value="1year">Last Year</RadioButton>
          </RadioGroup>
          <Monitor timeSpan={this.state.timeSpan} />
        </TabPane>
      </Tabs>
    )
  }

}

export default connect(null, null)(DetailTabs);