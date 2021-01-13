import React, { useEffect } from "react";
import style from "./AccountDisplay.module.css";
import { Switch, Link } from "react-router-dom";
import AccountUpdate from "../AccountUpdate/AccountUpdate";
import { Button, TextField } from "@material-ui/core";
import {
  getUserData,
  resetPassword,
  updateUser,
} from "../../../Redux/User/userActions";
import { useState } from "react";
import { getLoginUser } from "../../../Redux/User/userActions";
import { connect } from "react-redux";
import { Modal } from "react-bootstrap";
import { showMessage } from "../../../Redux/Common/commonActions";

const AccountDisplay = (props) => {
  var { loggedInUser } = props;
  var [disabledForm, setDisabledForm] = useState(true);
  var [showModal, setShowModal] = useState(false);

  var [editAccount, setEditAccount] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    address: "",
    phone: "",
    nameError: "",
    emailError: "",
    passwordError: "",
    phoneError: "",
    addressError: "",
    confirmPasswordError: "",
  });

  useEffect(() => {
    var userId = loggedInUser?._id;
    if (userId) {
      getUserData(userId)
        .then((res) => {
          console.log(res.data);
          var { data } = res.data;
          var { name, email, address, phone } = data;
          setEditAccount({
            name,
            email,
            address,
            phone,
          });
        })
        .catch((error) => {
          console.log(error);
        });
      console.log(userId);
    }
  }, [loggedInUser]);

  const validate = () => {
    // let nameError = "";
    // let emailError = "";
    // let passwordError = "";
    // var phoneError = "";
    // var addressError = "";
    console.log("validate");
    var mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    var newData = { ...editAccount };

    if (!editAccount.name) {
      // setNameError("Name should not be empty") ;
      newData.nameError = "Name should not be empty";
    }

    if (!editAccount.email.match(mailformat)) {
      // setEmailError("Invalid Email");
      newData.emailError = "Invalid Email";
    }

    if (!editAccount.phone) {
      //  setPhoneError("Phone should not be empty") ;
      newData.phoneError = "Phone should not be empty";
    }

    if (!editAccount.address) {
      //  setAddressError("Address should not be empty");
      newData.addressError = "Address should not be empty";
    }

    if (
      newData.nameError ||
      newData.emailError ||
      //  newData.passwordError ||
      //  newData.confirmPasswordError ||
      newData.phoneError ||
      newData.addressError
    ) {
      setEditAccount(newData);
      console.log(editAccount);
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
  var validateModalInputs = () => {
    var newData = { ...editAccount };
    if (!editAccount.password) {
      // setPasswordError("Password should not be empty");
      newData.passwordError = "Password should not be empty";
    }

    if (editAccount.password !== editAccount.confirmPassword) {
      // setPasswordError("Password should not be empty");
      newData.confirmPasswordError = "Password do not match";
    }
    if (newData.passwordError || newData.confirmPasswordError) {
      setEditAccount(newData);
      return false;
    }
    return true;
  };

  var handleModalInput = (e) => {
    var { showMessage } = props;
    var userToken = localStorage.getItem("athens-token");
    console.log("submit handler called");
    e.preventDefault();
    var validateModal = validateModalInputs();
    if (validateModal) {
      var { password, confirmPassword } = editAccount;
      var resetPasswordObj = {
        password,
        token: userToken,
      };
      resetPassword(resetPasswordObj).then((res) => {
        console.log(res);
        if (res.data.status === 200) {
          setShowModal(false);
          showMessage(res.data.message);
        }
      });
    }
  };
  const mySubmitHandler = (event) => {
    event.preventDefault();

    const isValid = validate();
    console.log(isValid);
    if (isValid) {
      var { name, email, address, phone } = editAccount;
      var updatedUserObj = {
        name,
        email,

        address,
        phone,
      };
      const { updateUser, history } = props;
      updateUser(updatedUserObj, loggedInUser._id)
        .then((res) => {
          // history.push("/account");
          setDisabledForm(true);
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
                disabled={disabledForm}
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
                disabled={disabledForm}
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
                disabled={disabledForm}
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
                disabled={disabledForm}
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
              {/* <TextField
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
              /> */}
            </div>
          </form>
          {!disabledForm && (
            <div className={style.btn} style={{ margin: "1rem 2rem" }}>
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
            </div>
          )}
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
            <div>
              <Button
                onClick={() => setDisabledForm(false)}
                style={{
                  background: "#00ADEE",
                  border: "transparent",
                  color: "#ffffff",
                  // padding: "0.5rem",
                  borderRadius: "0.25rem",
                  fontFamily: "sans-serif",
                  textTransform: "none",
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                Edit
              </Button>
            </div>
            <div>
              <Button
                onClick={() => {
                  setShowModal(true);
                }}
                style={{
                  background: "#00ADEE",
                  border: "transparent",
                  color: "#ffffff",
                  // padding: "0.5rem",
                  borderRadius: "0.25rem",
                  fontFamily: "sans-serif",
                  textTransform: "none",
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                Reset Password
              </Button>
            </div>
          </div>
        </div>
      </div>
      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        // dialogClassName={`${style.modal}`}
        centered
        scrollable
        // backdrop = {false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Reset Password</Modal.Title>
        </Modal.Header>
        <Modal.Body>
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
            value={editAccount.password}
            onChange={handleFormInput}
            error={editAccount.passwordError}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            size="small"
            type="password"
            id="confirmPassword"
            label="Confirm Password"
            name="confirmPassword"
            value={editAccount.confirmPassword}
            onChange={handleFormInput}
            error={editAccount.confirmPasswordError}
          />
          {/* Are you sure you want to delete this Blanket Deposit? */}
        </Modal.Body>
        <Modal.Footer>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "flex-end",
            }}
          >
            <Button
              style={{
                background: "#00ADEE",
                textTransform: "none",
                color: "#FFF",
                fontFamily: "sans-serif",
                width: "100%",
                margin: "0 0.6rem",
              }}
              onClick={handleModalInput}
            >
              Confirm
            </Button>
            <Button
              style={{
                background: "#00ADEE",
                textTransform: "none",
                color: "#FFF",
                fontFamily: "sans-serif",
                width: "100%",
              }}
              onClick={() => setShowModal(false)}
            >
              Cancel
            </Button>
          </div>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

const action = {
  getLoginUser,
  updateUser,
  showMessage,
};

var mapStateToProps = (state) => ({
  loggedInUser: state.users.user,
});

export default connect(mapStateToProps, action)(AccountDisplay);
