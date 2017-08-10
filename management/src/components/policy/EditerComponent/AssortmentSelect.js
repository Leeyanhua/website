import React, { Component } from 'react';
import { Card, Select } from 'antd';

const Option = Select.Option;

class AssortmentSelect extends Component{
     render() {
        const { title } = this.props;
        return (
        <Card title={title} bordered={false} >
           <div>
              来源    
              <Select defaultValue="lucy" style={{ width: 150,marginLeft:40 }}>
                <Option value="jack">Jack</Option>
                <Option value="lucy">Lucy</Option>
                <Option value="mary">mary</Option>
                <Option value="Yiminghe">yiminghe</Option>
              </Select>
            <span style={{marginLeft:200}}> 
              城市    
              <Select defaultValue="lucy" style={{ width: 150,marginLeft:20 }}>
                <Option value="jack">Jack</Option>
                <Option value="lucy">Lucy</Option>
                <Option value="mary">mary</Option>
                <Option value="Yiminghe">yiminghe</Option>
              </Select>
            </span> 
            <span style={{marginLeft:200}}>  
              类型    
              <Select defaultValue="lucy" style={{ width: 150,marginLeft:20 }}>
                <Option value="jack">Jack</Option>
                <Option value="lucy">Lucy</Option>
                <Option value="mary">mary</Option>
                <Option value="Yiminghe">yiminghe</Option>
              </Select>
            </span>   
            </div>  
        </Card>
        );
  }
}

export default AssortmentSelect;