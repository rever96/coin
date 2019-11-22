import React from 'react';
import history from '../history';
import { DataTableDemo } from '../components/data_table';
import struttura from '../assets/struttura.json';

// case 'indirizzo':
// colonna.render = v => (
//   <a target="_blank" rel="noopener noreferrer" href={v.value}>
//     {v.name}
//   </a>
// );
// break;

class ViewTable extends React.Component {
  constructor() {
    super();
    const path = history.location.pathname.split('/');
    this.state = {
      rows: [],
      tableName: path[path.length - 1],
      columns: []
    };
    console.log('pagina Tabella "costruttore"');
  }

  componentDidMount() {
    console.log('pagina Tabella "DidMount"');
    const options = {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ table: this.state.tableName })
    };
    fetch('http://localhost:8080/api/v3/select', options)
      .then(response => response.json())
      .then(data => {
        this.setState({
          rows: data.map((r, key) => {
            r.key = key;
            r.indirizzo = { name: r.indirizzo, value: r.gmap };
            return r;
          })
        });
      });
    this.setState({
      columns: struttura
        .find(tabella => tabella.nome === this.state.tableName)
        .colonne.map(c => {
          let colonna = {
            title: c.nome,
            key: c.nome,
            dataIndex: c.nome,
            editable: true
          };
          console.log(c.render);
          if (c.render) {
            colonna.render = new Function('v', c.render);
          }
          return colonna;
        })
    });
  }

  componentDidUpdate() {
    console.log('pagina Tabella "update"');
    let path = history.location.pathname.split('/');
    path = path[path.length - 1];
    if (path !== this.state.tableName) {
      this.setState(
        {
          rows: [],
          tableName: path,
          columns: []
        },
        () => {
          this.componentDidMount();
        }
      );
    }
  }

  render() {
    let tabella = <>caricamento..</>;
    if (this.state.columns.length > 0 && this.state.rows.length > 0) {
      tabella = (
        <DataTableDemo
          titolo={this.state.tableName}
          colonne={this.state.columns}
          righe={this.state.rows}
        />
      );
    }
    return <>{tabella}</>;
  }
}

export default ViewTable;
