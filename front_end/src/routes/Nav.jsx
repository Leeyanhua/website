import React, { PropTypes } from 'react';
import TweenOne from 'rc-tween-one';
import { Menu, Dropdown, Icon, Input, message } from 'antd';
import { Link } from 'react-router';
import MenuMain from './Menu';
import Login from './Login';
import Registry from './Registry';
import { getSignOut } from '../utils/Users';

const Search = Input.Search;

class Nav extends React.Component {
  static propTypes = {
    className: PropTypes.string.isRequired,
  }
  constructor(props) {
    super(props);
    this.state = {
      menuMain: '/',
      phoneOpen: false,
    };
  }
  signOut = () => {
    getSignOut(null, (result) => {
      console.log('sign out ', result);
      if (result.code === 0) {
        message.success('退出登录成功');
        window.location.reload();
      }
    });
  }
  phoneClick = () => {
    this.setState({
      phoneOpen: !this.state.phoneOpen,
    });
  }
  clickMenu = (e) => {
    console.log(`'clickMenu'${e}`);
    this.setState({ menuMain: e.key });
  }
  render() {
    const props = { ...this.props };
    const { USER } = this.context;
    console.log('USER nav', USER);
    const menu = (
      <Menu>
        <Menu.Item>
          <Link to="/user/favor">我的收藏</Link>
        </Menu.Item>
        <Menu.Item>
          <Link to="/user/service">我的服务</Link>
        </Menu.Item>
        <Menu.Item>
          <Link to="/user">个人资料</Link>
        </Menu.Item>
        <Menu.Item>
          <Link onClick={this.signOut}>退出登录</Link>
        </Menu.Item>
      </Menu>
    );
    return (<TweenOne
      component="header"
      animation={{ opacity: 0, type: 'from' }}
      {...props}
    >
      <div>
        <TweenOne
          animation={{ x: 30, delay: 100, opacity: 0, type: 'from', ease: 'easeOutQuad' }}
          className={`${this.props.className}-nav`}
        >
          <MenuMain />
        </TweenOne>
        {/* 搜索栏 */}
        {USER && USER._id ?
          (<span className="user-col">
            <Search
              placeholder="搜索"
              style={{ width: 200 }}
              onSearch={value => console.log(value)}
            />
            <Dropdown overlay={menu}>
              <Link to="/user">
                个人中心<Icon type="down" />
              </Link>
            </Dropdown>
            <span className="user-icon">
              <img src={USER.image} alt="avatar" />
            </span>
          </span>
          ) :
          (<span className="user-col">
            <Search
              placeholder="搜索"
              style={{ width: 200 }}
              onSearch={value => console.log(value)}
            />
            <Login />
            <span style={{ color: '#fff' }}>&nbsp;&nbsp;/&nbsp;&nbsp;</span>
            <Registry>
              <Link>注册</Link>
            </Registry>
          </span>)
        }
      </div>
    </TweenOne>);
  }
}
Nav.contextTypes = {
  USER: PropTypes.object,
};
Nav.defaultProps = {
  className: 'header1',
};
export default Nav;
