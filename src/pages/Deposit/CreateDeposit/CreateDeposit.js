import React, { Component } from "react";
import style from "./CreateDeposit.module.css";
import { Button } from "@material-ui/core";
import { connect } from "react-redux";
import { TextField } from "@material-ui/core";
import { getCustomersAndJobs } from "../../../Redux/Claim/claimActions";
import {
  resetDepositForm,
  setDepositForm,
} from "../../../Redux/PersistForms/formActions";
import { addDeposit } from "../../../Redux/Deposit/DepositActions";
import { cloneDeep } from "lodash";
import VirtualizedAutocomplete from "../../../components/VirtualizedAutocomplete/VirtualizedAutocomplete";

class CreateDeposit extends Component {
  constructor(props) {
    super(props);
    this.state = { ...props.addForm };
  }

  initialState = {
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
  };

  componentDidMount = () => {
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
    let { getCustomersAndJobs } = this.props;
    getCustomersAndJobs((res) => 
    this.setState({ customers: res.data.data }));
  };

  handleValidate = () => {
    let { selectedCustomer, selectedJob, quantity, cost } = this.state;
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
    let { quantity, selectedJob, cost } = this.state;
    e.preventDefault();
    let obj = {
      quantity,
      jobId: selectedJob.jobId,
      cost,
    };
    let { addDeposit, history } = this.props;
    if (this.handleValidate()) {
      addDeposit(obj, () => {
        //reset form to its original state
        this.handleResetDeposit();
        history.push("/deposits");
      });
    }
  };

  handleQuantityFormInput = (e) => {
    let { value } = e.target;
    if (value === "") {
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
    let { value } = e.target;
    if (value === "") {
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
    let { setDepositForm } = this.props;
    setDepositForm({ ...this.state });
  }
  handleResetDeposit = () => {
    let { resetDepositForm } = this.props;
    let customers = cloneDeep(this.state.customers);
    resetDepositForm();
    this.setState({ ...this.initialState, customers });
  };
  setSelectedCustomerJobs = (newValue) => {
    this.setState({
      selectedJob: newValue ? newValue : "",
      jobIdError: "",
    });
  };
  render() {
    let { quantity, cost } = this.state;
    return (
      <div className={style.depositFormContainer}>
        <div className={style.depositForm}>
          <div className={`${style.form}`}>
            <form onSubmit={this.handleSubmit}>
              <h3 className={style.head}>Create Deposit</h3>
              
              {this.state.customers.length > 0 ? (
                <VirtualizedAutocomplete
                  optionTextValue={this.state.newCustomer}
                  value={this.state.selectedCustomer}
                  options={this.state.customers}
                  getCustomerJobs={this.getCustomerJobs}
                  addNewCustomer={this.addNewCustomer}
                />
              ) : null}
             
             {this.state.jobs.length > 0 ? (
               <VirtualizedAutocomplete
                textField="Choose a job"
                value={this.state.selectedJob}
                options={this.state.jobs}
                setSelectedCustomerJobs={this.setSelectedCustomerJobs}
                
              />
             ) : null }
              <TextField
                variant="outlined"
                type="number"
                size="small"
                name="quantity"
                value={quantity}
                className={style.styleFormFields}
                label="Blanket Quantity"
                onChange={this.handleQuantityFormInput}
                error={this.state.quantityError ? true : false}
                fullWidth
              />

              <TextField
                variant="outlined"
                fullWidth
                size="small"
                name="cost"
                className={style.styleFormFields}
                type="number"
                value={cost}
                label="Cost in $"
                onChange={this.handleCostFormInput}
                error={this.state.costError ? true : false}
              />

              <div className={style.depositBtn}>
                <div>
                  <Button
                    className={style.button}
                    onClick={this.handleResetDeposit}
                    type="button"
                  >
                    Reset
                  </Button>
                </div>

                <div>
                  <Button type="submit" className={style.button}>
                    Submit
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

var mapStateToProps = (state) => ({
  addForm: state.forms.addDepositForm,
});

var actions = {
  addDeposit,
  getCustomersAndJobs,
  setDepositForm,
  resetDepositForm,
};

export default connect(mapStateToProps, actions)(CreateDeposit);
