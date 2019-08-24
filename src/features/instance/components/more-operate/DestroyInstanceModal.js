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
    const destroyDesc = 'Determined to destroy【' + instanceName + '】Cloud host？';

    return (
      <Modal
        title="Destroy Cloud Host"
        visible={this.props.visible}
        onCancel={this.handleCancel}
        onOk={this.handleOk}
        okText={"Destroy"}
        cancelText={"Cancel"}
      >
        <Alert
          message={`Prompt：${destroyDesc}`}
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