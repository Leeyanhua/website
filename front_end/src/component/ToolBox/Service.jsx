import React from 'react';
import QueueAnim from 'rc-queue-anim';
import TweenOne from 'rc-tween-one';
import OverPack from 'rc-scroll-anim/lib/ScrollOverPack';
import { Link } from 'react-router';

class Content extends React.Component {
  getBlockChildren = (item, i) => (
    <li key={i}>
      <div className="icon">
        <img src={item.icon} width="100%" alt="icon" />
      </div>
      <h3><Link to={item.address}>{item.title}</Link></h3>
      <p>{item.content}</p>
    </li>
  );

  render() {
    const className = 'content7';
    const dataSource = [
      { icon: 'BackImg/home-btn1.png', address: '/space', title: '空间选址', content: '空间选址的相关描述在这里可以显示出来' },
      { icon: 'BackImg/home-btn2.png', address: '/policy', title: '政策查询', content: '政策查询的相关描述在这里可以显示出来' },
      { icon: 'BackImg/home-btn3.png', address: '/calculate', title: '融资股权计算器', content: '融资股权计算器的相关描述在这里可以显示出来' },
    ];
    const listChildren = dataSource.map(this.getBlockChildren);
    return (
      <div
        className={`content-template-wrapper ${className}-wrapper ${className}`}
      >
        <OverPack
          className={`content-template ${className}`}
        >
          <TweenOne
            animation={{ y: '+=30', opacity: 0, type: 'from' }}
            component="h1"
            key="h1"
            reverseDelay={300}
          >
            服务范围
          </TweenOne>
          <svg key="svg" xmlns="http://www.w3.org/2000/svg" version="1.1">
            <line x1="0" x2="50" style={{ stroke: '#3ac1bd', strokeWidth: 7 }} />
          </svg>
          <QueueAnim component="ul" type="bottom" key="block" leaveReverse >
            {listChildren}
          </QueueAnim>
          <div key="arrow" className="arrow">
            <img src="BackImg/home-img.png" alt="arrow" />
          </div>
        </OverPack>
      </div>
    );
  }
}

export default Content;
