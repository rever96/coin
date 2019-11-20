import React from 'react';
import history from '../history';
import { DataTableDemo } from '../components/data_table';

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
    fetch('http://localhost:8080/api/v3/selectStruttura', options)
      .then(response => response.json())
      .then(data => {
        this.setState({
          columns: data
            .filter(
              c =>
                c.column_name !== 'id' &&
                !c.column_name.includes('fk_') &&
                c.column_name !== 'gmap'
            )
            .map(c => {
              let colonna = {
                title: c.column_name,
                key: c.column_name,
                dataIndex: c.column_name
              };
              switch (c.column_name.toLowerCase()) {
                case 'indirizzo':
                  colonna.render = v => (
                    <a target="_blank" rel="noopener noreferrer" href={v.value}>
                      {v.name}
                    </a>
                  );
                  break;
                case 'n_coperti':
                  colonna.width = 80;
                  break;
                default:
                  break;
              }
              return colonna;
            })
        });
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
    return (
      <>
        <DataTableDemo
          titolo={this.state.tableName}
          colonne={this.state.columns}
          righe={this.state.rows}
        />
      </>
    );
  }
}

export default ViewTable;
