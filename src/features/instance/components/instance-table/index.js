import React from 'react'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import moment from 'moment';
import { uniqueArr } from 'app/commons/common';

import { operateServer } from 'app/orm/nova/server/actions';

import { selectServers, selectFlavors } from 'app/selectors/orm/nova';
import { selectImages } from 'app/selectors/orm/glance';

import { choosedInstance } from 'features/instance/actions';

import { Table, Spin } from 'antd';
import {
  INSTANCE_TABLE_COLUMN,
  INSTANCE_FIELD,
  INSTANCE_STATUS } from 'features/common/constants';

import cx from 'classnames';

import commonStyles from 'features/common/styles.css';

class InstanceTable extends React.Component {
  constructor(props) {
    super(props);
  }

  // 选择列表项时的处理函数
  handleSelectChange = (selectedRowKeys, selectedRows) => {
    this.props.dispatch(choosedInstance(selectedRows));
  };

  //
  render() {
    if (this.props.servers.loading ||
      this.props.flavors.loading ||
      this.props.images.loading) {
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
      // 列表项选择配置
      const rowSelection = {
        onChange: this.handleSelectChange,
      };

      // 表格列的描述数据
      let columns = [];
      INSTANCE_TABLE_COLUMN.forEach(col => {
        let sorter, render, className;
        if (col === 'name') {
          sorter = (a, b) => a.name.length - b.name.length;
          render = (text, record) => {
            return (
              <Link to={"/console/instances/" + record.id}>
                <span>{text}</span>
              </Link>
            )
          }
        } else if (col === 'image') {
          render = (text, record) => {
            return (
              <Link to={'/console/images/' + record.image.id}>
                <span>{text.name}</span>
              </Link>
            )
          }
        } else if (col === 'security_groups') {
          render = (text) => {
            if (text) {
              let sgArr = text.map(sg => sg.name);
              sgArr = uniqueArr(sgArr);
              return (
                <div>{sgArr.join(',')}</div>
              )
            } else {
              return (
                <div>-</div>
              )
            }
          }
        } else if (col === 'addresses') {
          render = (text) => {
            if (text) {
              let ipNames = Object.keys(text);
              let ipArrs = [];
              ipNames.forEach(name => {
                ipArrs.push(<div key={name}>
                  <span>{name}: </span>
                  <span>{text[name][0].addr}</span>
                </div>)
              });
              return (
                <div>{ipArrs}</div>
              )
            } else {
              return (
                <div>无</div>
              )
            }
          }
        } else if (col === 'status') {
          render = (text) => {
            return (
              <span>
                <i className={cx(
                  {
                    [commonStyles.active]: text === 'ACTIVE',
                    [commonStyles.shutoff]: text === 'SHUTOFF',
                    [commonStyles.build]: text === 'BUILD'
                  }
                )}>
                </i>
                <i>{INSTANCE_STATUS[text]}</i>
                <i>{text}</i>
              </span>
            )
          }
        } else if (col === 'created') {
          className = commonStyles.time;
        }

        columns.push({
          title: INSTANCE_FIELD[col],
          key: col,
          dataIndex: col,
          sorter: sorter,
          render: render,
          className: className,
        })
      });


      // 表格数据
      let servers = this.props.servers;
      let flavors = this.props.flavors;
      let images = this.props.images;
      let dataArrs = [];
      servers.items.forEach((serverId) => {
        let server = servers.itemsById[serverId];
        let data = {};
        INSTANCE_TABLE_COLUMN.forEach(col => {
          data['id'] = serverId;
          if (col === 'flavor') {
            data[col] = flavors.itemsById[server.flavor.id].name;
          } else if (col === 'image') {
            data[col] = images.itemsById[server.image.id];
          } else if (col === 'status') {
            data[col] = server.status;
          } else if (col === 'created') {
            if (server.hasOwnProperty('created')) {
              data[col] = moment(server.created).format('YYYY-MM-DD HH:mm:ss');
            } else {
              data[col] = '';
            }
          } else {
            if (server.hasOwnProperty(col)) {
              data[col] = server[col];
            } else {
              data[col] = '';
            }
          }
        });
        dataArrs.push(data);
      });

      //
      return (
          <Table
            rowSelection={rowSelection}
            bordered
            size="middle"
            columns={columns}
            dataSource={dataArrs}
            rowKey='id'
          />
      )
    }
  }
}

const mapStateToProps = (state) => ({
  servers: selectServers(state),
  flavors: selectFlavors(state),
  images: selectImages(state)
});

export default connect(mapStateToProps, null)(InstanceTable);
