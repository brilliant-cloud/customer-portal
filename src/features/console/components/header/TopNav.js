import React from 'react';
import { logout } from 'app/orm/auth/login/actions';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import styles from './style/TopNav.css';

class TopNav extends React.Component {
  constructor(props) {
    super(props);
  }

  handleLogout = () => {
    let scopedToken = localStorage.getItem('scopedToken');
    this.props.dispatch(logout(scopedToken));
    localStorage.removeItem('scopedToken');
  };

  render() {
    return (
      <div>
        <Link to='/'>
          <span className={styles.logo}>
            42cloud
          </span>
        </Link>
        <span className={styles.logout} onClick={this.handleLogout}>
          登出
        </span>
      </div>
    )
  }
}

export default connect(null, null)(TopNav);
