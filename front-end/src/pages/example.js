import React from 'react';
import {
  FormVeicoli,
  FormPersone,
  FormClienti
} from '../components/forms/forms';
import { Modal, Button, notification } from 'antd';
import moment from 'moment';
import { connect } from 'react-redux';
import { createTableRow, TABLENAME } from '../data/tables';

class Esempio extends React.Component {
  constructor() {
    super();
    this.state = {
      visible: false,
      formName: '',
      formContent: null,
      veicoli: {
        targa: { value: undefined },
        km_litro: { value: undefined },
        note: { value: undefined }
      },
      persone: {},
      clienti: {
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
      }
    };
  }

  fk_orarioSET = fk_orario => {
    const clienti = this.state.clienti;
    clienti['fk_orario'] = fk_orario;
    this.setState({ clienti });
  };
  fk_orario_consegneSET = fk_orario_consegne => {
    const clienti = this.state.clienti;
    clienti['fk_orario_consegne'] = fk_orario_consegne;
    this.setState({ clienti });
  };
  fk_proprietarioSET = fk_proprietario => {
    const clienti = this.state.clienti;
    clienti['fk_proprietario'] = fk_proprietario;
    this.setState({ clienti });
  };

  showModalVeicoli = () => {
    this.setState({
      formName: TABLENAME.VEICOLI,
      formContent: (
        <FormVeicoli
          {...this.state.veicoli}
          onChange={this.handleFormChangeVeicoli}
        ></FormVeicoli>
      ),
      visible: true
    });
  };
  showModalPersone = () => {
    this.setState({
      formName: TABLENAME.PERSONE,
      formContent: (
        <FormPersone
          {...this.state.persone}
          onChange={this.handleFormChangePersone}
        ></FormPersone>
      ),
      visible: true
    });
  };
  showModalClienti = () => {
    this.setState({
      formName: TABLENAME.CLIENTI,
      formContent: (
        <FormClienti
          {...this.state.clienti}
          onChange={this.handleFormChangeClienti}
          fk_orarioSET={this.fk_orarioSET.bind(this)}
          // fk_orario_consegneSET={this.fk_orario_consegneSET.bind(this)}
          fk_proprietarioSET={this.fk_proprietarioSET.bind(this)}
        ></FormClienti>
      ),
      visible: true
    });
  };

  handleOk = () => {
    console.log(this.state);
    const { formName, clienti, veicoli } = this.state;
    const row = {};
    switch (formName) {
      case TABLENAME.CLIENTI:
        for (const columnName in clienti) {
          row[columnName] = clienti[columnName].value || clienti[columnName];
        }
        break;
      case TABLENAME.VEICOLI:
        for (const columnName in veicoli) {
          row[columnName] = veicoli[columnName].value;
        }
        break;
      default:
        break;
    }
    console.log(row);
    createTableRow(this.props.dispatch, formName, row)
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

  handleFormChangeVeicoli = changes => {
    this.setState(({ veicoli }) => ({
      veicoli: { ...veicoli, ...changes }
    }));
  };
  handleFormChangePersone = changes => {
    this.setState(({ persone }) => ({
      persone: { ...persone, ...changes }
    }));
  };
  handleFormChangeClienti = changes => {
    this.setState(({ clienti }) => ({
      clienti: { ...clienti, ...changes }
    }));
  };
  render() {
    const { formName, formContent } = this.state;
    return (
      <>
        <Modal
          title={formName}
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          {formContent}
        </Modal>
        <Button type="primary" onClick={this.showModalVeicoli}>
          Veicoli
        </Button>
        {/* <Button type="primary" onClick={this.showModalPersone}>
          Persone
        </Button> */}
        <Button type="primary" onClick={this.showModalClienti}>
          Clienti
        </Button>
      </>
    );
  }
}

export default connect()(Esempio);
