import React, { useEffect } from "react";
import style from "./AccountDisplay.module.css";
import { Switch, Link } from "react-router-dom";
import AccountUpdate from "../AccountUpdate/AccountUpdate";
import { Button, TextField } from "@material-ui/core";
import { getUserData, updateUser } from "../../../Redux/User/userActions";
import { useState } from "react";
import { getLoginUser } from "../../../Redux/User/userActions";
import { connect } from "react-redux";

const AccountDisplay = (props) => {
  var { loggedInUser } = props;
  var [disabledForm, setDisabledForm] = useState(true)

  var [editAccount, setEditAccount] = useState({
    name: "",
    email: "",
    password: "",
    address: "",
    phone: "",
    nameError: "",
    emailError: "",
    passwordError: "",
    phoneError: "",
    addressError: "",
  });

  useEffect(() => {
    var userId = loggedInUser?._id;
    getUserData(userId)
      .then((res) => {
        var { user } = res.data;
        var { name, email, password, address, phone } = user;
        setEditAccount({
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
    console.log(userId);
  }, [loggedInUser]);

  const validate = () => {
    // let nameError = "";
    // let emailError = "";
    // let passwordError = "";
    // var phoneError = "";
    // var addressError = "";

    var mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    if (!editAccount.name) {
      // setNameError("Name should not be empty") ;
      editAccount.nameError = "Name should not be empty";
    }

    if (!editAccount.email.match(mailformat)) {
      // setEmailError("Invalid Email");
      editAccount.emailError = "Invalid Email";
    }

    if (!editAccount.password) {
      // setPasswordError("Password should not be empty");
      editAccount.passwordError = "Password should not be empty";
    }

    if (!editAccount.phone) {
      //  setPhoneError("Phone should not be empty") ;
      editAccount.phoneError = "Phone should not be empty";
    }

    if (!editAccount.address) {
      //  setAddressError("Address should not be empty");
      editAccount.addressError = "Address should not be empty";
    }

    if (
      editAccount.nameError ||
      editAccount.emailError ||
      editAccount.passwordError ||
      editAccount.phoneError ||
      editAccount.addressError
    ) {
      return false;
    }

    return true;
  };

  const handleFormInput = (event) => {
    var { name, value } = event.target;
    setEditAccount((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    if (value == "") {
      setEditAccount((prevState) => ({
        ...prevState,
        [name + "Error"]: "Should not be empty",
      }));
    } else {
      setEditAccount((prevState) => ({
        ...prevState,
        [name + "Error"]: "",
      }));
    }
    console.log(name, value);
  };

  const mySubmitHandler = (event) => {
    event.preventDefault();

    const isValid = validate();
    if (isValid) {
      var { name, email, password, address, phone } = editAccount;
      var updatedUserObj = {
        name,
        email,
        password,
        address,
        phone,
      };
      const { updateUser, history } = props;
      updateUser(updatedUserObj, loggedInUser._id)
        .then((res) => {
          // history.push("/account");
          setDisabledForm(true)
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
  return (
    <div
      className={style.accountContainer}

      // style={{
      //   display: "flex",
      //   justifyContent: "center",
      //   alignItems: "center",
      // }}
    >
      {loggedInUser && (
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
                disabled = {disabledForm}
                fullWidth
                size="small"
                id="name"
                label="Enter Name"
                name="name"
                value={editAccount.name}
                onChange={handleFormInput}
                error={editAccount.nameError}
              />
            </div>

            <div className="form-group" style={{ margin: "1rem 2rem" }}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                size="small"
                disabled = {disabledForm}
                id="email"
                label="Enter Email"
                name="email"
                value={editAccount.email}
                onChange={handleFormInput}
                error={editAccount.emailError}
              />
            </div>

            <div className="form-group" style={{ margin: "1rem 2rem" }}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                disabled = {disabledForm}
                size="small"
                id="name"
                label="Enter Phone"
                name="phone"
                value={editAccount.phone}
                onChange={handleFormInput}
                error={editAccount.phoneError}
              />
            </div>

            <div className="form-group" style={{ margin: "1rem 2rem" }}>
              <TextField
                variant="outlined"
                margin="normal"
                disabled = {disabledForm}
                required
                fullWidth
                size="small"
                id="name"
                label="Enter Address"
                name="address"
                value={editAccount.address}
                error={editAccount.addressError}
                onChange={handleFormInput}
              />
            </div>

            <div className="form-group" style={{ margin: "1rem 2rem" }}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                disabled = {disabledForm}
                fullWidth
                size="small"
                type="password"
                id="password"
                label="Enter Password"
                name="password"
                value={editAccount.password}
                onChange={handleFormInput}
                error={editAccount.passwordError}
              />
            </div>
          </form>
         {!disabledForm && <div className={style.btn} style={{ margin: "1rem 2rem" }}>
            <Button
              className={`btn btn-primary`}
              style={{
                width: "100% ",
                background: "#00ADEE",
                textTransform: "none",
                color: "#FFF",
                fontFamily: "sans-serif",
              }}
              onClick={mySubmitHandler}
            >
              Update
            </Button>
          </div>}
        </div>
      )}
      <div className={style.profile}>
        <div className={`${style.content} `}>
          <div className={`${style.profilePic} ${style.flex}`}></div>
          <div className={`${style.accountHolderName} ${style.flex}`}>
            {loggedInUser?.name}
          </div>
          <div className={`${style.accountHolderRole} ${style.flex}`}>
            {loggedInUser?.role}
          </div>
          <div className={`${style.editButton} `}>
            <Button onClick = {() => setDisabledForm(false)}
              style={{
                background: "#00ADEE",
                border: "transparent",
                color: "#ffffff",
                padding: "0.5rem",
                borderRadius: "0.25rem",
                fontFamily: "sans-serif",
                textTransform: "none",
                width: "90%",
                margin:"auto",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              Edit
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

const action = {
  getLoginUser,
  updateUser,
};

var mapStateToProps = (state) => ({
  loggedInUser: state.users.user,
});

export default connect(mapStateToProps, action)(AccountDisplay);
