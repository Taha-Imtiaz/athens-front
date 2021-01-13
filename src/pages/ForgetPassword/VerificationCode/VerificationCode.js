import React, { useEffect, useState } from "react";
import style from "./VerificationCode.module.css";
import ReactInputVerificationCode from "react-input-verification-code";
import { Button } from "@material-ui/core";
import { verifyCode } from "../../../Redux/User/userActions";
import { connect } from "react-redux";
import { showMessage } from "../../../Redux/Common/commonActions";



const VerificationCode = (props) => {
  var [code, setCode] = useState("");

  var [verificationCode, setVerificationCode] = useState("");
  var [userToken, setUserToken] = useState('')


  useEffect(() => {
    var { history } = props
    var getToken = sessionStorage.getItem("token");

    setUserToken(getToken)
    if (getToken) {
      //remove email from sessionStorage
      sessionStorage.removeItem("token")
    }
    else {
      history.push("/email-verification")
    }

  }, [])
  var navigateResetPassword = () => {
    var { history, verifyCode } = props;
    if (verificationCode !== "") {

      // history.push("/verifyCode")
    }
    else {
      var verifyCodeObj = {
        code: code,
        token: userToken
      }
      verifyCode(verifyCodeObj, () => history.push("/rest-password"))
      // .then((res) => {
      //   if(res.data.status === 200){
      //     localStorage.setItem("athens-token", res.data.token)
      //     showMessage(res.data.message)
      //     history.push("/restPassword")
      //   }
      //   else {

      //     showMessage(res.data.message)

      //   }


      // })

    }
  };

  var handleVerificationCode = (e) => {

    var codeInString = e.toString();
    setCode(e)
    if (codeInString.length != 4) {
      setVerificationCode("You must enter correct verification code");
    }
    else {
      setVerificationCode("");

    }

  };

  return (
    <div className={style.verificationCode}>
      <div className={`${style.customStyleContainer} ${style.flex}`}>
        {/* <div className={style.image}></div> */}

        <div className={style.customStyles}>
          <div
            className={style.flex}
          >
            <h4>Enter Verification Code</h4>
          </div>
          <div style={{ margin: "1rem 0" }}
            className={style.flex}
          >
            <ReactInputVerificationCode
              placeholder=""
              onChange={(e) => handleVerificationCode(e)}
            />
          </div>
          <div style={{ margin: "1rem 0" }}
          // className={style.submitCode}

          // style={{ alignItems: "center" }}
          >
            <Button
              onClick={navigateResetPassword}
              style={{
                background: "#00ADEE",
                textTransform: "none",
                color: "#FFF",

                fontFamily: "sans-serif",
                width: "25vw",
                // margin: "0 2rem",
                // width: "60%"
              }}
            >
              Submit
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
var actions = {
  verifyCode
}
export default connect(null, actions)(VerificationCode);
