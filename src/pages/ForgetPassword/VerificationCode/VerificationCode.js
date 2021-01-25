import React, { useEffect, useState } from "react";
import style from "./VerificationCode.module.css";
import ReactInputVerificationCode from "react-input-verification-code";
import { Button } from "@material-ui/core";
import { verifyCode } from "../../../Redux/User/userActions";
import { connect } from "react-redux";

const VerificationCode = (props) => {
  var [code, setCode] = useState("");

  var [verificationCode, setVerificationCode] = useState("");
  var [userToken, setUserToken] = useState("");

  useEffect(() => {
    var { history } = props;
    var getToken = sessionStorage.getItem("token");

    setUserToken(getToken);
    if (getToken) {
      //remove email from sessionStorage
      sessionStorage.removeItem("token");
    } else {
      history.push("/email-verification");
    }
  }, []);
  var navigateResetPassword = () => {
    var { history, verifyCode } = props;
    if (verificationCode !== "") {
      // history.push("/verifyCode")
    } else {
      var verifyCodeObj = {
        code: code,
        token: userToken,
      };
      verifyCode(verifyCodeObj, () => history.push("/rest-password"));
    }
  };

  var handleVerificationCode = (e) => {
    var codeInString = e.toString();
    setCode(e);
    if (codeInString.length != 4) {
      setVerificationCode("You must enter correct verification code");
    } else {
      setVerificationCode("");
    }
  };

  return (
    <div className={style.verificationCode}>
      <div className={`${style.customStyles} ${style.flex}`}>
        <div>
          <h4>Enter Verification Code</h4>
        </div>
        <div className={style.verificationCodeInput}>
          <ReactInputVerificationCode
            placeholder=""
            onChange={(e) => handleVerificationCode(e)}
          />
        </div>
        <div className={style.submitCodeBtn}>
          <Button className={style.button} onClick={navigateResetPassword}>
            Submit
          </Button>
        </div>
      </div>
    </div>
  );
};
var actions = {
  verifyCode,
};
export default connect(null, actions)(VerificationCode);
