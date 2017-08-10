import React, { PropTypes } from 'react';
import { Form, Icon, Input, Button, Checkbox, Modal } from 'antd';
import { Link } from 'react-router';
import { login } from '../utils/Users';

const FormItem = Form.Item;

class LoginForm extends React.Component {
  static propTypes = {
    form: PropTypes.object.isRequired,
  }
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    };
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        login(values, (result) => {
          console.log('post sign up', result.msg);
          if (result.code === 0) {
            window.location.reload();
          }
        });
      }
    });
  }
  showModal = () => {
    this.setState({
      visible: true,
    });
  }
  handleCancel = () => {
    this.setState({ visible: false });
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    const { visible } = this.state;
    return (
      <div className="login-link">
        <Link onClick={this.showModal}>登录</Link>
        <Modal
          visible={visible}
          onCancel={this.handleCancel}
          footer={null}
          width="300px"
        >
          <Form onSubmit={this.handleSubmit} className="login-form">
            <h3>创业工具箱</h3>
            <FormItem>
              {getFieldDecorator('phone', {
                rules: [{ required: true, message: '请输入您的手机号' }],
              })(
                <Input prefix={<Icon type="user" />} placeholder="请输入手机号" onChange={this.inputPhone} />,
              )}
            </FormItem>
            <FormItem>
              {getFieldDecorator('password', {
                rules: [{
                  required: true, message: '请输入您的密码',
                }, {
                  validator: this.checkConfirm,
                }],
              })(
                <Input prefix={<Icon type="lock" />} type="password" placeholder="请输入您的密码" />,
              )}
            </FormItem>
            <FormItem>
              {getFieldDecorator('remember', {
                valuePropName: 'checked',
                initialValue: true,
              })(
                <Checkbox>自动登录</Checkbox>,
              )}
              <br />
              <div className="login-button">
                <Button type="primary" htmlType="submit">
                  登录
                </Button>
              </div>
            </FormItem>
          </Form>
        </Modal>
      </div>
    );
  }
}
const Login = Form.create()(LoginForm);

export default Login;
