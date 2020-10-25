import React, { Component } from 'react';
import style from './Calendar.module.css'

// import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
// import 'react-big-calendar/lib/sass/styles';
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { getJobsByDate } from "../../Redux/Job/jobActions";

import axios from 'axios'
import { connect } from 'react-redux';

const localizer = momentLocalizer(moment)
const now = new Date()

class CalendarApp extends Component {

    state = {
        date: new Date(),

        myEventsList: []
    }

    componentDidMount = () => {
        // const { getJobsByDate } = this.props;
        getJobsByDate().then(res => {
            let jobs = []
            res.data.jobs.map(x => {
                x.dates.map(y => {
                    let obj = {
                        start: y,
                        end: y,
                        title: x.title,
                        id: x.id
                    }
                    jobs.push(obj);
                })
            })
            this.setState({
                myEventsList: jobs
            })
        })
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
                                popup={true}
                            />
                        </div>
                    </div>

                    {/* <div className="col-4">
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

                    </div> */}
                </div>




            </div>


        );
    }
}

// var actions = {
//     getJobsByDate
//   }

//   export default connect(null, actions)(CalendarApp)
export default CalendarApp