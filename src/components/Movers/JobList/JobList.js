import React, { Component } from 'react'
import style from './JobList.module.css'
import DatePicker from "react-datepicker";
import Button from '../../Button/Button'
import "react-datepicker/dist/react-datepicker.css";
import { Link } from 'react-router-dom';
import { getMover } from '../../../Redux/Mover/moverActions'
import { updateJob } from '../../../Redux/Mover/moverActions'
import { connect } from 'react-redux';
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
    //     console.log(props.user)
    // }

    handleJobUpdate = (id) => {
        console.log(id)
        updateJob(id, { status: this.state.status })
    };

    render() {
        console.log(this.state.data)
        const { moverJobs, user } = this.props;
        if (user) {
            getMover(user._id)
        }

        console.log(moverJobs)
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
                {moverJobs ?.data ?.jobs ? moverJobs.data.jobs.map(list => {
                    return <><div className={`${style.jumbotron}`}>

                        <ul className="list-group">
                            <div className={style.li}>
                                <li className=" checkbox list-group-item ">
                                    <div className="row justify-content-around">
                                        <div className={`col-3 col-md-3`}>
                                            <div className={style.checkbox}>
                                                <label className="form-check-label" htmlFor="exampleCheck1">{list.title}</label>
                                            </div>
                                        </div>
                                        <div className="col-4 col-md-2">
                                            <i className="fa fa-calendar ">{list.dates.map(x => x)}</i>
                                        </div>
                                        {list.assignee.map(ass => {
                                            return <><div className="col-4 col-md-2 d-flex justify-content-center">
                                                <span>
                                                    <i className="fa fa-user"></i>
                                                    <label className={`checkbox-inline ${style.assignee}`} htmlFor="defaultCheck1">{ass.name}</label>
                                                </span>
                                            </div></>
                                        })}
                                        <div className="col-4 col-md-2 d-flex justify-content-center ">
                                            {list.status === 'completed' ? <label className="form-check-label" htmlFor="exampleCheck1">{list.status}</label> : <><label className="form-check-label" htmlFor="exampleCheck1">{list.status}</label>&nbsp;&nbsp;&nbsp;<Button onClick={() => this.handleJobUpdate(list._id)} name="Completed" /></>}
                                        </div>
                                        <div className="col-4 col-md-3">
                                            <div className="form-check">
                                                <div className={`d-flex justify-content-end`}>

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
            </div>
        )
    }

}

var mapStateToProps = (state) => ({
    moverJobs: state.moverJobs,
    user: state.users.user
});

var actions = {
    getMover,
};

export default connect(mapStateToProps, actions)(MoversJobsList);