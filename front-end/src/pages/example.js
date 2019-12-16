import React from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

class Example extends React.Component {
  constructor() {
    super();
    this.events = [...Array(10).keys()].map(index => {
      return {
        id: index,
        title: 'evento ' + index,
        start: moment(
          moment.now() + index * 3 * 3600 * 1000 - 9600000
        ).toDate(),
        end: moment(moment.now() + index * 3 * 3600 * 1000).toDate()
      };
    });
    this.events.push({
      id: -1,
      title: 'evento su più giorni',
      start: moment(moment.now()).toDate(),
      end: moment(moment.now() + 36 * 3600 * 1000).toDate(),
      example: 'omg'
    });
  }

  selectEvent(e) {
    console.log(e);
  }

  render() {
    console.log(this.events);
    return (
      <Calendar
        localizer={localizer}
        events={this.events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
        defaultView="week"
        onSelectEvent={this.selectEvent}
      />
    );
  }
}

export default Example;
