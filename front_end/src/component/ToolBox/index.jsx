import React from 'react';

import Nav from '../../routes/Nav';
import ChatBot from './ChatBot';
import Service from './Service';
import Registry from './Registry';
import Footer from '../../routes/Footer';
import { getUser } from '../../utils/Users';
import './less/antMotion_style.less';

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      USER: {},
    };
  }
  // 向所有子 发送公共 context
  getChildContext() {
    const temp = {
      USER: this.state.USER,
    };
    return temp;
  }
  componentDidMount() {
    // 适配手机屏幕;
    getUser(null, (result) => {
      if (result.code === 0) {
        this.setState({ USER: result.user });
        console.log('user info', result);
      }
    });
  }
  render() {
    return (
      <div className="templates-wrapper">
        <div className="backImg">
          <Nav
            id="nav_0_0"
            key="nav_0_0"
          />,
          <ChatBot id="content_0_0" key="content_0_0" />,
        </div>
        <Service id="content_2_0" key="content_2_0" />,
        <Registry />
        <Footer id="footer_0_0" key="footer_0_0" />,
      </div>
    );
  }
}
Home.childContextTypes = {
  USER: React.PropTypes.object,
};
