import React, { Component } from 'react'
import style from './CreateJobs.module.css'
import { Multiselect } from 'multiselect-react-dropdown';
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import Button from '../../Button/Button';
import API from '../../../utils/api'

const initialState = {
    title: "",
    description: "",
    multi: "",
    startDate: "",
    time: "",
    assignee: "",
    locationfrom: "",
    locationto: "",
    titleError: "",
    descriptionError: "",
    multiError: "",
    dateError: "",
    timeError: "",
    assigneeError: "",
    locationfromError: "",
    locationtoError: ""
}


class CreateJobs extends Component {
    assigneeOptions = [{ name: 'Person1', id: 1 }, { name: 'Person2', id: 2 }]
    options = [{ name: 'Srigar', id: 1 }, { name: 'Sam', id: 2 }]

    state = initialState



    handleFormInput = (event) => {
        var { name, value } = event.target
        this.setState({ [name]: value })
        if (value == "") {
            this.setState({ [name + "Error"]: "Should not be empty" })
        } else {
            this.setState({ [name + "Error"]: "" })
        }
    }

    validate = () => {
        let titleError = ""
        let descriptionError = ""
        let multiError = ""
        let dateError = ""
        let timeError = ""
        let assigneeError = ""
        let locationfromError = ""
        let locationtoError = ""


        if (!this.state.title) {
            titleError = "Title should not be empty"
        }

        if (!this.state.description) {
            descriptionError = "Description should not be empty"
        }

        if (!this.state.multi) {
            multiError = "Should not be empty"
        }

        if (!this.state.startDate) {
            dateError = "Date should not be empty"
        }

        if (!this.state.time) {
            timeError = "Title should not be empty"
        }

        if (!this.state.assignee) {
            assigneeError = "Assignee should not be empty"
        }

        if (!this.state.locationfrom) {
            locationfromError = "Location should not be empty"
        }

        if (!this.state.locationto) {
            locationtoError = "Location should not be empty"
        }

        if (titleError || descriptionError || multiError || dateError || timeError || assigneeError || locationfromError || locationtoError) {
            this.setState({ titleError, descriptionError, multiError, dateError, timeError, assigneeError, locationfromError, locationtoError })
            return false
        }

        return true
    }


    handleChange = date => {
        this.setState({
            startDate: date
        });
    };

    mySubmitHandler = (event) => {
        console.log(this.state)
        event.preventDefault();
        const isValid = this.validate()
        if (isValid) {
            console.log(this.state)
            this.setState(initialState)

            API.post(`posts`, this.state)
                .then(response => {
                    console.log(response);
                })
                .catch(error => {
                    console.log(error)
                })
        }

    }


    onSelect = (selectedList, selectedItem) => {

        console.log(selectedList, selectedItem)
        this.setState({ "multi": selectedItem })

    }

    onAssigneeSelect = (selectedList, selectedItem) => {

        console.log(selectedList, selectedItem)
        this.setState({ "assignee": selectedItem })

    }

    onRemove(selectedList, removedItem) {
        console.log(selectedList, removedItem)
    }

    render() {
        return (<div>
            <h3 className={style.head}>Create New Job</h3>

            <div className={`${style.tron}`}>

                <form onSubmit={this.mySubmitHandler}>
                    <div className={`form-group ${style.input}`}>
                        <input type="input" class="form-control" id="jobTitle" placeholder="Job Title" name="title" value={this.state.title} onChange={this.handleFormInput} />
                    </div>

                    {this.state.titleError ? (
                        <div className={`alert alert-warning alert-dismissible fade show  ${style.msg}`} role="alert">
                            {this.state.titleError}



                        </div>) : null}

                    <div class="form-group">
                        <textarea className={style.textarea} id="ta" placeholder="Job Description" name="description" value={this.state.description} onChange={this.handleFormInput}></textarea>
                    </div>

                    {this.state.descriptionError ? (
                        <div className={`alert alert-warning alert-dismissible fade show  ${style.msg}`} role="alert">
                            {this.state.descriptionError}



                        </div>) : null}


                    <div class="form-group">
                        <Multiselect className={style.multi}
                            options={this.options} // Options to display in the dropdown
                            onSelect={this.onSelect} // Function will trigger on select event
                            onRemove={this.onRemove} // Function will trigger on remove event
                            displayValue="name" // Property name to display in the dropdown options
                            class="form-control"
                        />
                    </div>

                    {this.state.multiError ? (
                        <div className={`alert alert-warning alert-dismissible fade show  ${style.msg}`} role="alert">
                            {this.state.multiError}



                        </div>) : null}


                    <div class="form-group">
                        <DatePicker className={style.to}
                            selected={this.state.startDate}
                            onChange={this.handleChange}
                            placeholderText="Date"
                            class="form-control"
                        />
                    </div>

                    {this.state.dateError ? (
                        <div className={`alert alert-warning alert-dismissible fade show  ${style.msg}`} role="alert">
                            {this.state.dateError}



                        </div>) : null}




                    <div class="form-group">
                        <input type="input" class="form-control" id="time" placeholder="Time" name="time" value={this.state.time} onChange={this.handleFormInput} />
                    </div>

                    {this.state.timeError ? (
                        <div className={`alert alert-warning alert-dismissible fade show  ${style.msg}`} role="alert">
                            {this.state.timeError}



                        </div>) : null}


                    <div class="form-group">
                        <Multiselect className={style.multi}

                            singleSelect={true}
                            options={this.assigneeOptions} // Options to display in the dropdown
                            onSelect={this.onAssigneeSelect} // Function will trigger on select event
                            onRemove={this.onRemove} // Function will trigger on remove event
                            displayValue="name" // Property name to display in the dropdown options
                            class="form-control"
                            placeholder="Select Assignee"
                        />

                    </div>

                    {this.state.assigneeError ? (
                        <div className={`alert alert-warning alert-dismissible fade show  ${style.msg}`} role="alert">
                            {this.state.assigneeError}



                        </div>) : null}




                    <div className="row">
                        <div className="col-4">
                            <div class="form-group">
                                <label className={style.l1}>Location:</label>
                            </div>
                        </div>
                        <div className="col-4">
                            <div class="form-group">
                                <input type="input" class="form-control" id="from" placeholder="From" name="locationfrom" value={this.state.locationfrom} onChange={this.handleFormInput} />
                            </div>
                            {this.state.locationfromError ? (
                                <div className={`alert alert-warning alert-dismissible fade show  ${style.msg}`} role="alert">
                                    {this.state.locationfromError}



                                </div>) : null}

                        </div>
                        <div className="col-4">
                            <input type="input" class="form-control" id="to" placeholder="To" name="locationto" value={this.state.locationto} onChange={this.handleFormInput} />
                            {this.state.locationtoError ? (
                                <div className={`alert alert-warning alert-dismissible fade show  ${style.msg}`} role="alert">
                                    {this.state.locationtoError}



                                </div>) : null}

                        </div>


                    </div>

                    <div class="form-group">
                        <div className={style.btnsubmit}>
                            <Button name="Submit" onClick={this.mySubmitHandler} />
                        </div>
                    </div>



                </form>
            </div>
        </div>
        )
    }
}

export default CreateJobs