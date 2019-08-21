import React from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import RouterTable from 'features/router/components/RouterTable';
import RouterDetail from 'features/router/components/RouterDetail';
import { getRouters } from 'app/orm/neutron/router/actions';

class Router extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.dispatch(getRouters());
  }

  render() {
    return (
      <div>
        <Route
          path="/console/routers"
          exact
          component={RouterTable}
        />

        <Route
          path="/console/routers/:id"
          exact
          component={RouterDetail}
        />
      </div>
    )
  }
}

export default connect(null, null)(Router);