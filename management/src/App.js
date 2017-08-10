import React, { Component } from 'react';
import { Layout } from 'antd';
import './style/index.less';
import SiderCustom from './components/SiderCustom';
import HeaderCustom from './components/HeaderCustom';
const { Content, Footer } = Layout;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: false,
    };
  }
  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };
  render() {
    return (
      <Layout className="ant-layout-has-sider">
        <SiderCustom path={this.props.location.pathname} collapsed={this.state.collapsed} />
        <Layout>
          <HeaderCustom toggle={this.toggle} />
          <Content style={{ overflow: 'initial' }}>
            {this.props.children}
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            小创后台管理系统 ©2017 Created by VeilyTech
          </Footer>
        </Layout>
      </Layout>
    );
  }
}

export default App;
