import React from 'react';
import { connect } from 'react-redux';
import NetworkTable from './components/NetworkTable'
import { getNetworks } from 'app/orm/neutron/network/actions';

import commonStyles from 'features/common/styles.css';

class Network extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.dispatch(getNetworks());
  }

  render() {
    return (
      <div
        className={commonStyles.wrapper}
      >
        <NetworkTable />
      </div>
    )
  }
}

export default connect(null, null)(Network);