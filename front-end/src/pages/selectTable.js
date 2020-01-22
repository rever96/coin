import React from 'react';
import history, { navigateTo } from '../history';
import struttura from '../assets/struttura.json';

import {
  FormVeicoli,
  FormClienti,
  FormPersone,
  FormDDV,
  FormDepositi,
  FormMerci,
  FormProdotti,
  FormLavorazioni,
  FormOrdini,
  FormSpedizioni,
  FormSettimane
} from '../components/forms/forms';
import { Modal, notification, Icon, Row, Col, Card, Tooltip } from 'antd';
import moment from 'moment';
import { connect } from 'react-redux';
import {
  createTableRow,
  TABLENAMES,
  fetchTableIfMissing
} from '../data/tables';

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

  setFK = (name, fk) => {
    const activeTable = this.state.activeTable;
    activeTable[name] = { value: fk };
    this.setState({ activeTable });
  };

  showModal = tableName => {
    console.log(tableName);
    let formContent = undefined;
    let activeTable = {};
    fetchTableIfMissing(
      tableName,
      this.props.dispatch,
      this.props.fetchedTables
    );
    struttura
      .find(tabella => tabella.nome === tableName)
      .colonne.forEach(colonna => {
        if (
          colonna.nome === 'data_inserimento' ||
          colonna.nome === 'data_ordine'
        ) {
          activeTable[colonna.nome] = { value: moment(moment.now()) };
          return;
        }
        activeTable[colonna.nome] = { value: undefined };
      });
    switch (tableName) {
      case TABLENAMES.VEICOLI:
        formContent = (
          <FormVeicoli
            {...activeTable}
            onChange={this.handleFormChange}
          ></FormVeicoli>
        );
        break;
      case TABLENAMES.CLIENTI:
        formContent = (
          <FormClienti
            {...activeTable}
            onChange={this.handleFormChange}
            fk_orarioSET={value => this.setFK('fk_orario', value)}
            // fk_orario_consegneSET={this.fk_orario_consegneSET.bind(this)}
            fk_proprietarioSET={value => this.setFK('fk_proprietario', value)}
          ></FormClienti>
        );
        break;
      case TABLENAMES.PERSONE:
        formContent = (
          <FormPersone
            {...activeTable}
            onChange={this.handleFormChange}
            fk_clienteSET={value => this.setFK('fk_cliente', value)}
          ></FormPersone>
        );
        break;
      case TABLENAMES.DDV:
        formContent = (
          <FormDDV
            {...activeTable}
            onChange={this.handleFormChange}
            fk_veicoloSET={value => this.setFK('fk_veicolo', value)}
            fk_capo_viaggioSET={value => this.setFK('fk_capo_viaggio', value)}
            fk_assistenteSET={value => this.setFK('fk_assistente', value)}
          ></FormDDV>
        );
        break;
      case TABLENAMES.DEPOSITI:
        formContent = (
          <FormDepositi
            {...activeTable}
            onChange={this.handleFormChange}
          ></FormDepositi>
        );
        break;
      case TABLENAMES.MERCI:
        formContent = (
          <FormMerci
            {...activeTable}
            onChange={this.handleFormChange}
          ></FormMerci>
        );
        break;
      case TABLENAMES.PRODOTTI:
        formContent = (
          <FormProdotti
            {...activeTable}
            onChange={this.handleFormChange}
            fk_depositoSET={value => this.setFK('fk_deposito', value)}
          ></FormProdotti>
        );
        break;
      case TABLENAMES.LAVORAZIONI:
        formContent = (
          <FormLavorazioni
            {...activeTable}
            onChange={this.handleFormChange}
            fk_deposito_primaSET={value =>
              this.setFK('fk_deposito_prima', value)
            }
            fk_deposito_dopoSET={value => this.setFK('fk_deposito_dopo', value)}
            fk_merce_primaSET={value => this.setFK('fk_merce_prima', value)}
            fk_merce_dopoSET={value => this.setFK('fk_merce_dopo', value)}
          ></FormLavorazioni>
        );
        break;
      case TABLENAMES.ORDINI:
        formContent = (
          <FormOrdini
            {...activeTable}
            onChange={this.handleFormChange}
            fk_responsabileSET={value => this.setFK('fk_responsabile', value)}
            fk_clienteSET={value => this.setFK('fk_cliente', value)}
          ></FormOrdini>
        );
        break;
      case TABLENAMES.SPEDIZIONI:
        formContent = (
          <FormSpedizioni
            {...activeTable}
            onChange={this.handleFormChange}
            fk_responsabileSET={value => this.setFK('fk_responsabile', value)}
          ></FormSpedizioni>
        );
        break;
      case TABLENAMES.SETTIMANE:
        formContent = (
          <FormSettimane
            {...activeTable}
            onChange={this.handleFormChange}
          ></FormSettimane>
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
      console.log(columnName);
      console.log(activeTable[columnName]);
      if (typeof activeTable[columnName] === 'undefined') {
        console.error('AAAAAAA');
        continue;
      }
      if (moment.isMoment(activeTable[columnName].value)) {
        row[columnName] = activeTable[columnName].value.toDate();
        continue;
      }
      if (activeTable[columnName].value) {
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
            <Tooltip placement='bottom' title={TABLENAMES.VEICOLI}>
              <Card
                hoverable
                onClick={() => this.showModal(TABLENAMES.VEICOLI)}
                bordered={false}
              >
                <Icon style={{ fontSize: '64px' }} type='car' />
              </Card>
            </Tooltip>
          </Col>
          <Col xs={12} sm={8} md={6} lg={4}>
            <Tooltip placement='bottom' title={TABLENAMES.CLIENTI}>
              <Card
                hoverable
                onClick={() =>
                  mode === 'add'
                    ? this.showModal(TABLENAMES.CLIENTI)
                    : navigateTo('/table/' + TABLENAMES.CLIENTI)
                }
                bordered={false}
              >
                <Icon style={{ fontSize: '64px' }} type='shop' />
              </Card>
            </Tooltip>
          </Col>
          <Col xs={12} sm={8} md={6} lg={4}>
            <Tooltip placement='bottom' title={TABLENAMES.PERSONE}>
              <Card
                hoverable
                onClick={() =>
                  mode === 'add'
                    ? this.showModal(TABLENAMES.PERSONE)
                    : navigateTo('/table/' + TABLENAMES.PERSONE)
                }
                bordered={false}
              >
                <Icon style={{ fontSize: '64px' }} type='user' />
              </Card>
            </Tooltip>
          </Col>
          <Col xs={12} sm={8} md={6} lg={4}>
            <Tooltip placement='bottom' title={TABLENAMES.DDV}>
              <Card
                hoverable
                onClick={() =>
                  mode === 'add'
                    ? this.showModal(TABLENAMES.DDV)
                    : navigateTo('/table/' + TABLENAMES.DDV)
                }
                bordered={false}
              >
                <Icon style={{ fontSize: '64px' }} type='heat-map' />
              </Card>
            </Tooltip>
          </Col>
          <Col xs={12} sm={8} md={6} lg={4}>
            <Tooltip placement='bottom' title={TABLENAMES.DEPOSITI}>
              <Card
                hoverable
                onClick={() =>
                  mode === 'add'
                    ? this.showModal(TABLENAMES.DEPOSITI)
                    : navigateTo('/table/' + TABLENAMES.DEPOSITI)
                }
                bordered={false}
              >
                <Icon style={{ fontSize: '64px' }} type='appstore' />
              </Card>
            </Tooltip>
          </Col>
          <Col xs={12} sm={8} md={6} lg={4}>
            <Tooltip placement='bottom' title={TABLENAMES.MERCI}>
              <Card
                hoverable
                onClick={() =>
                  mode === 'add'
                    ? this.showModal(TABLENAMES.MERCI)
                    : navigateTo('/table/' + TABLENAMES.MERCI)
                }
                bordered={false}
              >
                <Icon style={{ fontSize: '64px' }} type='tags' />
              </Card>
            </Tooltip>
          </Col>
          <Col xs={12} sm={8} md={6} lg={4}>
            <Tooltip placement='bottom' title={TABLENAMES.PRODOTTI}>
              <Card
                hoverable
                onClick={() =>
                  mode === 'add'
                    ? this.showModal(TABLENAMES.PRODOTTI)
                    : navigateTo('/table/' + TABLENAMES.PRODOTTI)
                }
                bordered={false}
              >
                <Icon style={{ fontSize: '64px' }} type='shopping' />
              </Card>
            </Tooltip>
          </Col>
          <Col xs={12} sm={8} md={6} lg={4}>
            <Tooltip placement='bottom' title={TABLENAMES.LAVORAZIONI}>
              <Card
                hoverable
                onClick={() =>
                  mode === 'add'
                    ? this.showModal(TABLENAMES.LAVORAZIONI)
                    : navigateTo('/table/' + TABLENAMES.LAVORAZIONI)
                }
                bordered={false}
              >
                <Icon style={{ fontSize: '64px' }} type='funnel-plot' />
              </Card>
            </Tooltip>
          </Col>
          <Col xs={12} sm={8} md={6} lg={4}>
            <Tooltip placement='bottom' title={TABLENAMES.ORDINI}>
              <Card
                hoverable
                onClick={() =>
                  mode === 'add'
                    ? this.showModal(TABLENAMES.ORDINI)
                    : navigateTo('/table/' + TABLENAMES.ORDINI)
                }
                bordered={false}
              >
                <Icon style={{ fontSize: '64px' }} type='shopping-cart' />
              </Card>
            </Tooltip>
          </Col>
          <Col xs={12} sm={8} md={6} lg={4}>
            <Tooltip placement='bottom' title={TABLENAMES.SPEDIZIONI}>
              <Card
                hoverable
                onClick={() =>
                  mode === 'add'
                    ? this.showModal(TABLENAMES.SPEDIZIONI)
                    : navigateTo('/table/' + TABLENAMES.SPEDIZIONI)
                }
                bordered={false}
              >
                <Icon style={{ fontSize: '64px' }} type='rocket' />
              </Card>
            </Tooltip>
          </Col>
          <Col xs={12} sm={8} md={6} lg={4}>
            <Tooltip placement='bottom' title={TABLENAMES.SETTIMANE}>
              <Card
                hoverable
                onClick={() =>
                  mode === 'add'
                    ? this.showModal(TABLENAMES.SETTIMANE)
                    : navigateTo('/table/' + TABLENAMES.SETTIMANE)
                }
                bordered={false}
              >
                <Icon style={{ fontSize: '64px' }} type='hourglass' />
              </Card>
            </Tooltip>
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
