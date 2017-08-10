import React from 'react';
import { Map, Markers } from 'react-amap';
import { browserHistory, Link } from 'react-router';
import { Input, message, Popover, Card } from 'antd';
import MapMenu from './MapMenu';
import { getArea, getPoint, getSearchList } from '../../utils/Space';

export default class MapAddress extends React.Component {
  static propTypes = {
    location: React.PropTypes.object.isRequired,
  }
  constructor(props) {
    super(props);
    this.mapEvents = {
      created: (map) => {
        this.MAP = map;
        map.on('zoomchange', () => {
          const zoom = map.getZoom();
          console.log('zoom in map', zoom);
          if (zoom >= 13) {
            this.setState({ showPoint: true });
          } else {
            this.setState({ showPoint: false });
          }
        });
      },
    };
    this.mapPlugins = [
      'MapType',
      {
        name: 'ToolBar',
        options: {
          onCreated(ins) {
            console.log(ins);
          },
        },
      },
    ];
    this.areaEvent = {
      click: (area) => {
        const { extData } = area.target.G;
        this.MAP.setZoomAndCenter(13, [extData.position.longitude, extData.position.latitude]);
      },
    };
    this.state = {
      showPoint: false,
      list: [],
      // singleList: [],
      areas: [],
      points: [],
      center: { longitude: 114.218728, latitude: 30.554321 },
    };
  }
  componentWillMount() {
    getArea('武汉', (result) => {
      console.log('武汉 map', result);
      if (result.status === '1') {
        console.log('result districts', result.districts[0].districts);
        const areas = result.districts[0].districts.map(ele => ({
          name: ele.name,
          position: { longitude: ele.center.split(',')[0], latitude: ele.center.split(',')[1] },
          adcode: ele.adcode,
        }));
        this.setState({ areas });
      } else {
        message.error('请检查您的网络连接状况！');
      }
    });
    getPoint('a', (result) => {
      const points = result.data && result.data.map(ele => ({
        position: { longitude: ele.lng, latitude: ele.lat },
        ...ele,
      })).filter((ele) => {
        return ele.position.longitude && ele.position.latitude;
      });
      this.setState({ points });
      console.log('points', this.state.points);
    });
  }
  areasDiv = (extData) => {
    return (
      <div className="area-name">
        {extData.name}
      </div>
    );
  }
  pointsDiv = (extData) => {
    const content =
      (<div className="card-list" key={extData._id}>
        <img src={`/BackImg/images/${extData.images[0]}.jpg`} alt="" />
        <a onClick={() => browserHistory.push(`/space/incubator/${extData._id}`)}>
          <h2>{extData.name}</h2>
        </a>
        <h2 style={{ color: '#3ac1bd' }}>{extData.price}/m<sup>2</sup></h2>
        <div className="list-address">
          <small>{extData.address}</small>
          <i className="iconfont icon-locationfill" />
        </div>
        <small>附近交通：{extData.traffic}</small>
      </div>);
    return (
      <Popover content={content} trigger="hover">
        <i className="iconfont icon-locationfill" />
      </Popover>
    );
  }
  changeSearch = (e) => {
    console.log('e value:', e.target.value);
    const { zone = '', area = 0, price = 0, type = '' } = this.props.location.query;
    const url = `/space?zone=${zone}&area=${area}&price=${price}&type=${type}&value=${e.target.value}`;
    browserHistory.push(url);
    this.search(zone, area, price, type, e.target.value);
  }
  search = (zone, area, price, type, value) => {
    getSearchList({ zone, area, price, type, value }, (result) => {
      this.setState({
        list: result.data,
      });
    });
  }
  showInMap = (e) => {
    console.log('center point', e);
    this.MAP.setZoomAndCenter(16, [e.longitude, e.latitude]);
  }
  render() {
    const { areas, points, showPoint, list, center } = this.state;
    let areaPoints;
    if (!showPoint) {
      areaPoints = <Markers markers={areas} render={this.areasDiv} events={this.areaEvent} />;
    } else {
      areaPoints = <Markers markers={points} render={this.pointsDiv} />;
    }
    console.log('render', showPoint, list);
    const mapList = list.map(ele => (
      <Card key={ele._id}>
        <img src={`/BackImg/images/${ele.images[0]}.jpg`} alt="" />
        <Link to={`/space/incubator/${ele._id}`}><h2>{ele.name}</h2></Link>
        <h2 style={{ color: '#3ac1bd' }}>{ele.price}/m<sup>2</sup></h2>
        <div className="list-address" onClick={() => this.showInMap(ele.position)} title="在地图上显示">
          <small>{ele.address}</small>
          <i className="iconfont icon-locationfill" />
        </div>
        <small>附近交通：{ele.traffic}</small>
      </Card>
      ));
    console.log('list = 0', list.length);
    return (
      <div className="space-map">
        <Map
          events={this.mapEvents}
          amapkey="ba71953604831f019c0c7d3ff297a513"
          plugins={this.mapPlugins}
          center={center}
          zoom={10}
          zooms={[10, 18]}
        >
          {areaPoints}
          <div name="input" className="search-map">
            <Input placeholder="关键字" onChange={this.changeSearch} />
            <input name="button" type="image" value="ee" src="/BackImg/search.png" alt="search" />
          </div>
          <div className="search-result">
            <MapMenu
              search={this.search}
              location={this.props.location}
            />
            <div className="search-items">
              {mapList}
            </div>
          </div>
        </Map>
      </div>
    );
  }
}
