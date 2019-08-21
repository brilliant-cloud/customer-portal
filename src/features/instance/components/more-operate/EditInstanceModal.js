import React from 'react';
import { connect } from 'react-redux';
import { updateServer } from 'app/orm/nova/server/actions';
import { Modal, Input, Form } from 'antd';
const FormItem = Form.Item;

class EditInstanceModal extends React.Component {
  constructor(props) {
    super(props);
  }

  handleCancel = () => {
    this.props.handleModalCancel('edit', false);
  };

  handleOk = () => {
    let newName = this.props.form.getFieldsValue().name;
    let reqBody = {
      'server': {
        'name': newName
      }
    };
    let choosedInstance = this.props.choosedInstance;
    this.props.dispatch(updateServer(reqBody, choosedInstance.selectedRows[0]));
    this.props.handleModalCancel('edit', false);
  };

  render() {
    const { getFieldDecorator } = this.props.form;

    return (
      <Modal
        title="编辑云主机"
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
        </Form>
      </Modal>
    )
  }
}

const mapStateToProps = (state) => ({
  choosedInstance: state.features.instance.choosedInstance
});
EditInstanceModal = Form.create()(EditInstanceModal);
export default connect(mapStateToProps, null)(EditInstanceModal);