import React from 'react';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css';
import {
  updateTableRow,
  deleteTableRow,
  createTableRow,
  TABLENAMES
} from '../data/tables';
import { Modal, notification, Button, Select, Row, Col } from 'antd';
import { connect } from 'react-redux';
import EventoForm from '../components/forms/eventoForm';
import { FormOrdini } from '../components/forms/forms';
import { Swipeable } from 'react-swipeable';
import struttura from '../assets/struttura.json';

const { Option } = Select;

const localizer = BigCalendar.momentLocalizer(moment);
const DnDCalendar = withDragAndDrop(BigCalendar);

const FORMSTATE = {
  CREA: 'Crea',
  MODIFICA: 'Modifica'
};

const SWIPE = {
  LEFT: 'LEFT',
  RIGHT: 'RIGHT'
};

class MyCalendar extends React.Component {
  constructor(props) {
    super(props);
    let events = [];
    let fetchedEvents = false;
    this.stillWaitingForData = true;
    this.currentView = 'week';
    if (props.eventi) {
      events = props.eventi.map(e => {
        return {
          id: e.id,
          title: e.titolo,
          start: moment(e.data_inizio).toDate(),
          end: moment(e.data_fine).toDate(),
          content: e.contenuto,
          color: e.tipo
        };
      });
      fetchedEvents = true;
      this.stillWaitingForData = false;
    }
    this.state = {
      events,
      fields: {},
      fetchedEvents,
      visible: false,
      formState: FORMSTATE.CREA,
      formTable: TABLENAMES.EVENTI,
      shownDate: moment().toDate()
    };
  }

  componentDidUpdate() {
    if (this.stillWaitingForData && this.props.eventi && this.props.ordini) {
      this.stillWaitingForData = false;
      let events = this.props.eventi
        .map(e => {
          return {
            id: e.id,
            title: e.titolo,
            start: moment(e.data_inizio).toDate(),
            end: moment(e.data_fine).toDate(),
            content: e.contenuto,
            color: e.tipo,
            table: TABLENAMES.EVENTI
          };
        })
        .concat(
          this.props.ordini.map(e => {
            return {
              id: e.id,
              title: 'Ordine di ' + e.fk_cliente,
              start: moment(e.data_prevista_consegna).toDate(),
              end: moment(e.data_prevista_consegna).toDate(),
              color: 'green',
              table: TABLENAMES.ORDINI
            };
          })
        );

      this.setState({ events, fetchedEvents: true });
    }
  }

  onEventResize = ({ event, start, end }) => {
    this.onEventDrop({ event, start, end });
  };

