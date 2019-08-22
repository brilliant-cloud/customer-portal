import React from 'react';
import { connect } from 'react-redux';
import { Modal, Form, Input, Radio, Spin , Select} from 'antd';
import { createVolume , getVolumes} from 'app/orm/cinder/volume/actions';
import { selectVolumeTypes } from 'app/selectors/orm/cinder';
import {selectImages} from "app/selectors/orm/glance";
const {Option} = Select;
const RadioGroup = Radio.Group;
const { TextArea } = Input;
const FormItem = Form.Item;

class CustomizeForm extends React.Component {
  constructor(props) {
    super(props);
  }



  handleOk = () => {
    let fieldsValue = this.props.form.getFieldsValue();
    console.log(fieldsValue);
    let size = fieldsValue.size;

    const reqBody = {
      "volume": {
        "size": size.toString(),
        "name": fieldsValue.name,
        "imageRef": fieldsValue.image,
        "volume_type": fieldsValue.type,
      }
    };
    console.log(reqBody);
    this.props.dispatch(createVolume(reqBody));
    this.handleCancel();
  };

  handleCancel = () => {
    this.props.handleModalCancel('create', false)
  };

  render() {

    const { getFieldDecorator } = this.props.form;
    console.log(this.props);


    if (this.props.volumeTypes.loading && this.props.imageTypes.loading) {
      return (
        <Spin />
      )
    } else {
      let radioElements = [];
      let imageElements = [];
      let volumeTypes = this.props.volumeTypes;
      let imageTypes = this.props.imageTypes;

      volumeTypes.items.forEach(id => {

        radioElements.push(
          <Radio key={id} value={id}>{volumeTypes.itemsById[id].name}</Radio>
        )
      });

      imageTypes.items.forEach(id =>{
        imageElements.push(
            <Option key={id} value={id}>{imageTypes.itemsById[id].name}</Option>
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
              {getFieldDecorator('type',{initialValue: volumeTypes.items[0]})(
                <RadioGroup >
                  {radioElements}
                </RadioGroup>
              )}
            </FormItem>

            <FormItem label="Capacity：">
              {getFieldDecorator('size', {initialValue: 1})(
                <Input />
              )}
            </FormItem>
            <FormItem >
              {getFieldDecorator('image')(
              <Select  >
                {imageElements}
              </Select>
              )}
            </FormItem>
          </Form>
        </Modal>
      )
    }
  }
}

function mapStateToProps(state) {

  return {
    volumeTypes: selectVolumeTypes(state),
    imageTypes: selectImages(state),
  }
}

let CreateVolumeModal = Form.create()(CustomizeForm);

export default connect(mapStateToProps, null)(CreateVolumeModal);
