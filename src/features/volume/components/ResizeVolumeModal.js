import React from 'react';
import { connect } from 'react-redux';
import { resizeVolume } from 'app/orm/cinder/volume/actions';
import { toggleVolume } from 'features/volume/actions';
import { Modal, Form, Input, Slider, InputNumber, Row, Col, Alert } from 'antd';
const FormItem = Form.Item;

class ResizeVolumeModal extends React.Component {
  constructor(props) {
    super(props);

    this.onChange = this.onChange.bind(this);
    this.handleOk = this.handleOk.bind(this);

    this.state = {
      newSize: 1,
    }
  }

  onChange(value) {
    this.setState({
      newSize: value
    })
  }

  handleOk() {
    let choosedVolumes = this.props.choosedVolumes[0];
    if (choosedVolumes.status === 'available' &&
      (this.state.newSize >choosedVolumes.size)) {
      this.props.dispatch(resizeVolume(
        {'new_size': this.state.newSize},
        choosedVolumes
        )
      );
      this.handleCancel();
      this.props.dispatch(toggleVolume([]));
    } else {
      if (choosedVolumes.status === 'in-use') {
        this.errorModal('The hard disk is in use，Cannot expand');
        return;
      }

      if (choosedVolumes.size === this.state.newSize) {
        this.errorModal('Expansion hard disk，Must be greater than the current capacity');
      }
    }
  }

  handleCancel = () => {
    this.props.handleModalCancel('resize', false)
  };

  errorModal = (content) => {
    Modal.error({
      okText: 'determine',
      title: 'Hard disk operation error',
      content: content,
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    let currentSize;
    if (this.props.choosedVolumes.length > 0) {
      currentSize = this.props.choosedVolumes[0].size;
      name = this.props.choosedVolumes[0].name;
    } else {
      currentSize = 1;
      name = '';
    }
    return(
      <div>
        <Modal
          title="Expansion Hard Disk"
          okText="Expansion"
          visible={this.props.visible}
          onCancel={this.handleCancel}
          onOk={this.handleOk}
        >
          <Alert message="Tip: Expand capacity only, not support capacity reduction"
                 type="info"
                 showIcon />

          <Form>
            <FormItem label="name">
              {
                getFieldDecorator('name', {initialValue: name})
                (<Input disabled={true} />)
              }
            </FormItem>

            <FormItem label="currentcapacity">
              {
                getFieldDecorator('size', {initialValue: currentSize})
                (<Input disabled={true} />)
              }
            </FormItem>

            <FormItem label="newcapacity">
              {
                getFieldDecorator('new_size')
                (<Row>
                  <Col span={12}>
                    <Slider
                      min={currentSize}
                      max={5}
                      onChange={this.onChange}
                      value={this.state.newSize}
                    />
                  </Col>

                  <Col span={4}>
                    <InputNumber
                      min={currentSize}
                      max={5}
                      style={{marginLeft: 20}}
                      onChange={this.onChange}
                      value={this.state.newSize}
                    />
                  </Col>
                </Row>)
              }
            </FormItem>
          </Form>
        </Modal>
      </div>
    )
  }
}

ResizeVolumeModal = Form.create()(ResizeVolumeModal);

function mapStateToProps(state) {
  return {
    choosedVolumes: state.features.volume.choosedVolumes,
  }
}
export default connect(mapStateToProps, null)(ResizeVolumeModal);