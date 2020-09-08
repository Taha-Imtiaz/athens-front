import React, { Component } from 'react'
import style from './JobsList.module.css'
import DatePicker from "react-datepicker";
import Button from '../../Button/Button'


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
        <div className="row">
          <div className="col-6">
            <h3 className={style.head}>Jobs List Page</h3>
          </div>

          <div className="col-6">
            <div className={style.btn2}>
              <div className="row">
                <div className="col-6">

                  <div className={style.btndel}>
                    <Button name="Delete" icon="fa fa-trash" />
                  </div>
                </div>

                <div className="col-6">
                  <div className={style.btnedit}>
                    <Button name="Edit" icon="fa fa-edit" />
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>


        <div className={`${style.jumbotron}`}>

          <ul class="list-group">
            <div className={style.li}>
              <li class=" checkbox list-group-item ">
                <div className="row justify-content-around">
                  <div className="col-2 text-left">
                    <label>Job</label>
                  </div>
                  <div className="col-3">
                    <button className={`btn btn-primary ${style.color}`}><i className="fa fa-calendar"> <DatePicker className={style.to}
                      selected={this.state.startDateTo1}
                      onChange={this.handleChangeTo1}
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
            </div>

          </ul>

        </div>
      </div>
    )
  }

}

export default JobsList