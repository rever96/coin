import React from 'react';
import Scheduler, {
  SchedulerData,
  ViewTypes,
  DATE_FORMAT
} from 'react-big-scheduler';
import 'react-big-scheduler/lib/css/style.css';
import moment from 'moment';
import withDragDropContext from './withDnDContext';

let schedulerData = new SchedulerData(
  new moment().format(DATE_FORMAT),
  ViewTypes.Week
);
schedulerData.setLocaleMoment(moment);
let resources = [
  {
    id: 'r0',
    name: 'Resource0',
    groupOnly: true
  },
  {
    id: 'r1',
    name: 'Resource1'
  },
  {
    id: 'r2',
    name: 'Resource2',
    parentId: 'r0'
  },
  {
    id: 'r3',
    name: 'Resource3',
    parentId: 'r4'
  },
  {
    id: 'r4',
    name: 'Resource4',
    parentId: 'r2'
  }
];
schedulerData.setResources(resources);
let events = [
  {
    id: 1,
    start: '2017-12-18 09:30:00',
    end: '2017-12-19 23:30:00',
    resourceId: 'r1',
    title: 'I am finished',
    bgColor: '#D9D9D9'
  },
  {
    id: 2,
    start: '2017-12-18 12:30:00',
    end: '2017-12-26 23:30:00',
    resourceId: 'r2',
    title: 'I am not resizable',
    resizable: false
  },
  {
    id: 3,
    start: '2017-12-19 12:30:00',
    end: '2017-12-20 23:30:00',
    resourceId: 'r3',
    title: 'I am not movable',
    movable: false
  },
  {
    id: 4,
    start: '2017-12-19 14:30:00',
    end: '2017-12-20 23:30:00',
    resourceId: 'r1',
    title: 'I am not start-resizable',
    startResizable: false
  },
  {
    id: 5,
    start: '2017-12-19 15:30:00',
    end: '2017-12-20 23:30:00',
    resourceId: 'r2',
    title: 'R2 has recurring tasks every week on Tuesday, Friday',
    rrule: 'FREQ=WEEKLY;DTSTART=20171219T013000Z;BYDAY=TU,FR',
    bgColor: '#f759ab'
  }
];
schedulerData.setEvents(events);

class BigCalendar extends React.Component {
  prevClick(e) {
    console.log(e);
  }
  nextClick(e) {
    console.log(e);
  }
  onSelectDate(e) {
    console.log(e);
  }
  onViewChange(e) {
    console.log(e);
  }
  eventClicked(e) {
    console.log(e);
  }
  render() {
    return (
      <Scheduler
        schedulerData={schedulerData}
        prevClick={this.prevClick}
        nextClick={this.nextClick}
        onSelectDate={this.onSelectDate}
        onViewChange={this.onViewChange}
        eventItemClick={this.eventClicked}
      />
    );
  }
}

export default withDragDropContext(BigCalendar);
