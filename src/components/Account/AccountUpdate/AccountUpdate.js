import React, { Component } from "react";
import style from "./AccountUpdate.module.css";
import Button from "../../Button/Button";
import API from "../../../utils/api";
import { getUserData, updateUser } from "../../../Redux/User/userActions";
import { connect } from "react-redux";
import { TextField } from "@material-ui/core";

const initialState = {
  name: "",
  email: "",
  password: "",
  address: "",
  phone: "",
  nameError: "",
  emailError: "",
  passwordError: "",
};

class AccountUpdate extends Component {
  constructor(props) {
    super(props);
    this.state = initialState;
  }

  componentDidMount = () => {
    var userId = this.props.location.userId;
    var { history } = this.props;
    if (!userId) {
      history.push("/account");
    } else {
      getUserData(userId)
        .then((res) => {
          var { user } = res.data;
          var { name, email, password, address, phone } = user;
          this.setState({
            name,
            email,
            password,
            address,
            phone,
          });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  validate = () => {
    // var {username,password,emailError,passwordError} = this.state
    let nameError = "";
    let emailError = "";
    let passwordError = "";
    var phoneError = "";
    var addressError = "";

    var mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    if (!this.state.name) {
      nameError = "Name should not be empty";
    }

    if (!this.state.email.match(mailformat)) {
      emailError = "Invalid Email";
    }

    if (!this.state.password) {
      passwordError = "Password should not be empty";
    }

    if (!this.state.phone) {
      phoneError = "Phone should not be empty";
    }

    if (!this.state.address) {
      addressError = "Address should not be empty";
    }

    if (
      nameError ||
      emailError ||
      passwordError ||
      phoneError ||
      addressError
    ) {
      this.setState({
        nameError,
        emailError,
        passwordError,
        phoneError,
        addressError,
      });
      return false;
    }

    return true;
  };

  handleFormInput = (event) => {
    var { name, value } = event.target;
    this.setState({ [name]: value });
    if (value == "") {
      this.setState({ [name + "Error"]: "Should not be empty" });
    } else {
      this.setState({ [name + "Error"]: "" });
    }
  };

  mySubmitHandler = (event) => {
    event.preventDefault();

    const isValid = this.validate();
    if (isValid) {
      var { name, email, password, address, phone } = this.state;
      var updatedUserObj = {
        name,
        email,
        password,
        address,
        phone,
      };
      const { updateUser, history } = this.props;
      updateUser(updatedUserObj, this.props.location.userId)
        .then((res) => {
          history.push("/account");
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  render() {
    return (
      <div className={style.head}>
        <div className={style.form}>
          <h3
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginTop: "2rem",
            }}
          >
            Account
          </h3>
          <form>
            <div className="form-group" style={{ margin: "1rem 2rem" }}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                size="small"
                id="name"
                label="Enter Name"
                name="name"
                value={this.state.name}
                onChange={this.handleFormInput}
                error = {this.state.nameError}
              />
            </div>

            <div className="form-group" style={{ margin: "1rem 2rem" }}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                size="small"
                id="email"
                label="Enter Email"
                name="email"
                value={this.state.email}
                onChange={this.handleFormInput}
                error = {this.state.emailError}
              />
            </div>

          

            <div className="form-group" style={{ margin: "1rem 2rem" }}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                size="small"
                id="name"
                label="Enter Phone"
                name="phone"
                value={this.state.phone}
                onChange={this.handleFormInput}
                error = {this.state.phoneError}
              />
            </div>


            <div className="form-group" style={{ margin: "1rem 2rem" }}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                size="small"
                id="name"
                label="Enter Address"
                name="address"
                value={this.state.address}
                error = {this.state.addressError}
                onChange={this.handleFormInput}
              />
            </div>

         

            <div className="form-group" style={{ margin: "1rem 2rem" }}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                size="small"
                type="password"
                id="password"
                label="Enter Password"
                name="password"
                value={this.state.password}
                onChange={this.handleFormInput}
                error = {this.state.passwordError}
              />
            </div>

           
          </form>
          <div className={style.btn} style={{ margin: "1rem 2rem" }}>
            <button
              className={`btn btn-primary`}
              style={{ width: "100% ", background: "#00ADEE" }}
              onClick={this.mySubmitHandler}
            >
              Update
            </button>
          </div>
        </div>
      </div>
    );
  }
}

var actions = {
  updateUser,
};

export default connect(null, actions)(AccountUpdate);
