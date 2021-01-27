import React, { Component } from "react";
import style from "./CreateUser.module.css";
import { Button } from "@material-ui/core";
import { Multiselect } from "multiselect-react-dropdown";
import { createUser } from "../../../Redux/User/userActions";
import "react-toastify/dist/ReactToastify.css";
import { connect } from "react-redux";
import { showMessage } from "../../../Redux/Common/commonActions";
import { TextField } from "@material-ui/core";

const initialState = {
  name: "",
  email: "",
  phone: "",
  address: "",
  type: "",
  attributes: "",
  nameError: "",
  emailError: "",
  numberError: "",
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
    { name: "crew leaders  " },
    { name: "movers" },
    { name: "new movers" },
    { name: "new Manager" },
  ];

  constructor(props) {
    super(props);

    this.state = initialState;
    this.style = {
      multiselectContainer: {
        margin: "1rem 0 ",
      },
    };
  }
  onTypeSelect = (selectedList, selectedItem) => {
    this.setState({ type: selectedItem });
  };

  onAttributeSelect = (selectedList, selectedItem) => {
    this.setState({ attributes: selectedItem });
  };

  validate = () => {
    let nameError = "";
    let emailError = "";
    let numberError = "";
    let addressError = "";
    let typeError = "";
    let attributeError = "";

    var mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    if (!this.state.name) {
      nameError = "Name should not be empty";
    }

    if (!this.state.email.match(mailformat)) {
      emailError = "Invalid Email";
    }

    if (!this.state.phone) {
      numberError = "Number should not be empty";
    }

    if (!this.state.address) {
      addressError = "Address should not be empty";
    }

    if (!this.state.type) {
      typeError = "Type should not be empty";
    }

    if (!this.state.attributes) {
      attributeError = "Attribute should not be empty";
    }

    if (
      nameError ||
      emailError ||
      numberError ||
      addressError ||
      typeError ||
      attributeError
    ) {
      this.setState({
        nameError,
        emailError,
        numberError,
        addressError,
        typeError,
        attributeError,
      });
      return false;
    }

    return true;
  };

  handleFormInput = (event) => {
    var { name, value } = event.target;
    this.setState({ [name]: value });
    if (value === "") {
      this.setState({ [name + "Error"]: "Should not be empty" });
    } else {
      this.setState({ [name + "Error"]: "" });
    }
  };

  mySubmitHandler = (event) => {
    event.preventDefault();
    const isValid = this.validate();
    var { showMessage, history } = this.props;

    if (isValid) {
      var { name, phone, email, address, type, attributes } = this.state;
      var createdUserObj = {
        name,
        phone,
        address,
        email,
        role: type.name.toLowerCase(),
        attributes,
      };
      createUser(createdUserObj)
        .then((res) => {
          showMessage(res.data.message);
          history.push("/users");
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  render() {
    return (
      <div className={style.userContainer}>
        <div className={style.userForm}>
          <h3 className={style.head}>Create New User</h3>

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
                error={this.state.numberError ? true : false}
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

              <Multiselect
                singleSelect={true}
                options={this.typeOptions} // Options to display in the dropdown
                onSelect={this.onTypeSelect} // Function will trigger on select event
                onRemove={this.onRemove} // Function will trigger on remove event
                displayValue="name" // Property name to display in the dropdown options
                className={`form-control `}
                placeholder="Select Type"
                error={this.state.typeError ? true : false}
                style={this.style}
              />

              <Multiselect
                singleSelect={true}
                options={this.attributeOptions} // Options to display in the dropdown
                onSelect={this.onAttributeSelect} // Function will trigger on select event
                onRemove={this.onRemove} // Function will trigger on remove event
                displayValue="name" // Property name to display in the dropdown options
                className={`form-control `}
                placeholder="Select Attribute"
                error={this.state.attributeError ? true : false}
                style={this.style}
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
  showMessage,
};

export default connect(null, actions)(CreateUser);
