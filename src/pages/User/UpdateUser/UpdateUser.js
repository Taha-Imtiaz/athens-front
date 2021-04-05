import { TextField, FormControlLabel } from "@material-ui/core";
import { Button } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Switch } from "@material-ui/core";
import { getUser, updateUser } from "../../../Redux/User/userActions";
import style from "./UpdateUser.module.css";

const UpdateUser = (props) => {
  let {
    match: {
      params: { userId },
    },
  } = props;
  let { updateUser } = props;

  let [userState, setUserState] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    activeStatus: false
  });
  let [disabledFields, setDisabledFields] = useState(true);

  useEffect(() => {

    getUser(userId, (res) => {
      setUserState(res.data.data);


    })

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const handlePhoneNumberInput = (value, previousValue) => {
    // return nothing if no value
    if (!value) return value;

    // only allows 0-9 inputs
    const currentValue = value.replace(/[^\d]/g, "");
    const cvLength = currentValue.length;

    if (!previousValue || value.length > previousValue.length) {
      // returns: "x", "xx", "xxx"
      if (cvLength < 4) return currentValue;

      // returns: "(xxx)", "(xxx) x", "(xxx) xx", "(xxx) xxx",
      if (cvLength < 7)
        return `(${currentValue.slice(0, 3)}) ${currentValue.slice(3)}`;

      // returns: "(xxx) xxx-", (xxx) xxx-x", "(xxx) xxx-xx", "(xxx) xxx-xxx", "(xxx) xxx-xxxx"
      return `(${currentValue.slice(0, 3)}) ${currentValue.slice(
        3,
        6
      )}-${currentValue.slice(6, 10)}`;
    }
  };

  const handleFormInput = (event) => {
    let { name, value } = event.target;
    if (name === "phone") {
      setUserState((prevState) => ({
        ...userState,
        phone: handlePhoneNumberInput(value, prevState.phone),
      }));
    } else {
      setUserState({ ...userState, [name]: value });
    }

  };

  //handler for switch
  const handleChange = () => {

    setUserState({ ...userState, activeStatus: !userState.activeStatus })

  };
  const updateUserData = () => {
    let userData = {
      name: userState.name,
      email: userState.email,
      phone: userState.phone,
      address: userState.address,
      activeStatus: userState.activeStatus,
    };
    updateUser(userData, userId, 'admin', () => setDisabledFields(true));
  };
  return (
    <div className={style.userContainer}>
      <div className={`${style.userForm}`}>
        <h3 className={style.head}>Update User</h3>

        {userState && (
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
                disabled={disabledFields}
                name="name"
                value={userState.name}
                onChange={handleFormInput}
                // error={this.state.nameError ? true : false}
                className={style.styleFormFields}
              />

              <TextField
                variant="outlined"
                required
                fullWidth
                disabled={disabledFields}
                size="small"
                id="email"
                label="Email Address"
                name="email"
                value={userState.email}
                onChange={handleFormInput}
                // error={this.state.emailError ? true : false}
                className={style.styleFormFields}
              />

              <TextField
                variant="outlined"
                required
                fullWidth
                size="small"
                id="phnumber"
                label="Phone Number"
                disabled={disabledFields}
                name="phone"
                value={userState.phone}
                onChange={handleFormInput}
                // error={this.state.phoneError ? true : false}
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
                value={userState.address}
                // error={this.state.addressError ? true : false}
                onChange={handleFormInput}
                disabled={disabledFields}
                className={style.styleAddress}
              />
              <div className={style.flexEnd}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={userState.activeStatus}
                      onChange={handleChange}
                      color="primary"
                      name="activeStatus"
                      inputProps={{ "aria-label": "primary checkbox" }}
                    />
                  }
                  label={userState.activeStatus ? 'Active' : 'In Active'}
                />
              </div>
              <div className={`${style.styleFormFields} ${style.updateBtn}`}>
                {disabledFields === true ? (
                  <Button
                    className={style.button}
                    onClick={() => setDisabledFields(false)}
                  >
                    Edit
                  </Button>
                ) : (
                    <Button className={style.button} onClick={updateUserData}>
                      Update
                    </Button>
                  )}
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

var actions = {
  updateUser,
  getUser
};

export default connect(null, actions)(UpdateUser);
