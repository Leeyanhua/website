import React from 'react';
import { Tabs, Card } from 'antd';
import FavorSpace from './FavorSpace';
import FavorPolicy from './FavorPolicy';

const TabPane = Tabs.TabPane;

export default class Favor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      favorSpace: [],
      favorPolicy: {},
    };
  }
  render() {
    return (
      <Card className="user-right-card">
        <Tabs type="card">
          <TabPane tab="空间选址" key="1" className="favor-space">
            <FavorSpace />
          </TabPane>
          <TabPane tab="政策解读" key="2">
            <FavorPolicy />
          </TabPane>
        </Tabs>
      </Card>
    );
  }
}
