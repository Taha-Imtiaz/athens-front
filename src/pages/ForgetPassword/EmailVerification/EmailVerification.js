import { Button, TextField } from "@material-ui/core";
import React, { useState } from "react";
import style from "./EmailVerification.module.css";
import { Link } from "react-router-dom";
import { sendCode } from "../../../Redux/User/userActions";
import { showMessage } from "../../../Redux/Common/commonActions";
import { connect } from "react-redux";
const EmailVerification = (props) => {
  var [email, setEmail] = useState("");
  var [emailError, setEmailError] = useState("");
  var handleFormInput = (e) => {
    var { name, value } = e.target;
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
          var token = sessionStorage.setItem("token", res.data.token);
          console.log(res.data.message);
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
    <div className={`${style.verificationContainer} ${style.flex}`}>
      {/* <div className={style.image}></div> */}
      <div
      // className={`${style.emailVerification}`}
      >
        <div className={`${style.flex}`}>
          <h4>Enter your email address</h4>
        </div>

        <div
        // className={`${style.verifyinput} ${style.flex}`}
        >
          <form>
            <div>
              <TextField
                variant="outlined"
                margin="normal"
                required="required"
                // fullWidth
                style={{ margin: "1rem 0", width: "30vw" }}
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

        <div
        //  className={`${style.sendcode} ${style.flex}`}
        >
          <div
         
          >
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
var actions = {
  showMessage,
};
export default connect(null, actions)(EmailVerification);
