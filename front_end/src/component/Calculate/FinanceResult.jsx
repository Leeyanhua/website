import React from 'react';
import { Table, notification, Button } from 'antd';

const columnsInv = [{
  title: '投资人',
  dataIndex: 'name',
  key: 'name',
}, {
  title: '投资额',
  dataIndex: 'value',
  key: 'value',
  render: (text) => {
    console.log('text', text);
    return parseFloat(text, 10).toFixed(2);
  },
}];
const columnsDetail = [{
  title: '投资人',
  dataIndex: 'name',
  key: 'name',
}, {
  title: '融资前注册资本（万元）',
  dataIndex: 'finaBe',
  key: 'finaBe',
  render: (text) => {
    console.log('text', text);
    return parseFloat(text, 10).toFixed(2);
  },
}, {
  title: '融资后注册资本（万元）',
  dataIndex: 'finaAf',
  key: 'finaAf',
  render: (text) => {
    console.log('text', text);
    return parseFloat(text, 10).toFixed(2);
  },
}, {
  title: '融资前占股比例（%）',
  dataIndex: 'rateBe',
  key: 'rateBe',
  render: (text) => {
    console.log('text', text);
    return parseFloat(text, 10).toFixed(2);
  },
}, {
  title: '融资后占股比例（%）',
  dataIndex: 'rateAf',
  key: 'rateAf',
  render: (text) => {
    console.log('text', text);
    return parseFloat(text, 10).toFixed(2);
  },
}];
export default class Result extends React.Component {
  static propTypes = {
    prev: React.PropTypes.func.isRequired,
  }
  constructor() {
    super();
    this.state = {
      dataBefore: [],
      dataAfter: [],
      tableData: [],
    };
  }
  componentWillMount() {
    if (!(sessionStorage.capital && sessionStorage.partner)) {    // 校验数据
      const args = {
        message: '输入有误!',
        description: '您输入的股东信息有误，请返回重新填写',
        style: { color: 'red' },
      };
      notification.error(args);
    } else if (!(sessionStorage.finance && sessionStorage.inRate && sessionStorage.invester)) {
      const args = {        // 校验数据
        message: '输入有误!',
        description: '您输入的融资信息有误，请返回重新填写',
        style: { color: 'red' },
      };
      notification.error(args);
    } else {        // 数据处理
      const invester = JSON.parse(sessionStorage.invester);
      const finance = sessionStorage.finance;
      const capital = sessionStorage.capital;
      const inRate = sessionStorage.inRate;
      const capitalAfter = (capital / (100 - inRate)) * 100;
      const dataBefore = JSON.parse(sessionStorage.partner).map(
        ele => ({
          name: ele.name,
          finaBe: (ele.rate * capital) / 100,
          finaAf: (ele.rate * capital) / 100,
          rateBe: ele.rate,
          rateAf: ((100 - inRate) * ele.rate) / 100,
        }),
      );
      const dataAfter = dataBefore.concat(invester.map(ele => ({    // 加入投资人信息
        name: ele.name,
        finaBe: 0,
        finaAf: ((capitalAfter * ((ele.value / finance) * inRate)) / 100).toFixed(2),
        rateBe: 0,
        rateAf: (ele.value / finance) * inRate,
      })))
      .concat([{   // 加入总计数据
        name: '总计',
        finaBe: capital,
        finaAf: (capitalAfter).toFixed(2),
        rateBe: 100,
        rateAf: 100,
      }]);
      // this.dataBefore = dataBefore;
      console.log('capital after', dataBefore);
      const tableData = invester.concat(
        { name: '总投资额（元）', value: finance },
        { name: '融资后估值（元）', value: (finance / inRate) * 100 },
      );
      this.setState({ dataAfter, tableData });
    }
  }
  print = () => {
    window.print();
  }
  render() {
    const { dataAfter, tableData } = this.state;
    return (
      <div>
        <div className="invest-inf">
          <Table
            columns={columnsDetail}
            pagination={false}
            dataSource={dataAfter}
            rowKey={ele => ele.name}
            className="gather-table"
          />
          <br /><br />
          <h3>投资信息</h3>
          <Table
            columns={columnsInv}
            pagination={false}
            dataSource={tableData}
            rowKey={ele => ele.name}
            size={'small'}
          />
        </div>
        <div className="steps-action">
          <Button style={{ marginLeft: 8 }} onClick={this.props.prev}>
            上一步
          </Button>
          <Button type="primary" onClick={this.print}>打印页面</Button>
        </div>
      </div>
    );
  }
}
