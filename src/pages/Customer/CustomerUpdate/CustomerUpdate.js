import { Button, TextField } from "@material-ui/core";
import React, { Component } from "react";
import { connect } from "react-redux";

import {
  fetchCustomerById,
  updateCustomer,
} from "../../../Redux/Customer/customerActions";

import style from "./CustomerUpdate.module.css";
class CustomerUpdate extends Component {
  componentDidMount = () => {
    var {
      match: {
        params: { id },
      },
    } = this.props;
    fetchCustomerById(id)
      .then((res) => {
        this.setState({
          customer: res.data?.customer,
          firstName: res.data.customer?.firstName,
          lastName: res.data.customer?.lastName,
          phone: res.data.customer?.phone,
          email: res.data.customer?.email,
          subContacts: res.data.customer?.subContacts,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  handleFormInput = (event) => {
    var { name, value } = event.target;
    this.setState({ [name]: value });
    if (value == "") {
      this.setState({ [name + "Error"]: "Field Should not be empty" });
    } else {
      this.setState({ [name + "Error"]: "" });
    }
  };

  hanldeContactsInput = (e, i) => {
    let updatedContacts = this.state.subContacts.slice();
    updatedContacts[i][e.target.name] = e.target.value;
    this.setState({ subContacts: updatedContacts });
  };
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
                error={this.state.firstNameError}
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
                error={this.state.lastNameError}
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
                error={this.state.phoneError}
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
                error={this.state.emailError}
                value={this.state.email}
                onChange={this.handleFormInput}
              />
            </form>
            <h5 style={{ margin: "0 2rem" }}>Alternate Contact</h5>
            {this.state.subContacts.length > 0 ? (
              this.state.subContacts?.map((x, i) => {
                return (
                  <div key={i}>
                    <form>
                      <TextField
                        variant="outlined"
                        required
                        style={{ margin: "1rem 2rem", width: "92%" }}
                        size="small"
                        // required

                        id="name"
                        label="Name"
                        name="name"
                        autoComplete="name"
                        //   error={this.state.subContactPhoneError}
                        value={this.state.subContacts[i].name}
                        onChange={(e) => this.hanldeContactsInput(e, i)}
                      />

                      <TextField
                        variant="outlined"
                        required
                        style={{ margin: "1rem 2rem", width: "92%" }}
                        size="small"
                        // required
                        type="number"
                        id="phone_number"
                        label="Phone Number"
                        name="phone"
                        autoComplete="phone_number"
                        //   error={this.state.subContactPhoneError}
                        value={this.state.subContacts[i].phone}
                        onChange={(e) => this.hanldeContactsInput(e, i)}
                      />

                      {/* <InputLabel htmlFor="emailalt">Email address</InputLabel>
                                          <Input type="email" id = "emailalt"  name="email" value={this.state.subContacts[i].email} onChange={(e) => this.hanldeContactsInput(e, i)} /> */}
                      {/* <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small> */}
                      <TextField
                        variant="outlined"
                        required
                        style={{ margin: "1rem 2rem", width: "92%" }}
                        // required

                        id="emailalt"
                        label="Email Address"
                        size="small"
                        name="email"
                        autoComplete="emailalt"
                        //   error={this.state.subContactEmailError}
                        value={this.state.subContacts[i].email}
                        onChange={(e) => this.hanldeContactsInput(e, i)}
                      />
                    </form>
                  </div>
                );
              })
            ) : (
              <div className="form-group">
                <div
                  style={{ float: "right", marginRight: "2.2rem" }}
                  className="row"
                >
                  <Button
                    onClick={this.addAlternateContact}
                    style={{
                      background: "#00ADEE",
                      textTransform: "none",
                      color: "#FFF",
                      fontFamily: "sans-serif",
                    }}
                  >
                    Add Alternate Contact
                  </Button>
                </div>
              </div>
            )}
            {this.state.subContacts.length > 0 && (
              <div className="form-group">
                <div
                  style={{ float: "right", marginRight: "2.2rem" }}
                  className="row"
                >
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
            )}

            <Button
              onClick={this.mySubmitHandler}
              className={style.button}
              style={{
                background: "#00ADEE",
                marginBottom: "1rem",
                marginLeft: "1rem",
                marginRight: "0",
                width: "92%",
                textTransform: "none",
                color: "#FFF",
                fontFamily: "sans-serif",
              }}
            >
              Update
            </Button>
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
