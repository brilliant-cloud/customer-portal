import React from 'react';
import { connect } from 'react-redux';
import { selectRouter } from 'app/selectors/orm/neutron';
import { ROUTER_FIELD } from 'features/common/constants';
import { Spin } from 'antd';
import styles from './style/DetailOverview.css';

function DetailOverview(props) {

  if (props.router.loading) {
    return (
      <div
        style={{
          'textAlign': 'center'
        }}
      >
        <Spin />
      </div>
    )
  } else {
    let router = props.router.data;
    return (
      <div className={styles.overview}>
        <div className={styles.title}>路由器详情</div>

        <div className={styles.basic}>
          <p>
            <span>{ROUTER_FIELD['name']}：</span>
            <span>{router.name}</span>
          </p>

          <p>
            <span>{ROUTER_FIELD['status']}：</span>
            <span>{router.status}</span>
          </p>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  router: selectRouter(state)
});
export default connect(mapStateToProps, null)(DetailOverview);