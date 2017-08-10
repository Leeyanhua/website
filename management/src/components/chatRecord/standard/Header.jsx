import React from 'react';
import { Link } from "react-router";
import { Card } from 'antd';

export default class Header extends React.Component {
  render() {
    return (
      <div>
        <Card className="standard_top">
          <h2><Link activeStyle={{ color: 'black' }} to="/admin/ai/standard-QA">标准问题</Link></h2>
          <h2><Link to="/admin/ai/standard-QA">未知问题</Link></h2>
          <h2><Link to="/admin/ai/standard-QA">聊天监控</Link></h2>
        </Card>
        <Card className="standard_bottom">{this.props.children}</Card>
      </div>
    );
  }
}
