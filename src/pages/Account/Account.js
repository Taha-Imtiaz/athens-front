import React, { useEffect } from "react";
import style from "./Account.module.css";
import { Button, TextField, Modal } from "@material-ui/core";
import { resetPassword, updateUser } from "../../Redux/User/userActions";
import { useState } from "react";
import { connect } from "react-redux";
// import { Modal } from "react-bootstrap";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";

const Account = (props) => {
  let { user } = props;
  const [disabledForm, setDisabledForm] = useState(true);
  const [showModal, setShowModal] = useState(false);

  const [editAccount, setEditAccount] = useState({
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
    if (user) {
      let { name, email, address, phone } = user;
      setEditAccount({
        name,
        email,
        address,
        phone,
      });
    }
  }, [user]);

  const validate = () => {
    let mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    let newData = { ...editAccount };

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

  const handlePhoneNumberInput = (value, previousValue) => {
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

  const handleFormInput = (event) => {
    let { name, value } = event.target;
    if (name === 'phone') {
      setEditAccount(prevState => ({ ...prevState, phone: handlePhoneNumberInput(value, prevState.phone) }))
    } else {
      setEditAccount((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
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

  const validateModalInputs = () => {
    let newData = { ...editAccount };
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

  const handleModalInput = (e) => {
    let { resetPassword } = props;
    e.preventDefault();
    let validateModal = validateModalInputs();
    if (validateModal) {
      let { password } = editAccount;
      let data = {
        password
      };
      resetPassword(data, () => setShowModal(false))
    }
  };
  const mySubmitHandler = (event) => {
    event.preventDefault();

    const isValid = validate();
    if (isValid) {
      let { name, email, address, phone } = editAccount;
      let updatedUserObj = {
        name,
        email,

        address,
        phone,
      };
      const { updateUser } = props;
      updateUser(updatedUserObj, user._id, 'user', () => setDisabledForm(true))
    }
  };
  return (
    <div className={style.accountContainer}>
      {user && (
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
              error={editAccount.nameError ? true : false}
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
              error={editAccount.emailError ? true : false}
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
              error={editAccount.phoneError ? true : false}
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
              error={editAccount.addressError ? true : false}
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
      {user && <div className={style.profile}>
        <div className={`${style.content} `}>
          <div className={`${style.profilePic} ${style.flex}`}></div>
          <div className={`${style.accountHolderName} ${style.flex}`}>
            {user.name}
          </div>
          <div className={`${style.accountHolderRole} ${style.flex}`}>
            {user.role}
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
      }
      <Modal
            open={showModal}
            onClose={() => setShowModal(false)}
            // scrollable
            // centered
            className={style.modal}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
              timeout: 500,
            }}
          >
            <Fade in={showModal}>
              <div className={"bg-light p-3"}>
                <h3>Reset Password</h3>
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
            error={editAccount.passwordError ? true : false}
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
            error={editAccount.confirmPasswordError ? true : false}
            className={style.styleFormFields}
          />
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
	      </div>
            </Fade>
          </Modal>

      {/* <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        centered
        scrollable
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
            error={editAccount.passwordError ? true : false}
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
            error={editAccount.confirmPasswordError ? true : false}
            className={style.styleFormFields}
          />
          Are you sure you want to delete this Blanket Deposit?
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
      </Modal> */}
    </div>
  );
};

const action = {
  updateUser,
  resetPassword
};

var mapStateToProps = (state) => ({
  user: state.users.user,
});

export default connect(mapStateToProps, action)(Account);
