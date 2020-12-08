import React, { useEffect, useState } from "react";
import style from "./VerificationCode.module.css";
import ReactInputVerificationCode from "react-input-verification-code";
import { Button } from "@material-ui/core";
import { verifyCode } from "../../../Redux/User/userActions";



const VerificationCode = (props) => {
  var [code, setCode] = useState("");

  var [verificationCode, setVerificationCode] = useState("");
var [userToken, setUserToken] = useState('')


 useEffect(() => {
 var {history} = props
var getToken = sessionStorage.getItem("token");

console.log(getToken)
setUserToken(getToken)
if(getToken) {
//remove email from sessionStorage
sessionStorage.removeItem("token")
}
else {
  history.push("/emailVerification")
}

 },[])
  var navigateResetPassword = () => {
    var { history } = props;
    if (verificationCode !== "") {
     
      // history.push("/verifyCode")
    } 
    else {
      console.log(userToken)
      var verifyCodeObj  = {
        code:code,
        token:userToken
      }
      verifyCode(verifyCodeObj).then((res) => {
        console.log(res)
        
        if(res.data.status === 200){
          console.log(res.data.token)
          localStorage.setItem("athens-token", res.data.token)
          history.push("/restPassword")
        }
      

      })

    }
  };

  var handleVerificationCode = (e) => {
    
    var codeInString = e.toString();
    setCode(e)
    console.log(codeInString.length);
    if (codeInString.length != 4) {
      setVerificationCode("You must enter correct verification code");
    }
    else {
      setVerificationCode("");
      
    }
    
  };
  
  return (
    <div className={style.verificationCode}>
      <div className={style.customStyleContainer}>
        <div className={style.image}></div>

        <div className={style.customStyles}>
          <div className={style.verificationCodeHead}>
            <h4>Enter Verification Code</h4>
          </div>
          <div className={style.verificationCodeBoxes}>
            <ReactInputVerificationCode
              placeholder=""
              onChange={(e) => handleVerificationCode(e)}
            />
          </div>
          <div
            className={style.submitCode}

            // style={{ alignItems: "center" }}
          >
            <Button
              onClick={navigateResetPassword}
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
              Submit
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerificationCode;
