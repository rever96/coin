import React from 'react';
import history from '../history';
import struttura from '../assets/struttura.json';
import { DatePicker } from 'antd';
import moment from 'moment';
import configDatePicker from '../assets/Lang/it-IT/datepicker.json';
import { EdiTable } from '../components/edi_table/edi_table';
import { ModalSelectRow } from '../components/modal_select_row/modal_select_row';
import { connect } from 'react-redux';
import fetchProductsAction from '../data/tables';

class ViewTable extends React.Component {
  constructor() {
    super();
    const path = history.location.pathname.split('/');
    this.state = {
      rows: [],
      tableName: path[path.length - 1],
      columns: []
    };
  }

  componentDidMount() {
    // TODO da ristrutturare utilizzando file di configurazione
    console.log(this.props.store.getState());
    const tabella = this.props.store
      .getState()
      .products.find(table => table.tableName === this.state.tableName);
    console.log(tabella);
    if (!tabella) {
      console.log('fetch ' + this.state.tableName);
      fetchProductsAction(this.state.tableName, this.props.dispatch);
    }
    console.log(this.props.store.getState());

    //action.fetch
    if (tabella)
      this.setState({
        rows: tabella.tableData.map((r, key) => {
          r.key = key;
          r.indirizzo = { name: r.indirizzo, value: r.gmap };
          if (r.fk_orario) {
            r.fk_orario = { value: r.fk_orario, rifTable: 'settimane' };
          }
          return r;
        })
      });
    this.setState({
      columns: struttura
        .find(tabella => tabella.nome === this.state.tableName)
        .colonne.map((c, key) => {
          let colonna = c;
          colonna.title = c.nome;
          colonna.dataIndex = c.nome;
          colonna.key = key;
          switch (c.render) {
            case 'indirizzo':
              colonna.render = v => (
                <a target="_blank" rel="noopener noreferrer" href={v.value}>
                  {v.name}
                </a>
              );
              break;
            case 'data':
              colonna.render = v => (
                <DatePicker
                  defaultValue={moment(v || moment.now())}
                  locale={configDatePicker}
                ></DatePicker>
              );
              break;
            case 'fk':
              colonna.render = v => (
                <ModalSelectRow tableName={v.rifTable}>ciao</ModalSelectRow>
              );
              break;
            default:
              if (c.render) {
                colonna.render = v => <p>{v}</p>;
              }
              break;
          }
          return colonna;
        })
    });
  }

  componentDidUpdate() {
    console.log(this.props.store.getState());
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
        <EdiTable
          titolo={this.state.tableName}
          colonne={this.state.columns}
          righe={this.state.rows}
        />
      );
    }
    return <>{tabella}</>;
  }
}

export default connect()(ViewTable);
