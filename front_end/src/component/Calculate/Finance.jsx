import React from 'react';
import { Steps } from 'antd';
import Company from './Company';
import Invest from './Invest';
import Result from './FinanceResult';

const Step = Steps.Step;

export default class Finance extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 0,
    };
  }
  next = () => {
    const current = this.state.current + 1;
    this.setState({ current });
  }
  prev = () => {
    const current = this.state.current - 1;
    this.setState({ current });
  }
  render() {
    const { current } = this.state;
    const steps = [{
      title: '公司信息',
      content: <Company next={this.next} />,
    }, {
      title: '投资信息',
      content: <Invest next={this.next} prev={this.prev} />,
    }, {
      title: '计算结果',
      content: <Result prev={this.prev} />,
    }];
    return (
      <div className="finance">
        <h1>融资计算器</h1>
        <div className="steps">
          <Steps current={current}>
            {steps.map(item => <Step key={item.title} title={item.title} />)}
          </Steps>
          <div className="steps-content">{steps[current].content}</div>
        </div>
      </div>
    );
  }
}
