import React from 'react';
import { connect } from 'react-redux';
import { Tabs } from 'antd';
import ConsoleLog from 'components/console-log';
import { getMonitor } from 'app/orm/influxdb/monitor/actions';
import { MONITOR_TIME_SPAN, MONITOR_TIME_STEP } from 'features/common/constants';
import styles from './index.css';
import ConsoleWindow from "./ConsoleWindow";

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


  render() {
    return (
      <Tabs
        animated={false}
        onChange={this.handleChange}
        onTabClick={this.handleTabClick}
        className={styles.detailtabs}
      >
        <TabPane tab="Console" key="log">
         <ConsoleWindow instanceID={this.props.instanceID}/>
        </TabPane>
        <TabPane tab="Console Log" key="console">
          <ConsoleLog />
        </TabPane>
      </Tabs>
    )
  }

}

export default connect(null, null)(DetailTabs);