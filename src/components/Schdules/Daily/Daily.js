import React, { useEffect, useState } from 'react'
import style from './Daily.module.css'
import SideBar from '../../Sidebar/SideBar'
import { getalljobs, getalljobsfiveday } from '../../../Redux/Schedule/scheduleAction'
import { connect } from 'react-redux';

const DailySchedule = (props) => {
    const [today, setToday] = useState(new Date())
    const [day, setDay] = useState(new Date().getDay())
    const [weekNames, setWeekNames] = useState()
    const [tomorrow, setTomorrow] = useState(today.getDay() + 2)
    const [date, setDate] = useState(today.toString().split(' ')[0])
    
    const [nextDate, setNextDate] = useState(new Date())

    const { getalljobs, getalljobsfiveday, jobs, movers } = props;
    console.log(date)
    console.log(nextDate)
    console.log(today, today.getDate() + 1)


    console.log(day)
      useEffect(() => {
        getalljobs({
            "date": nextDate
        })

    }, [nextDate]);
    console.log(jobs)

    useEffect(() => {
        const { movers } = props;

        getalljobsfiveday({
            "date": date
        })

    }, []);
    console.log(movers)
    console.log(tomorrow, today.toString().split(' ')[0])
    const routes = [{
        title: "Unavailable",
        path: "/schedule",
        icon: <img src='/images/pin.png' width="20px" alt="icon"></img>
    },
    {
        title: "Daily Schedule",
        path: "/schedule/daily",
        icon: <img src='/images/Icon material-schedule.png' width="20px" alt="icon"></img>

    }, {
        title: "Movers",
        path: "/schedule/Movers",
        icon: <img src='/images/truck.png' width="20px" alt="icon"></img>

    }
    ]

    console.log(weekNames)
    useEffect(() => {
        switch (day) {
            case 0:
                setWeekNames(['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'])
                break;
            case 1:
                setWeekNames(['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'])
                break;
            case 2:
                setWeekNames(['Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday', 'Monday'])
                break;
            case 3:
                setWeekNames(['Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday', 'Monday', 'Tuesday'])
                break;
            case 4:
                setWeekNames(['Thursday', 'Friday', 'Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday'])
                break;
            case 5:
                setWeekNames(['Friday', 'Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday'])
                break;
            case 6:
                setWeekNames(['Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'])
                break;
            default:
                setWeekNames([])
        }
    }, []);

    const handleDateChange = (i) => {

        let date = new Date()
        let itemDate = new Date(date); // starting today
        date.setDate(date.getDate() + i);
        // temp.push(date);
        
        console.log(date.toString().split(' ')[0])
        setNextDate(date)
        console.log(nextDate)
        // let date = new Date() + (i + 1);
        // let newDate = new Date(date)
        // console.log(new Date(date).getDate() + (i + 1), date, newDate.setDate())

    }
    console.log(nextDate)
    return <div className={`row ${style.toprow}`}>
        <div className="col-2">
            <SideBar routes={routes} />
        </div>

        <div className={`col-7 justify-content-center ${style.fr}`}>
            <h5 className={style.head}>Daily Schedule</h5>
            <div className={style.lists}>
                <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
                    {weekNames && weekNames.map((name, i) => {
                        return <li className={`nav-item ${style.items}`}>
                            <a onClick={() => handleDateChange(i)} className={`nav-link active ${style.color}`} id="pills-home-tab" data-toggle="pill" href="#pills-home" role="tab" aria-controls="pills-home" aria-selected="true">{name}</a>
                        </li>
                    })}
                </ul>
            </div>

            {props.jobs && props.jobs.data.jobs.map(list => {
                return <><div className={`list-group ${style.list}`}>
                    <a href="#" className="list-group-item list-group-item-action flex-column align-items-start">
                        <div className="d-flex w-100 justify-content-between">
                            <h5 className={`mb-1 ${style.name}`}>{list.title}</h5>
                            <small><button><i className="fa fa-group"></i></button></small>
                        </div>
                        {list.services.map(ser => {
                            return <><div className={style.para}>
                                <h5><span className={`badge badge-primary ${style.color}`}>{ser.name}</span></h5>
                            </div></>
                        })}
                    </a>
                </div></>
            })}

        </div>

        <div className={`col-3 ${style.mov}`}>
            <h5 className={style.movehead}>Movers</h5>
            {movers && movers.map(list => {
                return <><h6 className={style.movname}>{list.mover.name}</h6>
                    {list.availabilityStatus.map(status => {
                        console.log(status)
                        return <span className={status ? `badge badge-primary ${style.color}` : `badge badge-secondary ${style.color}`}>{status ? 'Avaiable' : 'Unavaiable'}</span>
                    })}</>
            })}
        </div>

    </div>
}
var mapStateToProps = (state) => ({
    jobs: state.schedule.jobList,
    movers: state.schedule.moverList

});

var actions = {
    getalljobs,
    getalljobsfiveday
}
export default connect(mapStateToProps, actions)(DailySchedule)