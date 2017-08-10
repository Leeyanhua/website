import React from 'react';
import { Button, Table, message, Input } from 'antd';

export default class InputInvest extends React.Component {
  static propTypes = {
    next: React.PropTypes.func.isRequired,
    prev: React.PropTypes.func.isRequired,
  }
  constructor(props) {
    super(props);
    this.state = {
      finance: '',
      inRate: '',
      name: '',
      amount: '',
      invester: [],
      financeEdit: true,
      buttonDisableInv: true,
    };
  }
  componentWillMount() {
    if (sessionStorage.invester) {
      console.log('[Storage.invester]', JSON.parse(sessionStorage.invester));
      this.setState({
        invester: JSON.parse(sessionStorage.invester),
        finance: sessionStorage.finance,
        inRate: sessionStorage.inRate,
        financeEdit: false,
      });
      const totalAmount = JSON.parse(sessionStorage.invester)
        .reduce((acc, cur) => (acc + cur.value), 0);
      if (totalAmount === parseInt(sessionStorage.finance, 10)) {
        this.changeButton(false);
        this.setState({ disable: true });
        message.success('已经完成添加，请点击下一步');
      }
    }
  }
  changeFinance = (e) => {
    this.setState({ finance: e.target.value });
  }
  changeInRate = (e) => {
    this.setState({ inRate: e.target.value });
  }
  changeName = (e) => {
    this.setState({ name: e.target.value });
  }
  changeAmount = (e) => {
    this.setState({ amount: e.target.value });
  }
  add = () => {
    const { name, amount, invester, finance, inRate } = this.state;
    const newInvester = [...invester, { name, value: parseInt(amount, 10) }];
    const totalAmount = newInvester.reduce((acc, cur) => (acc + cur.value), 0);
    if (isNaN(finance) || isNaN(amount) || isNaN(inRate) ||
      !finance || !amount || !inRate || totalAmount > finance || inRate >= 100
    ) {
      message.error('输入无效请重新输入');
    } else {
      sessionStorage.invester = JSON.stringify(newInvester);
      sessionStorage.finance = finance;
      sessionStorage.inRate = inRate;
      if (totalAmount === parseInt(finance, 10)) {
        this.changeButton(false);
        this.setState({ financeEdit: false, invester: newInvester, name: '', amount: '', disable: true });
        message.success('已经完成添加，请点击下一步');
      } else {
        this.changeButton(true);
        this.setState({ financeEdit: false, invester: newInvester, name: '', amount: '' });
        message.success('添加成功,请继续添加股东');
      }
    }
  }
  clearLocal = () => {
    sessionStorage.invester = '';
    this.setState({
      finance: '',
      inRate: '',
      name: '',
      amount: '',
      invester: [],
      financeEdit: true,
      disable: false,
      buttonDisableInv: true,
    });
  }
  changeButton = (e) => {
    this.setState({ buttonDisableInv: e });
  }
  render() {
    const { financeEdit, finance, inRate, invester, name, amount, disable, buttonDisableInv }
      = this.state;
    let data;
    if (invester[0]) {
      data = invester.map(ele => ({ ...ele, rate: (ele.value / finance) * inRate }));
      data.push({
        name: '总计',
        value: data.reduce((accu, curr) => (accu + curr.value), 0),
        rate: data.reduce((accu, curr) => (accu + curr.rate), 0),
      });
    }
    const columns = [{
      title: '投资人',
      dataIndex: 'name',
      key: 'name',
    }, {
      title: '投资额（万元）',
      dataIndex: 'value',
      key: 'value',
    }, {
      title: '股比（%）',
      dataIndex: 'rate',
      key: 'rate',
      render: (text) => {
        return text.toFixed(2);
      },
    }];
    console.log(data);
    return (
      <div className="finance-in">
        <div className="step-in">
          <p>融资总额（万元）</p>
          {financeEdit ?
            <Input type="text" onChange={this.changeFinance} disabled={disable} /> :
            <h1 className="finance-num">{finance}</h1>
          }
          <p>全部投资人总占股比例(%) </p>
          {financeEdit ?
            <Input type="text" onChange={this.changeInRate} disabled={disable} /> :
            <h1 className="finance-num">{inRate}</h1>
          }
          <p>投资人姓名（每次输入一位）</p>
          <Input type="text" onChange={this.changeName} value={name} disabled={disable} />
          <p>该投资人投资额（万元）</p>
          <Input type="text" onChange={this.changeAmount} value={amount} disabled={disable} /><br />
          <Button onClick={this.add}>添加</Button>
        </div>
        <div className="invest-table">
          <Table
            dataSource={data}
            columns={columns}
            rowKey={row => row.name}
            pagination={false}
          />
        </div><br />
        <div className="steps-action">
          <Button onClick={this.clearLocal}>清空</Button>
          <Button onClick={this.props.prev}>上一步</Button>
          <Button type="primary" onClick={this.props.next} disabled={buttonDisableInv}>下一步</Button>
        </div>
      </div>
    );
  }
}
