import React from 'react';
import { connect } from 'react-redux';
import { Spin } from 'antd';
import { INSTANCE_FIELD, INSTANCE_STATUS, FLAVOR_FIELD } from 'features/common/constants';
import { selectServer, selectFlavors } from 'app/selectors/orm/nova';
import { selectImages } from 'app/selectors/orm/glance';
import { uniqueArr } from 'app/commons/common';
import styles from '../style/DetailOverview.css';

class DetailOverview extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (this.props.server.loading ||
      this.props.flavors.loading ||
      this.props.images.loading) {
      return (
        <div
          style={{
            'textAlign': 'center'
          }}
        >
          <Spin />
        </div>
      )
    } else {
      let flavorIndex = this.props.flavors.items[0];
      let flavorsInfo = this.props.flavors.itemsById[flavorIndex];

      let serverInfo = this.props.server.data;

      // 镜像
      let imageName = this.props.images.itemsById[serverInfo.image.id].name;

      // 网络
      let networkArrs = [];
      let addressKeys = Object.keys(serverInfo.addresses);
      addressKeys.forEach(key => {
        if (serverInfo.addresses[key].length > 0) {
          let ipArrs = [];
          serverInfo.addresses[key].forEach(ele => {
            ipArrs.push(
              <div className={styles.ipinfo} key={ele['addr']}>
                <span>{ele['addr']}</span>
                <span className={styles.iplabel}>{ele['OS-EXT-IPS:type']}</span>
              </div>)
          });
          networkArrs.push(<dl key={key}>
            <dt>{key}</dt>
            <dd>{ipArrs}</dd>
          </dl>)
        } else {
          networkArrs.push(<dl key={key}>
            <dt>{key}</dt>
            <dd>{serverInfo['addresses'][ele][0].address}</dd>
          </dl>)
        }
      });

      // 密钥对
      let keyName = '';
      if (serverInfo.key_name) {
        keyName = serverInfo.key_name;
      } else {
        keyName = '无';
      }

      // 安全组
      let securityGroupsArr = [];
      if (serverInfo.security_groups.length > 0) {
        let securityGroupsName = [];
        serverInfo.security_groups.forEach(ele => {
          securityGroupsName.push(ele.name);
        });
        securityGroupsName = uniqueArr(securityGroupsName);
        securityGroupsArr.push(<dl key="securityGroups">
          <dt>{INSTANCE_FIELD['security_groups']}</dt>
          <dd>{securityGroupsName.join(',')}</dd>
          </dl>
        );
      } else {
        securityGroupsArr.push(<dl key="null">
          <dt>{INSTANCE_FIELD['security_groups']}</dt>
          <dd>无</dd>
        </dl>)
      }

      return (
        <div className={styles.overview}>
          <div className={styles.title}>云主机详情</div>

          <div className={styles.basic}>
            <div className={styles.subtitle}>基本信息</div>
            <dl>
              <dt>{INSTANCE_FIELD['name']}</dt>
              <dd>{serverInfo.name}</dd>
              <dt>{INSTANCE_FIELD['id']}</dt>
              <dd>{serverInfo.id}</dd>
              <dt>{INSTANCE_FIELD['status']}</dt>
              <dd>{INSTANCE_STATUS[serverInfo.status]}</dd>
              <dt>{INSTANCE_FIELD['OS-EXT-AZ:availability_zone']}</dt>
              <dd>{serverInfo['OS-EXT-AZ:availability_zone']}</dd>
              <dt>{INSTANCE_FIELD['image']}</dt>
              <dd>{imageName}</dd>
            </dl>
          </div>

          <div className={styles.flavor}>
            <div className={styles.subtitle}>配置规格</div>
            <dl>
              <dt>{FLAVOR_FIELD['name']}</dt>
              <dd>{flavorsInfo.name}</dd>
              <dt>{FLAVOR_FIELD['id']}</dt>
              <dd>{flavorsInfo.id}</dd>
              <dt>{FLAVOR_FIELD['ram']}</dt>
              <dd>{flavorsInfo.ram}</dd>
              <dt>{FLAVOR_FIELD['vcpus']}</dt>
              <dd>{flavorsInfo.vcpus}</dd>
              <dt>{FLAVOR_FIELD['disk']}</dt>
              <dd>{flavorsInfo.disk}</dd>
            </dl>
          </div>

          <div className={styles.addresses}>
            <div className={styles.subtitle}>IP地址</div>
            {networkArrs}
          </div>

          <div className={styles.security}>
            <div className={styles.subtitle}>安全配置</div>
            <dl>
              <dt>{INSTANCE_FIELD['key_name']}</dt>
              <dd>{keyName}</dd>
            </dl>
            {securityGroupsArr}
          </div>
        </div>
      )
    }
  }
}

const mapStateToProps = (state) => ({
  server: selectServer(state),
  flavors: selectFlavors(state),
  images: selectImages(state),
});

export default connect(mapStateToProps, null)(DetailOverview);