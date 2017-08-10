import React, { PropTypes } from 'react';
import { Form, Input, Button, Modal, Row, Col } from 'antd';
import { Link } from 'react-router';
import { putSelf } from '../../utils/Users';

const FormItem = Form.Item;

class VerifyEmailForm extends React.Component {
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
        putSelf(values, (result) => {
          console.log('post self info', result.msg);
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
    const userInfo = this.context.USER;
    return (
      <div className="verify-email">
        <Link onClick={this.showModal}>验证邮箱</Link>
        <Modal
          title="验证邮箱"
          visible={visible}
          onCancel={this.handleCancel}
          okText="确定"
          cancelText="取消"
          width="300"
        >
          <Form onSubmit={this.handleSubmit} className="form-label-left">
            <FormItem
              label="邮箱"
              hasFeedback
              labelCol={{ span: 6 }}
              wrapperCol={{ span: 17 }}
            >
              {getFieldDecorator('email', {
                initialValue: userInfo.email,
                rules: [{
                  required: true, message: '请输入邮箱！',
                }],
              })(
                <Input placeholder="请输入邮箱" />,
              )}
            </FormItem>
            <FormItem
              label="验证码"
              labelCol={{ span: 6 }}
              wrapperCol={{ span: 16 }}
            >
              <Row>
                <Col span={12}>
                  {getFieldDecorator('captcha', {
                    rules: [{ required: true, message: '请输入邮箱的验证码!' }],
                  })(
                    <Input size="large" placeholder="验证码" />,
                  )}
                </Col>
                <Col span={10}>
                  <Button htmlType="submit" size="large">获取验证码</Button>
                </Col>
              </Row>
            </FormItem>
          </Form>
        </Modal>
      </div>
    );
  }
}
VerifyEmailForm.contextTypes = {
  USER: PropTypes.object,
};
const VerifyEmail = Form.create()(VerifyEmailForm);

export default VerifyEmail;
