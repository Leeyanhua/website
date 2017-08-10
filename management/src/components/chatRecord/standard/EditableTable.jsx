import React from 'react';
import { Table, Popconfirm, Icon } from 'antd';
import EditableCell from './EditableCell';

export default class EditableTable extends React.Component {
  constructor(props) {
    super(props);
    this.columns = [{
      title: '#',
      dataIndex: 'name',
      width: '10%',
      render: (text, record, index) => this.renderColumns(this.state.data, index, 'name', text),
    }, {
      title: '问题',
      dataIndex: 'age',
      width: '70%',
      render: (text, record, index) => this.renderColumns(this.state.data, index, 'age', text),
    }, {
      title: '分类',
      dataIndex: 'address',
      width: '10%',
      render: (text, record, index) => this.renderColumns(this.state.data, index, 'address', text),
    }, {
      title: '编辑',
      dataIndex: 'operation',
      render: (text, record, index) => {
        const { editable } = this.state.data[index].age;
        return (
          <div className="editable-row-operations">
            {
              editable ?
                <span>
                  <a onClick={() => this.editDone(index, 'save')}>保存</a>
                  <Popconfirm title="确定取消?" onConfirm={() => this.editDone(index, 'cancel')}>
                    <a>取消</a>
                  </Popconfirm>
                </span>
                :
                <Icon type="edit" onClick={() => this.edit(index)} />
            }
          </div>
        );
      },
    }];
    this.state = {
      data: [{
        key: '0',
        name: {
          value: '1',
        },
        age: {
          editable: false,
          value: '武汉有哪些比较优惠的孵化器？',
        },
        address: {
          value: '空间',
        },
      },{
        key: '2',
        name: {
          value: '2',
        },
        age: {
          editable: false,
          value: '武汉有哪些比较优惠的孵化器？',
        },
        address: {
          value: '空间',
        },
      }],
    };
  }
  renderColumns(data, index, key, text) {
    const { editable, status } = data[index][key];
    if (typeof editable === 'undefined') {
      return text;
    }
    return (
      <EditableCell
        editable={editable}
        value={text}
        onChange={value => this.handleChange(key, index, value)}
        status={status}
      />
    );
  }
  handleChange(key, index, value) {
    const { data } = this.state;
    data[index][key].value = value;
    this.setState({ data });
  }
  edit(index) {
    const { data } = this.state;
    Object.keys(data[index]).forEach((item) => {
      if (data[index][item] && typeof data[index][item].editable !== 'undefined') {
        data[index][item].editable = true;
      }
    });
    this.setState({ data });
  }
  editDone(index, type) {
    const { data } = this.state;
    Object.keys(data[index]).forEach((item) => {
      if (data[index][item] && typeof data[index][item].editable !== 'undefined') {
        data[index][item].editable = false;
        data[index][item].status = type;
      }
    });
    this.setState({ data }, () => {
      Object.keys(data[index]).forEach((item) => {
        if (data[index][item] && typeof data[index][item].editable !== 'undefined') {
          delete data[index][item].status;
        }
      });
    });
  }
  render() {
    const { data } = this.state;
    const dataSource = data.map((item) => {
      const obj = {};
      Object.keys(item).forEach((key) => {
        obj[key] = key === 'key' ? item[key] : item[key].value;
      });
      return obj;
    });
    const columns = this.columns;
    return <Table dataSource={dataSource} columns={columns} />;
  }
}
