import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from 'app/orm/auth/login/actions';
import styles from './style/HomeHeader.css';
import { Menu } from 'antd';
import { selectLogin } from 'app/selectors/orm/auth';


class HomeHeader extends React.Component {
  constructor(props) {
    super(props);
  }

  handleLogout = () => {
    const scopedToken = localStorage.getItem('scopedToken');
    this.props.dispatch(logout(scopedToken));
    localStorage.removeItem('scopedToken');
    this.props.history.push('/login');
  };

  render() {
    let isLogged = this.props.login.isLogged;
    return (
      <div>
          <span className={styles.logo}>42cloud</span>
          <Menu
            className={styles.menu}
            theme="dark"
            mode="horizontal"
            style={{ lineHeight: '64px' }}
          >
            {
              isLogged ?
                <Menu.Item>
                  <Link to="/console/overview">
                    控制台
                  </Link>
                </Menu.Item> :
                <Menu.Item>
                  <Link to="/login">
                    控制台
                  </Link>
                </Menu.Item>
            }
            {
              isLogged ?
                <Menu.Item>
                  <div onClick={this.handleLogout}>
                    Logout
                  </div>
                </Menu.Item> :
                <Menu.Item>
                  <Link to="/login">
                      Login
                  </Link>
                </Menu.Item>
            }
        </Menu>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    login: selectLogin(state)
  }
}

export default withRouter(connect(mapStateToProps, null)(HomeHeader));