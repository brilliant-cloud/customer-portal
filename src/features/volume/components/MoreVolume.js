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
        onClick={this.handleMenuClick}>
        <Menu.Item
          key="mount"
          disabled={true}
        >
          <i className="fa fa-laptop">加载硬盘到主机</i>
        </Menu.Item>

        <Menu.Item
          key="unmount"
          disabled={true}
        >
          <i className="fa fa-chain-broken">卸载硬盘</i>
        </Menu.Item>

        <Menu.Item
          key="resize"
          disabled={choosedVolumes.length !== 1}
        >
          <i className="fa fa-expand">扩容</i>
        </Menu.Item>

        <Menu.Item
          key="modify"
          disabled={choosedVolumes.length !== 1}
        >
          <i className="fa fa-pencil">修改</i>
        </Menu.Item>

        <Menu.Item
          key="delete"
          disabled={choosedVolumes.length < 1}
        >
          <i className="fa fa-trash">删除</i>
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