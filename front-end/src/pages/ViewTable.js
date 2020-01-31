import React from 'react';
import history from '../history';
import struttura from '../assets/struttura.json';
import { DatePicker, Button, Table } from 'antd';
import moment from 'moment';
import configDatePicker from '../assets/Lang/it-IT/datepicker.json';
import ModalSelectRow from '../components/modals/modal_select_row';
import ModalAddress from '../components/modals/modal_address';
import { connect } from 'react-redux';
import { fetchTableIfMissing, setRows } from '../data/tables';
import { withWindowSizeListener } from 'react-window-size-listener';

class ViewTable extends React.Component {
  constructor() {
    super();
    const path = history.location.pathname.split('/');
    this.state = {
      tableName: path[path.length - 1],
      colonne: [],
      righe: [],
      tableWidth: 0
    };
    this.stillWaitingForData = true;
  }

  forceViewChange() {
    this.setState({
      righe: setRows(this.props.tableData)
    });
    this.childDoAlert();
  }

  acceptMethods(childDoAlert) {
    this.childDoAlert = childDoAlert;
  }

  componentDidMount() {
    fetchTableIfMissing(
      this.state.tableName,
      this.props.dispatch,
      this.props.fetchedTables
    );
    let tableWidth = 0;
    let tabella = struttura.find(
      tabella => tabella.nome === this.state.tableName
    );
    let colonne = tabella.colonne.map((c, key) => {
      let colonna = { ...c };
      colonna.title = c.nome;
      colonna.dataIndex = c.nome;
      colonna.key = key;
      tableWidth = tableWidth + c.width;
      if (tabella.primaColonna === c.nome) {
        colonna.fixed = 'left';
        colonna.width = 100;
      }
      switch (c.render) {
        case 'indirizzo':
          colonna.render = v => (
            <>
              {v === null && <Button>ADD</Button>}
              {v !== null && (
                <ModalAddress
                  parentTableName={this.state.tableName}
                  link={v.value}
                  columnLink={v.columnLink}
                  columnAddress={v.columnAddress}
                  id={v.id}
                  parentUpdate={this.forceViewChange.bind(this)}
                >
                  {v.name}
                </ModalAddress>
              )}
            </>
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
            <>
              {v === null && <Button>ADD</Button>}
              {v !== null && (
                <ModalSelectRow
                  parentTableName={this.state.tableName}
                  childTableName={v.rifTable}
                  fk={v.value}
                  id={v.id}
                  col={v.rifColumn}
                ></ModalSelectRow>
              )}
            </>
          );
          break;
        default:
          if (c.render) {
            colonna.render = v => <p>{v}</p>;
          }
          break;
      }
      return colonna;
    });
    colonne.push({
      key: 'actions',
      render: () => <>a</>,
      fixed: 'right',
      title: 'Azione',
      width: 100
    });
    this.setState({ colonne, tableWidth });
  }

  componentDidUpdate() {
    if (this.checkChangeRoute()) {
      console.log('cambio routes');
      this.stillWaitingForData = true;
      return;
    }
    if (this.stillWaitingForData && this.props.tableData) {
      this.stillWaitingForData = false;
      this.setState({
        righe: setRows(this.props.tableData)
      });
      console.log(this.props.tableData);
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
    let { windowHeight } = this.props.windowSize;
    const { colonne, righe, tableWidth } = this.state;
    windowHeight = windowHeight - 64 - 90 - 64 - 38 - 16;
    console.log(tableWidth);
    return (
      <>
        <Table
          columns={colonne}
          dataSource={righe}
          scroll={{ x: tableWidth, y: windowHeight }}
          pagination={{ pageSize: 50 }}
          size='small'
        ></Table>
      </>
    );
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

export default connect(mapStateToProps)(withWindowSizeListener(ViewTable));
