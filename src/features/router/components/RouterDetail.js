import React from 'react';
import { connect } from 'react-redux';
import DetailOverview from './DetailOverview';
import DetailTabs from 'features/router/components/detail-tabs';
import { getRouter } from 'app/orm/neutron/router/actions';
import { getRouterPorts } from 'app/orm/neutron/port/actions';
import { getSubnets } from 'app/orm/neutron/subnet/actions';

import styles from './style/RouterDetail.css'

class RouterDetail extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.dispatch(getRouter(this.props.match.params.id));
    this.props.dispatch(getRouterPorts(this.props.match.params.id));
    this.props.dispatch(getSubnets());
  }

  render() {
    return (
      <div className={styles.wrapper}>
        <DetailOverview />
        <DetailTabs routerID={this.props.match.params.id}/>
      </div>
    )
  }
}

export default connect(null, null)(RouterDetail);