import React from 'react';
import { connect } from 'react-redux';
import LimitCard from './LimitCard';
import { selectQuotaSet } from 'app/selectors/orm/nova';
import { Spin, Row, Col } from 'antd';

class Limit extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (this.props.quotaSet.loading) {
      return (
        <Spin />
      )
    } else {
      let quotaSetData = this.props.quotaSet.data;
      return (
        <Row gutter={20}>
          <Col xs={12} md={12} xl={6}>
          <LimitCard data={quotaSetData.instances}
                     colorKey='instances'
                     kind="Instances"
          />
          </Col>

          <Col xs={12} md={12} xl={6}>
          <LimitCard data={quotaSetData.cores}
                     colorKey='cores'
                     kind="CPU Cores"
          />
          </Col>

          <Col xs={12} md={12} xl={6}>
          <LimitCard data={quotaSetData.ram}
                     colorKey='ram'
                     kind="RAM"
          />
          </Col>

          <Col xs={12} md={12} xl={6}>
          <LimitCard data={quotaSetData.security_groups}
                     colorKey='securityGroups'
                     kind="Security Groups"
          />
          </Col>
        </Row>
      )
    }
  }
}

function mapStateToProps(state) {
  return {
    quotaSet: selectQuotaSet(state),
  }

}
export default connect(mapStateToProps, null)(Limit);