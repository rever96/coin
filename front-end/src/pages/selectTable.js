import React from 'react';
import history, { navigateTo } from '../history';

import {
  FormVeicoli,
  // FormPersone,
  FormClienti
} from '../components/forms/forms';
import { Modal, notification, Icon, Row, Col, Card, Tooltip } from 'antd';
import moment from 'moment';
import { connect } from 'react-redux';
import { createTableRow, TABLENAME, fetchTableIfMissing } from '../data/tables';

class Esempio extends React.Component {
  constructor() {
    super();
    let path = history.location.pathname.split('/');
    path = path[path.length - 1];
    this.state = {
      mode: path,
      visible: false,
      tableName: '',
      formContent: null,
      activeTable: null
    };
  }

  componentDidMount() {
    console.log(this.state);
  }
  componentDidUpdate() {
    if (this.checkChangeRoute()) {
      console.log('cambio routes');
      return;
    }
  }

  checkChangeRoute() {
    let path = history.location.pathname.split('/');
    path = path[path.length - 1];
    if (path !== this.state.mode) {
      this.setState(
        {
          mode: path
        },
        () => {
          this.componentDidMount();
        }
      );
      return true;
    }
    return false;
  }

  fk_orarioSET = fk_orario => {
    const activeTable = this.state.activeTable;
    activeTable['fk_orario'] = fk_orario;
    this.setState({ activeTable });
  };
  // fk_orario_consegneSET = fk_orario_consegne => {
  //   const clienti = this.state.clienti;
  //   clienti['fk_orario_consegne'] = fk_orario_consegne;
  //   this.setState({ clienti });
  // };
  fk_proprietarioSET = fk_proprietario => {
    const activeTable = this.state.activeTable;
    activeTable['fk_proprietario'] = fk_proprietario;
    this.setState({ activeTable });
  };

  showModal = tableName => {
    console.log(tableName);
    let formContent = undefined;
    let activeTable = undefined;
    fetchTableIfMissing(
      tableName,
      this.props.dispatch,
      this.props.fetchedTables
    );
    switch (tableName) {
      case TABLENAME.VEICOLI:
        activeTable = {
          targa: { value: undefined },
          km_litro: { value: undefined },
          note: { value: undefined }
        };
        formContent = (
          <FormVeicoli
            {...activeTable}
            onChange={this.handleFormChange}
          ></FormVeicoli>
        );
        break;
      case TABLENAME.CLIENTI:
        activeTable = {
          data_inserimento: { value: moment(moment.now()) },
          intestazione_legale: { value: undefined },
          indirizzo_sede_legale: { value: undefined },
          telefono: { value: undefined },
          email: { value: undefined },
          indirizzo: { value: undefined },
          gmap: { value: undefined },
          n_coperti: { value: undefined },
          attivita_fruitrice: { value: undefined },
          partita_iva: { value: undefined },
          codice_univoco: { value: undefined },
          accessibilita_consegne: { value: undefined },
          tipo_cliente: { value: undefined },
          data_contatto_futuro: { value: undefined },
          note: { value: undefined },
          fk_orario: undefined,
          // fk_orario_consegne: undefined,
          fk_proprietario: undefined
        };
        formContent = (
          <FormClienti
            {...activeTable}
            onChange={this.handleFormChange}
            fk_orarioSET={this.fk_orarioSET.bind(this)}
            // fk_orario_consegneSET={this.fk_orario_consegneSET.bind(this)}
            fk_proprietarioSET={this.fk_proprietarioSET.bind(this)}
          ></FormClienti>
        );
        break;
      default:
        break;
    }
    this.setState({
      activeTable,
      tableName,
      formContent,
      visible: true
    });
  };

  handleOk = () => {
    console.log(this.state);
    const { tableName, activeTable } = this.state;
    const row = {};
    for (const columnName in activeTable) {
      if (typeof activeTable[columnName] === 'undefined') {
        continue;
      } else if (typeof activeTable[columnName] === 'string') {
        row[columnName] = activeTable[columnName]; //fks
      } else if (activeTable[columnName].value) {
        row[columnName] = activeTable[columnName].value;
      }
    }
    console.log(row);
    createTableRow(this.props.dispatch, tableName, row)
      .then(id => {
        notification.success({
          message: `Creazione eseguita con successo`,
          description: id,
          placement: 'bottomRight',
          duration: 1000
        });
      })
      .catch(error => {
        notification.error({
          message: `Operazione fallita`,
          description: error.toString(),
          placement: 'bottomRight',
          duration: 0
        });
      });
    this.setState({
      visible: false
    });
  };

  handleCancel = () => {
    this.setState({
      visible: false
    });
  };

  handleFormChange = changes => {
    this.setState(({ activeTable }) => ({
      activeTable: { ...activeTable, ...changes }
    }));
  };
  render() {
    const { tableName, formContent, mode } = this.state;
    return (
      <>
        <Modal
          title={tableName}
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          {formContent}
        </Modal>
        <Row gutter={[16, 16]}>
          <Col xs={12} sm={8} md={6} lg={4}>
            <Tooltip placement="bottom" title={TABLENAME.VEICOLI}>
              <Card
                hoverable
                onClick={() => this.showModal(TABLENAME.VEICOLI)}
                bordered={false}
              >
                <Icon style={{ fontSize: '64px' }} type="car" />
              </Card>
            </Tooltip>
          </Col>
          <Col xs={12} sm={8} md={6} lg={4}>
            <Tooltip placement="bottom" title={TABLENAME.CLIENTI}>
              <Card
                hoverable
                onClick={() =>
                  mode === 'add'
                    ? this.showModal(TABLENAME.CLIENTI)
                    : navigateTo('/table/' + TABLENAME.CLIENTI)
                }
                bordered={false}
              >
                <Icon style={{ fontSize: '64px' }} type="solution" />
              </Card>
            </Tooltip>
          </Col>
          <Col xs={12} sm={8} md={6} lg={4}>
            <Card bordered={false}>
              <Icon style={{ fontSize: '64px' }} type="ellipsis" />
            </Card>
          </Col>
          <Col xs={12} sm={8} md={6} lg={4}>
            <Card bordered={false}>
              <Icon style={{ fontSize: '64px' }} type="ellipsis" />
            </Card>
          </Col>
          <Col xs={12} sm={8} md={6} lg={4}>
            <Card bordered={false}>
              <Icon style={{ fontSize: '64px' }} type="ellipsis" />
            </Card>
          </Col>
          <Col xs={12} sm={8} md={6} lg={4}>
            <Card bordered={false}>
              <Icon style={{ fontSize: '64px' }} type="ellipsis" />
            </Card>
          </Col>
        </Row>
      </>
    );
  }
}
const mapStateToProps = (state, ownProps) => {
  const { parentTableName } = ownProps;
  return {
    fetchedTables: state.fetchedTables,
    tableData: state.tableData[parentTableName]
  };
};
export default connect(mapStateToProps)(Esempio);
