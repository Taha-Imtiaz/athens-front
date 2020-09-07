import React, { Component } from 'react'
import style from './JobsList.module.css'
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";


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
      <div>
        <h1 className={style.head}>Jobs List Page</h1>

        <div className={style.btn2}>
          <div className="row">
            <div className="col-2">

              <div className={style.btndel}>
                <button className={`btn btn-primary ${style.btnCustom}`}><i className="fa fa-trash"> Delete</i></button>
              </div>
            </div>

            <div className="col-1">
              <div className={style.btnedit}>
                <button className={`btn btn-primary ${style.btnCustom}`}><i className="fa fa-edit"> Edit</i></button>
              </div>
            </div>
          </div>
        </div>

        <div className={`jumbotron ${style.jumbotron}`}>

          <ul class="list-group">
            <li class=" checkbox list-group-item ">
              <div className="row justify-content-around">
                <div className="col-2 text-left">
                  <label>Job</label>
                </div>
                <div className="col-3">
                  <button className={`btn btn-primary`}><i className="fa fa-calendar"> <DatePicker className={style.to}
                    selected={this.state.startDateTo1}
                    onChange={this.handleChangeTo1}
                    placeholderText="To"
                  /> </i></button>
                </div>
                <div className="col-3">
                  <label><i className="fa fa-user"></i>Assignees</label>
                </div>
                <div className="col-3">
                  <label>Grand Piano</label>
                </div>
                <div className="col-1">
                  <label>Status</label>
                </div>

              </div>





            </li>

            <li class=" checkbox list-group-item ">
              <div className="row justify-content-around">
                <div className="col-2 text-left">
                  <label>Job</label>
                </div>
                <div className="col-3">
                  <button className={`btn btn-primary`}><i className="fa fa-calendar"> <DatePicker className={style.to}
                    selected={this.state.startDateTo1}
                    onChange={this.handleChangeTo1}
                    placeholderText="To"
                  /> </i></button>
                </div>
                <div className="col-3">
                  <label><i className="fa fa-user"></i>Assignees</label>
                </div>
                <div className="col-3">
                  <label>Grand Piano</label>
                </div>
                <div className="col-1">
                  <label>Status</label>
                </div>

              </div>

            </li>


            <li class=" checkbox list-group-item ">
              <div className="row justify-content-around">
                <div className="col-2 text-left">
                  <label>Job</label>
                </div>
                <div className="col-3">
                  <button className={`btn btn-primary`}><i className="fa fa-calendar"> <DatePicker className={style.to}
                    selected={this.state.startDateTo1}
                    onChange={this.handleChangeTo1}
                    placeholderText="To"
                  /> </i></button>
                </div>
                <div className="col-3">
                  <label><i className="fa fa-user"></i>Assignees</label>
                </div>
                <div className="col-3">
                  <label>Grand Piano</label>
                </div>
                <div className="col-1">
                  <label>Status</label>
                </div>

              </div>

            </li>






            <li class=" checkbox list-group-item ">
                <div className="row justify-content-around">
                  <div className="col-2 text-left">
                    <label>Job</label>
                  </div>
                  <div className="col-3">
                    <button className={`btn btn-primary`}><i className="fa fa-calendar"> <DatePicker className={style.to}
                      selected={this.state.startDateTo1}
                      onChange={this.handleChangeTo1}
                      placeholderText="To"
                    /> </i></button>
                  </div>
                  <div className="col-3">
                  <label><i className="fa fa-user"></i>Assignees</label>
                  </div>
                  <div className="col-3">
                  <label>Grand Piano</label>
                  </div>
                  <div className="col-1">
                  <label>Status</label>
                  </div>

                </div>


                
                
                
              </li>


          </ul>

        </div>
      </div>
    )
  }

}

export default JobsList