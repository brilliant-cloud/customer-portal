import React from 'react';
import { connect } from 'react-redux';
import { selectServers } from 'app/selectors/orm/nova';
import { selectNetworks } from 'app/selectors/orm/neutron';
import { Spin } from 'antd';

const serverMargin = 50,
  nicLineOffsetTop = 28,
  nicLineOffsetBottom = 28,
  nicLineHeight = 2,
  nicLineSep = 14,
  netLineWidth = 8,
  netLineSep = 160,
  instanceWidth = 80,
  instanceBorder = 3,
  nicConnectWidth = 4;

const bgColors  = [
  '#dc69aa', '#b6a2de','#5ab1ef','#ffb980','#d87a80',
  '#9a7fd1','#588dd5','#f5994e','#c05050','#c14089'
];

class NetworkTopology extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (this.props.servers.loading || this.props.networks.loading) {
      return (
        <Spin />
      )
    } else {
      let serversData = this.props.servers.data;

      let networksData = this.props.networks.data;
      let networksName = [];
      networksData.forEach(item => {
        networksName.push(item.name);
      });

      let serversTopology = [];
      serversData.forEach((server, serverIndex) => {

        // PreServer
        let preServer;
        if (serverIndex !== 0) {
          preServer = serversTopology[serverIndex - 1];
        }

        let serverNetworks = Object.keys(server.addresses);

        // 虚拟机第一个网络在所有网络列表中的数组索引
        let firstNetworkIndex = networksData.findIndex(network => {
          return network.name === serverNetworks[0];
        });

        // NICs, 不包含Line的X，Y
        let serverNics = [];
        serverNetworks.forEach(serverNetwork => {
          server.addresses[serverNetwork].forEach(nic => {
            if (nic['OS-EXT-IPS:type'] !== 'floating') {
              serverNics.push({
                'name': serverNetwork,
                'data': nic,
              });
            }
          })
        });

        // 虚拟机节点的Y位置
        let serverPostY;
        if (serverIndex === 0) {
          serverPostY = serverMargin;
        } else {
          serverPostY = preServer.PostY + preServer.height + serverMargin;
        }

        // 虚拟机节点的高度
        let serverHeight = nicLineOffsetTop + nicLineOffsetBottom +
          serverNics.length * nicLineHeight + (serverNics.length - 1) * nicLineSep;


        // 虚拟机节点的X位置
        let serverPostX = firstNetworkIndex * netLineSep +
          (firstNetworkIndex + 1) * netLineWidth +
          (netLineSep - instanceWidth) / 2;

        // Nics, 计算X，Y
        let newServerNics = [];
        serverNics.forEach((serverNic, nicIndex) => {
          let networkIndex = networksData.findIndex(network => {
            return serverNic.name === network.name;
          });

          let nicLineX, nicLineWidth, nicLineY;

          if (networkIndex <= firstNetworkIndex) {
            nicLineX = networkIndex * (netLineSep + netLineWidth) + netLineWidth;
            nicLineWidth = serverPostX - nicLineX;
          } else {
            nicLineX = serverPostX + instanceWidth;
            nicLineWidth = networkIndex * (netLineSep + netLineWidth) - nicLineX;
          }
          nicLineY = serverPostY + nicLineOffsetTop + nicIndex * (nicLineHeight + nicLineSep);

          newServerNics.push({
            'name': serverNic.name,
            'data': serverNic.data,
            'left': nicLineX,
            'width': nicLineWidth,
            'top': nicLineY,
            'netIndex': networkIndex,
          });
        });

        // 构造最终的servers
        serversTopology.push({
          "name": server.name,
          "id": server.id,
          "nics": newServerNics,
          "PostY": serverPostY,
          "PostX": serverPostX,
          "height": serverHeight,
          "firstNetworkIndex": firstNetworkIndex,
        })
      });

      //
      let instancesArr = [];
      let nicsArr = [];
      serversTopology.forEach((server, serverIndex) => {

        // 虚拟机所有网卡
        let instanceNicsArr = [];
        let isLeftNic = true;
        server.nics.forEach((nic, nicIndex) => {
          if (nic.netIndex <= server.firstNetworkIndex) {
            isLeftNic = true;
          } else {
            isLeftNic = false;
          }

          instanceNicsArr.push(
            <div
              key={nicIndex}
              style={{
                'position': 'relative',
                'lineHeight': nicLineSep + nicLineHeight + 'px',
                'top': nicLineOffsetTop - nicLineSep / 2 - instanceBorder,
                'textAlign': isLeftNic ? 'left' : 'right',
                'padding': '0 4px',
                'color': bgColors[nic.netIndex]
              }}
            >
              *.{nic.data.addr.split('.').slice(2, 4).join('.')}
            </div>
          )
        });

        // 虚拟机节点
        instancesArr.push(
          <div
            className="instance"
              key={server.id}
              style={{
                'width': instanceWidth,
                'height': server.height,
                'border': `${instanceBorder}px solid #222`,
                'borderRadius': '6px',
                'position': 'absolute',
                'left': server.PostX,
                'top': server.PostY,
              }}
            >

            <div
              style={{
                'position': 'absolute',
                'top': '0',
                'color': '#222',
                'width': instanceWidth - 6,
                'height': nicLineOffsetTop - (nicLineSep / 2) -5,
                'textAlign': 'center'
              }}
            >
            </div>

            {instanceNicsArr}

            <div
              style={{
                'backgroundColor': '#222',
                'position': 'absolute',
                'bottom': '0',
                'color': '#fff',
                'width': instanceWidth - 6,
                'height': nicLineOffsetTop - (nicLineSep / 2) - 5,
                'textAlign': 'center'
              }}
            >
              <i className="fa fa-laptop"></i>
              <i>云主机</i>
            </div>
          </div>
        );

        // 虚拟机的所有网卡连线节点
        server.nics.forEach(nic => {
          nicsArr.push(
            <div
              className="nicline"
              key={nic.data['OS-EXT-IPS-MAC:mac_addr']}
              style={{
                'height': nicLineHeight,
                'position': 'absolute',
                'backgroundColor': bgColors[nic.netIndex],
                'width': nic.width,
                'left': nic.left,
                'top': nic.top,
              }}
            >
              <div
                style={{
                  'width': nicConnectWidth,
                  'height': nicConnectWidth * 2,
                  'borderRadius': `${nicConnectWidth}px 0 0 ${nicConnectWidth}px`,
                  'backgroundColor': bgColors[nic.netIndex],
                  'position': 'absolute',
                  'right': '0',
                  'top': -(nicConnectWidth - (nicLineHeight / 2))
                }}
              >
              </div>
              <div
                style={{
                  'width': nicConnectWidth,
                  'height': nicConnectWidth * 2,
                  'borderRadius': `0 ${nicConnectWidth}px ${nicConnectWidth}px 0`,
                  'backgroundColor': bgColors[nic.netIndex],
                  'position': 'absolute',
                  'left': '0',
                  'top': -(nicConnectWidth - (nicLineHeight / 2))
                }}
              >
              </div>
            </div>
          )
        });
      });


      // 所有网络
      let networksArr = [];
      let lastServer = serversTopology[serversTopology.length - 1];
      let networkHeight = lastServer.PostY + lastServer.height + serverMargin;

      networksName.forEach((network, networkIndex) => {
        let networkLeft = networkIndex * (netLineWidth + netLineSep);

        networksArr.push(
          <div
            className="networkline"
            key={networkIndex}
            style={{
              'position': 'absolute',
              'height': `${networkHeight}px`,
              'width': `${netLineWidth}px`,
              'backgroundColor': bgColors[networkIndex],
              'left': networkLeft,
              'zIndex': '2'
            }}
          >
          </div>
        )
      });


      return (
        <div
          style={{
            'position': 'relative',
            'height': networkHeight,
          }}
        >
          {networksArr}
          {instancesArr}
          {nicsArr}
        </div>
      )
    }
  }
}


const mapStateToProps = (state) => {
  return {
    servers: selectServers(state),
    networks: selectNetworks(state)
  }
};
export default connect(mapStateToProps, null)(NetworkTopology);