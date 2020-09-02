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

        <div className = {style.btndel}>
        <button className={`btn btn-primary ${style.btnCustom}`}><i className="fa fa-trash"> Delete</i></button>       
    </div>
        </div>

        <div className="col-1">
    <div className = {style.btnedit}>
    <button className={`btn btn-primary ${style.btnCustom}`}><i className="fa fa-edit"> Edit</i></button>       
    </div>
        </div>
    </div>
    </div>

    <div className={`jumbotron ${style.jumbotron}`}>
        <div>
        <ul class="list-group">
  <li class=" checkbox list-group-item d-flex justify-content-between align-items-center">
    <label>Job Name</label>
    <button className={`btn btn-primary ${style.btnCustom}`}><i className="fa fa-calendar"> <DatePicker className={style.to}
        selected={this.state.startDateTo1}
        onChange={this.handleChangeTo1}
        placeholderText="To"
      /> </i></button>
    <label><i className="fa fa-user"></i>Assignees</label>
    <label>Grand Piano</label>
    <label>Status</label>
    </li>
            
    <li class=" checkbox list-group-item d-flex justify-content-between align-items-center">
    <label>Job Name</label>
    <button className={`btn btn-primary ${style.btnCustom}`}><i className="fa fa-calendar"> <DatePicker className={style.to}
        selected={this.state.startDateTo2}
        onChange={this.handleChangeTo2}
        placeholderText="To"
      /> </i></button>
    <label><i className="fa fa-user"></i> Assignees</label>
    <label>Grand Piano</label>
    <label>Status</label>
    </li>
  
    <li class=" checkbox list-group-item d-flex justify-content-between align-items-center">
    <label>Job Name</label>
    <button className={`btn btn-primary ${style.btnCustom}`}><i className="fa fa-calendar"> <DatePicker className={style.to}
        selected={this.state.startDateTo3}
        onChange={this.handleChangeTo3}
        placeholderText="To"
      /> </i></button>
    <label><i className="fa fa-user"></i>Assignees</label>
    <label>Grand Piano</label>
    <label>Status</label>
    </li>
  
    <li class=" checkbox list-group-item d-flex justify-content-between align-items-center">
    <label>Job Name</label>
    <button className={`btn btn-primary ${style.btnCustom}`}><i className="fa fa-calendar"> <DatePicker className={style.to}
        selected={this.state.startDateTo4}
        onChange={this.handleChangeTo4}
        placeholderText="To"
      /> </i></button>
    <label><i className="fa fa-user"></i>Assignees</label>
    <label>Grand Piano</label>
    <label>Status</label>
    </li>
  
</ul>
</div>
    </div>
    </div>
        )
      }

}

export default JobsList