  onEventDrop = ({ event, start, end }) => {
    this.setState({ fetchedEvents: false });
    const evento = {
      data_inizio: start,
      data_fine: end,
      titolo: event.title,
      contenuto: event.content,
      colore: event.color
    };
    updateTableRow(this.props.dispatch, TABLENAMES.EVENTI, event.id, evento)
      .then(() => {
        this.setState({
          fetchedEvents: true,
          events: [
            ...this.state.events.filter(e => e.id !== event.id),
            {
              id: event.id,
              start: evento.data_inizio,
              end: evento.data_fine,
              title: evento.titolo,
              content: evento.contenuto,
              color: evento.colore
            }
          ]
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

  onSelectEvent = evento => {
    this.setState({
      formTable: evento.table
    });
    switch (evento.table) {
      case TABLENAMES.EVENTI:
        this.modificaEvento(evento);
        break;
      case TABLENAMES.ORDINI:
        break;
      default:
        break;
    }
  };

  modificaEvento = evento => {
    this.setState({
      visible: true,
      formState: FORMSTATE.MODIFICA,
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
          confirmLoading: false,
          events: [
            ...this.state.events,
            {
              id: id,
              start: evento.data_inizio,
              end: evento.data_fine,
              title: evento.titolo,
              content: evento.contenuto,
              color: evento.tipo
            }
          ]
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
          confirmLoading: false,
          events: [
            ...this.state.events.filter(e => e.id !== id),
            {
              id: id,
              start: evento.data_inizio,
              end: evento.data_fine,
              title: evento.titolo,
              content: evento.contenuto,
              color: evento.tipo
            }
          ]
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
          confirmLoading: false,
          events: [...this.state.events.filter(e => e.id !== id)]
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

  modificaFormFields = formTable => {
    const { data } = this.state.fields;
    let fields = {};
    switch (formTable) {
      case TABLENAMES.EVENTI:
        fields = {
          data: { value: moment.now() },
          ora_inizio: { value: moment.now() },
          ora_fine: { value: moment.now() },
          titolo: { value: '' },
          contenuto: { value: '' },
          colore: { value: 'gray' }
        };
        break;
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

  changeWeek(swipe) {
    if (this.currentView === 'agenda') {
      return;
    }
    let { shownDate } = this.state;
    shownDate =
      swipe === SWIPE.LEFT
        ? moment(shownDate)
            .subtract(1, this.currentView)
            .toDate()
        : moment(shownDate)
            .add(1, this.currentView)
            .toDate();
    this.setState({ shownDate });
  }

  render() {
    const { fields } = this.state;
    console.log(this.state);

    return (
      <>
        <Modal
          title={
            <Row>
              <Col span={12}>
                <Select value={this.state.formState} disabled>
                  <Option value={FORMSTATE.CREA}>{FORMSTATE.CREA}</Option>
                  <Option value={FORMSTATE.MODIFICA}>
                    {FORMSTATE.MODIFICA}
                  </Option>
                </Select>
              </Col>
              <Col span={12}>
                <Select
                  disabled={this.state.formState === FORMSTATE.MODIFICA}
                  value={TABLENAMES.EVENTI}
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
            this.state.formState === FORMSTATE.MODIFICA
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
                    onClick={this.creaEventoSubmit}
                  >
                    Salva
                  </Button>
                ]
          }
          onCancel={this.handleCancel}
        >
          {this.state.formTable === TABLENAMES.EVENTI && (
            <EventoForm {...fields} onChange={this.handleFormChange} />
          )}
          {this.state.formTable === TABLENAMES.ORDINI && (
            <FormOrdini {...fields} onChange={this.handleFormChange} />
          )}
        </Modal>
        <Swipeable
          onSwipedLeft={() => this.changeWeek(SWIPE.RIGHT)}
          onSwipedRight={() => this.changeWeek(SWIPE.LEFT)}
        >
          <DnDCalendar
            min={moment()
              .hour(4)
              .minute(0)
              .toDate()}
            max={moment()
              .hour(23)
              .minute(0)
              .toDate()}
            selectable
            localizer={localizer}
            events={this.state.events}
            defaultView={this.currentView}
            date={this.state.shownDate}
            onNavigate={shownDate => {
              this.setState({ shownDate });
            }}
            onEventDrop={this.onEventDrop.bind(this)}
            onEventResize={this.onEventResize.bind(this)}
            onSelectEvent={e => this.onSelectEvent(e)}
            onView={view => (this.currentView = view)}
            onSelectSlot={this.creaEvento}
            dayLayoutAlgorithm='no-overlap'
            style={{ height: 'calc(100vh - 64px - 90px - 16px)' }}
            resizable
            eventPropGetter={(event, start, end, isSelected) => {
              if (event.color) {
                return { style: { backgroundColor: event.color } };
              }
              return {};
            }}
          />
        </Swipeable>
      </>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  if (
    state.tableData &&
    state.tableData[TABLENAMES.EVENTI] &&
    state.tableData[TABLENAMES.ORDINI]
  ) {
    return {
      eventi: state.tableData[TABLENAMES.EVENTI],
      ordini: state.tableData[TABLENAMES.ORDINI]
    };
  }
  return {};
};

export default connect(mapStateToProps)(MyCalendar);
