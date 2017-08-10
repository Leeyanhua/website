import React from 'react';
import { Link } from 'react-router';
import { Card, Tooltip } from 'antd';
import './less/together.less';

const textFinance = '融资计算器，旨在提供免费在线工具，帮助创业者在融资过程中，换算公司融资后各投资人的注册资本、股比、公司估值（尤其是存在两个或更多投资人的情况下）以及融资完成之前出现数字变动的情形。';
const textEquity = '股权分配计算器，旨在帮助创业者以客观中立的方式尽可能提出一个股权分配比例的初步方案，该方案应该视为合伙人商定股权分配比例的起点，而非最终比例的建议。创业合伙人还要根据创始人的贡献或价值的变化对股权比例进行动态调整，届时股权分配计算器也能够起到一定的参考作用。';
export default class Home extends React.Component {
  state
  render() {
    return (
      <div className="cal-home">
        <Tooltip placement="left" title={textFinance}>
          <Card className="cal-item">
            <Link to="/calculate/finance"><img src="/BackImg/cal-finance.png" alt="icon" /></Link>
            <p>融资计算器</p>
          </Card>
        </Tooltip>
        <Tooltip placement="right" title={textEquity}>
          <Card className="cal-item">
            <Link to="/calculate/equity"><img src="/BackImg/cal-equity.png" alt="icon" /></Link>
            <p>股权计算器</p>
          </Card>
        </Tooltip>
      </div>
    );
  }
}
