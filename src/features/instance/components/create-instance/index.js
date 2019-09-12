import React from 'react';
import { connect } from 'react-redux';
import { getNetworks } from 'app/orm/neutron/network/actions';
import { getKeypairs } from 'app/orm/nova/keypair/actions';
import { getSecurityGroups } from 'app/orm/neutron/securityGroup/actions';

import CreateInstanceModal from './create-instance-modal';
import { Button } from 'antd';

import commonStyles from 'features/common/styles.css';
import {getVolumes} from "app/orm/cinder/volume/actions";

class CreateInstance extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: false
    }
  }


  handleModalVisible = (visible) => {
      this.setState({
        visible: visible
      })
  };

  handleCreate = () => {

    this.props.dispatch(getNetworks());
    this.props.dispatch(getKeypairs());
    this.props.dispatch(getSecurityGroups());
    this.props.dispatch(getVolumes());
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
          disabled="true"
        >
            Create
        </Button>
      </div>
    )
  }
}

export default connect(null, null)(CreateInstance);