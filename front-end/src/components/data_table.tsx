// import React from 'react';
// import { Cell, Column, Table } from '@blueprintjs/table';

// export class DataTableDemo extends React.Component {
//   constructor() {
//     super();
//     this.state = {
//       rows: [],
//       tableName: 'clienti',
//       columns: []
//     };
//   }

//   componentDidMount() {
//     const options = {
//       method: 'post',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ table: this.state.tableName })
//     };
//     fetch('http://localhost:8080/api/v3/select', options)
//       .then(response => response.json())
//       .then(data => this.setState({ rows: data }));
//     fetch('http://localhost:8080/api/v3/selectStruttura', options)
//       .then(response => response.json())
//       .then(data => this.setState({ columns: data }));
//   }

//   render() {
//     const { rows, tableName, columns } = this.state;
//     let tabella = <p>Loading...</p>;
//     const cellRenderer = rowIndex => {
//       return <Cell>{`$${(rowIndex * 10).toFixed(2)}`}</Cell>;
//     };
//     if (rows.length > 0 && columns.length > 0) {
//       tabella = (
//         <Table numRows={10}>
//           <Column name="Dollars" cellRenderer={cellRenderer} />
//         </Table>
//       );
//     }
//     tabella = (
//       <Table numRows={10}>
//         <Column name="Dollars" cellRenderer={cellRenderer} />
//       </Table>
//     );
//     return (
//       <>
//         <h1>tabella {tableName}</h1>
//         {tabella}
//       </>
//     );
//   }
// }

import * as React from 'react';

import { Cell, Column, Table } from '@blueprintjs/table';

export class DataTableDemo extends React.PureComponent {
  public render() {
    const cellRenderer = (rowIndex: number) => (
      <Cell>{`$${(rowIndex * 10).toFixed(2)}`}</Cell>
    );
    return (
      <Table numRows={10}>
        <Column name="Dollars" cellRenderer={cellRenderer} />
      </Table>
    );
  }
}
