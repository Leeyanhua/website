import React from 'react';
import { Input, Button, Icon } from 'antd';
import EditableTable from './EditableTable';

export default class StandardList extends React.Component {
  render() {
    return (
      <div>
        <div className="control">
          <div className="search"><Input suffix={<Icon type="search" />} /></div>
          <div><Button>新增</Button><Button>删除</Button></div>
        </div>
        <br /><br />
        <EditableTable />
      </div>
    );
  }
}
