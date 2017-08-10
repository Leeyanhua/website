import React, { PropTypes } from 'react';
import { Button, Input } from 'antd';
import QueueAnim from 'rc-queue-anim';
import { socketServer } from 'utils';  // eslint-disable-line
import Sidebar from './Sidebar';
import ChatBotLeft from './ChatBotLeft';
import ChatList from './Chat/ChatList';
// const { TextArea } = Input;

class Content extends React.Component {
  constructor(props) {
    super(props);
    this.chat_area_dom = {};
    this.state = {
      chatValue: null,
      chatList: [
        { id: 'a', from: 0, value: '我想咨询这方面的创业问题' },
        { id: 'b', from: 1, value: '我是小创，您想咨询哪方面的创业问题呢？' },
      ],
    };
  }
  componentDidMount() {
    this.socket = window.io.connect(socketServer);
    this.socket.on('server_response', (msg) => {
      const { chatList } = this.state;
      console.log('socket response: ', msg);
      const id = new Date().getTime();
      chatList.push({ id, from: 1, value: msg.data });
      this.setState({ chatList }, () => {
        // 滚到底部
        const div = document.getElementById('main-chat-list');
        div.scrollTop = div.scrollHeight;
      });
    });
  }

  onKeyDown = (e) => {
    if (e.keyCode === 13 && e.ctrlKey) {
      e.preventDefault();
      const { chatValue } = this.state;
      this.setState({ chatValue: `${chatValue}\n\r` });
    } else if (e.keyCode === 13) {
      // 避免回车键换行
      e.preventDefault();
      // 下面写你的发送消息的代码
      this.onSend();
    }
  }

  onSend = () => {
    const { chatValue, chatList } = this.state;
    if (!chatValue) return false;
    const id = new Date().getTime();
    chatList.push({ id, from: 0, value: chatValue });
    const { _id = null } = this.context.USER;
    this.socket.emit('client_event', { data: chatValue, user_id: _id });
    this.setState({ chatList, chatValue: null }, () => {
      // 滚到底部
      const div = document.getElementById('main-chat-list');
      div.scrollTop = div.scrollHeight;
    });
  }

  chatChange = (e) => {
    this.setState({ chatValue: e.target.value });
  }

  render() {
    const props = { ...this.props };
    delete props.isMode;
    const { chatValue, chatList } = this.state;
    const className = 'banner0';
    return (
      <div
        className={className}
      >
        <QueueAnim
          type={['bottom', 'top']}
          delay={200}
          className={`${className}-wrapper`}
          key="text"
        >
          <Sidebar key="1" />
          <div key="2" className="dialog">
            <h1>Hi~我是小创</h1>
            <div className="frame">
              <ChatBotLeft onSelect={value => this.setState({ chatValue: value })} />
              <div className="answer">
                <ChatList list={chatList} />
                <div className="send-ques">
                  <Input
                    onKeyDown={this.onKeyDown}
                    type="textarea"
                    placeholder="随便聊聊吧~"
                    autosize={{ minRows: 3, maxRows: 3 }}
                    value={chatValue}
                    onChange={this.chatChange}
                  />
                  <Button onClick={this.onSend} >发送</Button>
                </div>
              </div>
            </div>
          </div>
        </QueueAnim>
      </div>
    );
  }
}

Content.contextTypes = {    // 子组件
  USER: PropTypes.object,
};

export default Content;
