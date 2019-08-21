import React from 'react';
import { connect } from 'react-redux';
import { Route, Link } from 'react-router-dom';
import SideNav from './components/sider/SideNav';
import TopNav from './components/header/TopNav';
import { BREADCRUMB_FIELD, CONSOLE_ROUTES } from 'features/common/constants';
import { Layout, Breadcrumb } from 'antd';
import { selectNotifications } from 'app/selectors/features/notify';
import { closeNotification } from './actions';
import styles from './index.css';

const { Header, Sider, Content } = Layout;

class Console extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidUpdate() {
    this.props.notifications.forEach(item => {
      if (!item.willChange) {
        setTimeout(() => {
          this.props.dispatch(closeNotification(item.id));
        }, 2000)
      }
    })
  }

  render() {
    let feature = this.props.match.params.feature;

    let notifyArrs = [];
    this.props.notifications.forEach(item => {
      let bgColor = 'yellow';
      if (item.payload.status === 'ACTIVE') {
        bgColor = 'green';
      } else if (item.payload.status === 'ERROR') {
        bgColor = 'red';
      }
      notifyArrs.push(
        <div
          style={{
            'backgroundColor': bgColor
          }}
          key={item.id}
        >
          {item.action}: {item.id}
        </div>
      )
    });

    return (
      <Layout
        style={{'flexDirection': 'column'}}
        className={styles.layout}
      >
        <Header className={styles.header}>
          <TopNav />
        </Header>

        <div
          style={{
            'position': 'fixed',
            'top': '50px',
            'right': '20px'
          }}
        >
          {notifyArrs}
        </div>

        <Sider className={styles.sider}>
          <SideNav selected={feature} />
        </Sider>

        <Content className={styles.content}>
          <Breadcrumb className={styles.breadcrumb}>
            <Breadcrumb.Item>
              <Link to="/">{BREADCRUMB_FIELD['console']}</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              <Link to={"/console/" + [feature]}>{BREADCRUMB_FIELD[feature]}</Link>
            </Breadcrumb.Item>
          </Breadcrumb>

          <Route
            path="/console/:feature"
            component={CONSOLE_ROUTES[feature]}
          />
        </Content>
      </Layout>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    notifications: selectNotifications(state)
  }
};
export default connect(mapStateToProps, null)(Console);
