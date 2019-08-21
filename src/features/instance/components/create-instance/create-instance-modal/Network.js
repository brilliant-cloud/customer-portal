import React from 'react';
import { connect } from 'react-redux';
import { selectNetworks } from 'app/selectors/orm/neutron';
import { Spin, Row, Col } from 'antd';
import { addNetwork, removeNetwork } from 'features/instance/actions';

import styles from './style/network.css';

class Network extends React.Component {
  constructor(props) {
    super(props);
  }

  handleAddNetwork = (id) => {
    this.props.dispatch(addNetwork(id))
  };

  handleRemoveNetwork = (id) => {
    this.props.dispatch(removeNetwork(id));
  };

  render() {
    if (this.props.networks.loading) {
      return (
        <Spin />
      )
    } else {
      let networks = this.props.networks;
      let networksId = networks.items;

      let availableNetworks = networksId.filter((ele) => {
        return this.props.choosedNetworks.indexOf(ele) < 0;
      });

      let availableNetworksNode = [];
      availableNetworks.forEach((ele) => {
        // let index = networksId.findIndex(id => id === ele);
        availableNetworksNode.push(
          <div
            className={styles.network}
            key={ele}
          >
            <span>{networks.itemsById[ele].name}</span>
            <span
              onClick={() => this.handleAddNetwork(ele)}
              className={styles.add}>
              <i className="fa fa-plus" />
            </span>
          </div>
        )
      });

      let choosedNetworksNode = [];
      this.props.choosedNetworks.forEach((ele) => {
        // let index = networks.findIndex(network => network.id === ele);
        choosedNetworksNode.push(
          <div
            className={styles.network}
            key={ele}
          >
            <span>{networks.itemsById[ele].name}</span>
            <span
              onClick={() => this.handleRemoveNetwork(ele)}
              className={styles.remove}>
              <i className="fa fa-minus" />
            </span>
          </div>
        )
      });

      return (
        <Row gutter={20}>
          <Col span={12}>
            <div>
              <span>可选网络</span>
              <div className={styles.available}>
                {availableNetworksNode}
              </div>
            </div>
          </Col>
          <Col span={12}>
            <div>
              <span>已选网络</span>
              <div className={styles.choosed}>
                {choosedNetworksNode}
              </div>
            </div>
          </Col>
        </Row>
      )
    }
  }
}

const mapStateToProps = (state) => ({
  networks: selectNetworks(state),
  choosedNetworks: state.features.instance.create.choosedNetworks
});

export default connect(mapStateToProps, null)(Network);