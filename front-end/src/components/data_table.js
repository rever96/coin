import React from "react";
import { Table } from "antd";

export class DataTableDemo extends React.Component {
  constructor() {
    super();
    this.state = {
      rows: [],
      tableName: "clienti",
      columns: []
    };
  }

  componentDidMount() {
    const options = {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ table: this.state.tableName })
    };
    fetch("http://localhost:8080/api/v3/select", options)
      .then(response => response.json())
      .then(data => this.setState({ rows: data }));
    fetch("http://localhost:8080/api/v3/selectStruttura", options)
      .then(response => response.json())
      .then(data => this.setState({ columns: data }));
  }

  render() {
    const { rows, tableName, columns } = this.state;

    let tabella = <p>Loading...</p>;
    if (rows.length > 0 && columns.length > 0) {
      const rowData = rows.map((r, key) => {
        r.key = key;
        return r;
      });
      const headers = columns
        .filter(c => c.column_name !== "id" && !c.column_name.includes("fk_"))
        .map(c => {
          return {
            title: c.column_name,
            key: c.column_name,
            dataIndex: c.column_name
          };
        });
      console.log(rowData);
      console.log(headers);
      tabella = (
        <Table size="small" columns={headers} dataSource={rowData}></Table>
      );
    }
    return (
      <>
        <h1>tabella {tableName}</h1>
        {tabella}
      </>
    );
  }
}
