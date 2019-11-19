import React from "react";
import { Table } from "antd";

export class DataTableDemo extends React.Component {
  constructor() {
    super();
    this.state = {
      rows: [],
      tableName: "veicoli",
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
      .then(data =>
        this.setState({
          rows: data.map((r, key) => {
            r.key = key;
            r.indirizzo = { name: r.indirizzo, value: r.gmap };
            return r;
          })
        })
      );
    fetch("http://localhost:8080/api/v3/selectStruttura", options)
      .then(response => response.json())
      .then(data =>
        this.setState({
          columns: data
            .filter(
              c =>
                c.column_name !== "id" &&
                !c.column_name.includes("fk_") &&
                c.column_name !== "gmap"
            )
            .map(c => {
              let colonna = {
                title: c.column_name,
                key: c.column_name,
                dataIndex: c.column_name
              };
              switch (c.column_name.toLowerCase()) {
                case "indirizzo":
                  colonna.render = v => (
                    <a target="_blank" rel="noopener noreferrer" href={v.value}>
                      {v.name}
                    </a>
                  );
                  break;
                case "n_coperti":
                  colonna.width = 80;
                  break;
                default:
                  break;
              }
              return colonna;
            })
        })
      );
  }

  render() {
    return (
      <>
        <h1>tabella {this.state.tableName}</h1>
        <Table
          size="small"
          scroll={{ x: 1900 }}
          columns={this.state.columns}
          dataSource={this.state.rows}
        ></Table>
      </>
    );
  }
}
