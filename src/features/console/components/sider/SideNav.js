import React from 'react';
import { Link } from 'react-router-dom';
import styles from './style/SideNav.css';

import { Menu } from 'antd';

const { SubMenu } = Menu;

class SideNav extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        <div className="logo" />
        <Menu
          theme="dark"
          defaultOpenKeys={['compute', 'net']}
          selectedKeys={[this.props.selected]}
          mode="inline"
        >

          <Menu.Item key="overview">
            <Link to="/console/overview">
              <i className={(styles.fa) + " " + "fa fa-tachometer fa-lg"}>
                Overview
              </i>
            </Link>
          </Menu.Item>

          <SubMenu
            key="compute"
            title={<i className={(styles.fa) + " " + "fa fa-server fa-lg"}>Compute</i>}
          >
            <Menu.Item
              key="instances"
            >
              <Link to="/console/instances">
                <div
                  className={styles.item}
                >
                  Instances
                </div>
              </Link>
            </Menu.Item>

            <Menu.Item key="volumes">
              <Link to="/console/volumes">
                <div
                  className={styles.item}
                >
                  Volumes
                </div>
              </Link>
            </Menu.Item>

            <Menu.Item key="images">
              <Link to="/console/images">
                <div
                  className={styles.item}
                >
                  Images
                </div>
              </Link>
            </Menu.Item>
          </SubMenu>

          <SubMenu
            key="net"
            title={<i className={(styles.fa) + " " + "fa fa-sitemap fa-lg"}>Networks</i>}
          >
            <Menu.Item key="networks">
                <Link to="/console/networks">
                  <div
                    className={styles.item}
                  >
                    Networks
                  </div>
                </Link>
            </Menu.Item>

            <Menu.Item key="routers">
              <Link to="/console/routers">
                <div
                  className={styles.item}
                >
                  Routers
                </div>
              </Link>
            </Menu.Item>
          </SubMenu>

          {/*<SubMenu*/}
            {/*key="storage"*/}
            {/*title={<i className={(styles.fa) + " " + "fa fa-hdd-o fa-lg"}>存储</i>}*/}
          {/*>*/}
          {/*</SubMenu>*/}

          <SubMenu
            key="security"
            title={<i className={(styles.bolt) + " " + "fa fa-bolt fa-lg"}>Security</i>}
          >
            <Menu.Item key="secgroup">
              <div
                className={styles.item}
              >
                Security Group
              </div>
            </Menu.Item>

            <Menu.Item key="keypairs">
              <Link to="/console/keypairs">
                <div
                  className={styles.item}
                >
                  SSH KeyPairs
                </div>
              </Link>
            </Menu.Item>
          </SubMenu>
        </Menu>
      </div>
    )
  }
}

export default SideNav;

