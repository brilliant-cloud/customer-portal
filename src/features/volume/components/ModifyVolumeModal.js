import React from 'react';
import { connect } from 'react-redux';
import { updateVolume } from 'app/orm/cinder/volume/actions';
import { toggleVolume } from 'features/volume/actions';
import { Modal, Form, Input } from 'antd';
const FormItem = Form.Item;
const { TextArea } = Input;

class ModifyVolumeModal extends React.Component {
  constructor(props) {
    super(props);
  }

  handleOk = () => {
    let reqBody = this.props.form.getFieldsValue();
    this.props.dispatch(updateVolume(reqBody, this.props.choosedVolumes[0]));
    this.handleCancel();
    this.props.dispatch(toggleVolume([]));
  };

  handleCancel = () => {
    this.props.handleModalCancel('modify', false)
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Modal title="修改硬盘的信息"
             okText="修改"
             visible={this.props.visible}
             onCancel={this.handleCancel}
             onOk={this.handleOk}
      >
        <Form>
          <FormItem label="名称：">
            {getFieldDecorator('name')(
              <Input />
            )}
          </FormItem>

          <FormItem label="描述：">
            {getFieldDecorator('description')(
              <TextArea />
            )}
          </FormItem>
        </Form>
      </Modal>
    )
  }
}

function mapStateToProps(state) {
  return {
    choosedVolumes: state.features.volume.choosedVolumes
  }
}

ModifyVolumeModal = Form.create()(ModifyVolumeModal);
export default connect(mapStateToProps, null)(ModifyVolumeModal);