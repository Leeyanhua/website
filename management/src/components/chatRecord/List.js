import React, { Component } from 'react';
import { Table, Card } from 'antd';
import moment from 'moment';
import { chatList } from '../../axios/chat_record.js'

const columns = [{
  title: '用户ID',
  dataIndex: 'user_id',
  key: 'user_id',
}, {
  title: '访问IP',
  dataIndex: 'ip_address',
  key: 'ip_address',
}, {
  title: '用户会话',
  dataIndex: 'receive',
  key: 'receive',
}, {
  title: '返回消息',
  dataIndex: 'reply',
  key: 'reply',
}, {
  title: '会话时间',
  dataIndex: 'create_time',
  key: 'create_time',
  render: (text) => moment(text).format('YYYY/MM/DD HH:mm:ss')
}];

class ChatList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 1,
      count: 0,
      list: [],
    };
  }
  componentWillMount() {
    this.changePage(1);
  }

  changePage = (page) => {
    chatList(page).then(res => {
      this.setState({ list: res.data, count: res.count, page });
    });
  }
  render() {
    const { list } = this.state;

    const pagination = {
      current: this.state.page,
      total: this.state.count,
      onChange: (page) => {
        this.changePage(page)
      }
    }
    return (
      <div className="chat-record-body">
        <Card title="聊天记录" bordered={false}>
          <Table dataSource={list} columns={columns} pagination={pagination} rowKey="_id" />
        </Card>
      </div>
    );
  }
}

export default ChatList;
