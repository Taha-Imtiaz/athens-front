import React, { Component } from 'react';
import Button from '../../Button/Button';
import style from './Availability.module.css'
import { setAvailability } from '../../../Redux/Mover/moverActions'
import { clone, cloneDeep } from "lodash"


class Availability extends Component {
   
    state = {
        days: "",
        weeklySchedule : [{
            "day": "Monday",
            "status": true
        },{
            "day": "Tuesday",
            "status": true
        },{
            "day": "Wednesday",
            "status": true
        },{
            "day": "Thursday",
            "status": false
        },{
            "day": "Friday",
            "status": false
        },{
            "day": "Saturday",
            "status": true
        },{
            "day": "Sunday",
            "status": false
        }]
    }
    handleChange = (e) => {
        console.log(e.target.value)
        let newData = cloneDeep(this.state);
        let index = newData.weeklySchedule.findIndex(x => x.day == e.target.value)
        newData.weeklySchedule[index].status = !newData.weeklySchedule[index].status 
        this.setState(newData)
    }
    handleSubmit = (e) => {
        e.preventDefault();
         setAvailability(this.state.weeklySchedule,'5f907f70bc2d090017901d68')
        console.log(this.state.weeklySchedule,'5f907f70bc2d090017901d68')
    }
    render() {
        return (
            <div className={style.main}>
                <h3>Select Your Availability</h3>
                <div className={style.list}>
                {this.state.weeklySchedule.map( list => {
                                   return    <><div className={`form-check d-flex justify-content-start ${style.border}`}>
                                       <input className={`form-check-input ${style.check}`} checked={list.status} type="checkbox" name={list.day} onChange={this.handleChange} value={list.day} id="defaultCheck1" />
                                       <h5 className={style.label}><label className="form-check-label" htmlFor="defaultCheck1">
                                          {list.day}
                                   </label></h5>
                                   </div></>
                
                }  )  }                 
                </div>
                <div className={style.btn}>
                    <Button name="Save" onClick={this.handleSubmit} />
                </div>
            </div>
        );
    }
}

export default Availability;