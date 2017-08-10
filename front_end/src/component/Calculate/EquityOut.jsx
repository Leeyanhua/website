import React from 'react';
import { Card, Button } from 'antd';
import { Link } from 'react-router';
import createG2 from 'g2-react';
import { Stat } from 'g2';

const partName = {
  0: 'A',
  1: 'B',
  2: 'C',
  3: 'D',
  4: 'E',
  5: 'F',
  6: 'G',
  7: 'H',
  8: 'I',
  9: 'J',
};
const Chart = createG2((chart) => {
  const { data } = chart._attrs.data;
  // 重要：绘制饼图时，必须声明 theta 坐标系
  chart.coord('theta', {
    radius: 0.8, // 设置饼图的大小
  });
  chart.legend('name', {
    position: 'bottom',
    itemWrap: true,
    formatter: (val) => {
      for (let i = 0, len = data.length; i < len; i++) {
        const obj = data[i];
        if (obj.name === val) {
          return `${val}: ${obj.value.toFixed(2)}`;
        }
      }
    },
  });
  chart.tooltip({
    title: null,
    map: {
      value: 'value',
    },
  });
  chart.intervalStack()
    .position(Stat.summary.percent('value'))
    .color('name')
    .label('name*..percent', (name, percent) => {
      return `${name}  ${(percent * 100).toFixed(2)}%`;
    });
  chart.render();
  // 设置默认选中
  const geom = chart.getGeoms()[0]; // 获取所有的图形
  const items = geom.getData(); // 获取图形对应的数据
  geom.setSelected(items[1]); // 设置选中
});
export default class EquityIn extends React.Component {
  static propTypes = {
    equityRate: React.PropTypes.any.isRequired,
  }
  constructor(props) {
    super(props);
    this.state = {
      forceFit: true,
      width: 300,
      height: 400,
    };
  }
  print = () => {
    window.print();
  }
  render() {
    const { equityRate } = this.props;
    const { width, height, forceFit } = this.state;
    const data = equityRate.map((ele, ind) => ({
      name: `股东${partName[ind]}`,
      value: ele,
    }));
    console.log('equit rate', equityRate);
    return (
      <div className="equity-in">
        <div className="row">
          <Card id="print">
            <br />
            <span className="card">股权计算器</span>
            <br /><br /><br /><br />
            <Chart
              data={data}
              width={width}
              height={height}
              forceFit={forceFit}
            />
            <br /><br /><br /><br />
          </Card>
          <br />
          <div className="handle">
            <Link to="/calculate/equity">
              <Button className="button">返回修改</Button>
            </Link>
            <Link to="/calculate/equityin">
              <Button className="button" onClick={this.print}>保存数据</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}
