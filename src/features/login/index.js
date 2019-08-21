import React from 'react';
import { connect } from 'react-redux';
import { Form, Icon, Input, Button } from 'antd';
import styles from './index.css';
import { login, loadTokenData } from 'app/orm/auth/login/actions';
import { Redirect } from 'react-router-dom';
import { decideIfLogged } from 'app/commons/common';
import { selectLogin } from 'app/selectors/orm/auth';

const FormItem = Form.Item;

class NormalLoginForm extends React.Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleTry = () => {
    this.props.dispatch(login({'username': 'admin', 'password': 'admin'}))
  };

  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.dispatch(login(values));
      }
    })
  }
  
  render() {
    const { getFieldDecorator } = this.props.form;

    let isLogged = this.props.login.isLogged ? true : decideIfLogged();

    let referrer, location = this.props.location;
    if (location.state) {
      referrer = location.state.referrer;
    } else {
      referrer = '/console/overview';
    }

    return (
      isLogged ?
      <Redirect to={referrer} /> :
      (
        <div className={styles.wrapper}>
          <div className={styles.login}>
            <Form onSubmit={this.handleSubmit} className={styles.form}>
              <FormItem>
                {getFieldDecorator('username', {
                  rules: [{ required: true, message: 'Enter Your Email' }],
                })(
                  <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />}
                         placeholder="email"
                  />
                )}
              </FormItem>

              <FormItem>
                {getFieldDecorator('password', {
                  rules: [{ required: true, message: 'Enter Your Password！' }],
                })(
                  <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />}
                         type="password"
                         placeholder="password"
                  />
                )}
              </FormItem>

              <FormItem>
                <Button type="primary" htmlType="submit" className={styles.btnLogin}>
                  LogIn
                </Button>
              </FormItem>

            </Form>

          </div>
        </div>
      )
    );
  }
}

function mapStateToProps(state) {
  return {
    login: selectLogin(state)
  }
}

const Login = Form.create()(NormalLoginForm);
export default connect(mapStateToProps, null)(Login);
