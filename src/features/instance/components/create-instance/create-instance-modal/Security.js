import React from 'react';
import { connect } from 'react-redux';
import { Spin, Form, Input, Checkbox, Select } from 'antd';

import { selectKeypairs } from 'app/selectors/orm/nova';
import { selectSecurityGroups } from 'app/selectors/orm/neutron';

import {
  filledInstance,
  choosedKeypair,
  choosedSecurityGroup
} from 'features/instance/actions';

const FormItem = Form.Item;
const Option = Select.Option;
const CheckboxGroup = Checkbox.Group;

class Security extends React.Component {
  constructor(props) {
    super(props);

  }

  componentWillMount() {
    if (!this.props.create.filledInstance) {
      let defaultServerName = 'server-' + Math.random().toString(36).substring(2,10);
      this.props.dispatch(filledInstance(defaultServerName));
    }
  };


  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: {span: 4 },
      wrapperCol: {span: 8}
    };

    if (this.props.keypairs.loading ||
        this.props.securityGroups.loading) {
      return (
        <Spin />
      )
    } else {
      let optionArrs = [];
      let keypairs = this.props.keypairs;
      keypairs.items.forEach(keypairName => {
        optionArrs.push(
            <Option
              key={keypairName}
              value={keypairName}
            >
              {keypairName}
            </Option>
        )
      });

      let checkboxArrs = [];
      let securityGroups = this.props.securityGroups;
      securityGroups.items.forEach(item => {
        checkboxArrs.push(
          securityGroups.itemsById[item].name
        )
      });


      return (
        <Form>
          <FormItem
            {...formItemLayout}
            label="主机名">
            {
              getFieldDecorator('input', {initialValue: this.props.create.filledInstance})(
                <Input />
              )
            }
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="SSH密钥对">
            {getFieldDecorator('select', {initialValue: keypairs[0]})(
              <Select>
                {optionArrs}
              </Select>
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="安全组">
            {getFieldDecorator('radio-group')(
              <CheckboxGroup
                options={checkboxArrs}
              >
              </CheckboxGroup>
            )}
          </FormItem>
        </Form>
      )
    }
  }
}

const mapStateToProps = (state) => ({
  keypairs: selectKeypairs(state),
  securityGroups: selectSecurityGroups(state),
  create: state.features.instance.create,
});

Security = Form.create({
  onFieldsChange (props, changedFields) {
    let fieldName = Object.keys(changedFields);
    if (fieldName[0] === 'input') {
      props.dispatch(filledInstance(changedFields['input'].value));
    } else if (fieldName[0] === 'select') {
      props.dispatch(choosedKeypair(changedFields['select'].value));
    } else if (fieldName[0] === 'radio-group') {
      props.dispatch(choosedSecurityGroup(changedFields['radio-group'].value));
    }
  }
})(Security);
export default connect(mapStateToProps, null)(Security);