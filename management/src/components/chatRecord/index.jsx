import './less/index.less';
import React from 'react';
import { Link } from 'react-router';
import { Layout, Menu } from 'antd';
const { Sider, Content } = Layout;

export default class Index extends React.Component {
  render() {
    return (
      <Layout className="ai">
        <Sider className="ai-side">
          <h2 style={{ lineHeight: '42px' }}>AI</h2>
          <Menu>
            <Menu.Item key="1"><Link to="/admin/ai/standard-QA">标准问答库</Link></Menu.Item>
            <Menu.Item key="2">常见问题库</Menu.Item>
            <Menu.Item key="3">问题收集库</Menu.Item>
            <Menu.Item key="4">聊天记录库</Menu.Item>
            <Menu.Item key="5">数据统计</Menu.Item>
          </Menu>
        </Sider>
        <Content>{this.props.children}</Content>
      </Layout>
    );
  }
}
