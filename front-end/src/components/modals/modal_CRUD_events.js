import React from 'react';
import moment from 'moment';
import { Modal, Button, Select, Row, Col, notification } from 'antd';
import EventoForm from '../forms/eventoForm';
import { FormOrdini } from '../forms/forms';
import {
  TABLENAMES,
  createTableRow,
  updateTableRow,
  deleteTableRow
} from '../../data/tables';
import struttura from '../../assets/struttura';

const { Option } = Select;

export const FORMSTATE = {
  CREA: 'Crea',
  MODIFICA: 'Modifica'
};

class ModalCRUDEvents extends React.Component {
  constructor() {
    super();
    this.state = {
      visible: false,
      confirmLoading: false
    };
  }

  creaEvento = ({ start, end }) => {
    this.setState({
      visible: true,
      formState: FORMSTATE.CREA,
      formTable: TABLENAMES.EVENTI,
      fields: {
        data: { value: moment(start) },
        ora_inizio: { value: moment(start) },
        ora_fine: { value: moment(end) },
        titolo: { value: '' },
        contenuto: { value: '' },
        colore: { value: 'gray' }
      }
    });
  };

  modificaEvento = evento => {
    this.setState({
      visible: true,
      formState: FORMSTATE.MODIFICA,
      formTable: TABLENAMES.EVENTI,
      fields: {
        id: evento.id,
        data: { value: moment(evento.start) },
        ora_inizio: { value: moment(evento.start) },
        ora_fine: { value: moment(evento.end) },
        titolo: { value: evento.title },
        contenuto: { value: evento.content },
        colore: { value: evento.color }
      }
    });
  };

  creaSubmit = () => {
    switch (this.state.formTable) {
      case TABLENAMES.EVENTI:
        this.creaEventoSubmit();
        break;
      case TABLENAMES.ORDINI:
        this.creaOrdineSubmit();
        break;
      default:
        break;
    }
  };

