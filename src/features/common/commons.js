import React from 'react';
import { Menu } from 'antd';

const itemProps = [
  {
    'key': 'mount',
    'disabled': true,
    'fa': 'fa fa-laptop',
    'name': '加载硬盘到主机'
  },
  {
    'key': 'unmount',
    'disabled': true,
    'fa': 'fa fa-chain-broken',
    'name': '卸载硬盘'
  },
  {
    'key': 'resize',
    'disabled': disabled,
    'fa': 'fa fa-expand',
    'name': '扩容'
  },
  {
    'key': 'modify',
    'disabled': disabled,
    'fa': 'fa fa-pencil',
    'name': '修改'
  },
  {
    'key': 'delete',
    'disabled': deleteDisabled,
    'fa': 'fa fa-trash',
    'name': '删除'
  }
];
const createMenuItems = (props) => {
  let menuItems = [];
  props.forEach(item => {
    menuItems.push(
      <Menu.Item
        key={item.key}
        disabled={item.disabled}
      >
        <i className={item.fa}>{item.name}</i>
      </Menu.Item>
    )
  });
  return menuItems;
};

export { createMenuItems };
