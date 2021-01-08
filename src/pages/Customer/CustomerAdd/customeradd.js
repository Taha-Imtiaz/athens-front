import React, { Component } from "react";
import { connect } from "react-redux";
import { addCustomer } from "../../../Redux/Customer/customerActions";
import {
  resetCustomerForm,
  setCustomerForm,
} from "../../../Redux/PersistForms/formActions";
import "react-toastify/dist/ReactToastify.css";
import { TextField } from "@material-ui/core";
import style from "./customeradd.module.css";
import Button from "@material-ui/core/Button";

class CustomerAdd extends Component {
  constructor(props) {
    super(props);
    this.initialState = {
      firstName: "",
      lastName: "",
      phone: "",
      email: "",
      subContacts: [
        {
          name: "",
          phone: "",
          email: "",
        },
      ],
      firstNameError: "",
      lastNameError: "",
      emailError: "",
      phoneNumberError: "",
      subContactPhoneError: "",
      subContactEmailError: "",
    };

    this.state = { ...this.props.addForm };
  }
  //validate(check if the form fields are empty or not)
  validate = () => {
    let emailError = "";
    let firstNameError = "";
    let lastNameError = "";
    let phoneError = "";

    var mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    if (!this.state.email.match(mailformat)) {
      emailError = "Invalid Email";
    }

    if (!this.state.firstName) {
      firstNameError = "First Name should not be empty";
    }

    if (!this.state.lastName) {
      lastNameError = "Last Name should not be empty";
    }

    if (!this.state.phone) {
      phoneError = "Phone Number should not be empty";
    }

    if (emailError || firstNameError || lastNameError || phoneError) {
      this.setState({
        firstNameError,
        lastNameError,
        emailError,
        phoneError,
      });
      return false;
    }

    return true;
  };
  //onChange handler of form
  handleFormInput = (event) => {
    var { name, value } = event.target;
    this.setState({ [name]: value });
    if (value == "") {
      this.setState({ [name + "Error"]: "Field Should not be empty" });
    } else {
      this.setState({ [name + "Error"]: "" });
    }
  };
  //onChange handler of subContact
  hanldeContactsInput = (e, i) => {
    let updatedContacts = this.state.subContacts.slice();
    updatedContacts[i][e.target.name] = e.target.value;
    this.setState({ subContacts: updatedContacts });
  };
  //this handler is clicked when the form is submitted
  mySubmitHandler = (event) => {
    var { addCustomer, history } = this.props;
    event.preventDefault();
    var { subContacts } = this.state;

    const isValid = this.validate();
    if (isValid) {
      var { firstName, lastName, email, phone, subContacts } = this.state;
      //check if the subContacts fields are empty
      if (
        this.state.subContacts[0].name === "" &&
        this.state.subContacts[0].phone === "" &&
        this.state.subContacts[0].email === ""
      ) {
        subContacts = [];
      }

      var addCustomerObj = {
        firstName,
        lastName,
        phone,
        email,
        subContacts,
      };
      //Call addCustomer Api
      addCustomer(addCustomerObj, (customer) => {
        if (this.props.isModal) {
          this.props.close(customer);
        } else {
          history.push("/customer/detail/" + customer.data.data._id);
        }
      });
    }
  };
  //function to addSubContacts(if the subContacts are greater 1)
  addContacts = () => {
    var { subContacts } = this.state;
    console.log(subContacts);
    if (subContacts[0].name && subContacts[0].phone && subContacts[0].email) {
      this.setState({
        subContacts: [
          ...this.state.subContacts,
          {
            name: "",
            phone: "",
            email: "",
          },
        ],
      });
    }
  };

  componentWillUnmount() {
    //set the values of form fields in redux state
    var { setCustomerForm } = this.props;
    setCustomerForm({ ...this.state });
  }
  //reset form (clear values from all fields)
  handleResetForm = () => {
    var { resetCustomerForm } = this.props;

    resetCustomerForm();
    this.setState({ ...this.initialState });
  };