  creaEventoSubmit = () => {
    const {
      titolo,
      data,
      ora_inizio,
      ora_fine,
      contenuto,
      colore
    } = this.state.fields;
    if (titolo.value.length === 0) {
      return;
    }
    this.setState({
      confirmLoading: true
    });
    const evento = {
      data_inizio: moment(data.value)
        .hour(0)
        .minute(0)
        .add(ora_inizio.value.get('minutes'), 'minutes')
        .add(ora_inizio.value.get('hours'), 'hours')
        .toDate(),
      data_fine: moment(data.value)
        .hour(0)
        .minute(0)
        .add(ora_fine.value.get('minutes'), 'minutes')
        .add(ora_fine.value.get('hours'), 'hours')
        .toDate(),
      titolo: titolo.value,
      contenuto: contenuto.value,
      tipo: colore.value
    };
    createTableRow(this.props.dispatch, TABLENAMES.EVENTI, evento)
      .then(id => {
        this.setState({
          visible: false,
          confirmLoading: false
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
  };

  creaOrdineSubmit = () => {
    let evento = {};
    createTableRow(this.props.dispatch, TABLENAMES.ORDINI, evento)
      .then(id => {
        this.setState({
          visible: false,
          confirmLoading: false
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
  };

  modificaEventoSubmit = () => {
    const {
      id,
      titolo,
      data,
      ora_inizio,
      ora_fine,
      contenuto,
      colore
    } = this.state.fields;
    if (titolo.value.length === 0) {
      return;
    }
    this.setState({
      confirmLoading: true
    });
    const evento = {
      data_inizio: moment(data.value)
        .hour(0)
        .minute(0)
        .add(ora_inizio.value.get('minutes'), 'minutes')
        .add(ora_inizio.value.get('hours'), 'hours')
        .toDate(),
      data_fine: moment(data.value)
        .hour(0)
        .minute(0)
        .add(ora_fine.value.get('minutes'), 'minutes')
        .add(ora_fine.value.get('hours'), 'hours')
        .toDate(),
      titolo: titolo.value,
      contenuto: contenuto.value,
      tipo: colore.value
    };
    updateTableRow(this.props.dispatch, TABLENAMES.EVENTI, id, evento)
      .then(() => {
        this.setState({
          visible: false,
          confirmLoading: false
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
  };

  eliminaSubmit = () => {
    const { id } = this.state.fields;
    this.setState({
      confirmLoading: true
    });
    deleteTableRow(this.props.dispatch, this.state.formTable, id)
      .then(() => {
        this.setState({
          visible: false,
          confirmLoading: false
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
  };

  handleCancel = () => {
    this.setState({
      visible: false
    });
  };

  handleFormChange = changedFields => {
    this.setState(({ fields }) => ({
      fields: { ...fields, ...changedFields }
    }));
  };

  setFK = (name, fk) => {
    const { fields } = this.state;
    fields[name] = { value: fk };
    this.setState({ fields });
  };

  modificaFormFields = formTable => {
    const { data } = this.state.fields;
    let fields = {};
    switch (formTable) {
      case TABLENAMES.ORDINI:
        struttura
          .find(tabella => tabella.nome === formTable)
          .colonne.forEach(colonna => {
            if (colonna.nome === 'data_ordine') {
              fields[colonna.nome] = { value: moment(moment.now()) };
              return;
            }
            if (colonna.nome === 'data_prevista_consegna') {
              fields[colonna.nome] = { value: data.value };
              return;
            }
            fields[colonna.nome] = { value: undefined };
          });
        break;
      default:
        break;
    }
    this.setState({
      fields,
      formTable
    });
  };

  render() {
    const { fields, formState, formTable } = this.state;
    return (
      <Modal
        title={
          <Row>
            <Col span={12}>
              <Select value={formState} disabled>
                <Option value={FORMSTATE.CREA}>{FORMSTATE.CREA}</Option>
                <Option value={FORMSTATE.MODIFICA}>{FORMSTATE.MODIFICA}</Option>
              </Select>
            </Col>
            <Col span={12}>
              <Select
                disabled={
                  formState === FORMSTATE.MODIFICA ||
                  formTable !== TABLENAMES.EVENTI
                }
                value={formTable}
                onChange={value => this.modificaFormFields(value)}
              >
                <Option value={TABLENAMES.EVENTI}>Evento</Option>
                <Option value={TABLENAMES.ORDINI}>Ordine</Option>
              </Select>
            </Col>
          </Row>
        }
        visible={this.state.visible}
        footer={
          formState === FORMSTATE.MODIFICA
            ? [
                <Button
                  type='danger'
                  key={0}
                  loading={this.state.confirmLoading}
                  onClick={this.eliminaSubmit}
                >
                  Elimina
                </Button>,
                <Button key={1} onClick={this.handleCancel}>
                  Chiudi
                </Button>,
                <Button
                  key={2}
                  type='primary'
                  loading={this.state.confirmLoading}
                  onClick={this.modificaEventoSubmit}
                >
                  Salva
                </Button>
              ]
            : [
                <Button key={1} onClick={this.handleCancel}>
                  Chiudi
                </Button>,
                <Button
                  key={2}
                  type='primary'
                  loading={this.state.confirmLoading}
                  onClick={this.creaSubmit}
                >
                  Salva
                </Button>
              ]
        }
        onCancel={this.handleCancel}
      >
        {formTable === TABLENAMES.EVENTI && (
          <EventoForm {...fields} onChange={this.handleFormChange} />
        )}
        {formTable === TABLENAMES.ORDINI && (
          <FormOrdini
            {...fields}
            onChange={this.handleFormChange}
            fk_responsabileSET={value => this.setFK('fk_responsabile', value)}
            fk_clienteSET={value => this.setFK('fk_cliente', value)}
          />
        )}
      </Modal>
    );
  }
}

export default ModalCRUDEvents;
