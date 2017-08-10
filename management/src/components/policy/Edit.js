import React, { Component } from 'react';
import { Form, Select, Input, Button, Card, Upload, Icon } from 'antd';
import { policyById, putPolicy } from '../../axios/policy.js'
import RichEditer, { initEditer, toRaw } from '../../utils/RichEditer.js';
import { browserHistory } from 'react-router';
import TagEditer from './EditerComponent/TagEditer.js'

const FormItem = Form.Item;
const Option = Select.Option;

class PolicyEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editorState: null,
      data: {},
      tagsArray: [],    
    };
  }
  
  componentWillMount() {
    const { id } = this.props.params;
    const { tagsArray } = this.state;
    policyById(id).then(res => {
      console.log('res', res.data);
      const editorState = initEditer(res.data.content);
        for(let i in res.data.keywords){
              tagsArray.push(res.data.keywords[i]);
        }
      this.setState({ data: res.data, editorState, tagsArray });
    });
  }
  
  handleSubmit = (e) => {
      e.preventDefault();
      this.props.form.validateFields((err, values) => {
          if (!err) {
              console.log('Received values of form: ', values);
          }
      });
  }

  onEditorStateChange = (editorState) => {
    // console.log('editorState', toHtml(editorState));

    const { data } = this.state;
    const newData = Object.assign({}, data);
    newData.content = editorState;

    this.setState({
      editorState,
      data: newData,
    });
  };

  onSave = () => {
    const { data } = this.state;
    console.log('data', data);
    // 更新数据库
    putPolicy(data._id, { content: JSON.stringify(toRaw(data.content)) }).then(res => {
      browserHistory.goBack();
    });
  }

  render() {
    const { editorState, data, tagsArray } = this.state;
    console.log('editorState', editorState);
    const { getFieldDecorator } = this.props.form;
    return (
      <div style={{ marginTop: 20 }}>     
            <Card bordered={false}>
             <Form style={{ margin: 20 }} onSubmit={this.handleSubmit} >
                <FormItem>
                    <div style={{ marginBottom: 10, fontSize: 14, fontWeight: 'bold' }}>新增内容</div>
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
                            <span style={{ fontSize: 15 }}>请输入文章标题</span>
                            <Input placeholder="请输入" style={{ border: 'none' }} />
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
                    <div style={{ marginBottom: 10, fontSize: 14, fontWeight: 'bold' }}>分类</div>
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
                    <div style={{ marginBottom: 10, fontSize: 14, fontWeight: 'bold' }}>摘要</div>
                    {getFieldDecorator('input', {
                            rules: [
                            { required: true, message: 'Please select your country!' },
                            ],
                        })(
                        <div>
                                <Input type="textarea" rows={4} placeholder="选填，如果不填会抓取正文前180个字" style={{ border: 'none' }} />
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
           {/* <RichEditer title="政策内容" value={editorState} onChange={this.onEditorStateChange} />    */}

          {/* <Button onClick={this.onSave} style={{ marginTop: 20 }}>保存修改</Button>   */}
      </div>
    );
  }
}
PolicyEdit= Form.create({})(PolicyEdit);

export default PolicyEdit;