  render() {
    
    return (
      <div
        className={this.props.isModal !== true ? `${style.formStyle}` : null}
      >
        <div className={this.props.isModal !== true ? `${style.form}` : null}>
          {this.props.isModal !== true && (
            <h3 className={style.head}>Create New Customer</h3>
          )}
          <div>
            <form onSubmit={this.mySubmitHandler}>
              <TextField
                variant="outlined"
                required
                style={{ margin: "1rem 2rem", width: "92%" }}
                id="firstName"
                size="small"
                label="First Name"
                name="firstName"
                autoComplete="firstName"
                autoFocus
                error={this.state.firstNameError.length > 0}
                value={this.state.firstName}
                onChange={this.handleFormInput}
              />

              <TextField
                variant="outlined"
                required
                style={{ margin: "1rem 2rem", width: "92%" }}
                required
                id="lastName"
                size="small"
                label="Last Name"
                name="lastName"
                autoComplete="lastName"
                error={this.state.lastNameError.length > 0}
                value={this.state.lastName}
                onChange={this.handleFormInput}
              />

              <TextField
                variant="outlined"
                required
                style={{ margin: "1rem 2rem", width: "92%" }}
                required
                size="small"
                id="phone"
                label="Phone Number"
                name="phone"
                autoComplete="phone"
                error={this.state.phoneError?.length > 0}
                value={this.state.phone}
                onChange={this.handleFormInput}
              />

              <TextField
                variant="outlined"
                required
                style={{ margin: "1rem 2rem", width: "92%" }}
                required
                size="small"
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                error={this.state.emailError.length > 0}
                value={this.state.email}
                onChange={this.handleFormInput}
              />
            </form>
            <h5 style={{ margin: "0 2rem" }}>Alternate Contact</h5>
            {this.state.subContacts.map((x, i) => {
              return (
                <div key={i}>
                  <form>
                    <TextField
                      variant="outlined"
                      required
                      style={{ margin: "1rem 2rem", width: "92%" }}
                      size="small"
                      id="name"
                      label="Name"
                      name="name"
                      autoComplete="name"
                      value={this.state.subContacts[i].name}
                      onChange={(e) => this.hanldeContactsInput(e, i)}
                    />

                    <TextField
                      variant="outlined"
                      required
                      style={{ margin: "1rem 2rem", width: "92%" }}
                      size="small"
                      type="number"
                      id="phone_number"
                      label="Phone Number"
                      name="phone"
                      autoComplete="phone_number"
    
                      value={this.state.subContacts[i].phone}
                      
                      onChange={(e) => this.hanldeContactsInput(e, i)}
                    />

                    <TextField
                      variant="outlined"
                      required
                      style={{ margin: "1rem 2rem", width: "92%" }}
                      id="emailalt"
                      label="Email Address"
                      size="small"
                      name="email"
                      autoComplete="emailalt"
                     
                      value={this.state.subContacts[i].email}
                      onChange={(e) => this.hanldeContactsInput(e, i)}
                    />
                  </form>
                </div>
              );
            })}

            <div className="row">
              <div className="col-10"></div>

              <div className="col-2">
                <Button
                  onClick={this.addContacts}
                  style={{
                    background: "#00ADEE",
                    textTransform: "none",
                    color: "#FFF",
                    fontFamily: "sans-serif",
                  }}
                >
                  Add Another
                </Button>
              </div>
            </div>

            <div className="row" style={{ marginBottom: "1rem" }}>
              <div className="col-6">
                <Button
                  onClick={this.handleResetForm}
                  className={
                    this.props.isModal !== true
                      ? `${style.button}`
                      : `${style.modalButton}`
                  }
                  style={{
                    background: "#00ADEE",

                    width: "100%",
                    textTransform: "none",
                    color: "#FFF",
                    fontFamily: "sans-serif",
                  }}
                >
                  Reset
                </Button>
              </div>
              <div className={`col-6`}>
                <Button
                  onClick={this.mySubmitHandler}
                  className={
                    this.props.isModal !== true
                      ? `${style.button}`
                      : `${style.modalButton}`
                  }
                  style={{
                    background: "#00ADEE",

                    width: "100%",
                    textTransform: "none",
                    color: "#FFF",
                    fontFamily: "sans-serif",
                  }}
                >
                  Submit
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

var mapStateToProps = (state) => ({
  addForm: state.forms.addCustomerForm,
});

var actions = {
  addCustomer,
  setCustomerForm,
  resetCustomerForm,
};

export default connect(mapStateToProps, actions)(CustomerAdd);
