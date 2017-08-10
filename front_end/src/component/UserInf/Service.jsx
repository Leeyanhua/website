import React from 'react';
import { Row, Col, Card, Tabs } from 'antd';
import { Link } from 'react-router';
import { getPolicyServer, getSpaceServer } from '../../utils/Users';

const TabPane = Tabs.TabPane;
export default class Service extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      applyPolicy: [],
      applySpace: [],
    };
  }
  componentWillMount() {
    getPolicyServer(null, (policy) => {
      if (policy.code === 0) {
        getSpaceServer(null, (space) => {
          if (space.code === 0) {
            this.setState({
              applyPolicy: policy.result,
              applySpace: space.result,
            });
          }
        });
      }
    });
  }
  render() {
    const { applyPolicy, applySpace } = this.state;
    console.log('apply policy', applySpace);
    return (
      <Card className="user-service user-right-card">
        <Tabs type="card">
          <TabPane tab="政策申请" key="1">
            {applyPolicy.length ?
              applyPolicy.map(ele => (
                <Row key={ele._id}>
                  <Col span={12}>
                    <Link to={`/policy/${ele.policy._id}`}>
                      {ele.policy.name.length > 20 ?
                        `${ele.policy.name.substr(0, 20)}……` :
                        ele.policy.name
                      }
                    </Link>
                  </Col>
                  <Col span={6}>{ele.state || '审核中'}</Col>
                  <Col span={6}>
                    {ele.apply_time && ele.apply_time.slice(0, 10)}
                  </Col>
                </Row>
              )) :
              <h2>您还没有申请任何政策呢，<Link to="/policy">去申请吧</Link></h2>
            }
          </TabPane>
          <TabPane tab="空间申请" key="2">
            {applySpace.length ?
              applySpace.map(ele => (
                <Row key={ele._id}>
                  <Col span={12}>
                    <Link to={`/space/incubator/${ele.space._id}`}>
                      {ele.space.name.length > 20 ?
                        `${ele.space.name.substr(0, 20)}……` :
                        ele.space.name
                      }
                    </Link>
                  </Col>
                  <Col span={6}>{ele.state || '审核中'}</Col>
                  <Col span={6}>
                    {ele.apply_time && ele.apply_time.slice(0, 10)}
                  </Col>
                </Row>
              )) :
              <h2>您还没有申请任何空间位置呢，<Link to="/space">去申请吧</Link></h2>
            }
          </TabPane>
        </Tabs>
      </Card>
    );
  }
}
