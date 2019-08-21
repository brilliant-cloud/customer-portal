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
                总览
              </i>
            </Link>
          </Menu.Item>

          <SubMenu
            key="compute"
            title={<i className={(styles.fa) + " " + "fa fa-server fa-lg"}>计算</i>}
          >
            <Menu.Item
              key="instances"
            >
              <Link to="/console/instances">
                <div
                  className={styles.item}
                >
                  云主机
                </div>
              </Link>
            </Menu.Item>

            <Menu.Item key="volumes">
              <Link to="/console/volumes">
                <div
                  className={styles.item}
                >
                  硬盘
                </div>
              </Link>
            </Menu.Item>

            <Menu.Item key="images">
              <Link to="/console/images">
                <div
                  className={styles.item}
                >
                  镜像
                </div>
              </Link>
            </Menu.Item>
          </SubMenu>

          <SubMenu
            key="net"
            title={<i className={(styles.fa) + " " + "fa fa-sitemap fa-lg"}>网络</i>}
          >
            <Menu.Item key="networks">
                <Link to="/console/networks">
                  <div
                    className={styles.item}
                  >
                    网络
                  </div>
                </Link>
            </Menu.Item>

            <Menu.Item key="routers">
              <Link to="/console/routers">
                <div
                  className={styles.item}
                >
                  路由器
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
            title={<i className={(styles.bolt) + " " + "fa fa-bolt fa-lg"}>安全</i>}
          >
            <Menu.Item key="secgroup">
              <div
                className={styles.item}
              >
                安全组
              </div>
            </Menu.Item>

            <Menu.Item key="keypairs">
              <Link to="/console/keypairs">
                <div
                  className={styles.item}
                >
                  SSH密钥
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

