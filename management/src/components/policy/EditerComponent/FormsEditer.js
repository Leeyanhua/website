import React, { Component } from 'react';
import { Form, Select, Input, Button, Card, Upload, Icon } from 'antd';
import TagEditer from './TagEditer.js'
import RichEditer, { initEditer, toRaw } from '../../../utils/RichEditer.js';

const FormItem = Form.Item;
const Option = Select.Option;

class FormsEditer extends Component{
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
    }
    render(){
        const { getFieldDecorator } = this.props.form;
        const { editorState, data } = this.props;
        let tagsArray= [];
        for(i in data.keywords){
             tagsArray.push(data.keywords[i]);
        }
        return(
            <Card bordered={false}>
             <Form style={{ margin: 20 }} onSubmit={this.handleSubmit} >
                <FormItem>
                    <div style={{ marginBottom: 10, fontSize: 14 }}>新增内容</div>
                    <div className="dropbox">
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
                    </div>
                </FormItem>
                 <FormItem>
                    {getFieldDecorator('inputTitle', {
                        rules: [
                            { required: true, message: 'Please writer your title!' },
                        ],
                    })(
                       <div> 
                            <span>请输入文章标题</span>
                            <Input placeholder="请输入" />
                        </div> 
                    )}
                </FormItem> 
                <FormItem>
                    {getFieldDecorator('richEditer', { initialValue: editorState }, {
                        rules: [
                            { required: true, message: 'Please writer your policyContent!' },
                        ],
                    })(
                        <RichEditer title="政策内容" />
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
                    <div style={{ marginBottom: 10, fontSize: 14 }}>分类</div>
                    {getFieldDecorator('select', {
                            rules: [
                                { required: true, message: 'Please select your information!' },
                            ],
                        })(
                            <div>
                            <span style={{ marginLeft: 100 }}>来源</span>
                                <Select placeholder="" style={{ width: 200, marginLeft: 20 }}>
                                    <Option value="china">China</Option>
                                    <Option value="use">U.S.A</Option>
                                </Select>
                            <span style={{ marginLeft: 100 }}>城市</span>   
                                <Select placeholder="" style={{ width: 200, marginLeft: 20 }}>
                                    <Option value="china">China</Option>
                                    <Option value="use">U.S.A</Option> 
                                </Select>
                            <span style={{ marginLeft: 100 }}>分类</span>  
                                <Select placeholder="" style={{ width: 200, marginLeft: 20 }}>
                                    <Option value="china">China</Option>
                                    <Option value="use">U.S.A</Option>
                                </Select>
                        </div> 
                        )}
                </FormItem>
                <FormItem>
                    <div style={{ marginBottom: 10, fontSize: 14 }}>摘要</div>
                    {getFieldDecorator('input', {
                            rules: [
                            { required: true, message: 'Please select your country!' },
                            ],
                        })(
                        <div>
                                <Input type="textarea" rows={4} placeholder="选填，如果不填会抓取正文前180个字" />
                                <div style={{marginLeft: 1400}}>0/180</div> 
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
                            <Button style={{ marginLeft: 1300, width: 80 }}>存为草稿</Button>
                            <Button style={{ marginLeft: 20, width: 80 }}>预览</Button>
                            <Button style={{ marginLeft: 20, width: 80 }} htmlType="submit">发送</Button>
                        </div>
                        )}
                </FormItem>
             </Form>
            </Card> 
        )
    }
}

FormsEditer= Form.create({})(FormsEditer);

export default FormsEditer;