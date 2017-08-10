import React from 'react';
import { Link } from 'react-router';
import { Collapse, Breadcrumb, Popover } from 'antd';
import { Map, Marker } from 'react-amap';
import PanoramaBack from './PanoramaBack';
import { getIncubator } from '../../utils/Space';
import A9 from './less/backimg/A9.png';
import A2 from './less/backimg/A2.png';

const Panel = Collapse.Panel;
const customPanelStyle = {
  background: '#FFFFFF',
  borderRadius: 16,
  marginBottom: 24,
};

export default class Panorama extends React.Component {
  static propTypes = {
    params: React.PropTypes.object.isRequired,
  }
  constructor(props) {
    super(props);
    this.state = {
      incubator: {},
    };
  }
  componentWillMount = () => {
    getIncubator(this.props.params.id, (result) => {
      this.setState({ incubator: result.data });
    });
  }
  render() {
    const { incubator } = this.state;
    console.log('incubator', incubator);
    const position = { longitude: incubator.lng, latitude: incubator.lat };
    const title = <h2>{incubator.name}</h2>;
    const content = <h3>{incubator.price}/m<sup>2</sup></h3>;
    const pointDiv = (
      <Popover content={content} title={title} trigger="hover">
        <i className="iconfont icon-locationfill" />
      </Popover>
    );
    return (
      <div className="panorama">
        <PanoramaBack />
        <div className="row">
          <div className="card">
            <Collapse bordered={false} defaultActiveKey={['1']}>
              <Panel header="" key="1" style={customPanelStyle}>
                <span className="name">华工科技园</span>
                <Breadcrumb className="info">
                  <Breadcrumb.Item>
                    <Link className="in" to={`/space/incubator/${incubator._id}`}>查看详情</Link>
                  </Breadcrumb.Item>
                </Breadcrumb>
                <br />
                <div className="bread">
                  <Breadcrumb>
                    <img alt="" className="icon2" src={A2} />
                    <Breadcrumb.Item><Link className="b1" to="">搜周边</Link></Breadcrumb.Item>
                  </Breadcrumb>
                  <img alt="" className="icon1" src={A9} />
                  <Breadcrumb className="b">
                    <Breadcrumb.Item><Link className="b1" to={`/space/incubator/${incubator._id}`}>入驻企业</Link></Breadcrumb.Item>
                  </Breadcrumb>
                  <img alt="" className="icon2" src={A2} />
                  <Breadcrumb className="b">
                    <Breadcrumb.Item><Link className="b1" to={`/space/incubator/${incubator._id}`}>新闻</Link></Breadcrumb.Item>
                  </Breadcrumb>
                  <img alt="" className="icon1" src={A9} />
                  <Breadcrumb className="b">
                    <Breadcrumb.Item><Link className="b" to="/">园区机器人</Link></Breadcrumb.Item>
                  </Breadcrumb>
                </div>
                <div className="txt">
                  <span className="boo">建筑面积 </span>
                  <span className="area_data">8000平方米</span>
                  <br />
                  <br />
                  <span className="boo">具备设施 </span>
                  <span className="area_data">{incubator.facility}</span>
                  <br />
                  <br />
                  <span className="data">{incubator.details}</span>
                </div>
                <div>
                  <div className="map" style={{ width: '480px', height: '300px' }}>
                    <Map zoom={16} center={position} amapkey="ba71953604831f019c0c7d3ff297a513">
                      <Marker
                        position={position}
                        render={pointDiv}
                      />
                    </Map>
                  </div>
                </div>
              </Panel>
            </Collapse>
          </div>
        </div>
      </div>
    );
  }
}
