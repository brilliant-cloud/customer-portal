import React from 'react';
import { connect } from 'react-redux';
import { Dropdown, Icon, Button } from 'antd';

function MoreOperateButton(props) {
  return (
    <Dropdown overlay={props.menu} trigger={['click']}>
      <Button type="primary" icon="appstore-o">
          More Operations<Icon type="down" />
      </Button>
    </Dropdown>
  )
}

export default connect(null, null)(MoreOperateButton);
