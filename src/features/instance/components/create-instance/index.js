import React from 'react';
import { connect } from 'react-redux';
import { getNetworks } from 'app/orm/neutron/network/actions';
import { getKeypairs } from 'app/orm/nova/keypair/actions';
import { getSecurityGroups } from 'app/orm/neutron/securityGroup/actions';

import CreateInstanceModal from './create-instance-modal';
import { Button } from 'antd';

import commonStyles from 'features/common/styles.css';

class CreateInstance extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: false
    }
  }

  // 创建云主机的弹出框
  handleModalVisible = (visible) => {
      this.setState({
        visible: visible
      })
  };

  handleCreate = () => {
    this.props.dispatch(getNetworks());
    this.props.dispatch(getKeypairs());
    this.props.dispatch(getSecurityGroups());

    this.handleModalVisible(true);
  };

  render() {
    return (
      <div>
        <CreateInstanceModal
          visible={this.state.visible}
          handleModalCancel={(visible) => this.handleModalVisible(visible)}
        />

        <Button
          type="primary"
          icon="plus"
          onClick={this.handleCreate}
          className={commonStyles.button}
        >
          创建
        </Button>
      </div>
    )
  }
}

export default connect(null, null)(CreateInstance);