import React, { Component } from 'react';
import style from './Calendar.module.css'

// import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
// import 'react-big-calendar/lib/sass/styles';
import 'react-big-calendar/lib/css/react-big-calendar.css'



const localizer = momentLocalizer(moment)
const now = new Date()

class CalendarApp extends Component {

    state = {
        date: new Date(),
        myEventsList: [
            {
                id: 0,
                title: 'All',
                // allDay: true,
                start: new Date("Mon Oct 05 2020 23:43:34"),
                end: new Date("Mon Oct 05 2020 23:43:34"),
            },
            {
                id: 1,
                title: 'Long Event',
                start: new Date(2015, 3, 7),
                end: new Date(2015, 3, 10),
            },

            {
                id: 2,
                title: 'DTS STARTS',
                start: new Date(2016, 2, 13, 0, 0, 0),
                end: new Date(2016, 2, 20, 0, 0, 0),
            },

            {
                id: 3,
                title: 'DTS ENDS',
                start: new Date(2016, 10, 6, 0, 0, 0),
                end: new Date(2016, 10, 13, 0, 0, 0),
            },

            {
                id: 4,
                title: 'Some Event',
                start: new Date(2015, 3, 9, 0, 0, 0),
                end: new Date(2015, 3, 10, 0, 0, 0),
            },
            {
                id: 5,
                title: 'Conference',
                start: new Date(2015, 3, 11),
                end: new Date(2015, 3, 13),
                desc: 'Big conference for important people',
            },
            {
                id: 6,
                title: 'Meeting',
                start: now,
                end: now,
                desc: 'Pre-meeting meeting, to prepare for the meeting',
                time: '2323'
            },
            {
                id: 7,
                title: 'Lunch',
                start: new Date(2015, 3, 12, 12, 0, 0, 0),
                end: new Date(2015, 3, 12, 13, 0, 0, 0),
                desc: 'Power lunch',
            },
            {
                id: 8,
                title: 'Meeting',
                start: new Date(2015, 3, 12, 14, 0, 0, 0),
                end: new Date(2015, 3, 12, 15, 0, 0, 0),
            },
            {
                id: 9,
                title: 'Happy Hour',
                start: new Date(2015, 3, 12, 17, 0, 0, 0),
                end: new Date(2015, 3, 12, 17, 30, 0, 0),
                desc: 'Most important meal of the day',
            },
            {
                id: 10,
                title: 'Dinner',
                start: new Date(2015, 3, 12, 20, 0, 0, 0),
                end: new Date(2015, 3, 12, 21, 0, 0, 0),
            },
            {
                id: 11,
                title: 'Birthday Party',
                start: new Date(2015, 3, 13, 7, 0, 0),
                end: new Date(2015, 3, 13, 10, 30, 0),
            },
            {
                id: 12,
                title: 'Late Night Event',
                start: new Date(2015, 3, 17, 19, 30, 0),
                end: new Date(2015, 3, 18, 2, 0, 0),
            },
            {
                id: 12.5,
                title: 'Late Same Night Event',
                start: new Date(2015, 3, 17, 19, 30, 0),
                end: new Date(2015, 3, 17, 23, 30, 0),
            },
            {
                id: 13,
                title: 'Multi-day Event',
                start: new Date(2015, 3, 20, 19, 30, 0),
                end: new Date(2015, 3, 22, 2, 0, 0),
            },
            {
                _id: 14,
                title: 'Today',
                start: new Date(new Date().setHours(new Date().getHours() - 3)),
                end: new Date(new Date().setHours(new Date().getHours() - 3))
            },
            {
                id: 15,
                title: 'Point in Time Event',
                start: now,
                end: now,
            },
            {
                id: 16,
                title: 'Video Record',
                start: now,
                end: now,
            },
            {
                id: 17,
                title: 'Dutch Song Producing',
                start: now,
                end: now,
            },
            {
                id: 18,
                title: 'Itaewon Halloween Meeting',
                start: now,
                // end: now,
            },
            {
                id: 19,
                title: 'Online Coding Test',
                start: new Date(2015, 3, 14, 17, 30, 0),
                end: new Date(2015, 3, 14, 20, 30, 0),
            },
            {
                id: 20,
                title: 'An overlapped Event',
                start: new Date(2015, 3, 14, 17, 0, 0),
                end: new Date(2015, 3, 14, 18, 30, 0),
            },
            {
                id: 21,
                title: 'Phone Interview',
                start: new Date(2015, 3, 14, 17, 0, 0),
                end: new Date(2015, 3, 14, 18, 30, 0),
            },
            {
                id: 22,
                title: 'Cooking Class',
                start: new Date(2015, 3, 14, 17, 30, 0),
                end: new Date(2015, 3, 14, 19, 0, 0),
            },
            {
                id: 23,
                title: 'Go to the gym',
                start: new Date(2015, 3, 14, 18, 30, 0),
                end: new Date(2015, 3, 14, 20, 0, 0),
            }
        ]
    }

    onSelect = x => console.log(x)
    onChange = date => this.setState({ date })
    handleSelect = x => console.log(x)

    render() {
        return (
            <div>
                <div className={`row ${style.toprow}`}>
                    <div className="col-8">
                        <div className={style.cal}>
                            <Calendar
                                // selectable
                                localizer={localizer}
                                events={this.state.myEventsList}
                                startAccessor="start"
                                endAccessor="end"
                                style={{ height: 500, width: 900 }}
                                onSelectEvent={this.onSelect}
                                // onSelectSlot={this.handleSelect}
                                views={{
                                    month: true
                                }}
                                popup = {true}
                            />
                        </div>
                    </div>

                    <div className="col-4">
                        <h5 className={style.head}>Jobs</h5>
                        <div className={`card ${style.cardCustom}`} >
                            <div className="card-body">
                                <h5 className="card-title">Job Name</h5>
                                <h6 className="card-subtitle mb-2 text-muted">Status</h6>
                                <p className="card-text">lorem sadl asdasd</p>
                                <p className="card-text">name@gmail.com</p>
                            </div>
                        </div>
                        <div className={`card ${style.cardCustom2}`} >
                            <div class="card-body">
                                <h5 className="card-title">Job Name</h5>
                                <h6 className="card-subtitle mb-2 text-muted">Status</h6>
                                <p className="card-text">lorem sadl asdasd</p>
                                <p className="card-text">name@gmail.com</p>
                            </div>
                        </div>

                    </div>
                </div>




            </div>


        );
    }
}

export default CalendarApp;