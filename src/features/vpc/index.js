import React from 'react';
import NetworkTopology from './components/NetworkTopology'

import styles from './index.css';

function VPC() {
  return (
    <div className={styles.vpc}>
      <NetworkTopology />
    </div>
  )
}
export default VPC;