import React from 'react';
import { connect } from 'react-redux';
import MoreOperateButton from 'components/more-operate';
import EditInstanceModal from './EditInstanceModal';
import DestroyInstanceModal from './DestroyInstanceModal';
import { Menu } from 'antd';

import commonStyles from 'features/common/styles.css';

class MoreOperate extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      editVisible: false,
      destroyVisible: false,
    };
  }

  handleMenuCancel = (modal, visible) => {
    this.handleModalVisible(modal, visible)
  };

  handleModalVisible = (modal, visible) => {
    if (modal === 'edit') {
      this.setState({
        editVisible: visible
      })
    } else if (modal === 'destroy') {
      this.setState({
        destroyVisible: visible
      })
    }
  };

  render() {
    let choosedInstances = this.props.choosedInstance.selectedRows;
    const menu = (
      <Menu
        className={commonStyles.menu}
        onClick={(e) => this.handleModalVisible(e.key, true)}
      >
        <Menu.Item
          key="manage"
          disabled={true}
        >
          <i className="fa fa-trash">Manage Security Group</i>
        </Menu.Item>

        <Menu.Item
          key="edit"
          disabled={choosedInstances.length !== 1}
          disabled={true}
        >
          <i className="fa fa-trash">Edit Cloud Host</i>
        </Menu.Item>

        <Menu.Item
          key="create"
          disabled={choosedInstances.length !== 1}
          disabled={true}
        >
          <i className="fa fa-trash">
            Make a Mirror</i>
        </Menu.Item>

        <Menu.Item
          key="reboot"
          disabled={true}
        >
          <i className="fa fa-trash">Hard Restart</i>
        </Menu.Item>

        <Menu.Item
          key="stop"
          disabled={true}
        >
          <i className="fa fa-trash">Stop</i>
        </Menu.Item>

        <Menu.Item
          key="start"
          disabled={true}
        >
          <i className="fa fa-trash">Start</i>
        </Menu.Item>

        <Menu.Item
          key="destroy"
          disabled={choosedInstances.length === 0}
          disabled={true}
        >
          <i className="fa fa-trash">Destroy</i>
        </Menu.Item>
      </Menu>
    );

    return (
      <div>
        <EditInstanceModal
          visible={this.state.editVisible}
          handleModalCancel={
            (modal, visible) => this.handleMenuCancel(modal, visible)
          }
        />

        <DestroyInstanceModal
          visible={this.state.destroyVisible}
          handleModalCancel={
            (modal, visible) => this.handleMenuCancel(modal, visible)
          }
        />

        <MoreOperateButton menu={menu} />
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  choosedInstance: state.features.instance.choosedInstance
});
export default connect(mapStateToProps, null)(MoreOperate);