import React, { Component } from 'react';
import { Table, Card } from 'antd';
import { policyList } from '../../axios/policy.js'
import './index.less'
import { Link } from 'react-router';

const columns = [{
  title: '政策标题',
  dataIndex: 'policy_name',
  key: 'policy_name',
}, {
  title: '发文单位',
  dataIndex: 'issue_organization',
  key: 'issue_organization',
}, {
  title: '操作',
  dataIndex: 'action',
  key: 'action',
  render: (text, row) =>
    <span>
      <Link to={`/admin/policy/${row._id}/view`}>详情</Link>
      {` `}
      <Link to={`/admin/policy/${row._id}/edit`}>编辑</Link>
    </span>
}];

class PolicyList extends Component {
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
    policyList(page).then(res => {
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
      <div className="policy-body">
        <Card title="政策管理" bordered={false}>
          <Table dataSource={list} columns={columns} pagination={pagination} rowKey="_id" />
        </Card>
      </div>
    );
  }
}

export default PolicyList;
