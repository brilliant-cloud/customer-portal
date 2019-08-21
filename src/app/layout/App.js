import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';
import Home from 'features/home/';
import Login from 'features/login';
import Console from 'features/console';
import { loadTokenData } from 'app/orm/auth/login/actions';
import { selectLogin } from 'app/selectors/orm/auth'
import { decideIfLogged } from 'app/commons/common';

const PrivateRoute = ({ component: Component, authed, ...rest }) => (
  <Route {...rest} render={(para) => {
    return (
      authed ?
      <Component {...para} /> :
      <Redirect to={{
        pathname: '/login',
        state: { referrer: para.location.pathname }
      }}/>
    );
  }} />
);

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let isLogged = this.props.login.isLogged ? true : decideIfLogged();


    return (
      <BrowserRouter>
        <div style={{height: '100%'}}>
          <Route exact path='/' component={Home} />
          <Route path='/login' component={Login} />

          <PrivateRoute
            authed={isLogged}
            path='/console/:feature'
            component={Console}
          />
        </div>
      </BrowserRouter>
    )
  }
}

function mapStateToProps(state) {
  return {
    login: selectLogin(state)
  }
}

export default connect(mapStateToProps, null)(App);