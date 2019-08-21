import React from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';

import { getServers, getServer } from 'app/orm/nova/server/actions';
import { getImages } from 'app/orm/glance/image/actions';
import { getFlavors } from 'app/orm/nova/flavor/actions';

import MoreOperate from 'features/instance/components/more-operate';
import StartStopInstance from 'features/instance/components/start-stop-instance';
import CreateInstance from 'features/instance/components/create-instance';
import InstanceTable from 'features/instance/components/instance-table';

import InstanceDetail from 'features/instance/components/instance-detail';
import commonStyles from 'features/common/styles.css';

class Instance extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.dispatch(getServers());
    this.props.dispatch(getImages());
    this.props.dispatch(getFlavors());
  }

  render() {
    const InstanceHome = () => {
      return (
        <div className={commonStyles.wrapper}>
          <div className={commonStyles.toolbar}>
            <CreateInstance />
            <StartStopInstance />
            <MoreOperate />
          </div>

          <InstanceTable />
        </div>
      )
    };

    return (
      <div>
        <Route
          path="/console/instances"
          exact
          component={InstanceHome}
        />

        <Route
          path="/console/instances/:id"
          exact
          component={InstanceDetail}
        />
      </div>
    )
  }
}

export default connect(null, null)(Instance);