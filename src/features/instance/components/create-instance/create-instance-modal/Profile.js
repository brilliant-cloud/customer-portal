import React from 'react';
import { connect } from 'react-redux';

import { selectFlavors } from 'app/selectors/orm/nova';
import { selectImages } from 'app/selectors/orm/glance';
import { selectNetworks } from 'app/selectors/orm/neutron';

import styles from './style/Profile.css';

function Profile(props) {
  let create = props.create;

  let imageName = '';
  props.images.items.forEach(ele => {
    if (ele === create.choosedImage) {
      imageName = props.images.itemsById[ele].name;
    }
  });

  let flavorName = '';
  props.flavors.items.forEach(ele => {
    if (ele === create.choosedFlavor) {
      flavorName = props.flavors.itemsById[ele].name;
    }
  });

  let networksNode = [];
  let networks = props.networks;
  create.choosedNetworks.forEach(ele => {
    networks.items.forEach(networkId => {
      if (networkId === ele) {
        networksNode.push(
          <span key={ele}>{networks.itemsById[networkId].name}</span>
        );
      }
    })
  });

  let securityGroupsNode = [];
  create.choosedSecurityGroup.forEach(ele => {
    securityGroupsNode.push(
      <span key={ele}>{ele}</span>
    )
  });

  return (
    <div className={styles.wrapper}>
      <div className={styles.instance}>
        <span>CPU Name</span>
        <span>{create.filledInstance}</span>
      </div>

      <div className={styles.image}>
        <span>Image Name</span>
        <span>{imageName}</span>
      </div>

      <div className={styles.flavor}>
        <span>Flavor Name</span>
        <span>{flavorName}</span>
      </div>

      <div className={styles.network}>
        <span>Internet</span>
        {networksNode}
      </div>

      <div className={styles.keypair}>
        <span>KeyPair</span>
        <span>{create.choosedKeypair}</span>
      </div>

      <div className={styles.sg}>
        <span>Security Group</span>
        {securityGroupsNode}
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    create: state.features.instance.create,
    images: selectImages(state),
    flavors: selectFlavors(state),
    networks: selectNetworks(state),
  }
};

export default connect(mapStateToProps, null)(Profile);