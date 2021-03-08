import React, { Component } from "react";
import style from "./CreateUser.module.css";
import { Button } from "@material-ui/core";
import { createUser } from "../../../Redux/User/userActions";
import "react-toastify/dist/ReactToastify.css";
import { connect } from "react-redux";
import { TextField } from "@material-ui/core";
import Autocomplete from '@material-ui/lab/Autocomplete';

const initialState = {
  name: "",
  email: "",
  phone: "",
  address: "",
  type: "",
  attribute: "",
  nameError: "",
  emailError: "",
  phoneError: "",
  addressError: "",
  typeError: "",
  attributeError: "",
};

class CreateUser extends Component {
  typeOptions = [
    { name: "Manager", id: 1 },
    { name: "Mover", id: 2 },
  ];
  attributeOptions = [
    { name: "Crew Leaders" },
    { name: "Movers" },
    { name: "New Movers" },
  ];

  constructor(props) {
    super(props);

    this.state = initialState;
    
  }
  onTypeSelect = (selectedList, selectedItem) => {
    this.setState({ type: selectedItem });
  };

  onAttributeSelect = (selectedList, selectedItem) => {
    this.setState({ attribute: selectedItem.name });
  };

  validate = () => {
    let nameError = "";
    let emailError = "";
    let phoneError = "";
    let addressError = "";
    let typeError = "";
    let attributeError = "";

    let mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    if (!this.state.name) {
      nameError = "Name should not be empty";
    }

    if (!this.state.email.match(mailformat)) {
      emailError = "Invalid Email";
    }

    if (!this.state.phone) {
      phoneError = "Number should not be empty";
    }

    if (!this.state.address) {
      addressError = "Address should not be empty";
    }

    if (!this.state.type) {
      typeError = "Type should not be empty";
    }

    if (!this.state.attribute) {
      attributeError = "Attribute should not be empty";
    }

    if (
      nameError ||
      emailError ||
      phoneError ||
      addressError ||
      typeError ||
      attributeError
    ) {
      this.setState({
        nameError,
        emailError,
        phoneError,
        addressError,
        typeError,
        attributeError,
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

  handleFormInput = (event) => {

    let { name, value } = event.target;
    if (name === 'phone') {
      this.setState(prevState => ({ phone: this.handlePhoneNumberInput(value, prevState.phone) }))
    } else {
      this.setState({ [name]: value });
    }
    if (value === "") {
      this.setState({ [name + "Error"]: "Should not be empty" });
    } else {
      this.setState({ [name + "Error"]: "" });
    }
  };

  mySubmitHandler = (event) => {
    event.preventDefault();
    const isValid = this.validate();
    let { createUser, history } = this.props;

    if (isValid) {
      let { name, phone, email, address, type, attribute } = this.state;
      let createdUserObj = {
        name,
        phone,
        address,
        email,
        role: type.name.toLowerCase(),
        attribute,
      };
      createUser(createdUserObj, () => history.push("/users"))
    }
  };

  render() {
    return (
      <div className={style.userContainer}>
        <div className={`${style.userForm}`}>
          <h3 className={style.head}>Create User</h3>

          <div>
            <form>
              <TextField
                variant="outlined"
                required
                fullWidth
                size="small"
                autoFocus
                id="name"
                label="Full Name"
                name="name"
                value={this.state.name}
                onChange={this.handleFormInput}
                error={this.state.nameError ? true : false}
                className={style.styleFormFields}
              />

              <TextField
                variant="outlined"
                required
                fullWidth
                size="small"
                id="email"
                label="Email Address"
                name="email"
                value={this.state.email}
                onChange={this.handleFormInput}
                error={this.state.emailError ? true : false}
                className={style.styleFormFields}
              />

              <TextField
                variant="outlined"
                required
                fullWidth
                size="small"
                id="phnumber"
                label="Phone Number"
                name="phone"
                value={this.state.phone}
                onChange={this.handleFormInput}
                error={this.state.phoneError ? true : false}
                className={style.styleFormFields}
              />

              <TextField
                variant="outlined"
                required
                fullWidth
                size="small"
                id="address"
                label="Address"
                name="address"
                value={this.state.address}
                error={this.state.addressError ? true : false}
                onChange={this.handleFormInput}
                className={style.styleAddress}
              />

           
               <Autocomplete
      id="combo-box-demo"
      options={this.typeOptions}
      onChange={this.onTypeSelect} 
      getOptionLabel={(option) => option.name}
      className={style.styleMultiSelect}
      size = "small"
      renderInput={(params) => <TextField 
        {...params} label="Select Type" variant="outlined" />}
    />

              
                 <Autocomplete
      id="combo-box-demo"
      options={this.attributeOptions}
      onChange = {this.onAttributeSelect}
      getOptionLabel={(option) => option.name}
      className={style.styleMultiSelect}
      size = "small"
      renderInput={(params) => <TextField 
        {...params} label="Select Attribute" variant="outlined" />}
    />

              <div className={style.createBtn}>
                <Button className={style.button} onClick={this.mySubmitHandler}>
                  Create
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

var actions = {
  createUser
};

export default connect(null, actions)(CreateUser);
