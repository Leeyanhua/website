import React from 'react';
import { Button, message, Table, Input } from 'antd';
import createG2 from 'g2-react';
import { Stat } from 'g2';

const Chart = createG2((chart) => {
  const { data } = chart._attrs.data;
  console.log(' in chart data', data);
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
          return `${val}: ${obj.rate}`;
        }
      }
    },
  });
  chart.tooltip({
    title: null,
    map: {
      rate: 'rate',
    },
  });
  chart.intervalStack()
    .position(Stat.summary.percent('rate'))
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

const columns = [{
  title: '原始股东',
  dataIndex: 'name',
}, {
  title: '注册资本（万元）',
  dataIndex: 'value',
  key: 'value',
  render: text => text.toFixed(2),
}, {
  title: '股东占比（%）',
  dataIndex: 'rate',
  key: 'rate',
}];

export default class InputCompony extends React.Component {
  static propTypes = {
    next: React.PropTypes.func.isRequired,
  }
  constructor(props) {
    super(props);
    this.state = {
      capital: '',
      name: '',
      rate: '',
      partner: [],
      capitalEdit: true,
      overRate: false,
      disable: false,
      buttonDisableCom: true,
    };
  }
  componentWillMount() {
    if (sessionStorage.partner) {
      console.log('[Storage.partner]', JSON.parse(sessionStorage.partner));
      this.setState({
        partner: JSON.parse(sessionStorage.partner),
        capital: sessionStorage.capital,
        capitalEdit: false,
      });
      console.log('capital local ', sessionStorage.capital);
      const totalRate = JSON.parse(sessionStorage.partner)
        .reduce((acc, cur) => (acc + cur.rate), 0);
      if (totalRate === 100) {
        this.changeButton(false);
        this.setState({ disable: true });
        message.success('已经完成添加，请点击下一步');
      }
    }
  }
  changeCapital = (e) => {
    this.setState({ capital: e.target.value });
  }
  changeName = (e) => {
    this.setState({ name: e.target.value });
  }
  changeRate = (e) => {
    this.setState({ rate: e.target.value });
  }
  add = () => {
    const { name, rate, partner, capital } = this.state;
    const newPartner = [...partner, { name, rate: parseInt(rate, 10) }];
    const totalRate = newPartner.reduce((acc, cur) => (acc + cur.rate), 0);
    console.log('condition', isNaN(rate) || isNaN(capital) || !rate || !capital || totalRate > 100);
    if (isNaN(rate) || isNaN(capital) || !rate || !capital || totalRate > 100) {
      message.error('输入无效请重试');
    } else {
      sessionStorage.partner = JSON.stringify(newPartner);
      sessionStorage.capital = capital;
      if (totalRate === 100) {
        this.setState({ capitalEdit: false, partner: newPartner, name: '', rate: '', disable: true });
        this.changeButton(false);
        message.success('已经完成添加，请点击下一步');
      } else {
        this.setState({ capitalEdit: false, partner: newPartner, name: '', rate: '' });
        this.changeButton(true);
        message.success('添加成功,请继续添加股东');
      }
    }
  }
  clearLocal = () => {
    sessionStorage.partner = '';
    this.setState({
      capital: '',
      name: '',
      rate: '',
      partner: [],
      capitalEdit: true,
      overRate: false,
      disable: false,
      buttonDisableCom: true,
    });
  }
  changeButton = (e) => {
    this.setState({ buttonDisableCom: e });
  }
  render() {
    const { capitalEdit, capital, name, rate, partner, disable, buttonDisableCom } = this.state;
    // const data = [
    //   { name: 'Chrome', value: 24.03 },
    //   { name: 'Firefox', value: 10.38 },
    // ];
    let data;
    if (partner[0]) {
      data = partner.map(ele => ({ ...ele, value: (ele.rate * capital) / 100 }));
      data.push({
        name: '总计',
        value: data.reduce((accu, curr) => (accu + curr.value), 0),
        rate: data.reduce((accu, curr) => (accu + curr.rate), 0),
      });
    }
    console.log(' render chart data', data);
    return (
      <div className="finance-in">
        <div className="step-in">
          <p>公司注册资本（万元）</p>
          {capitalEdit ?
            <Input type="text" onChange={this.changeCapital} disabled={disable} /> :
            <h1 className="finance-num">{capital}</h1>
          }
          <p>原始股东姓名（每次输入一位）</p>
          <Input type="text" onChange={this.changeName} value={name} disabled={disable} />
          <p>该股东占股比例（%）</p>
          <Input type="text" onChange={this.changeRate} value={rate} disabled={disable} /><br />
          <Button onClick={this.add}>添加</Button>
        </div>
        <div className="chart">
          {partner[0] &&
            <Chart
              data={partner}
              width={400}
              height={300}
            />
          }
        </div>
        <Table
          dataSource={data}
          columns={columns}
          rowKey={row => row.name}
          pagination={false}
        />
        <div className="steps-action">
          <Button onClick={this.clearLocal}>清空</Button>
          <Button type="primary" onClick={this.props.next} disabled={buttonDisableCom}>下一步</Button>
        </div>
      </div>
    );
  }
}
