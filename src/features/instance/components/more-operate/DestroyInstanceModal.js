import React from 'react';
import { connect } from 'react-redux';
import { Modal, Alert } from 'antd';

class DestroyInstanceModal extends React.Component {
  constructor(props) {
    super(props);
  }

  handleCancel = () => {
    this.props.handleModalCancel('destroy', false);
  };

  handleOk = () => {
    this.props.handleModalCancel('destroy', false);
  };

  render() {
    let choosedInstance = this.props.choosedInstance.selectedRows;
    let instanceName = '';
    choosedInstance.forEach(item => {
      instanceName = instanceName + ' ' + item.name;
    });
    const destroyDesc = '确定要销毁【' + instanceName + '】云主机吗？';

    return (
      <Modal
        title="销毁云主机"
        visible={this.props.visible}
        onCancel={this.handleCancel}
        onOk={this.handleOk}
      >
        <Alert
          message={`提示：${destroyDesc}`}
          type="warning"
          showIcon
        />
      </Modal>
    )
  }
}

const mapStateToProps = (state) => ({
  choosedInstance: state.features.instance.choosedInstance
});

export default connect(mapStateToProps, null)(DestroyInstanceModal);