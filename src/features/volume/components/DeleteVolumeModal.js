import React from 'react';
import { connect } from 'react-redux';
import { Modal, Alert } from 'antd';
import { deleteVolume } from 'app/orm/cinder/volume/actions';
import { toggleVolume } from 'features/volume/actions';


class DeleteVolumeModal extends React.Component {
  constructor(props) {
    super(props);

    this.handleOk = this.handleOk.bind(this);
  }

  handleOk() {
    this.props.dispatch(deleteVolume(this.props.choosedVolumes));
    this.handleCancel();
    this.props.dispatch(toggleVolume([]));
  }

  handleCancel = () => {
    this.props.handleModalCancel('delete', false)
  };

  render() {
    let namesArr = [];
    if (this.props.choosedVolumes.length > 0) {
      this.props.choosedVolumes.forEach((ele) => {
        namesArr.push(ele.name);
      })
    }

    return(
      <Modal title="Delete Hard Drive"
             okText="Delete"
             cancelText="Cancel"
             onCancel={this.handleCancel}
             visible={this.props.visible}
             onOk={this.handleOk}
      >

        <Alert
          message="Warning"
          description={`You have chosen 【${namesArr}】，You sure you want to delete it?`}
          type="warning"
          showIcon
        />

      </Modal>
    )
  }
}

function mapStateToProps(state) {
  return {
    choosedVolumes: state.features.volume.choosedVolumes,
  }
}
export default connect(mapStateToProps, null)(DeleteVolumeModal);