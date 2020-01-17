import React from 'react';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css';
import { updateTableRow, deleteTableRow, createTableRow } from '../data/tables';
import { Typography, Modal, notification, Button } from 'antd';
import { connect } from 'react-redux';
import EventoForm from '../components/forms/eventoForm';

const creaEvento = 'Crea Evento';
const modificaEvento = 'Modifica Evento';

const { Title } = Typography;

const localizer = BigCalendar.momentLocalizer(moment);
const DnDCalendar = withDragAndDrop(BigCalendar);

class MyCalendar extends React.Component {
  constructor(props) {
    super(props);
    let events = [];
    let fetchedEvents = false;
    this.stillWaitingForData = true;
    if (props.Eventi) {
      events = props.Eventi.map(e => {
        return {
          id: e.id,
          title: e.titolo,
          start: moment(e.data_inizio).toDate(),
          end: moment(e.data_fine).toDate(),
          content: e.contenuto
          // color: e.tipo
        };
      });
      fetchedEvents = true;
      this.stillWaitingForData = false;
    }
    this.state = {
      events,
      fetchedEvents,
      visible: false,
      statoEvento: '',
      fields: {
        data: { value: moment(moment.now()) },
        ora_inizio: { value: moment(moment.now()) },
        ora_fine: { value: moment(moment.now()) },
        titolo: { value: 'moment.now()' },
        contenuto: { value: 'moment.now()' }
      }
    };
  }

  componentDidUpdate() {
    console.log(this.state);
    if (this.stillWaitingForData && this.props.Eventi) {
      this.stillWaitingForData = false;
      this.setState(
        {
          events: this.props.Eventi.map(e => {
            return {
              id: e.id,
              title: e.titolo,
              start: moment(e.data_inizio).toDate(),
              end: moment(e.data_fine).toDate(),
              content: e.contenuto
              // color: e.tipo
            };
          })
        },
        () => {
          this.setState({ fetchedEvents: true });
        }
      );
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
      contenuto: event.content
    };
    updateTableRow(this.props.dispatch, 'Eventi', event.id, evento)
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
              content: evento.contenuto
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
      statoEvento: creaEvento,
      fields: {
        data: { value: moment(start) },
        ora_inizio: { value: moment(start) },
        ora_fine: { value: moment(end) },
        titolo: { value: '' },
        contenuto: { value: '' }
      }
    });
  };

  modificaEvento = id => {
    const evento = this.state.events.find(e => e.id === id);
    this.setState({
      visible: true,
      statoEvento: modificaEvento,
      fields: {
        id: id,
        data: { value: moment(evento.start) },
        ora_inizio: { value: moment(evento.start) },
        ora_fine: { value: moment(evento.end) },
        titolo: { value: evento.title },
        contenuto: { value: evento.content }
      }
    });
  };

  creaEventoSubmit = () => {
    const { titolo, data, ora_inizio, ora_fine, contenuto } = this.state.fields;
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
      contenuto: contenuto.value
    };
    createTableRow(this.props.dispatch, 'Eventi', evento)
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
              content: evento.contenuto
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
      contenuto
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
      contenuto: contenuto.value
    };
    updateTableRow(this.props.dispatch, 'Eventi', id, evento)
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
              content: evento.contenuto
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

  eliminaEventoSubmit = () => {
    const { id } = this.state.fields;
    this.setState({
      confirmLoading: true
    });
    deleteTableRow(this.props.dispatch, 'Eventi', id)
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

  render() {
    const { fields } = this.state;
    console.log(this.state);
    return (
      <>
        {!this.state.fetchedEvents && <Title>Loading</Title>}
        <Modal
          title={this.state.statoEvento}
          visible={this.state.visible}
          footer={
            this.state.statoEvento === modificaEvento
              ? [
                  <Button
                    type="danger"
                    key={0}
                    loading={this.state.confirmLoading}
                    onClick={this.eliminaEventoSubmit}
                  >
                    Elimina
                  </Button>,
                  <Button key={1} onClick={this.handleCancel}>
                    Chiudi
                  </Button>,
                  <Button
                    key={2}
                    type="primary"
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
                    type="primary"
                    loading={this.state.confirmLoading}
                    onClick={this.creaEventoSubmit}
                  >
                    Salva
                  </Button>
                ]
          }
          onCancel={this.handleCancel}
        >
          <EventoForm {...fields} onChange={this.handleFormChange} />
        </Modal>
        <DnDCalendar
          min={moment()
            .hour(4)
            .minute(0)
            .toDate()}
          max={moment()
            .hour(23)
            .minute(0)
            .toDate()}
          defaultDate={moment().toDate()}
          selectable
          localizer={localizer}
          events={this.state.events}
          defaultView="week"
          onEventDrop={this.onEventDrop.bind(this)}
          onEventResize={this.onEventResize.bind(this)}
          onSelectEvent={e => this.modificaEvento(e.id)}
          onSelectSlot={this.creaEvento}
          dayLayoutAlgorithm="no-overlap"
          style={{ height: '500px' }}
          resizable
          eventPropGetter={(event, start, end, isSelected) => {
            if (event.color) {
              return { style: { backgroundColor: event.color } };
            }
            return {};
          }}
        />
      </>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  if (state.tableData && state.tableData['Eventi']) {
    return {
      Eventi: state.tableData['Eventi']
    };
  }
  return {};
};

export default connect(mapStateToProps)(MyCalendar);
