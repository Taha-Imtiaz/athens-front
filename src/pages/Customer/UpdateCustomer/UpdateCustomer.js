import { Button, TextField } from "@material-ui/core";
import React, { Component } from "react";
import { connect } from "react-redux";

import {
  updateCustomer,
  getCustomer,
} from "../../../Redux/Customer/customerActions";

import style from "./UpdateCustomer.module.css";
class UpdateCustomer extends Component {
  //fetch customer info (whose id is passed on mount)
  constructor(props) {
    super(props);
    this.state = {
      customer: '',
      firstName: '',
      lastName: '',
      phone: '',
      email: '',
      subContacts: '',
    }
  }

  componentDidMount() {
    let {
      getCustomer,
      match: {
        params: { customerId },
      },
    } = this.props;
    getCustomer(customerId);
  };

  componentDidUpdate(prevProps) {
    let { customer } = this.props;
    if (customer !== this.state.customer) {
      this.setState({
        customer,
        firstName: customer.firstName,
        lastName: customer.lastName,
        phone: customer.phone,
        email: customer.email,
        subContacts: customer.subContacts,
      });
    }
  }

  handlePhoneNumberInput = (value, previousValue) => {
    // return nothing if no value
    if (!value) return value;

    // only allows 0-9 inputs
    const currentValue = value.replace(/[^\d]/g, '');
    const cvLength = currentValue.length;

    if (!previousValue || value.length > previousValue.length) {

      // returns: "x", "xx", "xxx"
      if (cvLength < 4) return currentValue;

      // returns: "(xxx)", "(xxx) x", "(xxx) xx", "(xxx) xxx",
      if (cvLength < 7) return `(${currentValue.slice(0, 3)}) ${currentValue.slice(3)}`;

      // returns: "(xxx) xxx-", (xxx) xxx-x", "(xxx) xxx-xx", "(xxx) xxx-xxx", "(xxx) xxx-xxxx"
      return `(${currentValue.slice(0, 3)}) ${currentValue.slice(3, 6)}-${currentValue.slice(6, 10)}`;
    }
  }

  handleSubPhoneNumberInput = (value, previousState, i) => {
    let subContacts = previousState.subContacts.slice();
    let previousValue = subContacts[i].phone;
    subContacts[i].phone = this.handlePhoneNumberInput(value, previousValue)
    return subContacts
  }

  // form onChangeHandler
  handleFormInput = (event) => {
    let { name, value } = event.target;
    if (name === 'phone') {
      this.setState(prevState => ({ phone: this.handlePhoneNumberInput(value, prevState.phone) }))
    } else {
      this.setState({ [name]: value });
    }
    if (value === "") {
      this.setState({ [name + "Error"]: "Field Should not be empty" });
    } else {
      this.setState({ [name + "Error"]: "" });
    }
  };

  // alternateContact onChange handler
  hanldeContactsInput = (event, i) => {
    const { name, value } = event.target;
    if (name === 'phone') {
      this.setState(prevState => ({ subContacts: this.handleSubPhoneNumberInput(value, prevState, i) }))
    } else {
      let updatedContacts = this.state.subContacts.slice();
      updatedContacts[i][name] = value;
      this.setState({ subContacts: updatedContacts });
    }
  };

  // add alternateContacts (when no alternateContacts is added)
  addAlternateContact = () => {
    this.setState({
      subContacts: [
        {
          name: "",
          phone: "",
          email: "",
        },
      ],
    });
  };
  // add another alternate contact (when atleast alternateContact already exists)
  addContacts = () => {
    if (
      this.state.subContacts[0].name &&
      this.state.subContacts[0].phone &&
      this.state.subContacts[0].email
    ) {
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
  // validate if the form fields are empty or not
  validate = () => {
    // let {username,password,emailError,passwordError} = this.state
    let emailError = "";
    let firstNameError = "";
    let lastNameError = "";
    let phoneError = "";

    let mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

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
  //form onSubmit handler
  mySubmitHandler = (event) => {
    let { history, updateCustomer } = this.props;
    event.preventDefault();
    let { subContacts } = this.state;
    let {
      match: {
        params: { customerId },
      },
    } = this.props;

    const isValid = this.validate();
    if (isValid) {
      let { firstName, lastName, email, phone } = this.state;
      if (
        this.state.subContacts[0].name === "" &&
        this.state.subContacts[0].phone === "" &&
        this.state.subContacts[0].email === ""
      ) {
        subContacts = [];
      }
      let updateCustomerObj = {
        firstName,
        lastName,
        phone,
        email,
        subContacts,
      };

      updateCustomer(updateCustomerObj, customerId, () => {
        history.push(`/customer/detail/${customerId}`);
      });
    }
  };

  render() {
    return (
      <div className={style.formStyle}>
        <div className={style.form}>
          <h3 className={style.head}>Edit Customer</h3>
          {/* edit customer form */}
          <div>
            <form onSubmit={this.mySubmitHandler}>
              <TextField
                variant="outlined"
                required
                fullWidth
                className={style.styleFormFields}
                id="firstName"
                size="small"
                label="First Name"
                name="firstName"
                autoComplete="firstName"
                autoFocus
                error={this.state.firstNameError ? true : false}
                value={this.state.firstName}
                onChange={this.handleFormInput}
              />

              <TextField
                variant="outlined"
                required
                fullWidth
                className={style.styleFormFields}
                id="lastName"
                size="small"
                label="Last Name"
                name="lastName"
                autoComplete="lastName"
                error={this.state.lastNameError ? true : false}
                value={this.state.lastName}
                onChange={this.handleFormInput}
              />

              <TextField
                variant="outlined"
                required
                fullWidth
                className={style.styleFormFields}
                size="small"
                id="phone"
                label="Phone Number"
                name="phone"
                autoComplete="phone"
                error={this.state.phoneError ? true : false}
                value={this.state.phone}
                onChange={this.handleFormInput}
              />

              <TextField
                variant="outlined"
                required
                fullWidth
                className={style.styleFormFields}
                size="small"
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                error={this.state.emailError ? true : false}
                value={this.state.email}
                onChange={this.handleFormInput}
              />
            </form>
            <h5>Alternate Contact</h5>
            {this.state.subContacts.length > 0 ? (
              this.state.subContacts.map((x, i) => {
                return (
                  <div key={i}>
                    <form>
                      <TextField
                        variant="outlined"
                        required
                        fullWidth
                        className={style.styleFormFields}
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
                        fullWidth
                        className={style.styleFormFields}
                        size="small"
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
                        fullWidth
                        className={style.styleFormFields}
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
              })
            ) : (
                <div className={style.alternateContactBtn}>
                  <div className={style.alternateContact}>
                    <Button
                      className={style.btn}
                      onClick={this.addAlternateContact}
                    >
                      Add Alternate Contact
                    </Button>
                  </div>
                </div>
              )}
            {this.state.subContacts.length > 0 && (
              <div className={style.anotherContactBtn}>
                <div className={style.anotherContact}>
                  <Button className={style.btn} onClick={this.addContacts}>
                    Add Another
                    </Button>
                </div>
              </div>
            )}

            <div className={style.updateBtn}>
              <Button onClick={this.mySubmitHandler} className={style.button}>
                Update
                </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

var mapStateToProps = (state) => ({
  customer: state.customers.customer,
  user: state.users.user,
});

var actions = {
  getCustomer,
  updateCustomer,
};
export default connect(mapStateToProps, actions)(UpdateCustomer);
