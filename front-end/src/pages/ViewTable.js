import React from 'react';
import history from '../history';
import struttura from '../assets/struttura.json';
import { DatePicker } from 'antd';
import moment from 'moment';
import configDatePicker from '../assets/Lang/it-IT/datepicker.json';
import { EdiTable } from '../components/edi_table/edi_table';
import { ModalSelectRow } from '../components/modal_select_row/modal_select_row';
import { connect } from 'react-redux';
import { fetchTable } from '../data/tables';

class ViewTable extends React.Component {
  constructor(props) {
    super(props);
    const path = history.location.pathname.split('/');
    this.state = {
      tableName: path[path.length - 1],
      columns: []
    };
  }

  componentDidMount() {
    if (
      !this.props.fetchedTables ||
      !this.props.fetchedTables.find(name => name === this.state.tableName)
    ) {
      fetchTable(this.state.tableName, this.props.dispatch);
    } else {
      this.setState({
        righe: this.props.store.getState().tableData[this.state.tableName]
      });
    }
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
    let path = history.location.pathname.split('/');
    path = path[path.length - 1];
    if (path !== this.state.tableName) {
      this.setState(
        {
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
    let tabella = <>spinner super fighissimo</>;
    if (this.props.renderTable) {
      tabella = (
        <EdiTable
          titolo={this.state.tableName}
          colonne={this.state.columns}
          righe={this.state.righe || this.props.tableData}
        />
      );
    }
    return <>{tabella}</>;
  }
}

const mapStateToProps = state => {
  const path = history.location.pathname.split('/');
  const name = path[path.length - 1];
  if (
    !state.pending &&
    state.tableData[name] &&
    state.tableData[name].length > 0
  ) {
    console.log('table data aggiunta');
    const tableData = state.tableData[name].map((r, key) => {
      r.key = key;
      if (r.indirizzo) {
        r.indirizzo = { name: r.indirizzo, value: r.gmap };
      }
      if (r.fk_orario) {
        r.fk_orario = { value: r.fk_orario, rifTable: 'settimane' };
      }
      return r;
    });
    return {
      fetchedTables: state.fetchedTables,
      tableData,
      renderTable: true
    };
  }
  return {
    renderTable: false
  };
};

export default connect(mapStateToProps)(ViewTable);
