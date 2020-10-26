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
import { getJob } from "../../../Redux/Mover/moverActions";
import { connect } from 'react-redux';


const localizer = momentLocalizer(moment)
const now = new Date()



class MoversCalendar extends Component {
    state = {
        date: new Date(),
        myEventsList: [
        ]
    }
    componentDidMount = () => {
        const { user } = this.props;
        console.log(user)
        getJob().then(res => {
            console.log(res)
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
                                style={{ height: 500, width: 900 }}
                                views={{
                                    month: true
                                }}
                                popup={true}
                            />
                        </div>
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