import React, { useEffect } from "react";
import style from "./AccountDisplay.module.css";

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
    }
  }, [loggedInUser]);

  const validate = () => {
    var mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    var newData = { ...editAccount };

    if (!editAccount.name) {
      newData.nameError = "Name should not be empty";
    }

    if (!editAccount.email.match(mailformat)) {
      newData.emailError = "Invalid Email";
    }

    if (!editAccount.phone) {
      newData.phoneError = "Phone should not be empty";
    }

    if (!editAccount.address) {
      newData.addressError = "Address should not be empty";
    }

    if (
      newData.nameError ||
      newData.emailError ||
      newData.phoneError ||
      newData.addressError
    ) {
      setEditAccount(newData);
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
    if (value === "") {
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
  };
  var validateModalInputs = () => {
    var newData = { ...editAccount };
    if (!editAccount.password) {
      newData.passwordError = "Password should not be empty";
    }

    if (editAccount.password !== editAccount.confirmPassword) {
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
    e.preventDefault();
    var validateModal = validateModalInputs();
    if (validateModal) {
      var { password } = editAccount;
      var resetPasswordObj = {
        password,
        token: userToken,
      };
      resetPassword(resetPasswordObj).then((res) => {
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
    if (isValid) {
      var { name, email, address, phone } = editAccount;
      var updatedUserObj = {
        name,
        email,

        address,
        phone,
      };
      const { updateUser } = props;
      updateUser(updatedUserObj, loggedInUser._id)
        .then((res) => {
          setDisabledForm(true);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
  return (
    <div className={style.accountContainer}>
      {loggedInUser && (
        <div className={style.form}>
          <h3 className={`${style.flex} ${style.header}`}>Account</h3>
          <form>
            <TextField
              variant="outlined"
              required
              disabled={disabledForm}
              fullWidth
              size="small"
              id="name"
              label="Enter Name"
              name="name"
              className={style.styleFormFields}
              value={editAccount.name}
              onChange={handleFormInput}
              error={editAccount.nameError ? true: false}
            />

            <TextField
              variant="outlined"
              required
              fullWidth
              size="small"
              disabled={disabledForm}
              id="email"
              label="Enter Email"
              name="email"
              value={editAccount.email}
              onChange={handleFormInput}
              error={editAccount.emailError ? true: false}
              className={style.styleFormFields}
            />

            <TextField
              variant="outlined"
              required
              fullWidth
              disabled={disabledForm}
              size="small"
              id="name"
              label="Enter Phone"
              name="phone"
              value={editAccount.phone}
              onChange={handleFormInput}
              error={editAccount.phoneError? true: false}
              className={style.styleFormFields}
            />

            <TextField
              variant="outlined"
              disabled={disabledForm}
              required
              fullWidth
              size="small"
              id="name"
              label="Enter Address"
              name="address"
              value={editAccount.address}
              error={editAccount.addressError? true: false}
              onChange={handleFormInput}
              className={style.styleFormFields}
            />
          </form>
          {!disabledForm && (
            <div className={style.btn}>
              <Button className={` ${style.button}`} onClick={mySubmitHandler}>
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
                className={style.button}
                onClick={() => setDisabledForm(false)}
              >
                Edit
              </Button>
            </div>
            <div>
              <Button
                className={style.button}
                onClick={() => {
                  setShowModal(true);
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
            required
            fullWidth
            size="small"
            type="password"
            id="password"
            label="Enter Password"
            name="password"
            value={editAccount.password}
            onChange={handleFormInput}
            error={editAccount.passwordError? true: false}
            className={style.styleFormFields}
          />
          <TextField
            variant="outlined"
            required
            fullWidth
            size="small"
            type="password"
            id="confirmPassword"
            label="Confirm Password"
            name="confirmPassword"
            value={editAccount.confirmPassword}
            onChange={handleFormInput}
            error={editAccount.confirmPasswordError? true: false}
            className={style.styleFormFields}
          />
          {/* Are you sure you want to delete this Blanket Deposit? */}
        </Modal.Body>
        <Modal.Footer>
          <div className={`${style.flexEnd}`}>
            <Button className={style.button} onClick={handleModalInput}>
              Confirm
            </Button>
            <Button
              className={style.button}
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
