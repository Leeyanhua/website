import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { Menu, Card } from 'antd';
import UploadImg from './UploadImg';
import { getUser } from '../../utils/Users';
import './less/together.less';

const MenuItem = Menu.Item;
class Sidebar extends React.Component {
  static propTypes = {
    children: PropTypes.object.isRequired,
  }
  constructor(props) {
    super(props);
    this.state = {
      userInfo: {},
    };
  }
  componentWillMount() {
    getUser(null, (result) => {
      if (result.code === 0) {
        this.setState({ userInfo: result.user });
      }
    });
  }
  render() {
    const { userInfo } = this.state;
    const favorNum = userInfo._id && userInfo.policy_collect.length + userInfo.space_collect.length;
    console.log('context', userInfo);
    return (
      <div className="user-center">
        <Card className="user-side">
          <div className="user-img">
            <p>点击上传头像</p>
            <div className="user-icon">
              <UploadImg />
            </div>
            <p>当前用户
            {userInfo.phone &&
              `${userInfo.phone.toString().slice(0, 3)}****${userInfo.phone.toString().slice(7)}`
            }
            </p>
          </div>
          <Menu desktop>
            <MenuItem><Link to="/user/favor">我的收藏</Link><span>{favorNum}</span></MenuItem>
            <MenuItem><Link to="/user/service">我的服务</Link><span>{userInfo.server}</span></MenuItem>
            <Menu.Divider />
            <MenuItem><Link to="/user">个人资料</Link><span>&nbsp;</span></MenuItem>
          </Menu>
        </Card>
        <div>{ this.props.children }</div>
      </div>
    );
  }
}
export default Sidebar;
