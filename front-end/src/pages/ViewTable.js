import React from 'react';
import history from '../history';
import struttura from '../assets/struttura.json';
import { DatePicker } from 'antd';
import moment from 'moment';
import configDatePicker from '../assets/Lang/it-IT/datepicker.json';
import { EdiTable } from '../components/edi_table/edi_table';
import ModalSelectRow from '../components/modal_select_row/modal_select_row';
import { connect } from 'react-redux';
import { fetchTableIfMissing, setRows } from '../data/tables';

class ViewTable extends React.Component {
  constructor() {
    super();
    const path = history.location.pathname.split('/');
    this.state = {
      tableName: path[path.length - 1],
      colonne: [],
      righe: []
    };
    this.stillWaitingForData = true;
  }

  componentDidMount() {
    fetchTableIfMissing(
      this.state.tableName,
      this.props.dispatch,
      this.props.fetchedTables
    );
    this.setState({
      colonne: struttura
        .find(tabella => tabella.nome === this.state.tableName)
        .colonne.map((c, key) => {
          let colonna = { ...c };
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
                // TODO modifica fk
                <ModalSelectRow
                  parentTableName={this.state.tableName}
                  childTableName={v.rifTable}
                  id={v.value}
                ></ModalSelectRow>
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
    if (this.checkChangeRoute()) {
      console.log('cambio routes');
      this.stillWaitingForData = true;
      return;
    }
    if (this.stillWaitingForData && this.props.tableData) {
      console.log('set rows');
      this.stillWaitingForData = false;
      this.setState({
        righe: setRows(this.props.tableData)
      });
    }
  }

  checkChangeRoute() {
    let path = history.location.pathname.split('/');
    path = path[path.length - 1];
    if (path !== this.state.tableName) {
      this.setState(
        {
          tableName: path,
          colonne: [],
          righe: []
        },
        () => {
          this.componentDidMount();
        }
      );
      return true;
    }
    return false;
  }

  render() {
    let tabella = <>spinner super fighissimo</>;
    if (this.state.righe.length > 0) {
      tabella = (
        <EdiTable
          titolo={this.state.tableName}
          colonne={this.state.colonne}
          righe={this.state.righe}
        />
      );
    }
    return <>{tabella}</>;
  }
}

const mapStateToProps = (state, ownProps) => {
  const path = history.location.pathname.split('/');
  const name = path[path.length - 1];
  if (
    !state.pending &&
    state.tableData[name] &&
    state.tableData[name].length > 0
  ) {
    return {
      fetchedTables: state.fetchedTables,
      tableData: state.tableData[name]
    };
  }
  return {};
};

export default connect(mapStateToProps)(ViewTable);
