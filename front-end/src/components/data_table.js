import React from 'react';
import { Table } from 'antd';

export class DataTableDemo extends React.Component {
  render() {
    return (
      <>
        <h1>tabella {this.props.titolo}</h1>
        <Table
          size="small"
          scroll={{ x: 1900 }}
          columns={this.props.colonne}
          dataSource={this.props.righe}
        ></Table>
      </>
    );
  }
}
