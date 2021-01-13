import React, { Component } from "react";
import CustomerDeposit from "../CustomerBlanketDeposit/CustomerDeposit";
import style from "./SubmitDeposit.module.css";
import { Button } from "@material-ui/core";
// import { addDeposit } from '../../../Redux/Claims/claimsActions'
import { showMessage } from "../../../Redux/Common/commonActions";
import { connect } from "react-redux";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { TextField } from "@material-ui/core";
import { getCustomersAndJobs } from "../../../Redux/Claims/claimsActions";
import { resetDepositForm, setDepositForm } from "../../../Redux/PersistForms/formActions";
import { addDeposit } from "../../../Redux/BlanketDeposit/BlanketDepositActions";
import { cloneDeep } from "lodash";

class SubmitDeposit extends Component {
  constructor(props) {
    super(props);
    this.state = { ...props.addForm };
  }
  // state = {
  //   quantity: '',
  //   cost: '',
  //   customers: [],
  //   jobs: [],
  //   selectedCustomer: '',
  //   selectedJob: '',
  //   customerIdError: '',
  //   jobIdError: '',
  //   quantityError: "",
  //   costError: "",
  //   disabled: true
  // }
initialState =  {
  quantity: "",
  cost: "",
  customers: [],
  jobs: [],
  selectedCustomer: "",
  selectedJob: "",
  customerIdError: "",
  jobIdError: "",
  quantityError: "",
  costError: "",
  disabled: true,
}
  componentDidMount = () => {
    if (
      this.props.location.customerId !== undefined &&
      this.props.location.customerName !== undefined
    ) {
      this.setState({
        customerId: this.props.location.customerId,
        selectedCustomer: this.props.location.customerName,
        jobs: this.props.location.jobs,
      });
    }
    getCustomersAndJobs().then((res) => {
      this.setState({ customers: res.data.data });
    });
  };

  handleValidate = () => {
    var { selectedCustomer, selectedJob, quantity, cost } = this.state;
    let customerIdError = "";
    let jobIdError = "";
    let quantityError = "";
    let costError = "";

    if (selectedCustomer === "") {
      customerIdError = "Customer Id should not be empty";
    }

    if (selectedJob === "") {
      jobIdError = "Job Id should not be empty";
    }

    if (quantity === "") {
      quantityError = "Quantity should not be empty";
    }

    if (cost === "") {
      costError = "Cost should not be empty";
    }

    if (customerIdError || jobIdError || quantityError || costError) {
      this.setState({ customerIdError, jobIdError, quantityError, costError });
      return false;
    }

    return true;
  };

  handleSearchFormInput = (value) => {
    this.setState({
      customer: value,
    });
  };

  handleSubmit = (e) => {
    var { quantity, selectedJob, cost } = this.state;
    e.preventDefault();
    let obj = {
      quantity,
      jobId: selectedJob.jobId,
      cost,
    };
    var { showMessage, history } = this.props;
    if (this.handleValidate()) {
      addDeposit(obj).then((res) => {
        showMessage(res.data.message);
        history.push("/deposits");
      });
    }
  };

  handleQuantityFormInput = (e) => {
    var { value } = e.target;
    if (value == "") {
      this.setState({ quantityError: "Should not be empty", quantity: "" });
    } else {
      this.setState({
        quantity: value,
        cost: value * 15,
        costError: "",
        quantityError: "",
      });
    }
  };

  handleCostFormInput = (e) => {
    var { value } = e.target;
    if (value == "") {
      this.setState({ costError: "Should not be empty", cost: "" });
    } else {
      this.setState({ cost: value, costError: "" });
    }
  };

  getCustomerJobs = (customer) => {
    if (customer) {
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

  componentWillUnmount() {
    var { setDepositForm } = this.props;
    setDepositForm({ ...this.state });
  }
  handleResetDeposit = () =>{
    var {resetDepositForm} = this.props
    let customers = cloneDeep(this.state.customers)
    console.log("reset form is called")
    resetDepositForm()
    this.setState({...this.initialState, customers})
  }
  render() {
    var { quantity, customer, cost } = this.state;
    return (
      <div className={style.depositForm}>
        <div className={` jumbotron ${style.form}`}>
          <form onSubmit={this.handleSubmit}>
            <h3
              className={style.head}
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              Blanket Deposit
            </h3>
            {this.state.customers.length > 0 ? (
              <Autocomplete
                value={this.state.selectedCustomer}
                onChange={(event, newValue) => {
                  this.getCustomerJobs(newValue); // Get the customer and get job
                }}
                id="country-select-demoq"
                style={{ width: "100%" }}
                size="small"
                options={this.state.customers}
                autoHighlight
                getOptionLabel={(option) =>
                  option.firstName
                    ? option.firstName + " " + option.lastName
                    : option
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
                    style={{ margin: "1rem 0" }}
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

            <Autocomplete
              value={this.state.selectedJob}
              onChange={(event, newValue) => {
                this.setState({
                  selectedJob: newValue ? newValue : "",
                  jobIdError: "",
                }); // Get the customer and get job
              }}
              id="country-select-demo"
              style={{ width: "100%" }}
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
                  style={{ margin: "1rem 0" }}
                  variant="outlined"
                  error={this.state.jobIdError}
                  inputProps={{
                    ...params.inputProps,
                    autoComplete: "new-password", // disable autocomplete and autofill
                  }}
                />
              )}
            />
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <TextField
                variant="outlined"
                margin="normal"
                type="number"
                fullWidth
                size="small"
                name="quantity"
                value={quantity}
                label="Blanket Quantity"
                onChange={this.handleQuantityFormInput}
                error={this.state.quantityError}
                style={{ margin: "1rem 0" }}
              />
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                size="small"
                name="cost"
                type="number"
                value={cost}
                label="Cost in $"
                onChange={this.handleCostFormInput}
                error={this.state.costError}
                style={{ margin: "1rem 0" }}
              />
            </div>
            <div className="row">
              <div
                className="col-6"
               
              >
                <Button onClick = {this.handleResetDeposit}
                  type="button"
                  style={{
                    background: "#00ADEE",
                    textTransform: "none",
                    color: "#FFF",
                    fontFamily: "sans-serif",
                    width: "100%",
                  }}
                >
                  Reset
                </Button>
              </div>

              <div
                className="col-6"
               
              >
                <Button
                  type="submit"
                  style={{
                    background: "#00ADEE",
                    textTransform: "none",
                    color: "#FFF",
                    fontFamily: "sans-serif",
                    width: "100%",
                  }}
                >
                  Submit
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

var mapStateToProps = (state) => ({
  addForm: state.forms.addDepositForm,
});

var actions = {
  showMessage,
  setDepositForm,
  resetDepositForm
};

export default connect(mapStateToProps, actions)(SubmitDeposit);
