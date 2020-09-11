import React, { Component } from 'react';
import style from './JobEditDetails.module.css'
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import { Multiselect } from 'multiselect-react-dropdown';


class JobEditDetails extends Component {
    state = {
        options: [{ name: 'Srigar', id: 1 }, { name: 'Sam', id: 2 }],
        startDate: ""
    };

    handleChange = date => {
        this.setState({
            startDate: date
        });
    };

    render() {
        return (
            <div>
                <h3 className = {style.head}>Job Details Edit</h3>
                <div className="row">
                    <div className="col-8">
                        <div className={`${style.tron}`}>

                            <form>
                                <div className="form-group">
                                    <input type="input" class="form-control" id="jobTitle" placeholder="Job Title" aria-describedby="emailHelp" />
                                </div>
                                <div className="row">
                                    <div className="col-6">
                                        <div class="form-group">
                                            <DatePicker className={style.to}
                                                selected={this.state.startDate}
                                                onChange={this.handleChange}
                                                placeholderText="Date"
                                            />
                                        </div>

                                    </div>
                                    <div className="col-6">
                                        <div className="form-group">
                                            <input type="input" class="form-control" id="time" placeholder="Time" aria-describedby="emailHelp" />
                                        </div>

                                    </div>
                                </div>



                                <div className="row">
                                    <div className="col-4">
                                        <div class="form-group">
                                            <label>Location:</label>
                                        </div>
                                    </div>
                                    <div className="col-4">
                                        <div class="form-group">
                                            <input type="input" class="form-control" id="from" placeholder="Start" aria-describedby="emailHelp" />
                                        </div>
                                    </div>
                                    <div className="col-4">
                                        <input type="input" class="form-control" id="to" placeholder="End" aria-describedby="emailHelp" />
                                    </div>

                                </div>

                                <div class="form-group">
                                    <Multiselect
                                        options={this.state.options} // Options to display in the dropdown
                                        onSelect={this.onSelect} // Function will trigger on select event
                                        onRemove={this.onRemove} // Function will trigger on remove event
                                        displayValue="name" // Property name to display in the dropdown options

                                    />
                                </div>

                            </form>
                        </div>
                    </div>
                    <div className="col-4">
                        <div class="dropdown">
                            <button className={`btn btn-primary dropdown-toggle ${style.colors}`} type="button" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                Change Status
                            </button>
                            <div class="dropdown-menu" aria-labelledby="dropdownMenu2">
                                <button class="dropdown-item" type="button">Action</button>
                                <button class="dropdown-item" type="button">Another action</button>
                                <button class="dropdown-item" type="button">Something else here</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={`${style.tron2}`}>
                    <h3 className={style.jobtag}>Job Description</h3>

                    <p className = {style.para}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis eget iaculis diam, vitae volutpat nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; </p>
                </div>

                <h3 className = {style.assigneehead}>Assignees</h3>
                <div className="row">
                    <div className={`col-6 ${style.badge}`}>
                        <span className={`badge badge-primary ${style.color}`}>Primary</span>
                        <span className={`badge badge-primary ${style.color}`}>Primary</span>

                    </div>
                    <div className = "col-1">
                    <button className={`btn btn-primary ${style.color}`}><i className="fa fa-plus"></i></button>
                    </div>
                </div>
        

                <div className={`${style.tron2}`}>
                    <h3 className={style.jobtag}>Notes</h3>

                    <p className = {style.para}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis eget iaculis diam, vitae volutpat nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; </p>
                    <div className="btnalign">
                        <button type="submit" className={`btn btn-primary ${style.btnCustom}`}>Delete</button>
                        <button type="submit" className={`btn btn-primary ${style.btnCustom}`}>Add Notes</button>
                    </div>
                </div>
                <div className={style.btnalign}>
                    <button type="submit" className={`btn btn-primary ${style.btnCustom}`}>Update</button>
                    <button type="submit" className={`btn btn-primary ${style.btnCustom}`}>Reset</button>
                </div>
            </div>

        );
    }
}

export default JobEditDetails;