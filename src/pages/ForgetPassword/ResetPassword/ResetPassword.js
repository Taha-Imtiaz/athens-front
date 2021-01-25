import { Button, TextField } from "@material-ui/core";
import React, { useState } from "react";
import { connect } from "react-redux";
import { showMessage } from "../../../Redux/Common/commonActions";
import { resetPassword } from "../../../Redux/User/userActions";
import style from "./ResetPassword.module.css";

const ResetPassword = (props) => {
  // var [password, setPassword] = useState('')
  var [passwordError, setPasswordError] = useState("");
  // var [cpassword, csetPassword] = useState('')
  var [cpasswordError, setcPasswordError] = useState("");
  var [resetForm, setResetForm] = useState({
    password: "",
    cpassword: "",
  });
  var userToken = localStorage.getItem("athens-token");
  if (!userToken) {
    var { history } = props;
    history.push("/");
  }

  var handleFormInput = (e) => {
    var { name, value } = e.target;
    setResetForm({
      ...resetForm,
      [name]: value,
    });
  };

  var navigateToCustomer = () => {
    var { history, showMessage, user } = props;
    if (password !== "") {
      setPasswordError("");

      if (password !== cpassword) {
        setcPasswordError("Passwords do not match");
      } else {
        setPasswordError("");
        var passwordObj = {
          password: password,
          token: userToken,
        };
        resetPassword(passwordObj).then((res) => {
          if (res.data.status === 200) {
            showMessage(res.data.message);
            if (user.role === "mover") {
              history.push("/mover");
            } else {
              history.push("/customers");
            }
          } else {
            showMessage(res.data.message);
          }
        });
      }
    } else {
      setPasswordError("Password should not be empty");
    }
  };
  var { password, cpassword } = resetForm;
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
                required="required"
                type="password"
                // fullWidth
                className={style.passwordField}
                size="small"
                id="password"
                label="Enter New Password"
                name="password"
                value={password}
                onChange={(e) => handleFormInput(e)}
                error={passwordError}
              />
            </div>
            <div>
            <TextField
              variant="outlined"
              required="required"
              type="password"
              // fullWidth
              className={style.passwordField}
              size="small"
              id="password"
              label="Confirm Password"
              name="cpassword"
              value={cpassword}
              onChange={(e) => handleFormInput(e)}
              error={cpasswordError}
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
  showMessage,
};
var mapStateToProps = (state) => ({
  user: state.users?.user,
});
export default connect(mapStateToProps, actions)(ResetPassword);
