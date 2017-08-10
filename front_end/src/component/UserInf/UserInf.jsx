import React, { PropTypes } from 'react';
import { Form, Input, Select, Row, Col, Button, Tabs, Radio, Card } from 'antd';
import VerifyEmail from './VerifyEmail';
import ModifyPassword from './ModifyPassword';
import { putSelf } from '../../utils/Users';

const FormItem = Form.Item;
const Option = Select.Option;
const TabPane = Tabs.TabPane;
const RadioGroup = Radio.Group;

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
class UserInfo extends React.Component {
  static propTypes = {
    form: PropTypes.object.isRequired,
  }
  constructor(props) {
    super(props);
    this.state = {
      emailModalVisible: false,
    };
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        putSelf(values, (result) => {
          if (result.code === 0) {
            window.location.reload();
          }
        });
      }
    });
  }
  showModal = () => {
    this.setState({
      emailModalVisible: true,
    });
  }
  handleCancel = (e) => {
    console.log(e);
    this.setState({
      emailModalVisible: false,
    });
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    const userInfo = this.context.USER;
    return (
      <Card className="user-right-card">
        <Tabs type="card" className="user-inf">
          <TabPane tab="基本信息" key="1">
            <Row><Col span={4} >手机:</Col>
              <Col span={14}>
                {userInfo.phone &&
                  `${userInfo.phone.toString().slice(0, 3)}****${userInfo.phone.toString().slice(7)}`
                }
              </Col>
            </Row><br />
            <Row>
              <Col span={4} >邮箱:</Col>
              <Col span={14}>
                {userInfo.email ? userInfo.email : <VerifyEmail />}
              </Col>
            </Row><br />
            <Form onSubmit={this.handleSubmit} className="form-label-left">
              <FormItem
                {...formItemLayout}
                label="真实姓名"
                hasFeedback
              >
                {getFieldDecorator('realname', {
                  initialValue: userInfo.realname,
                  rules: [{
                    message: '请输入姓名',
                  }],
                })(
                  <Input placeholder="请输入姓名" />,
                )}
              </FormItem>
              <FormItem
                {...formItemLayout}
                label="性别"
              >
                {getFieldDecorator('gender', {
                  initialValue: userInfo.gender,
                })(
                  <RadioGroup>
                    <Radio value={0}>男</Radio>
                    <Radio value={1}>女</Radio>
                  </RadioGroup>,
                )}
              </FormItem>
              <FormItem
                {...formItemLayout}
                label="所属企业"
                hasFeedback
              >
                {getFieldDecorator('company', {
                  initialValue: userInfo.company,
                })(
                  <Input placeholder="请输入企业名称" />,
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
                label="职位"
                hasFeedback
              >
                {getFieldDecorator('position', {
                  initialValue: userInfo.position,
                })(
                  <Input placeholder="请输入职位名称" />,
                )}
              </FormItem>
              <Button type="primary" htmlType="submit" size="large" className="save-button">保存</Button>
            </Form>
          </TabPane>
          <TabPane tab="修改密码" key="2">
            <Row><Col span={4} >手机:</Col><Col span={14} >{userInfo.phone}</Col></Row><br />
            <ModifyPassword />
          </TabPane>
        </Tabs>
      </Card>
    );
  }
}
UserInfo.contextTypes = {
  USER: PropTypes.object,
};

const WrappedRegistrationForm = Form.create()(UserInfo);
export default WrappedRegistrationForm;
