import { Button, TextField } from "@material-ui/core";
import React, { useState } from "react";
import { connect } from "react-redux"
import { resetPassword } from "../../../Redux/User/userActions";
import style from "./ResetPassword.module.css";

const ResetPassword = (props) => {
  const [passwordError, setPasswordError] = useState("");
  const [cpasswordError, setcPasswordError] = useState("");
  const [resetForm, setResetForm] = useState({
    password: "",
    cpassword: "",
  });
  let userToken = localStorage.getItem("athens-token");
  
  if (!userToken) {
    let { history } = props;
    history.push("/");
  }

  const handleFormInput = (e) => {
    let { name, value } = e.target;
    setResetForm({
      ...resetForm,
      [name]: value,
    });
  };

  const navigateToCustomer = () => {
    let { history, resetPassword, user } = props;
    if (password !== "") {
      setPasswordError("");

      if (password !== cpassword) {
        setcPasswordError("Passwords do not match");
      } else {
        setPasswordError("");
        let passwordObj = {
          password: password,
          token: userToken,
        };
        resetPassword(passwordObj, () => {
          if (user.role === "mover") {
            history.push("/mover");
          } else {
            history.push("/customers");
          }
        });
      }
    } else {
      setPasswordError("Password should not be empty");
    }
  };
  let { password, cpassword } = resetForm;
  return (
    <div className={style.resetContainer}>
      <div className={`${style.passwordReset} ${style.flex}`}>
        <div>
          <h4>Enter New Password</h4>
        </div>

        <div>
          <form>
            <div>
              <TextField
                variant="outlined"
                required
                type="password"
                // fullWidth
                className={style.passwordField}
                size="small"
                id="password"
                label="Enter New Password"
                name="password"
                value={password}
                onChange={(e) => handleFormInput(e)}
                error={passwordError ? true : false}
              />
            </div>
            <div>
              <TextField
                variant="outlined"
                required
                type="password"
                // fullWidth
                className={style.passwordField}
                size="small"
                id="cpassword"
                label="Confirm Password"
                name="cpassword"
                value={cpassword}
                onChange={(e) => handleFormInput(e)}
                error={cpasswordError ? true : false}
              />
            </div>
          </form>
        </div>

        <div className={style.resetPasswordBtn}>
          <Button className={style.button} onClick={navigateToCustomer}>
            Reset Password
          </Button>
        </div>
      </div>
    </div>
  );
};
var actions = {
  resetPassword
};
var mapStateToProps = (state) => ({
  user: state.users.user
});
export default connect(mapStateToProps, actions)(ResetPassword);
