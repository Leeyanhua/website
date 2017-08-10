import React, { Component, PropTypes } from 'react';
import { getQuestions } from '../../utils/Settings';

const activeProps = {
  className: 'title',
};

const chatTypeList = ['小创', '空间选址', '政策解读', '法务查询'];

class ChatBotLeft extends Component {
  static propTypes = {
    onSelect: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      selected: 0,
      questions: [],
      questionsGroup: [],
    };
  }
  componentWillMount() {
    getQuestions(null, (rst) => {
      this.setState({ questionsGroup: rst.data, questions: rst.data[0] });
    });
  }
  changeRobot = (i) => {
    const { questionsGroup } = this.state;
    this.setState({ selected: i, questions: questionsGroup[i] });
  }
  selectQuestion = (question) => {
    this.props.onSelect(question);
  }
  render() {
    const { selected, questions } = this.state;
    return (
      <div className="diaLeft">
        <img src="BackImg/home-btn3.png" alt="robot avatar" />
        <h3 className="robot">机器人名称</h3>
        <div className="selectRobot">
          {chatTypeList.map((item, i) => {
            const temp = selected === i ? activeProps : {};
            return (
              <button
                {...temp}
                style={{ cursor: 'pointer' }}
                key={`a_types_${i.toString()}`}
                onClick={() => this.changeRobot(i)}
              >{item}</button>
            );
          })}
        </div>
        <br />
        <h2>……</h2>
        <p className="try">试试问我</p>
        {questions.map((question, i) => (
          <div
            key={`questions_list_${i.toString()}`}
            className="questions"
            style={{ cursor: 'pointer' }}
            onClick={() => this.selectQuestion(question)}
          >{question}</div>
        ))}
      </div>
    );
  }
}

export default ChatBotLeft;
