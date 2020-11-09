import React, { Component } from 'react';
import style from './NewClaim.module.css'
import DatePicker from "react-datepicker";

import Button from '../../Button/Button'
import "react-datepicker/dist/react-datepicker.css";
import API from '../../../utils/api'
import { connect } from "react-redux";
import { addClaim, getCustomersAndJobs } from '../../../Redux/Claims/claimsActions'
import { showMessage } from '../../../Redux/Common/commonActions'
import { TextareaAutosize, TextField } from '@material-ui/core';

import Autocomplete from '@material-ui/lab/Autocomplete';
import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';


class NewClaim extends Component {

  countries = [
    { code: 'AD', label: 'Andorra', phone: '376' },
    { code: 'AE', label: 'United Arab Emirates', phone: '971' },
    { code: 'AF', label: 'Afghanistan', phone: '93' },
    { code: 'AG', label: 'Antigua and Barbuda', phone: '1-268' },
    { code: 'AI', label: 'Anguilla', phone: '1-264' },
    { code: 'FO', label: 'Faroe Islands', phone: '298' },
    { code: 'FR', label: 'France', phone: '33', suggested: true },
    { code: 'GA', label: 'Gabon', phone: '241' },
    { code: 'GB', label: 'United Kingdom', phone: '44' },
    { code: 'GD', label: 'Grenada', phone: '1-473' },
    { code: 'GE', label: 'Georgia', phone: '995' },
    { code: 'GF', label: 'French Guiana', phone: '594' },
    { code: 'GG', label: 'Guernsey', phone: '44' },
    { code: 'GH', label: 'Ghana', phone: '233' }
  ]
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
    locationtoError: "",
    inputValues: '',
    inputValue: '',
    customers: [],
    jobs: [],
    selectedCustomer: '',
    selectedJob: ''
  }

  state = { ...this.initialState }


  componentDidMount = () => {
    getCustomersAndJobs().then((res) => {
      this.setState({ customers: res.data.customers })
    })
  }

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

    if (this.state.selectedCustomer.length === 0) {
      customerIdError = "Customer Id should not be empty"
    }

    if (!this.state.selectedJob) {
      jobIdError = "Error! should not be empty"
    }

    // if (!this.state.item) {
    //   itemError = "Error! should not be empty"
    // }

    // if (!this.state.price) {
    //   priceError = "Error! should not be empty"
    // }

    // if (!this.state.description) {
    //   descriptionError = "Error! should not be empty"
    // }


    if (customerIdError || jobIdError || itemError || priceError || descriptionError) {
      this.setState({ customerIdError, jobIdError, itemError, priceError, descriptionError })
      return false
    }

    return true
  }


  mySubmitHandler = (event) => {
    event.preventDefault();
    let { customerId, selectedJob, claims, jobId, item, price, description, fromDate, toDate, locationfrom, locationto } = this.state;
    if (this.validate()) {
      var { history, showMessage } = this.props;
      let data = {
        jobId: selectedJob.jobId,
        claims
      }
      addClaim(data).then((res) => {
        showMessage(res.data.message)
        history.push("/claim/customer");
      })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  addAnotherClaim = () => {
    if (this.state.claims[0].claimType && this.state.claims[0].description && this.state.claims[0].price) {
      this.setState({
        claims: [...this.state.claims, {
          claimType: 'Damage To House',
          price: 0,
          description: ''
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
  getCustomerJobs = customer => {
    if (customer) {
      this.setState({ jobs: customer.jobs, selectedCustomer: customer.firstName, selectedJob: '', customerIdError: '' })
    } else {
      this.setState({ jobs: [], selectedCustomer: '', selectedJob: '' })
    }
  }
  render() {
    return (
      <div>
        <div className={`${style.form}`}>
          <h3 className={style.head}>New Claim</h3>
          <form>
            {this.state.customers.length > 0 ? <Autocomplete
              value={this.state.selectedCustomer}
              onChange={(event, newValue) => {
                this.getCustomerJobs(newValue); // Get the customer and get job
              }}
              // inputValue={this.state.selectedCustomer}
              // onInputChange={(event, newInputValue) => {
              //   console.log(newInputValue);
              // }}
              id="country-select-demo"
              style={{ width: "100%", margin: "1rem 0" }}
              size="small"
              options={this.state.customers}
              // classes={{
              //   option: classes.option,
              // }}
              autoHighlight
              getOptionLabel={(option) => option.firstName ? option.firstName : option}
              renderOption={(option) => (
                <React.Fragment>
                  {/* <span>{countryToFlag(option.code)}</span> */}
                  {/* <span>Hello</span> */}
                  {option.firstName} ({option.email})
            </React.Fragment>
              )}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Choose a customer"
                  style={{ margin: "1rem 2rem", width: "90%" }}
                  variant="outlined"
                  error={this.state.customerIdError}
                  inputProps={{
                    ...params.inputProps,
                    autoComplete: 'new-password', // disable autocomplete and autofill
                  }}
                />
              )}
            /> : null}

            <Autocomplete
              value={this.state.selectedJob}
              onChange={(event, newValue) => {
                this.setState({ selectedJob: newValue ? newValue : '', jobIdError: '' }); // Get the customer and get job
              }}
              // inputValue={this.state.selectedCustomer}
              // onInputChange={(event, newInputValue) => {
              //   console.log(newInputValue);
              // }}
              id="country-select-demo"
              style={{ width: "100%", margin: "1rem 0" }}
              size="small"
              options={this.state.jobs}
              // classes={{
              //   option: classes.option,
              // }}
              autoHighlight
              getOptionLabel={(option) => option.title ? option.title : option}
              renderOption={(option) => (
                <React.Fragment>
                  {/* <span>{countryToFlag(option.code)}</span> */}
                  {/* <span>Hello</span> */}
                  {option.title} ({option.status})
            </React.Fragment>
              )}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Choose a job"
                  style={{ margin: "1rem 2rem", width: "90%" }}
                  variant="outlined"
                  // disabled={!this.state.selectedCustomer}
                  error={this.state.jobIdError}
                  inputProps={{
                    ...params.inputProps,
                    autoComplete: 'new-password', // disable autocomplete and autofill
                  }}
                />
              )}
            />
            {/* <div className="form-group">
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                style={{ margin: "1rem 2rem", width: "90%" }}
                size="small" id="jobid" label="Job Id" name="jobId" value={this.state.jobId} onChange={this.handleFormInput} />
            </div>

            {this.state.jobIdError ? (
              <div className={`alert alert-warning alert-dismissible fade show  ${style.msg}`} role="alert">
                {this.state.jobIdError}

              </div>) : null} */}

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
                  {i == 0 ? null : <hr></hr>}
                  < div className="row">
                    <div className="col-8">
                      {/* <div className="form-group" style={{ margin: "0 2rem", width: "90%" }}>
                        <select onChange={(e) => this.hanldeClaimsInput(e, i)} className="form-control" id="exampleFormControlSelect1" name="claimType">
                          <option>Damage To House</option>
                          <option>Damage To Item</option>
                        </select>
                      </div> */}
                      <FormControl variant="outlined" style={{ margin: "0 2rem", width: "90%" }} margin='dense'>
                        <InputLabel id="demo-simple-select-outlined-label">Claim Type</InputLabel>
                        <Select
                          labelId="demo-simple-select-outlined-label"
                          id="demo-simple-select-outlined"
                          value={this.state.claims[i].claimType}
                          onChange={(e) => this.hanldeClaimsInput(e, i)}
                          label="Claim Type"
                          name="claimType"
                        >
                          {/* <MenuItem value="">
                            <em>None</em>
                          </MenuItem> */}
                          <MenuItem value={'Damage To House'}>Damage To House</MenuItem>
                          <MenuItem value={'Damage To Item'}>Damage To Item</MenuItem>
                        </Select>
                      </FormControl>
                    </div>
                    <div className="col-4">
                      <div className="form-group">
                        <TextField
                          variant="outlined"
                          margin="normal"
                          style={{ margin: "2rem", width: "90%" }}
                          required
                          // error = {this.state.priceError}
                          size="small"
                          id="price" label="$$$" name="price" value={this.state.claims[i].price} onChange={(e) => this.hanldeClaimsInput(e, i)} style={{ margin: "-0.04rem 0" }} />
                      </div>



                    </div>

                  </div>
                  <div className="form-group">
                    <TextareaAutosize
                      rowsMax={4}
                      id="description"
                      style={{ margin: "1rem 2rem", width: "90%" }}
                      placeholder="Item Description" name="description" value={this.state.claims[i].description} onChange={(e) => this.hanldeClaimsInput(e, i)} rows="3" />
                  </div>
                </div>
              )
            })
            }
            <div className="form-group">
              <div style={{ float: 'right' }}>
                <input type="button" className="btn btn-primary" style={{ background: "#00ADEE", marginRight: "2rem" }} name="Add Another" value="Add Another" onClick={this.addAnotherClaim} />
                {/* <Button onClick={this.addAnotherClaim} name="Add Another"></Button> */}
              </div>
            </div>

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


            <div>
              <button className="btn btn-primary" style={{ width: "100%", background: "#00ADEE", margin: "2rem", width: "90%" }} onClick={this.mySubmitHandler} >Submit</button>
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