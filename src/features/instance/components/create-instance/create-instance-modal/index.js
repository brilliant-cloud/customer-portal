import React from 'react';
import { connect } from 'react-redux';
import { Modal, Steps, Button } from 'antd';

import Image from './Image';
import Flavor from './Flavor';
import Network from './Network';
import Security from './Security';
import Profile from './Profile';
import { createServer } from 'app/orm/nova/server/actions';

import {
  choosedNetworks,
  choosedSecurityGroup,
  choosedVolume,
  choosedFlavor,
  choosedKeypair,
  filledInstance,
} from 'features/instance/actions';

import styles from './style/index.css'
import Volume from "features/volume";
import VolumeSelection from './Volume';

const Step = Steps.Step;

class CreateInstanceModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      current: 0
    }
  }

  handleSubmit = () => {
    this.props.dispatch(createServer(this.props.createInstance));
    this.handleCancel();
  };

  handleCancel = () => {
    this.props.dispatch(choosedSecurityGroup([]));
    this.props.dispatch(choosedVolume(''));
    this.props.dispatch(choosedFlavor(''));
    this.props.dispatch(choosedKeypair(''));
    this.props.dispatch(filledInstance(''));
    this.props.handleModalCancel(false);
  };

  next = () => {
    const current = this.state.current + 1;
    this.setState({ current });
  };

  prev = () => {
    const current = this.state.current - 1;
    this.setState({ current });
  };

  render() {
    const { current } = this.state;
    const steps = [{
      title: 'Volume',
      content: <VolumeSelection/>
    }, {
      title: 'Flavor',
      content: <Flavor />
    }, {
      title: 'Network',
      content: <Network />
    }, {
      title: 'Security',
      content: <Security />
    }, {
      title: 'Profile',
      content: <Profile />
    }];

    return (
      <Modal
        title="Create a Cloud Host"
        width="700px"
        footer={null}
        visible={this.props.visible}
        onCancel={this.handleCancel}
      >
        <div>
          <Steps current={current}>
            {steps.map(item => <Step key={item.title} title={item.title} />)}
          </Steps>

          <div className={styles.content}>
            {steps[this.state.current].content}
          </div>

          <div className={styles.action}>
            {
              this.state.current < steps.length - 1
              &&
              <Button
                className={styles.next}
                type="primary"
                onClick={() => this.next()}
              >
                Next Step
              </Button>
            }
            {
              this.state.current === steps.length - 1
              &&
              <Button
                className={styles.confirm}
                type="primary"
                onClick={this.handleSubmit}
              >
                Carry Out
              </Button>
            }
            {
              this.state.current > 0
              &&
              <Button
                className={styles.prev}
                type="primary"
                onClick={() => this.prev()}
              >

                Previous
              </Button>
            }
          </div>
        </div>
      </Modal>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    createInstance: state.features.instance.create,
  }
};
export default connect(mapStateToProps, null)(CreateInstanceModal);