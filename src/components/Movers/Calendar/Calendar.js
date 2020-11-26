import React, { Component } from 'react';
import style from './Calendar.module.css'
import Chip from '@material-ui/core/Chip';

// import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
// import 'react-big-calendar/lib/sass/styles';
import 'react-big-calendar/lib/css/react-big-calendar.css'
import Button from '../../Button/Button';
import { Link } from 'react-router-dom';
import { getMoverJobs, getJob } from "../../../Redux/Mover/moverActions";
import {getJobsByDate} from '../../../Redux/Job/jobActions';
import { connect } from 'react-redux';


const localizer = momentLocalizer(moment)
const now = new Date()

class MoversCalendar extends Component {
    state = {
        date: new Date(),
        myEventsList: [],
        showIndex: null,
        job: '',
    }
    componentDidMount = () => {
        const { user } = this.props;
        const date = new Date();
        console.log(date)
        getMoverJobs(date).then(res => {
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
                });
            });
            this.setState({
                myEventsList: jobs
            });
        });
    }

    onSelect = (x) => console.log(x);
    onChange = (date) => this.setState({ date });
    handleSelect = (x) => console.log(x);

    changeDate = x => {
        console.log(x);
        var date = x;
        console.log(date.toString());

        getMoverJobs(x).then(res => {
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
                });
            });
            this.setState({
                myEventsList: jobs
            });
        });
    }


  toggleCollapse = (i) => {
    console.log('hello');
    console.log("toggle" + i)
    if (i == this.state.showIndex) {
      this.setState({
        showIndex: null,
      });
    } else {
      this.setState({
        showIndex: i,
      });
    }
  };

 

    getJobDetails = e => {
        getJob(e.id)
            .then((res) => {
                console.log(res.data.job);
                this.setState({ job: res.data.job });
                console.log(res);
            })
            .catch((error) => {
                console.log(error);
            });
    }


    getJobDetailsOnSlotClick = (e) => {
        console.log(e);
        let date = e.end;
        console.log(date);
        this.setState(
            {date : date}
        );

        getJobsByDate(date).then((res) => {
            let jobs = [];
            res.data.jobs.map((x) => {
              x.dates.map((y) => {
                let obj = {
                  start: y,
                  end: y,
                  title: x.title,
                  id: x.id,
                };
                jobs.push(obj);
              });
            });
            this.setState({
              myEventsList: jobs,
            });
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
                                selectable
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
                                onSelectSlot={this.getJobDetailsOnSlotClick}
                            />
                        </div>
                    </div>

                    <div className="col-3 text-left">
                        {this.state.job ? <div>
                            <h5 style={{ display: "flex", justifyContent: "center", alignItems: "center",fontFamily:"sans-serif" }}>{this.state.date.toDateString()}</h5>
                            
                            <div id = "accordion" style={{fontFamily:"Segoe UI, Tahoma, Geneva, Verdana, sans-serif"}}>

                                        <div className={`card ${style.cardCustom} ${style.card}`}
                                        style={{marginBottom: "1.5rem"}}
                                        >
                                        <div
                                    className={`card-header ${style.cardHeader}`}
                                    id="headingOne"
                                    // onClick={() => this.toggleCollapse(this.state.myEventsList.length)}
                                    aria-expanded="true"
                                    data-toggle="collapse"
                                    href={`#collapse${this.state.myEventsList.length}`}
                                    aria-controls="collapse"
                                >
                                    <div>
                                    <Link
                                        style={{ textDecoration: "none" }}
                                        to={`/job/details/${this.state.job._id}`}
                                        >
                                        &nbsp;
                                        {this.state.job.title}
                                        </Link>
                                    {/* <h6>{job.title}</h6> */}
                                    </div>
                                    <div>
                                    {/* <label style={{display:"flex",fontWeight:"bold",margin: '0', padding:"0"}}>Start Time</label> */}

                                    {this.state.job.startTime && <Chip
                                        label={this.state.job.startTime}
                                        clickable
                                        color="primary"
                                        variant="outlined"
                                        size="small"
                                        style={{ margin: " 0 0.2rem" }}
                                    /> }
                                    <Chip
                                        label={this.state.job.status}
                                        clickable
                                        color="primary"
                                        variant="outlined"
                                        size="small"
                                        style={{ margin: " 0 0.2rem" }}
                                    />
                                    </div>
                                </div>
                                            <div 
                                            id={`collapse${this.state.myEventsList.length}`}
                                            className="collapse show"
                                            aria-labelledby="headingOne"
                                            data-parent="#accordion"
                                            >

                                                    <div className="card-body">
                                                        <h5 className="card-title">{this.state.job.title}</h5>
                                                        <p className="card-text" style ={{whiteSpace: "pre"}}>{this.state.job.description}</p>
                                                        <p className="card-text">Customer:
                                                        <Link
                                                                style={{ textDecoration: "none" }}
                                                                to={`/customer/detail/${this.state.job.customer._id}`}>
                                                                &nbsp;
                                                                {this.state.job.customer.email}
                                                            </Link></p>
                                                    </div>

                                            </div>
                                        </div>
                            </div>
                        </div> : <h5 style={{ display: "flex", justifyContent: "center", alignItems: "center",fontFamily:"sans-serif" }}>No Jobs available</h5>}



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