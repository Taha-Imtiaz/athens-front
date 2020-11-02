import React, { useEffect, useState } from 'react'
import style from './Daily.module.css'
import SideBar from '../../Sidebar/SideBar'
import { getalljobs, getalljobsfiveday } from '../../../Redux/Schedule/scheduleAction'
import { connect } from 'react-redux';
import { Modal } from "react-bootstrap";
import Button from '../../Button/Button'
import { Multiselect } from "multiselect-react-dropdown";
import { getAllMovers, updateJob } from "../../../Redux/Job/jobActions";
import { clone, cloneDeep } from "lodash"
// import { getJob, getAllMovers,  } from "../../../Redux/Job/jobActions";
import { showMessage } from '../../../Redux/Common/commonActions'

const DailySchedule = (props) => {
    const [show, setShow] = useState(false)
    const [jobToUpdate, setJobToUpdate] = useState([])
    const [allMovers, setAllMovers] = useState()

    const [today, setToday] = useState(new Date())
    const [day, setDay] = useState(new Date().getDay())
    const [weekNames, setWeekNames] = useState()
    const [tomorrow, setTomorrow] = useState(today.getDay() + 2)
    // const [date, setDate] = useState(today.toString().split(' ')[0])
    const [date, setDate] = useState(today.toString())

    const [nextDate, setNextDate] = useState(new Date())
    const [indexDate, setIndexDate] = useState(0)


    const { getalljobs, getalljobsfiveday, jobs, movers } = props;
    useEffect(() => { // get-all-jobs-on-date
        getalljobs({
            "date": nextDate.toString()
        })

    }, [nextDate]);

    useEffect(() => {
        const { movers } = props;
        getalljobsfiveday({
            "date": date
        })

    }, []);
    const routes = [
        {
            title: "Daily Schedule",
            path: "/schedule/daily",
            icon: <img src='/images/Icon material-schedule.png' width="20px" alt="icon"></img>

        },

        {
            title: "Unavailable",
            path: "/schedule",
            icon: <img src='/images/pin.png' width="20px" alt="icon"></img>
        },
        , {
            title: "Movers",
            path: "/schedule/Movers",
            icon: <img src='/images/truck.png' width="20px" alt="icon"></img>

        }
    ]

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
        console.log(i)
        setIndexDate(i)
        let date = new Date()
        let itemDate = new Date(date); // starting today
        date.setDate(date.getDate() + i);
        setNextDate(date)
        // let date = new Date() + (i + 1);
        // let newDate = new Date(date)

    }
    const assigneeList = (list) => {
        var moversObj = {
            name: "",
            address: "",
            attributes: "",
        };
        getAllMovers(moversObj).then((moverRes) => {
            var mover = moverRes.data.movers.map((mover) => mover);
            // this.setState({
            //     assigneeList: mover,
            // });
            setAllMovers(mover)

        });
        setJobToUpdate(list)
        setShow(true);
    }

    const handleClose = () => {
        setShow(false);
    };
    const updateJobAssignee = () => {
        var { loggedinUser, showMessage } = props;
        let job = cloneDeep(jobToUpdate)
        job.assigneesId = job.assignee.map(x => x._id);

        job.userId = loggedinUser._id;
        job.customerId = job.customer.email;
        delete job.assignee;
        delete job.customer;
        // delete job._id;
        updateJob(job._id, job).then((res) => {
            if (res.data.status == 200) {
                getalljobs({
                    "date": nextDate.toString()
                })
                getalljobsfiveday({
                    "date": date
                })
                showMessage(res.data.message)
                setShow(false);
            }
        }).catch((error) => {
            console.log(error)
        });
    }

    const onAssigneeSelect = (selectedList, selectedItem) => {
        let job = cloneDeep(jobToUpdate)
        job.assignee = selectedList;
        // job.assigneesId = selectedList.map(x => x._id);
        setJobToUpdate(job)
    }
    const onAssigneeRemove = (selectedList, removedItem) => {
        let job = cloneDeep(jobToUpdate)
        job.assignee = selectedList;
        // job.assigneesId = selectedList.map(x => x._id);;
        setJobToUpdate(job)

    }

    return <div className={`row ${style.toprow}`}>
        <div className="col-2">
            <SideBar routes={routes} />
        </div>

        <div className={`col-7 justify-content-center ${style.fr}`}>
            <h5 className={style.head}>Daily Schedule</h5>
            <div className={style.lists}>
                <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
                    {weekNames && weekNames.map((name, i) => {
                        return <li key={i} className={`nav-item ${style.items}`}>
                            <a onClick={() => handleDateChange(i)} className={`nav-link active`} style={{ background: indexDate == i ? "#00ADEE" : "#6c757d" }} id="pills-home-tab" data-toggle="pill" href="#pills-home" role="tab" aria-controls="pills-home" aria-selected="true">{name}</a>
                        </li>
                    })}
                </ul>
            </div>

            {props.jobs && props.jobs.data.jobs.length > 0 ? props.jobs.data.jobs.map((list, i) => {
                return <><div className={`list-group ${style.list}`} key={i}>
                    <a className="list-group-item list-group-item-action flex-column align-items-start">
                        <div className="d-flex w-100 justify-content-between">
                            <h5 className={`mb-1 ${style.name}`}>{list.title}</h5>
                            <small onClick={() => assigneeList(list)}><button><i className="fa fa-group"></i>Assignees</button></small>
                        </div>
                        {list.services.map((ser, j) => {
                            return <><div className={style.para} key={j}>
                                <h5><span className={`badge badge-primary ${style.color}`}>{ser.name}</span></h5>
                            </div></>
                        })}
                    </a>
                </div></>
            }) : <div className="text-center">
                    <img src='/images/no-data-found.png' />
                </div>}
        </div>

        <div className={`col-3 ${style.mov}`}>
            <h5 className={style.movehead}>Movers</h5>
            {movers && movers.map((list, i) => {
                return <><h6 key={i} className={style.movname}>{list.mover.name}</h6>
                    {list.availabilityStatus.map((status, j) => {
                        return <span key={j} className={status ? `badge badge-primary mr-2 ${style.color}` : `badge badge-secondary mr-2 ${style.color}`}>{status ? 'Avaiable' : 'Unavaiable'}</span>
                    })}</>
            })}
        </div>
        <Modal show={show} onHide={handleClose} animation={false} centered>
            <Modal.Header closeButton>
                <Modal.Title>Assignees</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {/* <textarea
                    name=""
                    id=""
                    cols="65"
                    rows="5"
                    name="Note"
                    value={update}
                    onChange={handleAddUpdate}
                ></textarea> */}
                <div className="row" style={{ margin: "1.5rem 4.5rem" }}>
                    {/* {assignee?.map((assign) => assign.name)} */}
                    <div className="col-12">
                        <Multiselect
                            selectedValues={jobToUpdate ?.assignee}
                            options={allMovers} // Options to display in the dropdown
                            onSelect={onAssigneeSelect} // Function will trigger on select event
                            onRemove={onAssigneeRemove} // Function will trigger on remove event
                            displayValue="name" // Property name to display in the dropdown options
                        />
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={handleClose} name="Close">
                </Button>
                <Button onClick={updateJobAssignee} name="Update">
                </Button>
            </Modal.Footer>
        </Modal>
    </div>
}
var mapStateToProps = (state) => ({
    jobs: state.schedule.jobList,
    movers: state.schedule.moverList,
    loggedinUser: state.users.user


});

var actions = {
    getalljobs,
    getalljobsfiveday,
    showMessage
}
export default connect(mapStateToProps, actions)(DailySchedule)