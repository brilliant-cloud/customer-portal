import React from 'react';
import { connect } from 'react-redux';
import { selectVolumes } from 'app/selectors/orm/cinder';
import { selectServers } from 'app/selectors/orm/nova';
import { toggleVolume } from 'features/volume/actions';
import { Table, Spin } from 'antd';
import moment from 'moment';
import commonStyles from 'features/common/styles.css';
import cx from 'classnames';
import {
  VOLUME_STATUS,
  VOLUME_TABLE_COLUMN,
  VOLUME_FIELD,
  VOLUME_TYPE
} from 'features/common/constants';

class VolumesTable extends React.Component {
  constructor(props) {
    super(props);
  }

  onSelectChange = (selectedRowKeys, selectedRows) => {
    let selectedVolumes = [];
    if (selectedRows.length > 0) {
      selectedRows.forEach((row) => {
        // let index = this.props.volumes.items.indexOf(row.id);
        selectedVolumes.push(this.props.volumes.itemsById[row.id])
      });
    }
    this.props.dispatch(toggleVolume(selectedVolumes));
  };

  render() {
    // 表格列的配置描述
    let columns = [];
    VOLUME_TABLE_COLUMN.forEach(title => {

      // 表格列的排序函数
      // 表格列的渲染函数
      let sorter, render;
      if (title === 'name') {
        sorter = (a, b) => a.name.length - b.name.length;
      } else if (title === 'status') {
        render = (text) => {
          return (
            <span>
              <i className={cx(
                {
                  [commonStyles.creating]: text === 'creating',
                  [commonStyles.available]: text === 'available',
                  [commonStyles.deleting]: text === 'deleting',
                  [commonStyles.inuse]: text === 'in-use',
                }
              )}>
              </i>
              <i>
              {VOLUME_STATUS[text]}
              </i>
            </span>
          )
        }
      } else if (title === 'volume_type') {
        render = (text) => (<span>{VOLUME_TYPE[text]}</span>)
      } else if (title === 'bootable') {
        render = (text) => (<span>{text === 'true' ? '是' : '否'}</span>)
      } else if (title === 'attachments') {
        render = (text) => {
          let attachments = [];
          if (text.length > 0) {
            text.forEach(attachment => {
              let serverId = attachment['server_id'];
              let serverName = '';
              this.props.servers.items.forEach(id => {
                if (id === serverId) {
                  serverName = this.props.servers.itemsById[id].name;
                }
              });

              attachments.push(
                <span key={attachment['server_id']}>
                  {serverName}的
                  <span
                    style={{
                      'backgroundColor': '#268F3B',
                      'color': '#fff',
                      'padding': '2px 5px',
                      'borderRadius': '3px'
                    }}
                  >
                    {attachment['device']}
                  </span>
                </span>)
            })
          }
          return (<span>{attachments}</span>)
        };
      } else if (title === 'created_at') {
        render = (text) => {
          let time = moment(text).format('YYYY-MM-DD HH:mm:ss');
          return (
            <span className={commonStyles.time}>{time}</span>
          )
        }
      }

      columns.push({
        title: VOLUME_FIELD[title],
        key: title,
        dataIndex: title,
        sorter: sorter,
        render: render
      });
    });

    // 表格数据数组
    let data = [];
    let volumes = this.props.volumes;
    volumes.items.forEach(volumeId => {
      data.push(volumes.itemsById[volumeId]);
    });

    // 表格行的选择功能的配置
    const rowSelection = {
      selectedRowKeys: this.props.choosedVolumes.map(item => item.id),
      onChange: this.onSelectChange
    };

    if (this.props.volumes.loading && this.props.servers.loading) {
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
      return (
        <Table
          rowSelection={rowSelection}
          columns={columns}
          bordered={true}
          size="middle"
          dataSource={data}
          rowKey='id'
        />
      )
    }
  }
}

function mapStateToProps(state) {
  return {
    volumes: selectVolumes(state),
    servers: selectServers(state),
    choosedVolumes: state.features.volume.choosedVolumes,
  }
}

export default connect(mapStateToProps, null)(VolumesTable);
