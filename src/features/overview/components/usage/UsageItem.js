import React from 'react';
import { connect } from 'react-redux';
import { Table, Spin } from 'antd';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { selectServers } from 'app/selectors/orm/nova';
import styles from './style/UsageItem.css';
import { TENANT_USAGE_TABLE_COLUMN, TENANT_USAGE_FIELD } from 'features/common/constants';

class UsageItem extends React.Component {
  constructor(props) {
    super(props);
  }

  render () {
    if (this.props.servers.loading) {
      return (
        <Spin />
      )
    } else {
      let serversId = this.props.servers.items;
      let columns = [];
      TENANT_USAGE_TABLE_COLUMN.forEach((title) => {
        let render;
        if (title === 'name') {
          render = (text, record) => {
            if (serversId.indexOf(record.instance_id) !== -1) {
              return (
                <Link to={"/console/instances/" + record.instance_id}>
                  <span>{text}</span>
                </Link>
              )
            } else {
              return (
                <span>
                  {text}
                  <span className={styles.deleted}>(已删除)</span>
                </span>
              )
            }
          }
        }

        columns.push({
          title: TENANT_USAGE_FIELD[title],
          dataIndex: title,
          render
        })
      });

      let data = [];
      if (this.props.tenantUsage.hasOwnProperty('server_usages')) {
        this.props.tenantUsage.server_usages.forEach((ele) => {
          let obj = {};
          obj['instance_id'] = ele.instance_id;
          TENANT_USAGE_TABLE_COLUMN.forEach((key) => {
            if (key === 'started_at') {
              obj[key] = moment(ele[key]).startOf('day').fromNow();
            } else if (key === 'hours') {
              obj[key] = Math.floor(ele[key]) + ' 小时';
            } else {
              obj[key] = ele[key];
            }
          });
          data.push(obj);
        });
      } else {
        data = [];
      }

      return (
        <Table
          className={styles.item}
          columns={columns}
          dataSource={data}
          size="middle"
          rowKey="instance_id"
        />
      )

    }
  }
}

const mapStateToProps = (state) => {
  return {
    servers: selectServers(state)
  }
};
export default connect(mapStateToProps, null)(UsageItem);