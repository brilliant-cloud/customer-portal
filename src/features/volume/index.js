import React from 'react';
import { connect } from 'react-redux';
import { Button } from 'antd';

import { getVolumes } from 'app/orm/cinder/volume/actions';
import { getServers } from 'app/orm/nova/server/actions';
import { getVolumeTypes } from 'app/orm/cinder/volumeType/actions';

import VolumesTable from 'features/volume/components/VolumesTable';
import MoreVolume from 'features/volume/components/MoreVolume';
import CreateVolumeModal from 'features/volume/components/CreateVolumeModal';
import DeleteVolumeModal from 'features/volume/components/DeleteVolumeModal';
import ModifyVolumeModal from 'features/volume/components/ModifyVolumeModal';
import ResizeVolumeModal from 'features/volume/components/ResizeVolumeModal';

import commonStyles from 'features/common/styles.css';

class Volume extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      createVisible: false,
      deleteVisible: false,
      modifyVisible: false,
      resizeVisible: false,
    }
  }

  componentWillMount() {
    this.props.dispatch(getVolumes());
    this.props.dispatch(getServers());
    this.props.dispatch(getVolumeTypes());
  }

  handleButtonClick = () => {
    this.handleModalVisible('create', true)
  };

  handleModalVisible = (modal, visible) => {
    if (modal === 'create') {
      this.setState({
        createVisible: visible
      })
    }

    if (modal === 'delete') {
      this.setState({
        deleteVisible: visible
      })
    }

    if (modal === 'modify') {
      this.setState({
        modifyVisible: visible
      })
    }

    if (modal === 'resize') {
      this.setState({
        resizeVisible: visible
      })
    }
  };

  render() {
    return (
      <div className={commonStyles.wrapper}>
        <div className={commonStyles.toolbar}>
          <Button
            className={commonStyles.button}
            onClick={this.handleButtonClick}
            type="primary"
            icon="plus">
            创建
          </Button>

          <MoreVolume
            handleClick={this.handleModalVisible}
          />
        </div>

        <CreateVolumeModal
          visible={this.state.createVisible}
          handleModalCancel={this.handleModalVisible}
        />

        <ModifyVolumeModal
          visible={this.state.modifyVisible}
          handleModalCancel={this.handleModalVisible}
        />

        <ResizeVolumeModal
          visible={this.state.resizeVisible}
          handleModalCancel={this.handleModalVisible}
        />

        <DeleteVolumeModal
          visible={this.state.deleteVisible}
          handleModalCancel={this.handleModalVisible}
        />

        <VolumesTable />
      </div>
    )
  }
}

export default connect(null, null)(Volume);