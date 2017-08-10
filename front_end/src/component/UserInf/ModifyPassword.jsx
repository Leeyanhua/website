import React from 'react';
import { Form, Input, Button, Icon } from 'antd';
import { browserHistory } from 'react-router';
import { putPassword, getSignOut } from '../../utils/Users';

const FormItem = Form.Item;
const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 4 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 10 },
  },
};
class ModifyPassword extends React.Component {
  static propTypes = {
    form: React.PropTypes.object.isRequired,
  }
  state = {
    confirmDirty: false,
  };
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        putPassword(values, (result) => {
          console.log(`'modify pass' + ${result} + ${values}`);
          if (result.code === 0) {
            getSignOut(null, (resultOut) => {
              if (resultOut.code === 0) {
                browserHistory.push('/');
              }
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
      callback('Two passwords that you enter is inconsistent!');
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
    return (
      <Form onSubmit={this.handleSubmit} className="form-label-left">
        <FormItem
          {...formItemLayout}
          label="原密码"
          hasFeedback
        >
          {getFieldDecorator('originPassword', {
            rules: [{
              required: true, message: '请输入原密码',
            }],
          })(
            <Input prefix={<Icon type="lock" />} type="password" placeholder="请输入原密码" />,
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="新密码"
          hasFeedback
        >
          {getFieldDecorator('password', {
            rules: [{
              required: true, message: '请输入新密码',
            }, {
              validator: this.checkConfirm,
            }],
          })(
            <Input prefix={<Icon type="lock" />} type="password" placeholder="请输入新密码" />,
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="重复新密码"
          hasFeedback
        >
          {getFieldDecorator('confirm', {
            rules: [{
              required: true, message: '请确认您的新密码',
            }, {
              validator: this.checkPassword,
            }],
          })(
            <Input
              prefix={<Icon type="lock" />}
              type="password"
              onBlur={this.handleConfirmBlur}
              placeholder="请确认您的新密码"
            />,
          )}
        </FormItem>
        <Button type="primary" htmlType="submit" size="large" className="save-button">保存</Button>
      </Form>
    );
  }
}
ModifyPassword.contextTypes = {    // 子组件
  USER: React.PropTypes.object,
};

const WrappedRegistrationForm = Form.create()(ModifyPassword);
export default WrappedRegistrationForm;
