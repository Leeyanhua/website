import React from 'react';
import { Rate, Button, Radio, Checkbox, InputNumber, Tooltip } from 'antd';
import { browserHistory } from 'react-router';
import calEquity from './CalEquity';

const RadioGroup = Radio.Group;
const CheckboxGroup = Checkbox.Group;
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
export default class Equity extends React.Component {
  static propTypes = {
    setEquity: React.PropTypes.func.isRequired,
  }
  constructor(props) {
    super(props);
    this.state = {
      number: 3,
      danxuan_value1: -1,
      danxuan_value2: -1,
      danxuan_value3: -1,
      star_value1: 3,
      star_value2: 3,
      star_value3: 3,
      check_value1: [],
      check_value2: [],
      check_value3: [],
      check_value4: [],
      check_value5: [],
      check_value6: [],
      check_value7: [],
      check_value8: [],
      check_value9: [],
      check_valueA: [],
      check_valueB: [],
      check_valueC: [],
      check_valueD: [],
    };
  }
  componentWillMount() {
    if (sessionStorage.equity) this.setState(JSON.parse(sessionStorage.equity));
  }
  onChange1 = (e) => {
    console.log('radio checked', e.target.value);
    this.setState({
      danxuan_value1: e.target.value,
    });
  }
  onChange2 = (e) => {
    console.log('radio checked', e.target.value);
    this.setState({
      danxuan_value2: e.target.value,
    });
  }
  onChange3 = (e) => {
    console.log('radio checked', e.target.value);
    this.setState({
      danxuan_value3: e.target.value,
    });
  }
  onChange_check1 = (check_value1) => {
    console.log('check_value1', check_value1);
    this.setState({ check_value1 });
  }
  onChange_check2 = (check_value2) => {
    this.setState({ check_value2 });
  }
  onChange_check3 = (check_value3) => {
    this.setState({ check_value3 });
  }
  onChange_check4 = (check_value4) => {
    this.setState({ check_value4 });
  }
  onChange_check5 = (check_value5) => {
    this.setState({ check_value5 });
  }
  onChange_check6 = (check_value6) => {
    this.setState({ check_value6 });
  }
  onChange_check7 = (check_value7) => {
    this.setState({ check_value7 });
  }
  onChange_check8 = (check_value8) => {
    this.setState({ check_value8 });
  }
  onChange_check9 = (check_value9) => {
    this.setState({ check_value9 });
  }
  onChange_checkA = (check_valueA) => {
    this.setState({ check_valueA });
  }
  onChange_checkB = (check_valueB) => {
    this.setState({ check_valueB });
  }
  onChange_checkC = (check_valueC) => {
    this.setState({ check_valueC });
  }
  onChange_checkD = (check_valueD) => {
    this.setState({ check_valueD });
  }
  changeNumber = (number) => {
    this.setState({ number });
  }
  changeStar1 = (value) => {
    console.log('star', value);
    this.setState({ star_value1: value });
  }
  changeStar2 = (value) => {
    this.setState({ star_value2: value });
  }
  changeStar3 = (value) => {
    this.setState({ star_value3: value });
  }
  startCal = () => {
    sessionStorage.equity = JSON.stringify(this.state);
    const equityRate = calEquity(this.state);
    console.log('equityRate', equityRate);
    this.props.setEquity(equityRate);
    browserHistory.push('/calculate/equityIn');
  }
  render() {
    const {
      number,
      danxuan_value1,
      danxuan_value2,
      danxuan_value3,
      star_value1,
      star_value2,
      star_value3,
      check_value1,
      check_value2,
      check_value3,
      check_value4,
      check_value5,
      check_value6,
      check_value7,
      check_value8,
      check_value9,
      check_valueA,
      check_valueB,
      check_valueC,
      check_valueD,
    } = this.state;
    console.log('render star', star_value1);
    const radio = [];
    const plainOptions = [];
    for (let i = 0; i < number; i++) {
      radio.push(
        <Radio key={i} value={i}>{`股东${partName[i]}`}</Radio>,
      );
      plainOptions.push({ label: `股东${partName[i]}`, value: i });
    }
    return (
      <div className="equity">
        <h1>股权分配相关因素的权重</h1>
        <Tooltip placement="right" title="淘宝更注重团队和战略，那么它的团队和战略得5分，产品和技术与业务和运营得3分">
          <p>团队和战略：</p>
          <span>
            <Rate onChange={this.changeStar1} value={star_value1} />
          </span>
        </Tooltip>
        <br />
        <Tooltip placement="right" title="小米更注重产品与技术，那么它的产品和技术得5分，团队和战略与业务和运营得3分">
          <p>产品和技术：</p>
          <span>
            <Rate onChange={this.changeStar2} value={star_value2} />
          </span>
        </Tooltip>
        <br />
        <Tooltip placement="right" title="oppo更注重业务与运营，那么它的业务与运营得5分，团队和战略与产品和技术得3分">
          <p>业务和运营：</p>
          <span><Rate onChange={this.changeStar3} value={star_value3} /></span>
        </Tooltip>
        <br />
        <div className="partner-number">
          <h2>股东数</h2>
          <InputNumber
            min={2}
            max={10}
            defaultValue={3}
            onChange={this.changeNumber}
            value={number}
          />
        </div>
        <h3>谁任CEO？</h3>
        <RadioGroup onChange={this.onChange1} value={danxuan_value1} >
          {radio}
        </RadioGroup>
        <h3>谁最适合对接投资人进行融资？</h3>
        <RadioGroup onChange={this.onChange2} value={danxuan_value2}>
          {radio}
        </RadioGroup>
        <h3>公司开发团队由谁负责管理？</h3>
        <RadioGroup onChange={this.onChange3} value={danxuan_value3}>
          {radio}
        </RadioGroup>
        <h3>谁主导产品开发（如编写核心代码）？</h3>
        <CheckboxGroup
          options={plainOptions}
          onChange={this.onChange_check1}
          value={check_value1}
        />
        <h3>谁最先提出和推动创业的核心想法？</h3>
        <CheckboxGroup
          options={plainOptions}
          onChange={this.onChange_check2}
          value={check_value2}
        />
        <h3>核心团队的组建主要取决于谁?</h3>
        <CheckboxGroup
          options={plainOptions}
          onChange={this.onChange_check3}
          value={check_value3}
        />
        <h3>谁提供公司正式推广的核心内容（如官网、公号或媒体文章）？</h3>
        <CheckboxGroup
          options={plainOptions}
          onChange={this.onChange_check4}
          value={check_value4}
        />
        <h3>投资人投资时最看重的是谁（如背景、工作/创业经历及个人影响等）？</h3>
        <CheckboxGroup
          options={plainOptions}
          onChange={this.onChange_check5}
          value={check_value5}
        />
        <h3>按时开发出高质量的产品取决于谁？</h3>
        <CheckboxGroup
          options={plainOptions}
          onChange={this.onChange_check6}
          value={check_value6}
        />
        <h3>产品的顺利发布和有效推广取决于谁？</h3>
        <CheckboxGroup
          options={plainOptions}
          onChange={this.onChange_check7}
          value={check_value7}
        />
        <h3>项目迅速产生收入取决于谁？</h3>
        <CheckboxGroup
          options={plainOptions}
          onChange={this.onChange_check8}
          value={check_value8}
        />
        <h3>谁提供产品的大部分构思和功能？</h3>
        <CheckboxGroup
          options={plainOptions}
          onChange={this.onChange_check9}
          value={check_value9}
        />
        <h3>谁负责公司的规划、预算和财务预测？</h3>
        <CheckboxGroup
          options={plainOptions}
          onChange={this.onChange_checkA}
          value={check_valueA}
        />
        <h3>谁提供项目初期的运营启动资金？</h3>
        <CheckboxGroup
          options={plainOptions}
          onChange={this.onChange_checkB}
          value={check_valueB}
        />
        <h3>谁提供行业、公关和合作伙伴的人脉？</h3>
        <CheckboxGroup
          options={plainOptions}
          onChange={this.onChange_checkC}
          value={check_valueC}
        />
        <h3>谁还没有全职投入创业?</h3>
        <CheckboxGroup
          options={plainOptions}
          onChange={this.onChange_checkD}
          value={check_valueD}
        />
        <br />
        <Button onClick={this.startCal}>开始计算</Button>
      </div>
    );
  }
}
