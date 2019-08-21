import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { selectRouters } from 'app/selectors/orm/neutron';
import { Spin, Table } from 'antd';
import { ROUTER_FIELD, ROUTER_TABLE_COLUMN } from 'features/common/constants';
import commonStyles from 'features/common/styles.css';

function RouterTable(props) {
    if (props.routers.loading) {
      return(
        <div
          style={{
            'textAlign': 'center'
          }}
        >
          <Spin />
        </div>
      )
    } else {
      const columns = [];
      ROUTER_TABLE_COLUMN.forEach(item => {
        let render;
        if (item === 'name') {
          render = (text, record) => {
            return (
              <Link to={"/console/routers/" + record.id}>
                <span>{text}</span>
              </Link>
            )
          }
        } else if (item === 'external_gateway_info') {
          render = (text) => {
            let ipArrs = [];
            if (text) {
              text['external_fixed_ips'].forEach(ip => {
                ipArrs.push(
                  <div key={ip['ip_address']}>
                    {ip['ip_address']}
                  </div>
                )
              });
            }
            return (
              <span>{ipArrs}</span>
            )
          };
        } else if (item === 'admin_state_up') {
          render = (text) => {
            return (
              <span>{text.toString()}</span>
            )
          }
        }

        columns.push({
          title: ROUTER_FIELD[item],
          dataIndex: item,
          render: render
        })
      });

      const data = [];
      let routers = props.routers;
      routers.items.forEach(id => {
        data.push(routers.itemsById[id])
      });

      return(
        <div className={commonStyles.wrapper}>
          <Table
            columns={columns}
            dataSource={data}
            bordered
            size="middle"
            rowKey="id"
          />
        </div>
      )
    }
}

const mapStateToProps = (state) => {
  return {
    routers: selectRouters(state)
  }
};

export default connect(mapStateToProps, null)(RouterTable);