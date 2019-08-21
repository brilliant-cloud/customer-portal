import React from 'react';
import { connect } from 'react-redux';
import { selectConsoleOutput } from 'app/selectors/orm/nova';
import { Spin } from 'antd';

import styles from './index.css';

class ConsoleLog extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (this.props.consoleOutput.loading) {
      return (
        <Spin />
      )
    } else {
      let data = this.props.consoleOutput.data;
      let logNode = [];
      if (data) {
        let log = data.split('\n');
        log.forEach((ele, index) => {
          logNode.push(
            <div key={index}>{ele}</div>
          )
        });
      } else {
        logNode.push(
          <div key="null">暂无日志</div>
        )
      }
      return (
        <div className={styles.log}>
          {logNode}
        </div>
      )
    }
  }
}

const mapStateToProps = (state) => {
  return {
    consoleOutput: selectConsoleOutput(state),
  }
};

export default connect(mapStateToProps, null)(ConsoleLog);