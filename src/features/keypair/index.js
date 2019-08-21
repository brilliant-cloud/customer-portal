import React from 'react';
import { connect } from 'react-redux';
import KeypairTable from 'features/keypair/components/KeypairTable';
import { getKeypairs } from 'app/orm/nova/keypair/actions';

class Keypair extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.dispatch(getKeypairs());
  }

  render() {
    return (
      <KeypairTable />
    )
  }
}

export default connect(null, null)(Keypair);