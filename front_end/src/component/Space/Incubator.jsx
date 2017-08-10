import React, { PropTypes } from 'react';
import { Button, message, Icon, Popover } from 'antd';
import { Link, browserHistory } from 'react-router';
import { Map, Marker } from 'react-amap';
import { getIncubator } from '../../utils/Space';
import { putColIncu, deleteColIncu } from '../../utils/Users';

import './less/together.less';
import A9 from './less/backimg/A9.png';
import A8 from './less/backimg/A8.png';
import A7 from './less/backimg/A7.png';
import A6 from './less/backimg/A6.png';
import A5 from './less/backimg/A5.png';
import A4 from './less/backimg/A4.png';
import A2 from './less/backimg/A2.png';

export default class Incubator extends React.Component {
  static propTypes = {
    params: PropTypes.object.isRequired,
  }
  constructor(props) {
    super(props);
    this.state = {
      favor: false,
      incubator: {},
    };
  }
  componentWillMount = () => {
    getIncubator(this.props.params.id, (result) => {
      this.setState({ incubator: result.data, favor: result.liked });
    });
  }
  changeColor = () => {
    const { incubator, favor } = this.state;
    if (!this.context.USER._id) {
      message.error('请登录后再试！');
    } else if (favor) {
      deleteColIncu(incubator._id, (result) => {
        if (result.code === 0) {
          this.setState({ favor: false });
          message.success('取消收藏成功');
        }
      });
    } else {
      putColIncu(incubator._id, (result) => {
        if (result.code === 0) {
          this.setState({ favor: true });
          message.success('收藏成功');
        }
      });
    }
  }
  render() {
    const { incubator, favor } = this.state;
    const color = favor ? '#3ac1bd' : '#111';
    console.log('incu data', incubator);
    if (incubator._id) {
      const button = incubator.service_tags.map(ele => (
        <button key={ele}>{ele}</button>
      ));
      const buttonCompany = incubator.in_company.map(ele => (
        <span key={ele}>
          <button>{ele}</button>
          <span className="shu">|</span>
        </span>
      ));
      const position = { longitude: incubator.lng, latitude: incubator.lat };
      const content =
        (<div className="card-list" key={incubator._id}>
          <img src={`/BackImg/images/${incubator.images[0]}.jpg`} alt="" />
          <a onClick={() => browserHistory.push(`/space/incubator/${incubator._id}`)}>
            <h2>{incubator.name}</h2>
          </a>
          <h2 style={{ color: '#3ac1bd' }}>{incubator.price}/m<sup>2</sup></h2>
          <div className="list-address">
            <small>{incubator.address}</small>
            <i className="iconfont icon-locationfill" />
          </div>
          <small>附近交通：{incubator.traffic}</small>
        </div>);
      const pointDiv = (
        <Popover content={content} trigger="hover">
          <i className="iconfont icon-locationfill" />
        </Popover>
      );
      return (
        <div className="incubator">
          <div className="row">
            <div className="img">
              <Link to={`/space/panorama/${incubator._id}`}><Icon type="camera-o" />&nbsp;&nbsp;全景模式</Link>
            </div>
            <div className="right">
              <span className="p1">{incubator.name}</span>
              <br />
              <span className="p2">{incubator.price_num}</span>
              <span className="p3">{incubator.price_num > 200 ? '元/工位/月' : '元/㎡/月'}</span>
              <span className="note">
                <Icon type="heart" style={{ cursor: 'pointer', color }} onClick={this.changeColor} />
                &nbsp;&nbsp;&nbsp;<span style={{ color }}>收藏</span>
              </span>
              <br />
              <br />
              <br />
              <br />
              <br />
              {button}
              <br />
              <br />
              <br />
              <span className="p4">{incubator.address}
                <br /><br />
                附近交通：{incubator.traffic}
                <br />
                <br />
                <br />
              </span>
            </div>
            <br />
          </div>
          <hr className="hr" />
          <div className="con">
            <div className="content">
              <img alt="" className="al" src={A9} />
              <span className="txt"> 入驻企业</span>
              <hr className="line" />
              <div className="pad2">
                {buttonCompany}
              </div>
              <img alt="" className="al" src={A7} />
              <span className="txt"> 详情介绍</span>
              <hr className="line" />
              <div className="pad1">
                <span className="boo">建筑面积 </span>
                <span className="area_data">{incubator.area}平方米</span>
                <br />
                <br />
                <span className="boo">具备设施 </span>
                <span className="area_data">{incubator.facility}</span>
                <br />
                <br />
                <br />
                <span className="data">{incubator.details}</span>
              </div>
              <img alt="" className="al" src={A6} />
              <span className="txt">提供服务</span>
              <hr className="line" />
              <div className="pad1">
                <span className="data">{incubator.service}</span>
              </div>
              <img alt="" className="al" src={A5} />
              <span className="txt">优惠政策</span>
              <hr className="line" />
              <div className="pad1">
                <span className="data">{incubator.policy}</span>
              </div>
              <img alt="" className="al" src={A4} />
              <span className="txt">企业申报条件</span>
              <hr className="line" />
              <div className="pad1">
                <span className="data">{incubator.requirment}</span>
                <br /><br /><br /><br />
                <div style={{ textAlign: 'center' }}><img src="/BackImg/images/flow.png" alt="flow" /></div>
                <div className="img-btn">
                  <img alt="" src="/BackImg/Bitmap.png" />
                  <br />
                  <Button onClick={
                    () => { browserHistory.push(`/space/apply/${incubator._id}`); }}
                  >立即申请</Button>
                </div>
              </div>
              <img alt="" className="al" src={A2} />
              <span className="txt">新闻动态</span>
              <hr className="line" />
              <div className="news">
                <div className="news_img">
                  <img alt="" className="bl" src="/BackImg/images/hg-1.jpg" />
                  <br />
                  <span className="news_txt">{incubator.news_title[0]}</span>
                </div>
                <div className="news_img">
                  <img alt="" className="bl" src="/BackImg/images/hg-2.jpg" />
                  <br />
                  <span className="news_txt">{incubator.news_title[1]}</span>
                </div>
                <div className="news_img">
                  <img alt="" className="bl" src="/BackImg/images/hg-3.jpg" />
                  <br />
                  <span className="news_txt">{incubator.news_title[2]}</span>
                </div>
                <div className="news_img">
                  <img alt="" className="bl" src="/BackImg/images/hg-4.jpg" />
                  <br />
                  <span className="news_txt">{incubator.news_title[3]}</span>
                </div>
              </div>
              <img alt="" className="al" src={A8} />
              <span className="txt">地理位置</span>
              <div className="map">
                <div style={{ width: '1520px', height: '504px' }}>
                  <Map zoom={16} center={position} amapkey="ba71953604831f019c0c7d3ff297a513">
                    <Marker
                      position={position}
                      render={pointDiv}
                    />
                  </Map>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
    return (<div />);
  }
}
Incubator.contextTypes = {    // 子组件
  USER: PropTypes.object,
};
