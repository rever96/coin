import React from 'react';
import { DetailsList } from 'office-ui-fabric-react';

export class DataTableDemo extends React.Component {
  constructor() {
    super();
    this.state = {
      rows: [],
      tableName: 'clienti',
      columns: []
    };
  }

  componentDidMount() {
    const options = {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ table: this.state.tableName })
    };
    fetch('http://localhost:8080/api/v3/select', options)
      .then(response => response.json())
      .then(data => this.setState({ rows: data }));
    fetch('http://localhost:8080/api/v3/selectStruttura', options)
      .then(response => response.json())
      .then(data => this.setState({ columns: data }));
  }

  render() {
    const { rows, tableName, columns } = this.state;
    let tabella = <p>Loading...</p>;
    if (rows.length > 0 && columns.length > 0) {
      tabella = <DetailsList items={rows}></DetailsList>;
    }
    return (
      <>
        <h1>tabella {tableName}</h1>
        {tabella}
      </>
    );
  }
}
