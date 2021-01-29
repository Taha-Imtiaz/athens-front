import { Button, TextField } from "@material-ui/core";
import React, { useState } from "react";
import style from "./EmailVerification.module.css";

import { sendCode } from "../../../Redux/User/userActions";
import { showMessage } from "../../../Redux/Common/commonActions";
import { connect } from "react-redux";
const EmailVerification = (props) => {
  var [email, setEmail] = useState("");
  var [emailError, setEmailError] = useState("");
  var handleFormInput = (e) => {
    var { value } = e.target;
    setEmail(value);
  };

  var navigateToCode = () => {
    var { history, showMessage } = props;
    if (email !== "") {
      var emailObj = {
        email: email,
      };

      sendCode(emailObj).then((res) => {
        if (res.data.status === 200) {
          console.log(res.data.message, history);
          sessionStorage.setItem("token", res.data.token);
          showMessage(res.data.message);
          history.push("/verifycode");
        } else {
          showMessage(res.data.message);
        }
      });
    } else {
      setEmailError("Email should not be empty");
    }
  };
  return (
    <div className={`${style.verificationContainer} `}>
      <div className={`${style.verificationContainerContent} ${style.flex}`}>
        <div>
          <h4>Enter your email address</h4>
        </div>

        <div>
          <form>
            <TextField
              variant="outlined"
              required
              className={style.emailField}
              size="small"
              id="email"
              label="Enter Email"
              name="email"
              value={email}
              onChange={(e) => handleFormInput(e)}
              error={emailError ? true : false}
            />
          </form>
        </div>

        <div className={style.sendCodeBtn}>
          <Button onClick={navigateToCode} className={style.button}>
            Send Verification Code
          </Button>
        </div>
      </div>
    </div>
  );
};
var actions = {
  showMessage,
};
export default connect(null, actions)(EmailVerification);
