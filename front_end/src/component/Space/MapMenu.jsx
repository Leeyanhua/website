import React from 'react';
import { Dropdown, Icon, Menu, Radio } from 'antd';
import { browserHistory } from 'react-router';

const RadioGroup = Radio.Group;
const region = ['洪山区', '蔡甸区', '硚口区', '汉阳区', '江岸区', '江汉区',
  '武昌区', '青山区', '江夏区', '汉南区', '东西湖区'];
export default class MapMenu extends React.Component {
  static propTypes = {
    location: React.PropTypes.object.isRequired,
    search: React.PropTypes.func.isRequired,
  }
  constructor(props) {
    super(props);
    this.state = {
      visibleRegion: false,
      visibleArea: false,
      visiblePrice: false,
      visibleType: false,
    };
  }
  handleVisibleChangeRegion = (flag) => {
    this.setState({ visibleRegion: flag });
  }
  handleVisibleChangeArea = (flag) => {
    this.setState({ visibleArea: flag });
  }
  handleVisibleChangePrice = (flag) => {
    this.setState({ visiblePrice: flag });
  }
  handleVisibleChangeType = (flag) => {
    this.setState({ visibleType: flag });
  }
  changeRegin = (e) => {
    console.log('e value:', e.target.value);
    const { area = 0, price = 0, type = '', value = '' } = this.props.location.query;
    const url = `/space?zone=${e.target.value}&area=${area}&price=${price}&type=${type}&value=${value}`;
    browserHistory.push(url);
    this.props.search(e.target.value, area, price, type, value);
  }
  changeArea = (e) => {
    const { zone = '', price = 0, type = '', value = '' } = this.props.location.query;
    const url = `/space?zone=${zone}&area=${e.target.value}&price=${price}&type=${type}&value=${value}`;
    browserHistory.push(url);
    this.props.search(zone, e.target.value, price, type, value);
  }
  changePrice = (e) => {
    const { zone = '', area = 0, type = '', value = '' } = this.props.location.query;
    const url = `/space?zone=${zone}&area=${area}&price=${e.target.value}&type=${type}&value=${value}`;
    browserHistory.push(url);
    this.props.search(zone, area, e.target.value, type, value);
  }
  changeType = (e) => {
    const { zone = '', area = 0, price = 0, value = '' } = this.props.location.query;
    const url = `/space?zone=${zone}&area=${area}&price=${price}&type=${e.target.value}&value=${value}`;
    browserHistory.push(url);
    this.props.search(zone, area, price, e.target.value, value);
  }
  render() {
    console.log('this props', this.props);
    const menuRegion = (
      <Menu>
        <Menu.Item key="0">
          <RadioGroup onChange={this.changeRegin}>
            {region.map((ele) => {
              if (ele === '江汉区') {
                return (<span key={ele}><Radio value={ele}>{ele}</Radio><br /></span>);
              }
              return (<Radio key={ele} value={ele}>{ele}</Radio>);
            })}
          </RadioGroup>
        </Menu.Item>
      </Menu>
    );
    const menuArea = (
      <Menu>
        <Menu.Item key="0">
          <RadioGroup onChange={this.changeArea}>
            <Radio value={1}>300~3000m<sup>2</sup>&nbsp;&nbsp;</Radio>
            <Radio value={2}>3000~6000m<sup>2</sup></Radio>
            <br />
            <Radio value={3}>6000~9000m<sup>2</sup></Radio>
            <Radio value={4}>9000m<sup>2</sup>以上</Radio>
          </RadioGroup>
        </Menu.Item>
      </Menu>
    );
    const menuPrice = (
      <Menu>
        <Menu.Item key="0">
          <RadioGroup onChange={this.changePrice}>
            <Radio value={1}>200~600工位/月</Radio>
            <Radio value={'2'}>600~1000工位/月</Radio>
            <Radio value={3}>1000工位/月以上</Radio>
            <br />
            <Radio value={4}>0~50平方/月&nbsp;&nbsp;</Radio>
            <Radio value={5}>50~100平方/月</Radio>
          </RadioGroup>
        </Menu.Item>
      </Menu>
    );
    const menuType = (
      <Menu>
        <Menu.Item key="0">
          <RadioGroup onChange={this.changeType}>
            <Radio value="普通办公">普通办公</Radio>
            <Radio value="共享办公">共享办公</Radio>
            <Radio value="联合办公">联合办公</Radio>
          </RadioGroup>
        </Menu.Item>
      </Menu>
    );
    return (
      <div>
        <div className="search-opt">
          <Dropdown
            overlay={menuRegion}
            onVisibleChange={this.handleVisibleChangeRegion}
            visible={this.state.visibleRegion}
          >
            <a className="ant-dropdown-link">
              区域 <Icon type="down" />
            </a>
          </Dropdown>
          <Dropdown
            overlay={menuArea}
            onVisibleChange={this.handleVisibleChangeArea}
            visible={this.state.visibleArea}
            placement="bottomCenter"
          >
            <a className="ant-dropdown-link">
              面积 <Icon type="down" />
            </a>
          </Dropdown>
          <Dropdown
            overlay={menuPrice}
            onVisibleChange={this.handleVisibleChangePrice}
            placement="bottomCenter"
            visible={this.state.visiblePrice}
          >
            <a className="ant-dropdown-link">
              价格 <Icon type="down" />
            </a>
          </Dropdown>
          <Dropdown
            overlay={menuType}
            onVisibleChange={this.handleVisibleChangeType}
            visible={this.state.visibleType}
            placement="bottomCenter"
          >
            <a className="ant-dropdown-link">
              类型 <Icon type="down" />
            </a>
          </Dropdown>
        </div>
      </div>
    );
  }
}
