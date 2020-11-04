import React, { Component } from 'react';
import style from './NewClaim.module.css'
import DatePicker from "react-datepicker";

import Button from '../../Button/Button'
import "react-datepicker/dist/react-datepicker.css";
import API from '../../../utils/api'
import { connect } from "react-redux";
import { addClaim } from '../../../Redux/Claims/claimsActions'
import { showMessage } from '../../../Redux/Common/commonActions'
import { TextareaAutosize, TextField } from '@material-ui/core';



class NewClaim extends Component {
  initialState = {
    customerId: "",
    jobId: "",
    claims: [{
      claimType: '',
      price: '',
      description: ''
    }],
    item: "",
    price: "",
    description: "",
    fromDate: "",
    toDate: "",
    locationfrom: "",
    locationto: "",
    customerIdError: "",
    jobIdError: "",
    itemError: "",
    priceError: "",
    descriptionError: "",
    fromDateError: "",
    toDateError: "",
    locationfromError: "",
    locationtoError: ""
  }

  state = { ...this.initialState }

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
    let customerIdError = ""
    let jobIdError = ""
    let itemError = ""
    let priceError = ""
    let descriptionError = ""
    let fromDateError = ""
    let toDateError = ""
    let locationfromError = ""
    let locationtoError = ""


    // if (!this.state.customerId) {
    //   customerIdError = "Customer Id should not be empty"
    // }

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



    if (customerIdError || jobIdError || itemError || priceError || descriptionError || fromDateError || toDateError || locationfromError || locationtoError) {
      this.setState({ customerIdError, jobIdError, itemError, priceError, descriptionError, fromDateError, toDateError, locationfromError, locationtoError })
      return false
    }

