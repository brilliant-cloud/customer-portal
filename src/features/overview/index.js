import React from 'react';
import { connect } from 'react-redux';
import Limit from './components/limit/Limit';
import Quota from './components/quota/Quota';
import Usage from './components/usage/Usage';
import { Row, Col } from 'antd';
import { getProjectQuota } from 'app/orm/nova/quota/actions';
import { getServers } from 'app/orm/nova/server/actions';

import styles from './index.css';

class Overview extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.dispatch(getProjectQuota());
    this.props.dispatch(getServers());
  }

  render() {
    return (
      <div className={styles.wrapper}>
        <Row gutter={20}>
          <Col sm={24} md={17}>
            <Limit />
            <Usage />
          </Col>
          <Col sm={24} md={7}>
            <Quota />
          </Col>
        </Row>
      </div>
    )
  }
}

export default connect(null, null)(Overview);