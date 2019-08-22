import React from 'react';
import { connect } from 'react-redux';
import { Modal, Form, Input, Radio, Spin } from 'antd';
import { createVolume , getVolumes} from 'app/orm/cinder/volume/actions';
import { selectVolumeTypes } from 'app/selectors/orm/cinder';

const RadioGroup = Radio.Group;
const { TextArea } = Input;
const FormItem = Form.Item;

class CustomizeForm extends React.Component {
  constructor(props) {
    super(props);
  }

  handleOk = () => {
    let reqBody = this.props.form.getFieldsValue();
    this.props.dispatch(createVolume(reqBody));
    this.handleCancel();
  };

  handleCancel = () => {
    this.props.handleModalCancel('create', false)
  };

  render() {

    const { getFieldDecorator } = this.props.form;

    console.log(getFieldDecorator)

    if (this.props.volumeTypes.loading) {
      return (
        <Spin />
      )
    } else {
      let radioElements = [];
      let volumeTypes = this.props.volumeTypes;
      volumeTypes.items.forEach(id => {

        radioElements.push(
          <Radio key={id}>{volumeTypes.itemsById[id].name}</Radio>
        )
      });
      return (
        <Modal title="Create a hard disk"
               width="350px"
               okText="create"
               visible={this.props.visible}
               onCancel={this.handleCancel}
               onOk={this.handleOk}
               cancelText="cancel"
        >
          <Form>
            <FormItem label="Name: ">
              {getFieldDecorator('name')(
                <Input />
              )}
            </FormItem>

            <FormItem label="Description：">
              {getFieldDecorator('description')(
                <TextArea />
              )}
            </FormItem>

            <FormItem label="Type：" >
              {getFieldDecorator('type')(
                <RadioGroup>
                  {radioElements}
                </RadioGroup>
              )}
            </FormItem>

            <FormItem label="Capacity：">
              {getFieldDecorator('size', {initialValue: 1})(
                <Input />
              )}
            </FormItem>
          </Form>
        </Modal>
      )
    }
  }
}

function mapStateToProps(state) {
  console.log(state)
  return {
    volumeTypes: selectVolumeTypes(state)
  }
}

let CreateVolumeModal = Form.create()(CustomizeForm);

export default connect(mapStateToProps, null)(CreateVolumeModal);
