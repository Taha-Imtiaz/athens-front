import React, { Component } from 'react';
import style from './Calendar.module.css'

// import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
// import 'react-big-calendar/lib/sass/styles';
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { getJobsByDate, getJob } from "../../Redux/Job/jobActions";

import axios from 'axios'
import { connect } from 'react-redux';

const localizer = momentLocalizer(moment)
const now = new Date()

class CalendarApp extends Component {

    state = {
        date: new Date(),
        job: '',
        myEventsList: []
    }

    componentDidMount = () => {
        // const { getJobsByDate } = this.props;
        const date = new Date()
        getJobsByDate(date).then(res => {
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


    changeDate = x => {
        console.log(x)
        getJobsByDate(x).then(res => {
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

    getJobDetails = e => {
        getJob(e.id)
            .then((res) => {
                console.log(res.data.job)
                this.setState({ job: res.data.job });
                console.log(res)
            })
            .catch((error) => {
                console.log(error);
            });
    }

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
                                style={{ height: 500, width: '90%' }}
                                views={{
                                    month: true
                                }}
                                popup={true}
                                onNavigate={this.changeDate}
                                onSelectEvent={this.getJobDetails}
                            />
                        </div>
                    </div>

                    <div className="col-3">
                        {this.state.job ? <div>
                            <h5 className={style.head}>Job Details</h5>
                            <div className={`card ${style.cardCustom}`} >
                                <div className="card-body">
                                    <h5 className="card-title">{this.state.job.title}</h5>
                                    <h6 className="card-subtitle mb-2 text-muted">{this.state.job.status}</h6>
                                    <p className="card-text">{this.state.job.description}</p>
                                    <p className="card-text">Customer: {this.state.job.customer.email}</p>
                                </div>
                            </div>
                        </div> : <h4>Please select job first.</h4>}
                    </div>
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