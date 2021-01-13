import { Button, TextField } from "@material-ui/core";
import React, { Component } from "react";
import { connect } from "react-redux";

import {
  fetchCustomerById,
  updateCustomer,
} from "../../../Redux/Customer/customerActions";

import style from "./CustomerUpdate.module.css";
class CustomerUpdate extends Component {
  //fetch customer info (whose id is passed on mount)
  componentDidMount = () => {
    var {
      match: {
        params: { id },
      },
    } = this.props;
    fetchCustomerById(id)
      .then((res) => {
        console.log(res);
        this.setState({
          customer: res.data?.data,
          firstName: res.data.data?.firstName,
          lastName: res.data.data?.lastName,
          phone: res.data.data?.phone,
          email: res.data.data?.email,
          subContacts: res.data.data?.subContacts,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  // form onChangeHandler
  handleFormInput = (event) => {
    var { name, value } = event.target;
    this.setState({ [name]: value });
    if (value == "") {
      this.setState({ [name + "Error"]: "Field Should not be empty" });
    } else {
      this.setState({ [name + "Error"]: "" });
    }
  };
  // alternateContact onChange handler
  hanldeContactsInput = (e, i) => {
    let updatedContacts = this.state.subContacts.slice();
    updatedContacts[i][e.target.name] = e.target.value;
    this.setState({ subContacts: updatedContacts });
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
    // var {username,password,emailError,passwordError} = this.state
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
  //form onSubmit handler
  mySubmitHandler = (event) => {
    var { history, updateCustomer } = this.props;
    event.preventDefault();
    var { subContacts } = this.state;
    var {
      match: {
        params: { id },
      },
    } = this.props;

    const isValid = this.validate();
    if (isValid) {
      var { firstName, lastName, email, phone, subContacts } = this.state;
      if (
        this.state.subContacts[0].name === "" &&
        this.state.subContacts[0].phone === "" &&
        this.state.subContacts[0].email === ""
      ) {
        subContacts = [];
      }
      var updateCustomerObj = {
        firstName,
        lastName,
        phone,
        email,
        subContacts,
      };

      updateCustomer(updateCustomerObj, id, () => {
        history.push(`/customer/detail/${id}`);
      });
    }
  };

  render() {
    var {
      match: {
        params: { id },
      },
    } = this.props;

    return this.state?.customer ? (
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
                error={this.state.firstNameError}
                value={this.state.firstName}
                onChange={this.handleFormInput}
              />

              <TextField
                variant="outlined"
                required
                fullWidth
                className={style.styleFormFields}
                required
                id="lastName"
                size="small"
                label="Last Name"
                name="lastName"
                autoComplete="lastName"
                error={this.state.lastNameError}
                value={this.state.lastName}
                onChange={this.handleFormInput}
              />

              <TextField
                variant="outlined"
                required
                fullWidth
                className={style.styleFormFields}
                required
                size="small"
                id="phone"
                label="Phone Number"
                name="phone"
                autoComplete="phone"
                error={this.state.phoneError}
                value={this.state.phone}
                onChange={this.handleFormInput}
              />

              <TextField
                variant="outlined"
                required
                fullWidth
                className={style.styleFormFields}
                required
                size="small"
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                error={this.state.emailError}
                value={this.state.email}
                onChange={this.handleFormInput}
              />
            </form>
            <h5>Alternate Contact</h5>
            {this.state.subContacts.length > 0 ? (
              this.state.subContacts?.map((x, i) => {
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
    ) : null;
  }
}

var actions = {
  updateCustomer,
};
export default connect(null, actions)(CustomerUpdate);
