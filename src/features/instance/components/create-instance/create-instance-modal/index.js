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
  choosedImage,
  choosedFlavor,
  choosedKeypair,
  filledInstance,
} from 'features/instance/actions';

import styles from './style/index.css'

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
    this.props.dispatch(choosedImage(''));
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
      title: '选择镜像',
      content: <Image />
    }, {
      title: '选择规格',
      content: <Flavor />
    }, {
      title: '选择网络',
      content: <Network />
    }, {
      title: '安全设置',
      content: <Security />
    }, {
      title: '确认',
      content: <Profile />
    }];

    return (
      <Modal
        title="创建云主机"
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
                下一步
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
                完成
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
                上一步
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