import React from 'react';
import { connect } from 'react-redux';
import { Menu } from 'antd';
import MoreOperateButton from 'components/more-operate';

import commonStyles from 'features/common/styles.css'

class MoreVolume extends React.Component {
  constructor(props) {
    super(props);
  }

  handleMenuClick = (key) => {
    this.props.handleClick(key.key, true)
  };

  render() {
    let choosedVolumes = this.props.choosedVolumes;

    const menu = (
      <Menu
        className={commonStyles.menu}
        onClick={this.handleMenuClick}
        disabled={true}
        >
        <Menu.Item
          key="mount"
          disabled={true}
        >
          <i className="fa fa-laptop">Load the hard disk to the host</i>
        </Menu.Item>

        <Menu.Item
          key="unmount"
          disabled={true}
        >
          <i className="fa fa-chain-broken">Uninstall the hard drive</i>
        </Menu.Item>

        <Menu.Item
          key="resize"
          disabled={choosedVolumes.length !== 1}
          disabled={true}
        >
          <i className="fa fa-expand">Expand</i>
        </Menu.Item>

        <Menu.Item
          key="modify"
          disabled={choosedVolumes.length !== 1}
          disabled={true}
        >
          <i className="fa fa-pencil">Modify</i>
        </Menu.Item>

        <Menu.Item
          key="delete"
          disabled={choosedVolumes.length < 1}
          disabled={true}
        >
          <i className="fa fa-trash">Delete</i>
        </Menu.Item>
      </Menu>
    );

    return(
      <MoreOperateButton menu={menu} />
    )
  }
}

function mapStateToProps(state) {
  return {
    choosedVolumes: state.features.volume.choosedVolumes,
  }
}

export default connect(mapStateToProps, null)(MoreVolume);