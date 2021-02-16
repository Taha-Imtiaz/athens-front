import React, { Component } from "react";
import { connect } from "react-redux";
import { addCustomer } from "../../../Redux/Customer/customerActions";
import { resetCustomerForm, setCustomerForm } from "../../../Redux/PersistForms/formActions";
import "react-toastify/dist/ReactToastify.css";
import { TextField } from "@material-ui/core";
import style from "./CreateCustomer.module.css";
import Button from "@material-ui/core/Button";

class CreateCustomer extends Component {
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
    // let phoneError = "";

    const mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    if (!this.state.email.match(mailformat)) {
      emailError = "Invalid Email";
    }

    if (!this.state.firstName) {
      firstNameError = "First Name should not be empty";
    }

    if (!this.state.lastName) {
      lastNameError = "Last Name should not be empty";
    }

    // if (!this.state.phone) {
    //   phoneError = "Phone Number should not be empty";
    // }

    if (emailError || firstNameError || lastNameError) {
      this.setState({
        firstNameError,
        lastNameError,
        emailError,
      });
      return false;
    }

    return true;
  };

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

  //onChange handler of form
  handleFormInput = (event) => {
    const { name, value } = event.target;
    if (name === 'phone') {
      this.setState(prevState => ({ phone: this.handlePhoneNumberInput(value, prevState.phone) }))
    } else {
      this.setState({ [name]: value });
      if (value === "") {
        this.setState({ [name + "Error"]: "Field Should not be empty" });
      } else {
        this.setState({ [name + "Error"]: "" });
      }
    }
  };

  //onChange handler of subContact
  hanldeContactsInput = (event, i) => {
    const { name, value } = event.target;
    let updatedContacts = this.state.subContacts.slice();
    if (name === 'phone') {
      this.setState(prevState => ({ subContacts: this.handleSubPhoneNumberInput(value, prevState, i) }))
    } else {
      updatedContacts[i][name] = value;
      this.setState({ subContacts: updatedContacts });
    }
  };
  //this handler is clicked when the form is submitted
  mySubmitHandler = (event) => {
    let { addCustomer, history } = this.props;
    event.preventDefault();

    const isValid = this.validate();
    if (isValid) {
      let { firstName, lastName, email, phone, subContacts } = this.state;
      //check if the subContacts fields are empty
      if (
        this.state.subContacts[0].name === "" &&
        this.state.subContacts[0].phone === "" &&
        this.state.subContacts[0].email === ""
      ) {
        subContacts = [];
      }

      let addCustomerObj = {
        firstName,
        lastName,
        phone,
        email,
        subContacts,
      };
      //Call addCustomer Api
      addCustomer(addCustomerObj, (res) => {
        if (this.props.isModal) {
          this.props.close(res);
        } else {
           //reset form to its original state
          this.handleResetForm()
          history.push("/customer/detail/" + res.data.data._id);
          
          console.log(this.initialState)
        }
      });
    }
  };
  //function to addSubContacts(if the subContacts are greater 1)
  addContacts = () => {
    let { subContacts } = this.state;
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
    let { setCustomerForm } = this.props;
    setCustomerForm({ ...this.state });
  }
  //reset form (clear values from all fields)
  handleResetForm = () => {
    let { resetCustomerForm } = this.props;

    resetCustomerForm();
    this.setState({ ...this.initialState });
  };

  render() {
    return (
      <div className={this.props.isModal !== true && `${style.formStyle}`}>
        <div className={this.props.isModal !== true && `${style.form}`}>
          {this.props.isModal !== true && (
            <h3 className={style.head}>Create Customer</h3>
          )}
          <div>
            <form onSubmit={this.mySubmitHandler}>
              <TextField
                variant="outlined"
                className={style.styleFormFields}
                required
                id="firstName"
                size="small"
                label="First Name"
                fullWidth
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
                className={style.styleFormFields}
                id="lastName"
                fullWidth
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
                className={style.styleFormFields}
                size="small"
                fullWidth
                id="phone"
                label="Phone Number"
                name="phone"
                autoComplete="phone"
                // error={this.state.phoneError ? true : false}
                value={this.state.phone}
                onChange={this.handleFormInput}
              />

              <TextField
                variant="outlined"
                required
                className={style.styleFormFields}
                size="small"
                id="email"
                fullWidth
                label="Email Address"
                name="email"
                autoComplete="email"
                error={this.state.emailError ? true : false}
                value={this.state.email}
                onChange={this.handleFormInput}
              />
            </form>
            <h5>Alternate Contact</h5>
            {this.state.subContacts.map((x, i) => {
              return (
                <div key={i}>
                  <form>
                    <TextField
                      variant="outlined"
                      required
                      size="small"
                      className={style.styleFormFields}
                      fullWidth
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
                      size="small"
                      id="phone_number"
                      label="Phone Number"
                      className={style.styleFormFields}
                      name="phone"
                      fullWidth
                      autoComplete="phone_number"
                      value={this.state.subContacts[i].phone}
                      onChange={(e) => this.hanldeContactsInput(e, i)}
                    />

                    <TextField
                      variant="outlined"
                      required
                      id="emailalt"
                      label="Email Address"
                      size="small"
                      className={style.styleFormFields}
                      name="email"
                      fullWidth
                      autoComplete="emailalt"
                      value={this.state.subContacts[i].email}
                      onChange={(e) => this.hanldeContactsInput(e, i)}
                    />
                  </form>
                </div>
              );
            })}

            <div
              className={
                this.props.isModal !== true
                  ? style.styleAddBtn
                  : style.modalAddBtn
              }
            >
              <div
                className={
                  this.props.isModal !== true ? style.addBtn : style.modalBtn
                }
              >
                <Button onClick={this.addContacts} className={style.button}>
                  Add Another
                </Button>
              </div>
            </div>

            <div className={style.resetButtons}>
              <div className={style.formResetButton}>
                <Button
                  onClick={this.handleResetForm}
                  className={`${style.formButton}`}
                >
                  Reset
                </Button>
              </div>
              <div className={style.formSubmitButton}>
                <Button
                  onClick={this.mySubmitHandler}
                  className={`${style.formButton}`}
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
  addForm: state.forms.addCustomerForm
});

var actions = {
  addCustomer,
  setCustomerForm,
  resetCustomerForm
};

export default connect(mapStateToProps, actions)(CreateCustomer);