    return true
  }


  mySubmitHandler = (event) => {

    event.preventDefault();
    // const isValid = this.validate()
    // if (isValid) {
    let { customerId, claims, jobId, item, price, description, fromDate, toDate, locationfrom, locationto } = this.state;
    let data = {
      jobId,
      claims
    }
    var { history, showMessage } = this.props;
    addClaim(data).then((res) => {
      showMessage(res.data.message)
      history.push("/claim/customer");
    })
      .catch((error) => {
        console.log(error);
      });
    // this.setState(initialState)
    // }

  }

  addAnotherClaim = () => {
    if (this.state.claims[0].claimType && this.state.claims[0].description && this.state.claims[0].price) {
      this.setState({
        claims: [...this.state.claims, {
          claimType: null,
          price: null,
          description: null
        }]
      });
    }
  }

  hanldeClaimsInput = (e, i) => {
    let updatedClaims = this.state.claims.slice();
    updatedClaims[i][e.target.name] = e.target.value
    this.setState({ claims: updatedClaims });
  }

  handleChangeFrom = (date, e) => {
    if (date == null) {
      this.setState({ ["Error"]: "Should not be empty" })
    } else {
      this.setState({ ["Error"]: "" })
    }
    this.setState({
      fromDate: date
    });
  };

  handleChangeTo = date => {
    // const valueOfInput = date.format()
    if (date == "") {
      this.setState({ ["Error"]: "Should not be empty" })
    } else {
      this.setState({ ["Error"]: "" })
    }
    this.setState({
      toDate: date
    });
  };
  // componentWillUnmount() {
  //   this.state = this.initialState
  //   // this.componentCleanup();
  //   // window.removeEventListener('beforeunload', this.componentCleanup); // remove the event handler for normal unmounting
  // }
  render() {
    return (
      <div>
        <h3 className={style.head}>New Claim</h3>

        <div className={`jumbotron ${style.form}`}>
          <form>
            <div className="form-group">
              <TextField
                 variant="outlined"
            margin="normal"
            required
            fullWidth
            size="small" id="jobid" label="Job Id" name="jobId" value={this.state.jobId} onChange={this.handleFormInput} />
            </div>

            {this.state.jobIdError ? (
              <div className={`alert alert-warning alert-dismissible fade show  ${style.msg}`} role="alert">
                {this.state.jobIdError}

              </div>) : null}

            {/* <div className="form-group">
              <input type="input" className="form-control" id="customerId" label="Claimant Id" name="customerId" value={this.state.customerId} onChange={this.handleFormInput} />
            </div>

            {this.state.customerIdError ? (
              <div className={`alert alert-warning alert-dismissible fade show  ${style.msg}`} role="alert">
                {this.state.customerIdError}

              </div>) : null} */}


            {this.state.claims.map((x, i) => {
              return (
                <div key={i}>
                  < div className="row">
                    <div className="col-8">
                      <div className="form-group">
                        {/* <input type="input" className="form-control" id="claimType" label="Damage Type" name="claimType" value={this.state.claimType} onChange={this.handleFormInput} /> */}
                        <select onChange={(e) => this.hanldeClaimsInput(e, i)} className="form-control" id="exampleFormControlSelect1" name="claimType">
                          <option>Damage To House</option>
                          <option>Damage To Item</option>
                        </select>
                      </div>

                      {this.state.itemError ? (
                        <div className={`alert alert-warning alert-dismissible fade show  ${style.msg}`} role="alert">
                          {this.state.itemError}

                        </div>) : null}

                    </div>
                    <div className="col-4">
                      <div className="form-group">
                        <TextField
                 variant="outlined"
            margin="normal"
            required
            fullWidth
            size="small"
             id="price" label="$$$" name="price" value={this.state.claims[i].price} onChange={(e) => this.hanldeClaimsInput(e, i)} style = {{margin:"-0.04rem 0"}}/>
                      </div>

                      {this.state.priceError ? (
                        <div className={`alert alert-warning alert-dismissible fade show  ${style.msg}`} role="alert">
                          {this.state.priceError}

                        </div>) : null}

                    </div>

                  </div>
                  <div className="form-group">
                    <TextareaAutosize
             rowsMax={4}
   id="description" placeholder="Item Description" name="description" value={this.state.claims[i].description} onChange={(e) => this.hanldeClaimsInput(e, i)} rows="3" />
                  </div>
                </div>
              )
            })
            }
            <div className="form-group">
              <div style={{ float: 'right' }}>
                <input type="button" className="btn btn-primary" style = {{background:"#00ADEE"}} name="Add Another" value="Add Another" onClick={this.addAnotherClaim} />
                {/* <Button onClick={this.addAnotherClaim} name="Add Another"></Button> */}
              </div>
            </div>
            {this.state.descriptionError ? (
              <div className={`alert alert-warning alert-dismissible fade show  ${style.msg}`} role="alert">
                {this.state.descriptionError}
              </div>) : null}

            {/* 
            <div className={`row`}>

              <div className="col-2">
                <p>Select Date</p>
              </div>
              <div className="col-5">
                <div className="form-group">
                  <DatePicker className={style.from}
                    selected={this.state.fromDate}
                    onChange={this.handleChangeFrom}
                    placeholderText="From"
                    className="form-control"
                  />
                </div>

                {this.state.fromDateError ? (
                  <div className={`alert alert-warning alert-dismissible fade show  ${style.msg}`} role="alert">
                    {this.state.fromDateError}

                  </div>) : null}
              </div>
              <div className="col-5">
                <div className="form-group">

                  <DatePicker className={style.to}
                    selected={this.state.toDate}
                    // onFocus = {this.handleChangeTo}
                    onChange={this.handleChangeTo}
                    placeholderText="To"
                    className="form-control"
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
                <div className="form-group">
                  <label className={style.l1}>Location:</label>
                </div>
              </div>
              <div className="col-5 col-md-5">
                <div className="form-group">
                  <input type="input" className="form-control" id="from" placeholder="From" name="locationfrom" value={this.state.locationfrom} onChange={this.handleFormInput} />
                </div>

                {this.state.locationfromError ? (
                  <div className={`alert alert-warning alert-dismissible fade show  ${style.msg}`} role="alert">
                    {this.state.locationfromError}

                  </div>) : null}

              </div>
              <div className="col-5 col-md-5">
                <input type="input" className="form-control" id="to" placeholder="To" name="locationto" value={this.state.locationto} onChange={this.handleFormInput} />
              </div>

              {this.state.locationtoError ? (
                <div className={`alert alert-warning alert-dismissible fade show  ${style.msg}`} role="alert">
                  {this.state.locationtoError}

                </div>) : null}


            </div> */}


            <div className={style.btn}>
              <Button name="Submit" onClick={this.mySubmitHandler} />
            </div>

          </form>
        </div>

      </div >
    );
  }
}
var actions = {
  addClaim,
  showMessage
};
export default connect(null, actions)(NewClaim);