import React, { Component } from 'react';
import { Card, Input } from 'antd';

class SummaryEditer extends Component{
     render() {
        const { title } = this.props;
        return (
        <Card title={title} bordered={false} >
            <Input type="textarea" rows={4} defaultValue="选填，如果不填会抓取正文前180个字" />
            <div style={{marginLeft: 1400}}>0/180</div>         
        </Card>
        );
  }
}

export default SummaryEditer;