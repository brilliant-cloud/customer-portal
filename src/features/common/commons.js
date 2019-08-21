import React from 'react';
import { Menu } from 'antd';

const itemProps = [
  {
    'key': 'mount',
    'disabled': true,
    'fa': 'fa fa-laptop',
    'name': 'Load the hard disk to host'
  },
  {
    'key': 'unmount',
    'disabled': true,
    'fa': 'fa fa-chain-broken',
    'name': 'Uninstall the hard drive'
  },
  {
    'key': 'resize',
    'disabled': disabled,
    'fa': 'fa fa-expand',
    'name': 'Expansion'
  },
  {
    'key': 'modify',
    'disabled': disabled,
    'fa': 'fa fa-pencil',
    'name': 'Modify'
  },
  {
    'key': 'delete',
    'disabled': deleteDisabled,
    'fa': 'fa fa-trash',
    'name': 'Delete'
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
