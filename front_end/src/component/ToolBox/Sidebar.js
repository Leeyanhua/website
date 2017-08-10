import React from 'react';
import { Icon } from 'antd';
import QueueAnim from 'rc-queue-anim';

const Sidebar = (props) => {
  return (
    <QueueAnim {...props} className="sidebar">
      <p style={{ color: '#fff', margin: '20px 0' }}>热门园区</p>
      <button key="side_1">华工科技园</button>
      <button key="side_2">华工科技园</button>
      <button key="side_3">华工科技园</button>
      <button key="side_4">华工科技园</button>
      <Icon key="side_5" type="down" style={{ color: '#fff' }} />
    </QueueAnim>
  );
};

export default Sidebar;
