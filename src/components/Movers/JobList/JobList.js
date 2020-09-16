import React, { Component } from 'react'
import style from './JobList.module.css'
import DatePicker from "react-datepicker";
import Button from '../../Button/Button'


import "react-datepicker/dist/react-datepicker.css";
import { Link } from 'react-router-dom';

const width = window.innerWidth

class MoversJobsList extends Component {


    render() {
        return (
            <div className={style.toprow}>
                <div className="row">
                    <div className="col-6">
                        <h3 className={style.head}>Jobs List Page</h3>
                    </div>

                    <div className="col-6">

                        <div className={`d-flex justify-content-end ${style.buttons}`}>

                            <div className={style.btndel}>
                                <Button name="Delete" />
                            </div>
                        </div>


                    </div>
                </div>




                <div className={`${style.jumbotron}`}>

                    <ul class="list-group">
                        <div className={style.li}>
                            <li class=" checkbox list-group-item ">
                                <div className="row justify-content-around">
                                    <div className={`col-4 col-md-3`}>
                                        <div className={style.checkbox}>
                                            <input type="checkbox" class="form-check-input" id="exampleCheck1" />
                                            <label class="form-check-label" for="exampleCheck1">Job</label>
                                        </div>
                                    </div>
                                    <div className="col-4 col-md-2">
                                        <i className="fa fa-calendar "> 0/12/2020</i>
                                    </div>
                                    <div className="col-4 col-md-2 d-flex justify-content-center">
                                        <span>
                                            <i className="fa fa-user"></i>
                                            <label className={`checkbox-inline ${style.assignee}`} for="defaultCheck1">Assignee</label>
                                        </span>
                                    </div>
                                    <div className="col-4 col-md-2 d-flex justify-content-center ">
                                        <label class="form-check-label" for="exampleCheck1">Status</label>
                                    </div>
                                    <div className="col-4 col-md-3">
                                        <div class="form-check">
                                            <div className={`d-flex justify-content-end`}>
                                                <div className={style.edit}>
                                                    <Button name="Edit" />
                                                </div>
                                                <Link style={{ textDecoration: "none" }} to='/movers/jobdetails'> <Button name="Details" /></Link>
                                            </div>

                                        </div>
                                    </div>

                                </div>
                            </li>

                        </div>

                    </ul>

                </div>
            </div>
        )
    }

}

export default MoversJobsList