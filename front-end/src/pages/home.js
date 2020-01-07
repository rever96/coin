import React from 'react';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css';
import { updateTableRow, deleteTableRow, createTableRow } from '../data/tables';
import { notification, Typography } from 'antd';
import { connect } from 'react-redux';

const { Title } = Typography;

const localizer = BigCalendar.momentLocalizer(moment);
const DnDCalendar = withDragAndDrop(BigCalendar);

class MyCalendar extends React.Component {
  constructor() {
    super();
    const events = [];
    this.state = {
      dayLayoutAlgorithm: 'no-overlap',
      events,
      fetchedEvents: false
    };
    this.stillWaitingForData = true;
  }

  componentDidUpdate() {
    if (this.stillWaitingForData && this.props.Eventi) {
      this.stillWaitingForData = false;
      this.setState(
        {
          events: this.props.Eventi.map(e => {
            return {
              title: e.titolo,
              start: moment(e.data_inizio).toDate(),
              end: moment(e.data_fine).toDate()
            };
          })
        },
        () => {
          this.setState({ fetchedEvents: true });
        }
      );
    }
  }

  onEventResize = ({ event, start, end, allDay }) => {
    console.log('resize');
    const index = this.state.events.findIndex(e => e.id === event.id);
    const deletedEvent = this.state.events.splice(index, 1)[0];
    deletedEvent.start = start;
    deletedEvent.end = end;
    this.setState({
      events: [...this.state.events, deletedEvent]
    });
  };

  onEventDrop = ({ event, start, end, allDay }) => {
    console.log('drop');
    const events = [...this.state.events];
    const index = events.findIndex(e => e.id === event.id);
    const deletedEvent = events.splice(index, 1)[0];
    deletedEvent.start = start;
    deletedEvent.end = end;
    events.splice(index, 0, deletedEvent);
    this.setState({
      events
    });
    console.log({ ...this.state.events });
  };

  onSelectEvent(event) {
    console.log(event);
  }

  handleSelect = ({ start, end }) => {
    const title = window.prompt('New Event name');
    if (title) {
      const row = {
        data_inizio: start,
        data_fine: end,
        titolo: title
      };
      createTableRow(this.props.dispatch, 'Eventi', row)
        .then(id => {
          //aggiorno questa componente
          //perchè cambia lo stato del reducer, ma questa componente non è connessa
          console.log(id);
          this.setState({
            events: [
              ...this.state.events,
              {
                start,
                end,
                title
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
    }
  };

  render() {
    return (
      <>
        {!this.state.fetchedEvents && <Title>Loading</Title>}
        <DnDCalendar
          min={new Date(3 * 3600 * 1000)}
          max={new Date(21 * 3600 * 1000)}
          defaultDate={new Date()}
          selectable
          localizer={localizer}
          events={this.state.events}
          defaultView="week"
          onEventDrop={this.onEventDrop.bind(this)}
          onEventResize={this.onEventResize.bind(this)}
          onSelectEvent={event => alert(event.title)}
          onSelectSlot={this.handleSelect}
          dayLayoutAlgorithm={this.state.dayLayoutAlgorithm}
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
