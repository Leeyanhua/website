import React, { Component } from 'react';
import { Form, Select, Input, Button, Card, Upload, Icon } from 'antd';
// import { spaceById, putPolicy } from '../../axios/space.js'
// import { browserHistory } from 'react-router';
import TagEditer from '../policy/EditerComponent/TagEditer.js'

const FormItem = Form.Item;
const Option = Select.Option;
const InputGroup = Input.Group;

class EditAdd extends Component {
  
  handleSubmit = (e) => {
    e.preventDefault();
      this.props.form.validateFields((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values);
        }
      });
  }
  
  render() {
    const { getFieldDecorator } = this.props.form;
    const tagsArray = [];
    return (
      <div style={{ marginTop: 20 }}>     
        <Card bordered={false}>
          <Form style={{ width: '70%', margin: 'auto' }}>
            <FormItem>
              {getFieldDecorator('inputArea', { initialValue: "华中科技园" }, {
                  rules: [
                    { required: true, message: 'Please write your address!' },
                  ],
                })(
                  <div>
                    <div>
                      <span>名称</span>
                        <Input style={{ width: 150, marginLeft: 10 }} /><br />
                      <span>位置</span>
                        <InputGroup compact>
                          <Select style={{ width: 130 }}>
                            <Option value="Zhejiang">武汉市</Option>
                            <Option value="Jiangsu">Jiangsu</Option>
                          </Select>
                          <Select style={{ width: 130 }}>
                            <Option value="Zhejiang">江夏区</Option>
                            <Option value="Jiangsu">Jiangsu</Option>
                          </Select>
                            <Input style={{ width: 200 }} />
                        </InputGroup>
                    </div>    
                      <div style={{ marginTop: 30 }}>
                        <span>价格</span>
                        <Input style={{ width: 30, marginLeft: 10 }} />~<Input style={{ width: 30, marginLeft: 10 }} /> 
                        <span style={{ marginLeft: 5 }} >元m2/月</span>
                        <span style={{ marginLeft: 30 }}>面积</span>
                        <Input style={{ width: 30, marginLeft: 10 }} />~<Input style={{ width: 30, marginLeft: 10 }} /> 
                        <span style={{ marginLeft: 5 }} >m2</span>   
                      </div>  
                  </div>  
                )}  
            </FormItem>         
              <FormItem>
                {getFieldDecorator('tags', { initialValue: tagsArray }, {
                  rules: [
                    { required: true, message: 'Please select your Tags!' },
                  ],
                })(
                   <TagEditer />   
                )}
              </FormItem> 
                <FormItem>
                  {getFieldDecorator('select', {
                    rules: [
                      { required: true, message: 'Please select your information!' },
                     ],
                   })(
                     <div> 
                        <div>
                          <span>行业</span>
                            <Select placeholder="" style={{ width: 200, marginLeft: 20 }}>
                              <Option value="china">China</Option>
                              <Option value="use">U.S.A</Option>
                            </Select>
                              <br />
                        </div>
                        <div style={{ marginTop: 10 }}> 
                          <span >控制时间</span> 
                            <Select placeholder="" style={{ width: 200, marginLeft: 20 }}>
                              <Option value="china">China</Option>
                                <Option value="use">U.S.A</Option> 
                            </Select>
                        </div> 
                     </div>
                    )}
                </FormItem>
                <FormItem style={{ marginBottom: 10 }}>
                    <div>
                        <span style={{ marginBottom: 10, fontSize: 14, fontWeight: 'bold' }}>空间图片</span>
                        <span className="dropbox">
                            {getFieldDecorator('dragger', {
                                valuePropName: 'fileList',
                                getValueFromEvent: this.normFile,
                            })(
                            <Upload.Dragger name="files" action="/upload.do">
                                <p className="ant-upload-drag-icon">
                                    <Icon type="inbox" />
                                </p>
                                <p className="ant-upload-text">Click or drag file to this area to upload</p>
                                <p className="ant-upload-hint">Support for a single or bulk upload. Strictly prohibit from uploading company data or other band files</p>
                            </Upload.Dragger>
                            )}
                        </span>
                    </div>    
                </FormItem>
                <FormItem>
                  {getFieldDecorator('telephone_number', { initialValue: tagsArray }, {
                        rules: [
                            { required: true, message: 'Please writer your telepone number!' },
                        ],
                    })(
                      <div>  
                        <span>电话</span>
                          <Input style={{ width: 200, marginLeft: 10 }} /> <br />
                        <span>地理位置</span>
                          <span style={{ marginLeft: 20 }}>经度</span>
                            <Input style={{ width: 70, marginLeft: 10 }} />
                          <span style={{ marginLeft: 20 }}>纬度</span>
                            <Input style={{ width: 70, marginLeft: 10 }} />                           
                      </div>  
                    )}
                </FormItem> 
                <FormItem>                    
                    {getFieldDecorator('input', {
                       rules: [
                         { required: true, message: 'Please write your company informations!' },
                       ],
                       })(
                            <div>
                                <div style={{ marginBottom: 10, fontSize: 14, fontWeight: 'bold' }}>入驻企业</div>
                                    <Input type="textarea" rows={4} />
                                <div style={{ marginBottom: 10, fontSize: 14, fontWeight: 'bold' }}>提供服务</div>
                                    <Input type="textarea" rows={4} />
                                <div style={{ marginBottom: 10, fontSize: 14, fontWeight: 'bold' }}>优惠政策</div>
                                    <Input type="textarea" rows={4} />
                                <div style={{ marginBottom: 10, fontSize: 14, fontWeight: 'bold' }}>企业申报条件</div>
                                    <Input type="textarea" rows={4} />
                                <div style={{ marginBottom: 10, fontSize: 14, fontWeight: 'bold' }}>新闻动态</div>
                                    <Input type="textarea" rows={4} />        
                            </div>    
                    )}
                </FormItem>
            <FormItem>
                {getFieldDecorator('button', {
                    rules: [
                        { required: true, message: 'Please select button!' },
                    ],
                })(
                    <div>
                        <Button style={{ marginLeft: 880, width: 80 }}>预览</Button>
                        <Button style={{ marginLeft: 20, width: 80 }}>保存</Button>
                        <Button style={{ marginLeft: 20, width: 80 }} htmlType="submit">发送</Button>
                    </div>
                )}
            </FormItem>
          </Form>
        </Card> 
      </div>
    );
  }
}
EditAdd= Form.create({})(EditAdd);

export default EditAdd;
