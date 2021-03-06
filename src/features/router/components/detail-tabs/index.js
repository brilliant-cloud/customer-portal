import React from 'react';
import { connect } from 'react-redux';
import SubnetTable from 'components/subnet-table';
import PortTable from 'components/port-table';
import Graph from 'components/graph';
import { getServers } from 'app/orm/nova/server/actions';
import { getSubnets } from 'app/orm/neutron/subnet/actions';
import { getRouterInterfacePorts } from 'app/orm/neutron/port/actions';
import { getNetworks } from 'app/orm/neutron/network/actions';
import { Tabs } from 'antd';
const TabPane = Tabs.TabPane;

import styles from './index.css';

class DetailTabs extends React.Component {
  constructor(props) {
    super(props);
  }

  handleTabClick = (key) => {
    if (key === 'graph') {
      this.props.dispatch(getRouterInterfacePorts(this.props.routerID));
      this.props.dispatch(getNetworks());
      this.props.dispatch(getServers());
      this.props.dispatch(getSubnets());
    }
  };

  render() {
    return (
        <Tabs
          animated={false}
          defaultActiveKey="subnet"
          onTabClick={(key) => this.handleTabClick(key)}
          className={styles.detailtabs}
        >
          <TabPane tab="subnet" key="subnet">
            <SubnetTable />
          </TabPane>

          <TabPane tab="porttable" key="port">
            <PortTable />
          </TabPane>

        </Tabs>
    )
  }
}

export default connect(null, null)(DetailTabs);