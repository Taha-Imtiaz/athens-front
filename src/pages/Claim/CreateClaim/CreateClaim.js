import React, { Component } from "react";
import style from "./CreateClaim.module.css";
import { Modal } from "react-bootstrap";
import { Button } from "@material-ui/core";
import "react-datepicker/dist/react-datepicker.css";
import { connect } from "react-redux";
import {
  addClaim,
  getCustomersAndJobs,
} from "../../../Redux/Claim/claimActions";
import { TextareaAutosize, TextField } from "@material-ui/core";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import {
  resetClaimForm,
  setClaimForm,
} from "../../../Redux/PersistForms/formActions";
import { cloneDeep } from "lodash";
import TimeAgo from "react-timeago";
import VirtualizedAutocomplete from "../../../components/VirtualizedAutocomplete/VirtualizedAutocomplete";

class CreateClaim extends Component {
  //defining state
  constructor(props) {
    super(props);
    this.state = { ...props.addForm };
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
    //fetch customer id , name and jobs (if navigate from customer) on mount
    if (
      this.props.location.customerId !== undefined &&
      this.props.location.customerName !== undefined
    ) {
      this.setState({
        customerId: this.props.location.customerId,
        selectedCustomer: this.props.location.customerName,
        jobs: this.props.location.jobs,
        selectedJob: "",
      });
    }
    //get all customers and all jobs
    let { getCustomersAndJobs } = this.props;
    getCustomersAndJobs((res) => {
      this.setState({ customers: res.data.data });
    });
    
  };
  //onChange handler
  handleFormInput = (event) => {
    let { name, value } = event.target;
    this.setState({ [name]: value });
    if (value === "") {
      this.setState({ [name + "Error"]: "Should not be empty" });
    } else {
      this.setState({ [name + "Error"]: "" });
    }
  };
  //validate the form
  validate = () => {
    let customerIdError = "";
    let jobIdError = "";
    let priceError = "";

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
  //submit handler
  mySubmitHandler = (event) => {
    event.preventDefault();
    let {
      selectedJob,
      title,
      waitTo,
      claims: { claimType, price, description },
    } = this.state;
    if (this.validate()) {
      let { history, addClaim } = this.props;
      let data = {
        jobId: selectedJob.jobId,
        claimType,
        price,
        description,
        title,
        waitTo,
      };
      //call add Claim api to add a claim
      addClaim(data, (res) => {
        //reset form to its original state
        this.handleResetForm();
        history.push(`/claim/detail/${res.data.data}`);
      });
    }
  };
  //onChange handler of claims(description,type, cost)
  hanldeClaimsInput = (e) => {
    let updatedClaims = { ...this.state.claims };
    updatedClaims[e.target.name] = e.target.value;
    this.setState({ claims: updatedClaims });
  };
  //get (fetch the job of selected customer)
  getCustomerJobs = (customer) => {
    if (customer) {
      if (customer.claim.length > 0) {
        this.setState({
          customerClaims: true,
          showClaimsDetails: customer.claim,
          customerName: customer.firstName + " " + customer.lastName,
        });
      }
      this.setState({
        jobs: customer.jobs,
        selectedCustomer: customer.firstName + " " + customer.lastName,
        selectedJob: "",
        customerIdError: "",
      });
    } else {
      this.setState({ jobs: [], selectedCustomer: "", selectedJob: "" });
    }
  };

  //close the modal
  handleClose = () => {
    this.setState({
      customerClaims: false,
    });
  };
  //store all fields in redux state upon component will unmount
  componentWillUnmount() {
    let { setClaimForm } = this.props;
    setClaimForm({ ...this.state });
  }
  //reset the form
  handleResetForm = () => {
    let { resetClaimForm } = this.props;
    let customers = cloneDeep(this.state.customers);
    resetClaimForm();
    this.setState({ ...this.initialState, customers });
  };
  setSelectedCustomerJobs = (newValue) => {
    this.setState({
      selectedJob: newValue ? newValue : "",
      jobIdError: "",
    })
  }
  render() {
    let { showClaimsDetails, customerName } = this.state;
    return (
      <div className={style.claimContainerPage}>
        <div className={style.claimContainer}>
          <div className={`${style.form}`}>
            <h3 className={style.head}>Create Claim</h3>
            <form>
              {this.state.customers.length > 0 ? (
               
                <VirtualizedAutocomplete
                  optionTextValue={this.state.newCustomer}
                  value={this.state.selectedCustomer}
                  options={this.state.customers}
                  getCustomerJobs={this.getCustomerJobs}
                  addNewCustomer={this.addNewCustomer}
                />
              ) : null}
              {this.state.customerClaims && (
                <div>
                  <Modal
                    dialogClassName={`${style.modal}`}
                    show={this.state.customerClaims}
                    onHide={this.handleClose}
                    centered
                    scrollable
                  >
                    <Modal.Header closeButton>
                      <Modal.Title>{`${customerName} Claims`}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <div className={style.claimHeader}>
                        <div>Protection Type</div>
                        <div>Status</div>
                        <div>Last Update</div>
                      </div>

                      {showClaimsDetails.map((claim, i) => (
                        <div className={style.claimContent} key={i}>
                          <div> {claim.claimType}</div>
                          <div>{claim.status}</div>
                          <div>
                            <TimeAgo date={claim.updatedAt} />
                          </div>
                        </div>
                      ))}
                    </Modal.Body>
                    <Modal.Footer>
                      <div className={style.modalBtn}>
                        <Button
                          className={style.modalButton}
                          onClick={this.handleClose}
                        >
                          Close
                        </Button>
                      </div>
                    </Modal.Footer>
                  </Modal>
                </div>
              )}
           
              <VirtualizedAutocomplete textField = "Choose a job" 
                value={this.state.selectedJob}
                options={this.state.jobs}
                setSelectedCustomerJobs={this.setSelectedCustomerJobs}
              />
              <TextField
                variant="outlined"
                required
                error={this.state.titleError ? true : false}
                className={style.styleFormFields}
                size="small"
                id="title"
                label="Title"
                name="title"
                value={this.state.title}
                onChange={(e) => this.handleFormInput(e)}
                fullWidth
              />

              <TextField
                variant="outlined"
                required
                error={this.state.waitToError ? true : false}
                className={style.styleFormFields}
                size="small"
                id="waitTo"
                label="Waiting"
                name="waitTo"
                value={this.state.waitTo}
                onChange={(e) => this.handleFormInput(e)}
                fullWidth
              />

              <div className={style.protectionType}>
                <div>
                  <FormControl variant="outlined" margin="dense" fullWidth>
                    <InputLabel id="demo-simple-select-outlined-label">
                      Protection Type
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-outlined-label"
                      id="demo-simple-select-outlined"
                      value={this.state.claims.claimType}
                      onChange={(e) => this.hanldeClaimsInput(e)}
                      label="Claim Type"
                      name="claimType"
                    >
                      <MenuItem value={"BVP"}>BVP</MenuItem>
                      <MenuItem value={"FVP"}>FVP</MenuItem>
                    </Select>
                  </FormControl>
                </div>
                <div>
                  <TextField
                    variant="outlined"
                    required
                    margin="dense"
                    fullWidth
                    size="small"
                    id="price"
                    type="number"
                    label="Total Cost"
                    name="price"
                    value={this.state.claims.price}
                    onChange={(e) => this.hanldeClaimsInput(e)}
                  />
                </div>
              </div>

              <TextareaAutosize
                rowsMax={4}
                id="description"
                className={`${style.styleFormFields} ${style.styleTextArea}`}
                placeholder="Item Description"
                name="description"
                value={this.state.claims.description}
                onChange={(e) => this.hanldeClaimsInput(e)}
                rows="3"
              />

              <div className={style.buttons}>
                <Button className={style.button} onClick={this.handleResetForm}>
                  Reset
                </Button>

                <Button className={style.button} onClick={this.mySubmitHandler}>
                  Submit
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

var mapStateToProps = (state) => ({
  addForm: state.forms.addClaimForm,
});

var actions = {
  getCustomersAndJobs,
  addClaim,
  setClaimForm,
  resetClaimForm,
};
export default connect(mapStateToProps, actions)(CreateClaim);
