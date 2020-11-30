import React, { Component } from 'react'
import style from './JobList.module.css'
import DatePicker from "react-datepicker";
import Button from '../../Button/Button'
import "react-datepicker/dist/react-datepicker.css";
import { Link } from 'react-router-dom';
import { getMover } from '../../../Redux/Mover/moverActions'
import { updateJob } from '../../../Redux/Mover/moverActions'
import { connect } from 'react-redux';
import { showMessage } from '../../../Redux/Common/commonActions';
const width = window.innerWidth

class MoversJobsList extends Component {
    state = {
        isLoading: true,
        data: [],
        status: "completed"
    }

    componentDidMount = () => {
        var { getMover } = this.props
        getMover();
        // if (user) {
        //     getMover(user._id)
        // }
        // this.setState({
        //     isLoading: false,
        //     data: this.props.moverJobs.data
        // })
    }

    // componentDidUpdate(props) {
    //     var { getMover } = props
    // }

    handleJobUpdate = (id) => {
        updateJob(id, { status: this.state.status })
    };

    markComplete = (list) => {
        updateJob(list._id, { status: 'completed' }).then((res) => {
            if (res.data.status == 200) {
                var { getMover, showMessage } = this.props
                showMessage(res.data.message)
                getMover();
            }
        })
    }

    render() {
        const { moverJobs, user } = this.props;
        if (user) {
            getMover(user._id)
        }

        return (
            <div className={style.toprow}>
                <div className="row">
                    <div className="col-6">
                        <h3 className={style.head}>Jobs List Page</h3>
                    </div>

                    <div className="col-6">

                        <div className={`d-flex justify-content-end ${style.buttons}`}>

                            {/* <div className={` ${style.create}`}>
                                <Link style={{ textDecoration: "none" }} to='/job/create'> <Button name="Create New" /></Link>
                            </div>
                            <div className={style.btndel}>
                                <Button name="Delete" />
                            </div> */}
                        </div>

                    </div>
                </div>
                {moverJobs ?.data ?.jobs.length > 0 ? <div
                    className={`row justify-content-around ${style.header}`}
                    style={{ margin: "1rem 4%", fontWeight: "bold" }}
                >
                    <div className="col-4 col-md-2 text-center" >Title</div>
                    <div className="col-4 col-md-2">Date</div>
                    <div className="col-4 col-md-3">Assignee</div>
                    <div
                        className="col-4 col-md-1"
                        style={{ transform: "translateX(-2rem)" }}
                    >
                        Status
                </div>
                    {/* <div className="col-1" style={{ transform: "translateX(-1rem)" }}>
                    Actions
                </div> */}
                </div>
                    : null}
                {moverJobs ?.data ?.jobs.length > 0 ? moverJobs.data.jobs.map(list => {
                    return <><div className={`${style.jumbotron}`}>
                        <ul className="list-group text-center">
                            <div className={style.li}>
                                <li className={`checkbox list-group-item ${style.list}`} >
                                    <div className="row justify-content-around">
                                        <div className={`col-2 col-md-2`}>
                                            <div className={style.checkbox}>
                                                <label className="form-check-label" htmlFor="exampleCheck1">{list.title}</label>
                                            </div>
                                        </div>
                                        <div className="col-4 col-md-3">
                                            {/* <i className="fa fa-calendar ">{list.dates.map(x => `${x}`)}</i> */}
                                            <i className="fa fa-calendar ">{list.dates[0]}...</i>
                                        </div>

                                        <div className="col-4 col-md-4 d-flex justify-content-center">
                                            <span>
                                                <i className="fa fa-user"></i>
                                                {list.assignee.length > 0 ? list.assignee.map(ass => {
                                                    return <label className={`checkbox-inline ${style.assignee}`} htmlFor="defaultCheck1">{ass.name}</label>
                                                }) : 'No Assignees'}
                                            </span>
                                        </div>
                                        {/* })} */}
                                        {/* <div className="col-4 col-md-2 d-flex justify-content-center ">
                                            {list.status === 'completed' ? <label className="form-check-label" htmlFor="exampleCheck1">{list.status}</label> : <><label className="form-check-label" htmlFor="exampleCheck1">{list.status}</label>&nbsp;&nbsp;&nbsp;<Button onClick={() => this.handleJobUpdate(list._id)} name="Completed" /></>}
                                        </div> */}
                                        {list.status === 'booked' ?
                                            <div className="form-check col-md-2">
                                                <input onClick={() => this.markComplete(list)} type="checkbox" className="form-check-input" id="exampleCheck1"></input>
                                                <label onClick={() => this.markComplete(list)} className="form-check-label" htmlFor="exampleCheck1">Mark Complete</label>
                                            </div>
                                            : list.status}
                                        <div className="col-2 col-md-1">
                                            <div className="form-check">
                                                <div >
                                                    <Link style={{ textDecoration: "none" }} to={'/mover/jobdetails/' + list._id}> <Button name="Details" /></Link>
                                                </div>

                                            </div>
                                        </div>

                                    </div>
                                </li>

                            </div>

                        </ul>

                    </div></>
                }) : <div className="text-center">
                        <img src='/images/no-data-found.png' />
                    </div>}
            </div >
        )
    }

}

var mapStateToProps = (state) => ({
    moverJobs: state.moverJobs,
    user: state.users.user
});

var actions = {
    getMover,
    showMessage
};

export default connect(mapStateToProps, actions)(MoversJobsList);