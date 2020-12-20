import { Button, TextField } from "@material-ui/core";
import React, { useState } from "react";
import style from "./EmailVerification.module.css";
import { Link } from "react-router-dom";
import { sendCode } from "../../../Redux/User/userActions";
const EmailVerification = (props) => {
  var [email, setEmail] = useState("");
  var [emailError, setEmailError] = useState("");
  var handleFormInput = (e) => {
    var { name, value } = e.target;
    setEmail(value);
  };

  var navigateToCode = () => {
    var { history } = props;
    if (email !== "") {
      var emailObj = {
        email: email,
      };
     
      sendCode(emailObj).then((res) => {
        if (res.data.status === 200) {
        var token = sessionStorage.setItem("token", res.data.token)
          history.push("/verifycode");
        }
      });
    } else {
      setEmailError("Email should not be empty");
    }
  };
  return (
    <div className={style.verificationContainer}>
      <div className={style.image}></div>
      <div className={`${style.emailVerification}`}>
        <div className={`${style.verifyhead} ${style.flex}`}>
          <h4>Enter your email address</h4>
        </div>

        <div className={`${style.verifyinput} ${style.flex}`}>
          <form>
            <div>
              <TextField
                variant="outlined"
                margin="normal"
                required="required"
                // fullWidth
                style={{ margin: "0", width: "30vw" }}
                size="small"
                id="email"
                label="Enter Email"
                name="email"
                value={email}
                onChange={(e) => handleFormInput(e)}
                error={emailError}
              />
            </div>
          </form>
        </div>

        <div className={`${style.sendcode} ${style.flex}`}>
          <div style={{ alignItems: "center" }}>
            <Button
              onClick={navigateToCode}
              // type="button"
              style={{
                background: "#00ADEE",
                textTransform: "none",
                color: "#FFF",

                fontFamily: "sans-serif",
                width: "30vw",
                // margin: "0 2rem",
                // width: "60%"
              }}
            >
              Send Verification Code
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailVerification;
