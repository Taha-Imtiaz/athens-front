import React, { Component } from 'react';
import style from './NewClaim.module.css'
import DatePicker from "react-datepicker";

import Button from '../../Button/Button'
import "react-datepicker/dist/react-datepicker.css";
import API from '../../../utils/api'

const initialState = {
  name: "",
  jobId: "",
  item: "",
  price: "",
  description: "",
  fromDate: "",
  toDate: "",
  locationfrom: "",
  locationto: "",
  nameError: "",
  jobIdError: "",
  itemError: "",
  priceError: "",
  descriptionError: "",
  fromDateError: "",
  toDateError: "",
  locationfromError: "",
  locationtoError: ""
}

class NewClaim extends Component {

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
    let nameError = ""
    let jobIdError = ""
    let itemError = ""
    let priceError = ""
    let descriptionError = ""
    let fromDateError = ""
    let toDateError = ""
    let locationfromError = ""
    let locationtoError = ""


    if (!this.state.name) {
      nameError = "Name should not be empty"
    }

    if (!this.state.jobId) {
      jobIdError = "Error! should not be empty"
    }

    if (!this.state.item) {
      itemError = "Error! should not be empty"
    }

    if (!this.state.price) {
      priceError = "Error! should not be empty"
    }

    if (!this.state.description) {
      descriptionError = "Error! should not be empty"
    }

    if (!this.state.fromDate) {
      fromDateError = "Error! should not be empty"
    }

    if (!this.state.toDate) {
      toDateError = "Error! should not be empty"
    }

    if (!this.state.locationfrom) {
      locationfromError = "Error! should not be empty"
    }

    if (!this.state.locationto) {
      locationtoError = "Error! should not be empty"
    }



    if (nameError || jobIdError || itemError || priceError || descriptionError || fromDateError || toDateError || locationfromError || locationtoError) {
      this.setState({ nameError, jobIdError, itemError, priceError, descriptionError, fromDateError, toDateError, locationfromError, locationtoError })
      return false
    }

    return true
  }


  mySubmitHandler = (event) => {

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


  handleChangeFrom = date => {
    this.setState({
      fromDate: date
    });
  };

  handleChangeTo = date => {
    this.setState({
      toDate: date
    });
  };

  render() {
    return (
      <div>
        <h3 className={style.head}>New Claim</h3>

        <div className={`jumbotron ${style.form}`}>
          <form>
            <div class="form-group">
              <input type="input" class="form-control" id="name" placeholder="Claimant Name" name="name" value={this.state.name} onChange={this.handleFormInput} />
            </div>

            {this.state.nameError ? (
              <div className={`alert alert-warning alert-dismissible fade show  ${style.msg}`} role="alert">
                {this.state.nameError}
              
              </div>) : null}

            <div class="form-group">
              <input type="input" class="form-control" id="jobid" placeholder="Job Id" name="jobId" value={this.state.jobId} onChange={this.handleFormInput} />
            </div>

            {this.state.jobIdError ? (
              <div className={`alert alert-warning alert-dismissible fade show  ${style.msg}`} role="alert">
                {this.state.jobIdError}
              
              </div>) : null}

            <div className="row">
              <div className="col-8">
                <div class="form-group">
                  <input type="input" class="form-control" id="item" placeholder="Item" name="item" value={this.state.item} onChange={this.handleFormInput} />
                </div>

                {this.state.itemError ? (
                  <div className={`alert alert-warning alert-dismissible fade show  ${style.msg}`} role="alert">
                    {this.state.itemError}
                  
                  </div>) : null}

              </div>
              <div className="col-4">
                <div class="form-group">
                  <input type="input" class="form-control" id="price" placeholder="$$$" name="price" value={this.state.price} onChange={this.handleFormInput} />
                </div>

                {this.state.priceError ? (
                  <div className={`alert alert-warning alert-dismissible fade show  ${style.msg}`} role="alert">
                    {this.state.priceError}
                  
                  </div>) : null}

              </div>

            </div>
            <div class="form-group">
              <input type="text" class="form-control" id="description" placeholder="Item Description" name="description" value={this.state.description} onChange={this.handleFormInput} />
            </div>

            {this.state.descriptionError ? (
              <div className={`alert alert-warning alert-dismissible fade show  ${style.msg}`} role="alert">
                {this.state.descriptionError}
                {/* <button type="button" class="close" onClick = {} aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button> */}
              </div>) : null}


            <div className={`row`}>

              <div className="col-2">
                <p>Select Date</p>
              </div>
              <div className="col-5">
                <div class="form-group">
                  <DatePicker className={style.from}
                    selected={this.state.fromDate}
                    onChange={this.handleChangeFrom}
                    placeholderText="From"
                    class="form-control"
                  />
                </div>

                {this.state.fromDateError ? (
                  <div className={`alert alert-warning alert-dismissible fade show  ${style.msg}`} role="alert">
                    {this.state.fromDateError}
                  
                  </div>) : null}
              </div>
              <div className="col-5">
                <div class="form-group">

                  <DatePicker className={style.to}
                    selected={this.state.toDate}
                    onChange={this.handleChangeTo}
                    placeholderText="To"
                    class="form-control"
                  />
                </div>
                {this.state.toDateError ? (
                  <div className={`alert alert-warning alert-dismissible fade show  ${style.msg}`} role="alert">
                    {this.state.toDateError}
                  
                  </div>) : null}
              </div>
            </div>



            <div className="row">
              <div className="col-2 col-md-2">
                <div class="form-group">
                  <label className={style.l1}>Location:</label>
                </div>
              </div>
              <div className="col-5 col-md-5">
                <div class="form-group">
                  <input type="input" class="form-control" id="from" placeholder="From" name="locationfrom" value={this.state.locationfrom} onChange={this.handleFormInput} />
                </div>

                {this.state.locationfromError ? (
                  <div className={`alert alert-warning alert-dismissible fade show  ${style.msg}`} role="alert">
                    {this.state.locationfromError}
                  
                  </div>) : null}

              </div>
              <div className="col-5 col-md-5">
                <input type="input" class="form-control" id="to" placeholder="To" name="locationto" value={this.state.locationto} onChange={this.handleFormInput} />
              </div>

              {this.state.locationtoError ? (
                <div className={`alert alert-warning alert-dismissible fade show  ${style.msg}`} role="alert">
                  {this.state.locationtoError}
                
                </div>) : null}


            </div>


            <div className={style.btn}>
              <Button name="Submit" onClick={this.mySubmitHandler} />
            </div>

          </form>
        </div>

      </div>
    );
  }
}

export default NewClaim