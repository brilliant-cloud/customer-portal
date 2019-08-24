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


  handleOperateCancel = () => {
    this.removeSelectedServers();
  };


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


  handleOperate = (params, data) => {
    let notice = [];
    if (params === 'start') {
      data.forEach(item => {
        notice.push(item.name);
      });
      notice = `Are you sure you want to start the【${notice.join(',')}】？`;
      this.setState({
        operate: {
          visible: true,
          type: 'start',
          title: 'Start Cloud Host',
          notice,
        },
        start: data
      })
    } else if (params === 'stop') {
      data.forEach(item => {
        notice.push(item.name);
      });
      notice = `Are you sure you want to turn off【${notice.join(',')}】？`;
      this.setState({
        operate: {
          visible: true,
          type: 'stop',
          title: 'Stop Cloud Host',
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
          okText="Ok"
          cancelText="Cancel"
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
          Start Up
        </Button>

        <Button
          disabled={stopArr.length === 0}
          type="primary"
          icon="poweroff"
          onClick={() => this.handleOperate('stop', stopArr)}
          className={commonStyles.button}
        >
          Shut Down
        </Button>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  selectedRows: state.features.instance.choosedInstance
});
export default connect(mapStateToProps, null)(StartStopOperate);