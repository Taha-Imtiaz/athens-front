import { Button, TextField } from "@material-ui/core";
import React, { useState } from "react";
import style from "./EmailVerification.module.css";
import { sendCode } from "../../../Redux/User/userActions";
import { connect } from "react-redux";

const EmailVerification = (props) => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const handleFormInput = (e) => {
    let { value } = e.target;
    setEmail(value);
  };

  const navigateToCode = () => {
    let { history, sendCode } = props;
    if (email !== "") {
      let emailObj = {
        email: email,
      };

      sendCode(emailObj, (res) => {
        sessionStorage.setItem("token", res.data.token);
        history.push("/verifycode");
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
  sendCode
};
export default connect(null, actions)(EmailVerification);
