import React, { Component } from "react";
import style from "./NewClaim.module.css";
import DatePicker from "react-datepicker";
import { Modal } from "react-bootstrap";

import { Button } from "@material-ui/core";
import "react-datepicker/dist/react-datepicker.css";
import API from "../../../utils/api";
import { connect } from "react-redux";
import {
  addClaim,
  getCustomersAndJobs,
} from "../../../Redux/Claims/claimsActions";
import { showMessage } from "../../../Redux/Common/commonActions";
import { TextareaAutosize, TextField } from "@material-ui/core";

import Autocomplete from "@material-ui/lab/Autocomplete";
import { makeStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import { setClaimForm } from "../../../Redux/PersistForms/formActions"

class NewClaim extends Component {
  constructor(props) {
    super(props);
    this.state = { ...props.addForm }
  }
  initialState = {
    customerId: "",
    jobId: "",
    claims: {
      claimType: "",
      price: "",
      description: "",
    },
    item: "",
    price: "",
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
    inputValues: "",
    inputValue: "",
    customers: [],
    jobs: [],
    selectedCustomer: "",
    selectedJob: "",
    titleError: "",
    title: "",
    waitToError: "",
    waitTo: "",
    customerClaims: false,
  };

  componentDidMount = () => {
    if (this.props.location.customerId !== undefined && this.props.location.customerName !== undefined) {
      this.setState({
        customerId: this.props.location.customerId,
        selectedCustomer: this.props.location.customerName,
        jobs: this.props.location.jobs
      })
    }
    getCustomersAndJobs().then((res) => {
      this.setState({ customers: res.data.customers });
    });
  };

  handleFormInput = (event) => {
    var { name, value } = event.target;
    this.setState({ [name]: value });
    if (value == "") {
      this.setState({ [name + "Error"]: "Should not be empty" });
    } else {
      this.setState({ [name + "Error"]: "" });
    }
  };

  validate = () => {
    let customerIdError = "";
    let jobIdError = "";
    let priceError = "";
    let descriptionError = "";
    let titleError = "";
    let waitToError = "";

    if (this.state.selectedCustomer.length === 0) {
      customerIdError = "Customer Id should not be empty";
    }

    if (!this.state.selectedJob) {
      jobIdError = "Error! should not be empty";
    }
    if (!this.state.title) {
      titleError = "Error! should not be empty";
    }

    // if (!this.state.description) {
    //   descriptionError = "Error! should not be empty";
    // }
    if (!this.state.price) {
      priceError = "Error! should not be empty";
    }
    if (!this.state.waitTo) {
      waitToError = "Error! should not be empty";
    }

    if (
      (customerIdError || jobIdError || priceError || titleError, waitToError)
    ) {
      this.setState({
        customerIdError,
        jobIdError,
        priceError,

        titleError,
        waitToError,
      });
      return false;
    }

    return true;
  };

  mySubmitHandler = (event) => {
    event.preventDefault();
    let {
      selectedJob,

      title,
      waitTo,
      claims: { claimType, price, description },
    } = this.state;
    if (this.validate()) {
      var { history, showMessage } = this.props;
      // var {history:{match}}
      let data = {
        jobId: selectedJob.jobId,
        claimType,
        price,
        description,
        title,
        waitTo,
      };
      addClaim(data)
        .then((res) => {
          showMessage(res.data.message);
          history.push(`/claimsDetail/${res.data.claim}`);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  addAnotherClaim = () => {
    if (
      this.state.claims[0].claimType &&
      this.state.claims[0].description &&
      this.state.claims[0].price
    ) {
      this.setState({
        claims: [
          ...this.state.claims,
          {
            claimType: "Damage To House",
            price: 0,
            description: "",
          },
        ],
      });
    }
  };

  hanldeClaimsInput = (e) => {
    let updatedClaims = { ...this.state.claims };
    updatedClaims[e.target.name] = e.target.value;
    this.setState({ claims: updatedClaims });
  };

  handleChangeFrom = (date, e) => {
    if (date == null) {
      this.setState({ ["Error"]: "Should not be empty" });
    } else {
      this.setState({ ["Error"]: "" });
    }
    this.setState({
      fromDate: date,
    });
  };

  handleChangeTo = (date) => {
    // const valueOfInput = date.format()
    if (date == "") {
      this.setState({ ["Error"]: "Should not be empty" });
    } else {
      this.setState({ ["Error"]: "" });
    }
    this.setState({
      toDate: date,
    });
  };

  getCustomerJobs = (customer) => {
    if (customer) {
      if (customer.claim.length > 0) {
        this.setState({
          customerClaims: true,
          showClaimsDetails: customer.claim,
          customerName: customer.firstName + ' ' + customer.lastName
        });
      }
      this.setState({
        jobs: customer.jobs,
        selectedCustomer: customer.firstName + ' ' + customer.lastName,
        selectedJob: "",
        customerIdError: "",
      });
    } else {
      this.setState({ jobs: [], selectedCustomer: "", selectedJob: "" });
    }
  };
  handleClose = () => {
    this.setState({
      customerClaims: false,
    });
  };

  componentWillUnmount() {
    var { setClaimForm } = this.props;
    setClaimForm({ ...this.state })
  }

  render() {
    var { showClaimsDetails, customerName } = this.state;
    return (
      <div>
        <div className={`${style.form}`}>
          <h3 className={style.head}>New Claim</h3>
          <form>
            {this.state.customers.length > 0 ? (
              <Autocomplete
                value={this.state.selectedCustomer}
                onChange={(event, newValue) => {
                  this.getCustomerJobs(newValue); // Get the customer and get job
                }}
                id="country-select-demo"
                style={{ width: "100%", margin: "1rem 0" }}
                size="small"
                options={this.state.customers}
                autoHighlight
                getOptionLabel={(option) =>
                  option.firstName ? option.firstName + ' ' + option.lastName : option
                }
                renderOption={(option) => (
                  <React.Fragment>
                    {option.firstName} {option.lastName} ({option.email})
                  </React.Fragment>
                )}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Choose a customer"
                    style={{ margin: "0rem 2rem", width: "90%" }}
                    variant="outlined"
                    error={this.state.customerIdError}
                    inputProps={{
                      ...params.inputProps,
                      autoComplete: "new-password", // disable autocomplete and autofill
                    }}
                  />
                )}
              />
            ) : null}
            {this.state.customerClaims && (
              <div>
                <Modal
                  dialogClassName={`${style.modal}`}
                  show={this.state.customerClaims}
                  onHide={this.handleClose}
                  // animation={false}
                  centered
                  scrollable
                >
                  <Modal.Header closeButton>
                    <Modal.Title>{`${customerName} Claims`}</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <div
                      className="row"
                      style={{ fontWeight: "bold", fontFamily: "sans-serif" }}
                    >
                      <div className={`col-6`}>Protection Type</div>
                      <div className={`col-2`}>Status</div>
                      <div className={`col-4`}>Last Update</div>
                    </div>

                    {showClaimsDetails.map((claim) => (
                      <div
                        className="row"
                        style={{
                          fontFamily:
                            "Segoe UI, Tahoma, Geneva, Verdana, sans-serif",
                        }}
                      >
                        <div className={`col-6 `}> <p>{claim.claimType}</p></div>
                        <div className={`col-2`}>
                          <p>{claim.status}</p>
                        </div>
                        <div className={`col-4 `}>
                          <p>  {claim.updatedAt}</p>
                        </div>

                      </div>

                    ))}
                  </Modal.Body>
                  <Modal.Footer>
                    <Button
                      style={{
                        background: "#00ADEE",
                        textTransform: "none",
                        color: "#FFF",
                        fontFamily: "sans-serif",
                      }}
                      onClick={this.handleClose}
                    >
                      Close
                    </Button>
                    {/* <Button variant="primary">Add Activity</Button> */}
                  </Modal.Footer>
                </Modal>
              </div>
            )}

            <Autocomplete
              value={this.state.selectedJob}
              onChange={(event, newValue) => {
                this.setState({
                  selectedJob: newValue ? newValue : "",
                  jobIdError: "",
                }); // Get the customer and get job
              }}
              id="country-select-demo"
              style={{ width: "100%", margin: "1rem 0" }}
              size="small"
              options={this.state.jobs}
              autoHighlight
              getOptionLabel={(option) =>
                option.title ? option.title : option
              }
              renderOption={(option) => (
                <React.Fragment>
                  {option.title} ({option.status})
                </React.Fragment>
              )}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Choose a job"
                  style={{ margin: "0rem 2rem", width: "90%" }}
                  variant="outlined"
                  error={this.state.jobIdError}
                  inputProps={{
                    ...params.inputProps,
                    autoComplete: "new-password", // disable autocomplete and autofill
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

            <div className="form-group ">
              <TextField
                variant="outlined"
                margin="normal"
                // style={{ width: "90%" }}
                required
                error={this.state.titleError}
                size="small"
                id="title"
                label="Title"
                name="title"
                value={this.state.title}
                onChange={(e) => this.handleFormInput(e)}
                style={{ margin: "0 2rem", width: "90%" }}
              />
            </div>

            <div className="form-group ">
              <TextField
                variant="outlined"
                margin="normal"
                // style={{ width: "90%" }}
                required
                error={this.state.waitToError}
                size="small"
                id="waitTo"
                label="Waiting"
                name="waitTo"
                value={this.state.waitTo}
                onChange={(e) => this.handleFormInput(e)}
                style={{ margin: "0 2rem", width: "90%" }}
              />
            </div>
            {/* {this.state.claims.map((x, i) => {
              return ( */}
            <div>
              {/* {i == 0 ? null : <hr></hr>} */}
              <div className="row">
                <div className="col-8">
                  <FormControl
                    variant="outlined"
                    style={{ margin: "0 2rem", width: "90%" }}
                    margin="dense"
                  >
                    <InputLabel id="demo-simple-select-outlined-label">
                      Protection Type
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-outlined-label"
                      id="demo-simple-select-outlined"
                      value={this.state.claims.claimType}
                      onChange={(e) => this.hanldeClaimsInput(e)}
                      label="Claim Type"
                      // style= {{width:"90%"}}
                      name="claimType"
                    >
                      <MenuItem value={"BVP"}>
                        BVP
                      </MenuItem>
                      <MenuItem value={"FVP"}>
                        FVP
                      </MenuItem>
                    </Select>
                  </FormControl>
                </div>
                <div className="col-4">
                  <div className="form-group">
                    <TextField
                      variant="outlined"
                      margin="normal"
                      // style={{ width: "90%" }}
                      required
                      // error = {this.state.priceError}
                      size="small"
                      id="price"
                      label="Total Cost"
                      name="price"
                      value={this.state.claims.price}
                      onChange={(e) => this.hanldeClaimsInput(e)}
                      style={{ margin: "-0.04rem -0.4rem" }}
                    />
                  </div>
                </div>
              </div>
              <div className="form-group">
                <TextareaAutosize
                  rowsMax={4}
                  id="description"
                  style={{
                    margin: "0rem 2rem",
                    width: "90%",
                    backgroundColor: "#e9ecef",
                  }}
                  placeholder="Item Description"
                  name="description"
                  value={this.state.claims.description}
                  onChange={(e) => this.hanldeClaimsInput(e)}
                  rows="3"
                />
              </div>
            </div>
            {/* );
            })} */}

            {/* <div className="form-group">
              <div style={{ float: "right" }}>
                <Button
                  type="button"
                  style={{
                    background: "#00ADEE",
                    textTransform: "none",
                    color: "#FFF",
                    fontFamily: "sans-serif",
                    marginRight: "2.5rem",
                  }}
                  name="Add Another"
                  value="Add Another"
                  onClick={this.addAnotherClaim}
                >
                  Add Another
                </Button>
               
              </div>
            </div> */}

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
              <Button
                style={{
                  background: "#00ADEE",
                  textTransform: "none",
                  color: "#FFF",
                  fontFamily: "sans-serif",
                  margin: " 0 2rem",
                  width: "90%",
                }}
                onClick={this.mySubmitHandler}
              >
                Submit
              </Button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

var mapStateToProps = (state) => ({
  addForm: state.forms.addClaimForm
});

var actions = {
  addClaim,
  showMessage,
  setClaimForm
};
export default connect(mapStateToProps, actions)(NewClaim);
