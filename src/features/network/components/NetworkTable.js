import React from 'react';
import { connect } from 'react-redux';
import { selectNetworks } from 'app/selectors/orm/neutron';
import { Spin, Table } from 'antd';
import { NETWORK_TABLE_COLUMN, NETWORK_FIELD } from 'features/common/constants';

class NetworkTable extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (this.props.networks.loading) {
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
      let columns = [];
      NETWORK_TABLE_COLUMN.forEach(item => {
        let render;
        if (item === 'admin_state_up') {
          render = (text) => {
            return (
              <span>{text.toString()}</span>
            )
          }
        } else if (item === 'router:external') {
          render = (text) => {
            if (text) {
              return (
                <span>是</span>
              )
            } else {
              return (
                <span>否</span>
              )
            }
          }
        }

        columns.push({
          title: NETWORK_FIELD[item],
          dataIndex: item,
          render: render
        })
      });

      let data = [];
      let networks = this.props.networks;
      networks.items.forEach(id => {
        data.push(networks.itemsById[id]);
      });

      return (
        <Table
          columns={columns}
          dataSource={data}
          bordered
          size="middle"
          rowKey="id"
        />
      )
    }
  }
}

const mapStateToProps = (state) => ({
  networks: selectNetworks(state)
});

export default connect(mapStateToProps, null)(NetworkTable);