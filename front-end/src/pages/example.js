import React from 'react';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css';

const localizer = BigCalendar.momentLocalizer(moment);
const DnDCalendar = withDragAndDrop(BigCalendar);

class ExampleDnD extends React.Component {
  constructor() {
    super();
    const events = [...Array(10).keys()].map(index => {
      return {
        id: index,
        title: 'evento ' + index,
        start: moment(
          moment.now() + index * 3 * 3600 * 1000 - 9600000
        ).toDate(),
        end: moment(moment.now() + index * 3 * 3600 * 1000).toDate()
      };
    });
    events.push({
      id: -1,
      title: 'evento su più giorni',
      start: moment(moment.now()).toDate(),
      end: moment(moment.now() + 36 * 3600 * 1000).toDate(),
      example: 'omg',
      color: 'green'
    });
    this.state = {
      events
    };
  }

  onEventResize = ({ event, start, end, allDay }) => {
    const index = this.state.events.findIndex(e => e.id === event.id);
    const deletedEvent = this.state.events.splice(index, 1)[0];
    deletedEvent.start = start;
    deletedEvent.end = end;
    this.setState({
      events: [...this.state.events, deletedEvent]
    });
  };

  onEventDrop = ({ event, start, end, allDay }) => {
    console.log({ ...this.state.events });
    const index = this.state.events.findIndex(e => e.id === event.id);
    const deletedEvent = this.state.events.splice(index, 1)[0];
    deletedEvent.start = start;
    deletedEvent.end = end;
    this.setState({
      events: [...this.state.events, deletedEvent]
    });
    console.log({ ...this.state.events });
  };

  onSelectEvent(event) {
    console.log(event);
  }

  render() {
    return (
      <div className="App">
        <DnDCalendar
          defaultDate={new Date()}
          defaultView="week"
          events={this.state.events}
          localizer={localizer}
          onEventDrop={this.onEventDrop.bind(this)}
          onEventResize={this.onEventResize.bind(this)}
          onSelectEvent={this.onSelectEvent.bind(this)}
          resizable
          style={{ height: '500px' }}
          eventPropGetter={(event, start, end, isSelected) => {
            if (event.color) {
              return { style: { backgroundColor: event.color } };
            }
            return {};
          }}
        />
      </div>
    );
  }
}

export default ExampleDnD;
