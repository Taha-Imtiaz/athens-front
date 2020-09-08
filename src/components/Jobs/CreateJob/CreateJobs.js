import React, { Component } from 'react'
import style from './CreateJobs.module.css'
import { Multiselect } from 'multiselect-react-dropdown';
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";

class CreateJobs extends Component {


    state = {
        options: [{ name: 'Srigar', id: 1 }, { name: 'Sam', id: 2 }],
        startDate: ""
    };

    handleChange = date => {
        this.setState({
            startDate: date
        });
    };

    onSelect(selectedList, selectedItem) {
        console.log(selectedList, selectedItem)
    }

    onRemove(selectedList, removedItem) {
        console.log(selectedList, removedItem)
    }

    render() {
        return (<div>
            <h3 className={style.head}>Create New Job</h3>

            <div className={`jumbotron ${style.tron}`}>


                <form>
                    <div className={`form-group ${style.input}`}>
                        <input type="input" class="form-control" id="jobTitle" placeholder="Job Title" aria-describedby="emailHelp" />
                    </div>
                    <div class="form-group">
                        <textarea className={style.textarea} id="ta" placeholder="Job Description"></textarea>
                    </div>

                    <div class="form-group">
                        <Multiselect
                            options={this.state.options} // Options to display in the dropdown
                            onSelect={this.onSelect} // Function will trigger on select event
                            onRemove={this.onRemove} // Function will trigger on remove event
                            displayValue="name" // Property name to display in the dropdown options
                        />
                    </div>

                    <div class="form-group">
                        <DatePicker className={style.to}
                            selected={this.state.startDate}
                            onChange={this.handleChange}
                            placeholderText="Date"
                        />
                    </div>



                    <div class="form-group">
                        <input type="input" class="form-control" id="time" placeholder="Time" aria-describedby="emailHelp" />
                    </div>

                    <div className="row">
                        <div className="col-4">
                            <div class="form-group">
                                <label className={style.l1}>Location:</label>
                            </div>
                        </div>
                        <div className="col-4">
                            <div class="form-group">
                                <input type="input" class="form-control" id="from" placeholder="From" aria-describedby="emailHelp" />
                            </div>
                        </div>
                        <div className="col-4">
                            <input type="input" class="form-control" id="to" placeholder="To" aria-describedby="emailHelp" />
                        </div>

                    </div>

                    <div className={`row ${style.btnrow}`}>
                        <div className="col-8">
                            <div class="form-group">
                                <div class="dropdown">
                                    <button class={`btn btn-primary dropdown-toggle ${style.color}`} type="button" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        Select Assignee
  </button>
                                    <div class="dropdown-menu" aria-labelledby="dropdownMenu2">
                                        <button class="dropdown-item" type="button">Action</button>
                                        <button class="dropdown-item" type="button">Another action</button>
                                        <button class="dropdown-item" type="button">Something else here</button>
                                    </div>
                                </div>
                            </div>

                        </div>
                        <div className="col-4">
                            <button type="submit" className={`btn btn-primary ${style.color}`}>Submit</button>

                        </div>
                    </div>


                </form>
            </div>
        </div>
        )
    }
}

export default CreateJobs