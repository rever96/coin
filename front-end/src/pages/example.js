import React from 'react';
import {
  FormVeicoli,
  FormPersone,
  FormClienti
} from '../components/forms/forms';
import { Modal, Button } from 'antd';
import moment from 'moment';

class Esempio extends React.Component {
  constructor() {
    super();
    this.state = {
      visible: false,
      formName: '',
      formContent: null,
      veicoli: {
        targa: { value: '' },
        km_litro: { value: '' },
        note: { value: '' }
      },
      persone: {},
      clienti: {
        data_inserimento: { value: moment(moment.now()) }
      }
    };
  }

  showModalVeicoli = () => {
    this.setState({
      formName: 'Veicoli',
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
      formName: 'Persone',
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
      formName: 'Clienti',
      formContent: (
        <FormClienti
          {...this.state.clienti}
          onChange={this.handleFormChangeClienti}
        ></FormClienti>
      ),
      visible: true
    });
  };

  handleOk = () => {
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
        <Button type="primary" onClick={this.showModalPersone}>
          Persone
        </Button>
        <Button type="primary" onClick={this.showModalClienti}>
          Clienti
        </Button>
      </>
    );
  }
}

export default Esempio;
