import React from 'react';
import { Card } from 'antd';
import { Link } from 'react-router';
import { getUserSpaceList } from '../../utils/Users';

export default class FavorSpace extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      favorList: [],
    };
  }
  componentWillMount() {
    getUserSpaceList(null, (result) => {
      this.setState({ favorList: result.result2 });
    });
  }
  render() {
    const { favorList } = this.state;
    return (<div className="favor-space">
      {favorList.length ?
        favorList.map(ele => (
          <Card className="favor-space-item" key={ele._id}>
            <Link to={`/space/incubator/${ele._id}`}><img src="/BackImg/user-space.png" alt="sample" /></Link>
            <div style={{ marginLeft: '30px' }}>
              <h3 style={{ marginBottom: '10px' }}>{ele.title}</h3>
              <small className="favor-tip">地址</small><small>价格</small><br />
              <span className="favor-tip">{ele.address}</span>
              <span style={{ color: '#3ac1bd' }}>{ele.price}</span><br /><br /><br />
            </div>
          </Card>
        )) :
        <h1>你还没有收藏任何空间地址信息</h1>
      }
    </div>);
  }
}
