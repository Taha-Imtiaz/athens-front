import React, { Component } from 'react';
import style from './Calendar.module.css'

// import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
// import 'react-big-calendar/lib/sass/styles';
import 'react-big-calendar/lib/css/react-big-calendar.css'
import Button from '../../Button/Button';
import { Link } from 'react-router-dom';
import { getMoverJobs, getJob } from "../../../Redux/Mover/moverActions";
import { connect } from 'react-redux';


const localizer = momentLocalizer(moment)
const now = new Date()

class MoversCalendar extends Component {
    state = {
        date: new Date(),
        myEventsList: [
        ],
        job: ''
    }
    componentDidMount = () => {
        const { user } = this.props;
        const date = new Date()
        console.log(date)
        getMoverJobs(date).then(res => {
            // this.setState({
            //     myEventsList: res.data.jobs
            // })

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
    onChange = date => this.setState({ date })

    changeDate = x => {
        console.log(x)
        getMoverJobs(x).then(res => {
            // this.setState({
            //     myEventsList: res.data.jobs
            // })

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
                <div className={`d-flex justify-content-start`}>

                    <div className={` ${style.btn}`}>
                        <Link style={{ textDecoration: "none" }} to='/mover/availability'> <Button name="Set Availability" /></Link>
                    </div>
                    <div className={style.btn2}>
                        <Link style={{ textDecoration: "none" }} to='/mover/holidaycalendar'> <Button name="Request Holidays" /></Link>
                    </div>
                </div>


                <div className={`row ${style.toprow}`}>
                    <div className="col-8">
                        <div className={style.cal}>
                            <Calendar
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

// export default MoversCalendar;
var mapStateToProps = (state) => ({
    // moverJobs: state.moverJobs,
    user: state.users.user
});

// var actions = {
//     getMover
// };

export default connect(mapStateToProps, null)(MoversCalendar);