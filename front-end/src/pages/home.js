import React from 'react';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css';
import { updateTableRow, TABLENAMES } from '../data/tables';
import { notification } from 'antd';
import { connect } from 'react-redux';
import { Swipeable } from 'react-swipeable';
import ModalCRUDEvents from '../components/modals/modal_CRUD_events';

const localizer = BigCalendar.momentLocalizer(moment);
const DnDCalendar = withDragAndDrop(BigCalendar);

const SWIPE = {
  LEFT: 'LEFT',
  RIGHT: 'RIGHT'
};

class MyCalendar extends React.Component {
  constructor(props) {
    super(props);
    this.currentView = 'week';
    this.state = {
      shownDate: moment().toDate()
    };
    this.modalCRUDEvents = React.createRef();
  }

  // TODO funziona solo per gli eventi di tipo evento
  onEventResize = ({ event, start, end }) => {
    this.onEventDrop({ event, start, end });
  };

  // TODO funziona solo per gli eventi di tipo evento
  onEventDrop = ({ event, start, end }) => {
    const evento = {
      data_inizio: start,
      data_fine: end,
      titolo: event.title,
      contenuto: event.content,
      colore: event.color
    };
    updateTableRow(this.props.dispatch, TABLENAMES.EVENTI, event.id, evento)
      .then(() => {})
      .catch(error => {
        notification.error({
          message: `Operazione fallita`,
          description: error.toString(),
          placement: 'bottomRight',
          duration: 0
        });
      });
  };

  onSelectEvent = evento => {
    this.setState({
      formTable: evento.table
    });
    switch (evento.table) {
      case TABLENAMES.EVENTI:
        this.modalCRUDEvents.current.modificaEvento(evento);
        break;
      case TABLENAMES.ORDINI:
        break;
      default:
        break;
    }
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
    return (
      <>
        <ModalCRUDEvents
          ref={this.modalCRUDEvents}
          dispatch={this.props.dispatch}
        ></ModalCRUDEvents>
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
            events={this.props.events}
            defaultView={this.currentView}
            date={this.state.shownDate}
            onNavigate={shownDate => {
              this.setState({ shownDate });
            }}
            onEventDrop={this.onEventDrop.bind(this)}
            onEventResize={this.onEventResize.bind(this)}
            onSelectEvent={e => this.onSelectEvent(e)}
            onView={view => (this.currentView = view)}
            onSelectSlot={values =>
              this.modalCRUDEvents.current.creaEvento(values)
            }
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
      events: parseEvents({
        eventi: state.tableData[TABLENAMES.EVENTI],
        ordini: state.tableData[TABLENAMES.ORDINI]
      })
    };
  }
  return { events: [] };
};

export default connect(mapStateToProps)(MyCalendar);

const parseEvents = props => {
  return props.eventi
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
      props.ordini.map(e => {
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
};
