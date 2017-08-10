import React from 'react';
import { Link } from 'react-router';
import { Menu } from 'antd';

const Item = Menu.Item;

export default class MenuBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      menuMain: 0,
    };
  }
  componentWillMount() {
    let num = 0;
    const { pathname } = window.location;
    if (pathname.indexOf('/space') > -1) num = 1;
    if (pathname.indexOf('/policy') > -1) num = 2;
    if (pathname.indexOf('/calculate') > -1) num = 3;
    this.setState({ menuMain: num });
  }
  clickMenu = (e) => {
    console.log('clickMenu', e);
    this.setState({ menuMain: e.key.charAt(4) - 1 });
    console.log('key', e.key.charAt(4));
  }
  render() {
    const { menuMain } = this.state;
    const navData = {
      menu1: ['创业工具箱', '/'],
      menu2: ['空间选址', '/space'],
      menu3: ['政策解读', '/policy'],
      menu4: ['股权融资计算器', '/calculate'],
    };
    const navChildren = Object.keys(navData).map((key, i) => {
      if (i !== menuMain) {
        return (
          <Item key={`${key}`}>
            <Link to={navData[key][1]}>{navData[key][0]}</Link>
          </Item>
        );
      }
      return (
        <Item key={`${i.toString()}`}>
          <div className="menu-icon" />
          <Link to={navData[key][1]}>{navData[key][0]}</Link>
        </Item>
      );
    });
    return (
      <Menu
        mode="inline"
        theme="dark"
        onClick={this.clickMenu}
      >
        {navChildren}
      </Menu>
    );
  }
}
