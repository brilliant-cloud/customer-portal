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
                     kind="云主机"
          />
          </Col>

          <Col xs={12} md={12} xl={6}>
          <LimitCard data={quotaSetData.cores}
                     colorKey='cores'
                     kind="CPU核"
          />
          </Col>

          <Col xs={12} md={12} xl={6}>
          <LimitCard data={quotaSetData.ram}
                     colorKey='ram'
                     kind="内存"
          />
          </Col>

          <Col xs={12} md={12} xl={6}>
          <LimitCard data={quotaSetData.security_groups}
                     colorKey='securityGroups'
                     kind="安全组"
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