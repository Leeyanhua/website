import React, { PropTypes } from 'react';
import { Form, Icon, Input, Button, Modal, message } from 'antd';
import Captcha from './CaptchaButton';
import { postAuthCode, postSignup } from '../utils/Users';

const FormItem = Form.Item;

class RegistryForm extends React.Component {
  static propTypes = {
    form: PropTypes.object.isRequired,
    children: PropTypes.any.isRequired,
  }
  constructor() {
    super();
    this.state = {
      visibel: false,
    };
  }
  getAuthCode = (cb) => {
    const { validateFields } = this.props.form;
    validateFields(['phone'], (err, values) => {
      if (!err) {
        postAuthCode({ phone: values.phone }, (result) => {
          if (result.code === 0) {
            message.success(result.msg);
            cb();
          } else {
            message.error(result.msg);
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
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        postSignup(values, (result) => {
          if (result.code === 0) {
            const refresh = setTimeout(() => {
              window.location.reload();
            }, 30000);
            Modal.success({
              content: '注册成功，30秒钟后自动刷新页面，等不及的话就点击按钮立刻刷新吧！',
              width: '400px',
              footer: null,
              onOk: () => {
                clearTimeout(refresh);
                window.location.reload();
              },
              maskClosable: true,
            });
          }
        });
      }
    });
  }
  handleConfirmBlur = (e) => {
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  }
  checkPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('password')) {
      callback('您两次输入的密码不一致');
    } else {
      callback();
    }
  }
  checkConfirm = (rule, value, callback) => {
    const form = this.props.form;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    const { visible } = this.state;
    const childrenWithProps = React.Children.map(this.props.children,
      child => React.cloneElement(child, {
        onClick: this.showModal,
      }),
    );
    return (
      <span className="login-link">
        {childrenWithProps}
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
                rules: [
                  { required: true, message: '请输入您的手机号' },
                  { pattern: /^1[3|4|5|7|8][0-9]{9}$/, message: '手机号格式有误' },
                ],
              })(
                <Input prefix={<Icon type="user" />} placeholder="请输入手机号" />,
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
            <FormItem hasFeedback>
              {getFieldDecorator('confirm', {
                rules: [{
                  required: true, message: '请确认您的密码',
                }, {
                  validator: this.checkPassword,
                }],
              })(
                <Input
                  prefix={<Icon type="lock" />}
                  type="password"
                  onBlur={this.handleConfirmBlur}
                  placeholder="请确认您的密码"
                />,
              )}
            </FormItem>
            <FormItem>
              {getFieldDecorator('auth_code', {
                rules: [{ required: true, message: '请输入您的短信验证码' }],
              })(
                <div className="verify">
                  <Input
                    prefix={<Icon type="lock" style={{ fontSize: 13 }} />}
                    placeholder="验证码"
                  />&nbsp;&nbsp;&nbsp;
                  <Captcha getAuthCode={this.getAuthCode}>获取验证码</Captcha>
                </div>,
              )}
            </FormItem>
            <div className="registry-button">
              <Button type="primary" htmlType="submit" className="login-form-button">
                注册
              </Button>
            </div>
          </Form>
        </Modal>
      </span>
    );
  }
}

const Registry = Form.create()(RegistryForm);

export default Registry;
