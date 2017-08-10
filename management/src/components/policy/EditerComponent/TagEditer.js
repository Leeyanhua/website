import React, { Component } from 'react';
import { Tag, Input, Tooltip, Button } from 'antd';

class TagEditer extends Component { 
  constructor(props){
    super(props);
      this.state = {   
         inputVisible: false,
         inputValue: '',
      }
  }

  handleClose(removedTag){
    const { value, onChange } = this.props;
    const tags = value.filter(tag => tag !== removedTag);
    onChange(tags);
  }

  showInput = () => {
    this.setState({ inputVisible: true }, () => this.input.focus());
  }

  handleInputChange = (e) => {
    this.setState({ inputValue: e.target.value });
  }

  handleInputConfirm = (e) =>{
    e.preventDefault();
    let { value, onChange } = this.props;
    const inputValue = this.state.inputValue;
    if (inputValue && value.indexOf(inputValue) === -1) {
       value = [...value, inputValue];
    }
    onChange(value);
     this.setState({
         inputVisible: false,
         inputValue: '',
    });
  }
  
  saveInputRef = input => this.input = input

  render() {
  　const { value } = this.props;
    const { inputVisible, inputValue } = this.state;　
    return (
        <div>
        <span style={{ fontSize: 14, fontWeight: 'bold', marginBottom: 30 }}>标签<br /></span>  
        <span>热门标签</span>
        <span style={{marginLeft: 50}}>   
            {value.map((tag, index) => {
                const isLongTag = tag.length > 20;
                const tagElem = (
                    <Tag key={tag} closable={index !== 0} afterClose={() => this.handleClose(tag)}>
                        {isLongTag ? `${tag.slice(0, 20)}...` : tag}
                    </Tag>
                );
                return isLongTag ? <Tooltip title={tag}>{tagElem}</Tooltip> : tagElem;
            })}
            {inputVisible && (
                <Input
                    ref={this.saveInputRef}
                    type="text"
                    style={{ width: 100 }}
                    value={inputValue}
                    onBlur={this.handleInputConfirm}
                    onChange={this.handleInputChange}
                    onPressEnter={this.handleInputConfirm}
                />
            )}
            {!inputVisible && <Button type="solid" onClick={this.showInput}>+</Button>}
        </span>
      </div>
    );
  }
}

export default TagEditer;