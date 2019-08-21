import React from 'react';
import { connect } from 'react-redux';
import { Modal, Button } from 'antd';
import commonStyles from 'features/common/styles.css';

import { operateServer } from 'app/orm/nova/server/actions';

class StartStopOperate extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      operate: {
        visible: false,
        type: '',
        title: '',
        notice: []
      },
      stop: [],
      start: [],
      selectedServers: [],
    }
  }

  // 关闭操作云主机的弹出框
  handleOperateCancel = () => {
    this.removeSelectedServers();
  };

  // 清空已选择云主机的列表项
  removeSelectedServers = () => {
    this.setState({
      operate: {
        visible: false,
        type: '',
        title: '',
        notice: []
      },
      stop: [],
      start: [],
      selectedServers: [],
    })
  };

  // 启动和关闭云主机的http请求
  handleOperateOk = () => {
    let operateType = this.state.operate.type;
    let serversID = [];
    if (operateType === 'start') {
      this.state.start.forEach(item => {
        serversID.push(item.id);
      });
      this.props.dispatch(operateServer('start', serversID))
    } else if (operateType === 'stop') {
      this.state.stop.forEach(item => {
        serversID.push(item.id);
      });
      this.props.dispatch(operateServer('stop', serversID))
    }
    this.removeSelectedServers();
  };

  // 操作云主机
  handleOperate = (params, data) => {
    let notice = [];
    if (params === 'start') {
      data.forEach(item => {
        notice.push(item.name);
      });
      notice = `你确定要启动云主机【${notice.join(',')}】吗？`;
      this.setState({
        operate: {
          visible: true,
          type: 'start',
          title: '启动云主机',
          notice,
        },
        start: data
      })
    } else if (params === 'stop') {
      data.forEach(item => {
        notice.push(item.name);
      });
      notice = `你确定要关闭云主机【${notice.join(',')}】吗？`;
      this.setState({
        operate: {
          visible: true,
          type: 'stop',
          title: '关闭云主机',
          notice,
        },
        stop: data
      })
    }
  };

  render() {
    let selectedRowsArr = this.props.selectedRows['selectedRows'];
    let stopArr = [];
    let startArr = [];
    let selectedServersArr = [];
    if (selectedRowsArr.length) {
      selectedRowsArr.forEach(item => {
        if (item.status === 'ACTIVE') {
          stopArr.push(item);
          selectedServersArr.push(item.id);
        } else if (item.status === 'SHUTOFF') {
          startArr.push(item);
          selectedServersArr.push(item.id);
        }
      })
    }

    return (
      <div>
        <Modal
          title={this.state.operate.title}
          visible={this.state.operate.visible}
          onOk={this.handleOperateOk}
          onCancel={this.handleOperateCancel}
        >
          <p>{this.state.operate.notice}</p>
        </Modal>

        <Button
          disabled={startArr.length === 0}
          type="primary"
          icon="caret-right"
          onClick={() => this.handleOperate('start', startArr)}
          className={commonStyles.button}
        >
        启动
        </Button>

        <Button
          disabled={stopArr.length === 0}
          type="primary"
          icon="poweroff"
          onClick={() => this.handleOperate('stop', stopArr)}
          className={commonStyles.button}
        >
          关机
        </Button>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  selectedRows: state.features.instance.choosedInstance
});
export default connect(mapStateToProps, null)(StartStopOperate);