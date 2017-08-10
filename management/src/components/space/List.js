import React, { Component } from 'react';
import { Table, Card, Button } from 'antd';
import { spaceList } from '../../axios/space.js'
import { Link } from 'react-router';

const columns = [{
  title: '#',
  dataIndex: 'serial_number',
  key: 'serial_number',
  width: '6%',
}, {
  title: '名称',
  dataIndex: 'name',
  key: 'name',
}, {
  title: '缩略图',
  dataIndex: 'image',
  key: 'image',
}, {
  title: '区域',
  dataIndex: 'zone',
  key: 'zone',
}, {
  title: '价格',
  dataIndex: 'price',
  key: 'price',
}, {
  title: '面积',
  dataIndex: 'area',
  key: 'area',
}, {
  title: '录取时间',
  dataIndex: 'admit_time',
  key: 'admit_time',
}];

class SpaceList extends Component {
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
    spaceList(page).then(res => {
        console.log(res.data);
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

    const rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
      },
      type: 'checkbox'
    };
   
    const { id } = this.props.params;
    alert(id);
    return (
      <div style={{ marginTop: 20, marginLeft: 20, marginRight: 30 }}>
        <Card title="空间列表" bordered={false}>
           <div style={{ marginBottom: 10 }}>
            <select style={{ border: 'none' }}>
              <option>武汉</option>
            </select>        
            <Button style={{ marginLeft: 1300 }}><Link to={`/admin/space/new/edit`}>新建</Link></Button> 
            <Button>刷新</Button>
            <Button>全选</Button>
            <Button>删除</Button>
          </div>  
          <Table dataSource={list} columns={columns} pagination={pagination} rowSelection={ rowSelection } rowKey="_id" />
        </Card>
      </div>
    );
  }
}

export default SpaceList;