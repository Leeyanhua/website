import React, { PropTypes } from 'react';
import { message, Card, Form, Input, Select, Upload, Button, Icon, Row, Col, Modal } from 'antd';
import { browserHistory } from 'react-router';
import { getIncubator, postSpace } from '../../utils/Space';
import { putColIncu } from '../../utils/Users';

const { Option } = Select;
const FormItem = Form.Item;
// const TextArea = Input.TextArea;
// console.log('textaea', TextArea);
const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 6 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 18 },
  },
};

class Apply extends React.Component {
  static propTypes = {
    form: PropTypes.object.isRequired,
    params: PropTypes.object.isRequired,
  }
  constructor(props) {
    super(props);
    this.state = {
      content: {},
    };
  }
  componentWillMount() {
    getIncubator(this.props.params.id, (result) => {
      if (result.code === 0) {
        this.setState({ content: result.data });
      }
    });
  }
  onChange = (info) => {
    if (info.file.status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === 'done') {
      message.success(`${info.file.name} 文件上传成功。`);
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} 文件上传失败！`);
    }
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const { _id, name } = this.state.content;
        values.space = { _id, name };
        postSpace(values, () => {
          if (this.context.USER._id) {    // 用户已登陆
            putColIncu(this.state.content._id, (result) => {
              if (result.code === 0) {
                message.success('空间申请成功，已经自动收藏该空间信息');
                browserHistory.goBack();
              }
            });
          } else {      // 用户未登录
            const modal = {
              content: 'Tips:登陆让您的个人信息更有保障哦',
              onCancel: () => {
                message.success('空间申请成功');
                browserHistory.goBack();
              },
              onOk: () => {
                message.success('空间申请成功');
                browserHistory.goBack();
              },
              maskClosable: true,
            };
            Modal.success(modal);
          }
        });
      }
    });
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    const { content } = this.state;
    console.log('space apply', this.context.USER);
    const userInfo = this.context.USER;
    return (
      <div>
        <Card className="apply-title">
          <h2 style={{ color: '#3ac1bd', textAlign: 'center' }}>{content.name}</h2>
        </Card>
        <Card className="applyweb">
          <h2 style={{ color: '#3ac1bd' }}>空间申请</h2>
          <Form onSubmit={this.handleSubmit} className="form-label-left">
            <FormItem
              {...formItemLayout}
              label="姓名"
              hasFeedback
            >
              {getFieldDecorator('realname', {
                initialValue: userInfo.realname && userInfo.realname,
                rules: [{
                  message: '请输入姓名', required: true,
                }],
              })(
                <Input placeholder="请输入姓名" />,
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="手机号码"
              hasFeedback
            >
              {getFieldDecorator('phone', {
                initialValue: userInfo.phone,
                rules: [{
                  message: '请输入手机号码', required: true,
                }],
              })(
                <Input placeholder="请输入手机号码" />,
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="邮箱"
              hasFeedback
            >
              {getFieldDecorator('email', {
                initialValue: userInfo.email,
                rules: [{
                  message: '请输入邮箱', type: 'email',
                }],
              })(
                <Input placeholder="请输入邮箱" />,
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="所属企业"
              hasFeedback
            >
              {getFieldDecorator('company', {
                initialValue: userInfo.company,
                rules: [{
                  message: '请输入所属企业',
                }],
              })(
                <Input placeholder="请输入所属企业" />,
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="官网链接"
              hasFeedback
            >
              {getFieldDecorator('company_link', {
                initialValue: userInfo.company_link,
                rules: [{
                  message: '请输入官网链接',
                }],
              })(
                <Input placeholder="请输入官网链接" />,
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="企业所属行业"
              hasFeedback
            >
              {getFieldDecorator('industry', {
                initialValue: userInfo.industry,
              })(
                <Select
                  showSearch
                  placeholder="请选择所属行业"
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                >
                  <Option value="web">互联网</Option>
                  <Option value="finance">金融</Option>
                  <Option value="manufacture">制造业</Option>
                </Select>,
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="融资情况"
              hasFeedback
            >
              {getFieldDecorator('financing_situation', {
                initialValue: userInfo.financing_situation,
              })(
                <Select
                  showSearch
                  placeholder="请选择融资状况"
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                >
                  <Option value="1">不需要融资</Option>
                  <Option value="2">有融资意向</Option>
                  <Option value="3">种子轮</Option>
                  <Option value="4">天使轮</Option>
                  <Option value="5">A轮</Option>
                  <Option value="6">B轮</Option>
                  <Option value="7">C轮</Option>
                  <Option value="8">D轮及以上</Option>
                </Select>,
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="项目简介"
              hasFeedback
            >
              {getFieldDecorator('project_brief', {
                rules: [{
                  message: '请输入项目简介',
                }],
              })(
                <Input placeholder="请输入项目简介" />,
              )}
            </FormItem>
            <Row><Col span={6} >附件:</Col>
              <Col span={18} >
                <Upload
                  name="file"
                  action="//jsonplaceholder.typicode.com/posts/"
                  headers={{ authorization: 'authorization-text' }}
                >
                  <Button>
                    <Icon type="upload" /> 本地上传
                  </Button>
                </Upload>
              </Col>
            </Row><br />
            <Button type="primary" htmlType="submit" size="large" className="apply-button">
              立刻申请
            </Button>
          </Form>
        </Card>
      </div>
    );
  }
}
Apply.contextTypes = {    // 子组件
  USER: PropTypes.object,
};
const WrappedRegistrationForm = Form.create()(Apply);
export default WrappedRegistrationForm;
