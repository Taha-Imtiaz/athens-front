import React, { Component } from 'react'
import style from './JobsList.module.css'
import DatePicker from "react-datepicker";
import Button from '../../Button/Button'


import "react-datepicker/dist/react-datepicker.css";
import { Link } from 'react-router-dom';

const width = window.innerWidth

class JobsList extends Component {


  state = {
    startDateTo1: "",
    startDateTo2: "",
    startDateTo3: "",
    startDateTo4: "",
  };

  handleChangeTo1 = date => {
    this.setState({
      startDateTo1: date,

    });
  };

  handleChangeTo2 = date => {
    this.setState({
      startDateTo2: date
    });
  };

  handleChangeTo3 = date => {
    this.setState({
      startDateTo3: date,
    });
  };

  handleChangeTo4 = date => {
    this.setState({
      startDateTo4: date,
    });
  };

  render() {
    return (
      <div className={style.toprow}>
        <div className="row">
          <div className="col-6">
            <h3 className={style.head}>Jobs List Page</h3>
          </div>

          {/* <div className={`col-4`}>
            <Link style={{ textDecoration: "none" }} to='/job/create'> <Button name="Calendar" /> </Link>
          </div> */}

          <div className="col-6">

            <div className={`d-flex justify-content-end ${style.buttons}`}>

              <div className={` ${style.create}`}>
                <Link style={{ textDecoration: "none" }} to='/calendar'> <Button name="Calendar" /></Link>
              </div>
              <div className={style.btndel}>
                <Button name="Delete" />
              </div>
            </div>


          </div>
        </div>




        <div className={`${style.jumbotron}`}>

          <ul class="list-group">
            <div className={style.li}>
            <Link style={{ textDecoration: "none", color:"black" }} to='/job/details'>
              <li class=" checkbox list-group-item ">
                <div className="row justify-content-around">
                  <div className="col-4 col-md-2 text-left">
                    <label>Job</label>
                  </div>
                  <div className="col-4 col-md-2">
                    <i className="fa fa-calendar"> 0/12/2020</i>
                  </div>
                  <div className="col-4 col-md-3">
                    <span>
                      <i className="fa fa-user"></i>
                      <label className={`checkbox-inline ${style.assignee}`} for="defaultCheck1">Assignee</label>
                    </span>
                  </div>
                  <div className="col-4 col-md-2">
                    <label>Grand Piano</label>
                  </div>
                  <div className="col-4 col-md-1">
                    <label>Status</label>
                  </div>
                  <div className="col-4 col-md-1">
                    <Button name={width < 576 ? "" : "Edit"} icon="fa fa-edit" />
                  </div>


                </div>
              </li>
              </Link>
            </div>
            {/* <div className={style.li}>
              <li class=" checkbox list-group-item ">
                <div className="row justify-content-around">
                  <div className="col-2 text-left">
                    <label>Job</label>
                  </div>
                  <div className="col-3">
                    <button className={`btn btn-primary ${style.color}`}><i className="fa fa-calendar"> <DatePicker className={style.to}
                      selected={this.state.startDateTo1}
                      onChange={this.handleChangeTo2}
                      placeholderText="To"
                    /> </i></button>
                  </div>
                  <div className="col-3">
                    <span>
                      <i className="fa fa-user"></i>
                      <label className={`checkbox-inline ${style.assignee}`} for="defaultCheck1">Assignee</label>
                    </span>
                  </div>
                  <div className="col-3">
                    <label>Grand Piano</label>
                  </div>
                  <div className="col-1">
                    <label>Status</label>
                  </div>

                </div>

              </li>
            </div>

            <div className={style.li}>
              <li class=" checkbox list-group-item ">
                <div className="row justify-content-around">
                  <div className="col-2 text-left">
                    <label>Job</label>
                  </div>
                  <div className="col-3">
                    <button className={`btn btn-primary ${style.color}`}><i className="fa fa-calendar"> <DatePicker className={style.to}
                      selected={this.state.startDateTo1}
                      onChange={this.handleChangeTo3}
                      placeholderText="To"
                    /> </i></button>
                  </div>
                  <div className="col-3">
                    <span>
                      <i className="fa fa-user"></i>
                      <label className={`checkbox-inline ${style.assignee}`} for="defaultCheck1">Assignee</label>
                    </span>
                  </div>
                  <div className="col-3">
                    <label>Grand Piano</label>
                  </div>
                  <div className="col-1">
                    <label>Status</label>
                  </div>

                </div>
              </li>
            </div> */}

            {/* <div className={style.li}>
              <li class=" checkbox list-group-item ">
                <div className="row justify-content-around">
                  <div className="col-2 text-left">
                    <label>Job</label>
                  </div>
                  <div className="col-3">
                    <button className={`btn btn-primary ${style.color}`}><i className="fa fa-calendar"> <DatePicker className={style.to}
                      selected={this.state.startDateTo1}
                      onChange={this.handleChangeTo4}
                      placeholderText="To"
                    /> </i></button>
                  </div>
                  <div className="col-3">
                    <span>
                      <i className="fa fa-user"></i>
                      <label className={`checkbox-inline ${style.assignee}`} for="defaultCheck1">Assignee</label>
                    </span>
                  </div>
                  <div className="col-3">
                    <label>Grand Piano</label>
                  </div>
                  <div className="col-1">
                    <label>Status</label>
                  </div>

                </div>
              </li>
            </div> */}

          </ul>

        </div>
      </div>
    )
  }

}

export default JobsList