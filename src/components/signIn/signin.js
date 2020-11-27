import React from "react";
import style from "./signin.module.css";
import heading from "../Headings/headings";
import headings from "../Headings/headings";
import HeadingComponent from "../Headings/headings";
import { Redirect } from "react-router-dom";
import SideBar from "../Sidebar/SideBar";
import { Link } from "react-router-dom";
// import axios from 'axios'
// import { login } from '../../Redux/User/userAction
import API from "../../utils/api";
import { connect } from "react-redux";
import { login } from "../../Redux/User/userActions";
import { Button, TextField } from "@material-ui/core";
// import image from "/images/signInImage.jpg"

class SignInForm extends React.Component {
  initialState = {
    email: "",
    password: "",
    emailError: "",
    passwordError: "",
  };
  constructor(props) {
    super(props);
    // let loggedIn = false
    this.state = this.initialState;
    let token = localStorage.getItem("athens-token");
    // if (token) {
    //   props.history.push('/customer')
    // }
  }

  componentDidMount() {
    let token = localStorage.getItem("athens-token");
    if (token) {
      if (this.props.user) {
        this.props.user.role == "mover"
          ? this.props.history.push("/mover")
          : this.props.history.push("/customer");
      }
    }
  }

  componentWillReceiveProps(nextProps) {
    // this.setState({
    //   user: nextProps.loggedinUser,
    //   weeklySchedule: nextProps.loggedinUser.weeklySchedule
    // });
    if (nextProps.user) {
      nextProps.user.role == "mover"
        ? this.props.history.push("/mover")
        : this.props.history.push("/customer");
    }
  }

  validate = () => {
    // var {email,password,emailError,passwordError} = this.state
    let emailError = "";
    let passwordError = "";

    var mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    if (!this.state.email.match(mailformat)) {
      emailError = "Invalid Email";
    }

    if (this.state.password === "") {
      passwordError = "Password should not be empty";
    }

    if (emailError || passwordError) {
      this.setState({ emailError, passwordError });
      return false;
    }

    return true;
  };

  formSubmit = (e) => {
    // history.push('/customers')
    console.log("submit called")
    e.preventDefault();

    const isValid = this.validate();
    var { login } = this.props;
    if (isValid) {
      let obj = {
        email: this.state.email,
        password: this.state.password,
      };
      // login(obj, () => {
      //   this.props.history.push('/customer')
      // })
      login(obj).then((res) => {
        console.log(res);
        if (res.data.status == 200) {
          res.data.data.role == "mover"
            ? this.props.history.push("/mover")
            : this.props.history.push("/customer");
        }
      });
    }
  };

  // emailChangeHandler = (event) => {
  //   let uname = event.target.value
  //   if (uname == "") {
  //     alert('Fill this Field')
  //   }
  //   this.setState({ email: uname })
  // }

  // passwordChangeHandler = (event) => {
  //   let pwd = event.target.value

  //   this.setState({ password: pwd })
  // }

  handleFormInput = (event) => {
    var { name, value } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    // if (this.state.loggedIn) {
    //   return <Redirect to='/admin' />
    // }
    return (
      <div className={style.signInContainer}>
        <div className={style.image}></div>
        <div className={style.form}>
          <div className={`${style.signIn} `}>
            <div className={`${style.head} ${style.flex}`}>
              <h3>Sign In</h3>
            </div>

            <form onSubmit={this.formSubmit}>
              <div
                className={`${style.email} ${style.flex}`}
                style={{ alignItems: "center" }}
              >
                <TextField
                  variant="outlined"
                  style={{ margin: "0 2rem", width:"60%" }}
                  // required
                  // fullWidth
                  size="small"
                  id="email"
                  label="Email Address"
                  name="email"
                  value={this.state.email}
                  onChange={this.handleFormInput}
                  error={this.state.emailError}
                />

                {/* <label>Email</label>
<input  type="text" name="email" value={this.state.email} onChange={this.handleFormInput} /> */}
              </div>
              {/* {this.state.emailError ? (
            <div className={`alert alert-warning alert-dismissible fade show  ${style.msg}`} role="alert">
              {this.state.emailError}

            </div>) : null} */}
              <div
                className={`${style.password} ${style.flex}`}
                style={{ alignItems: "center" }}
              >
                <TextField
                  variant="outlined"
                  style={{ margin: "0 2rem", width:"60%" }}
                  // required
                  fullWidth
                  size="small"
                  id="password"
                  label="Password"
                  name="password"
                  value={this.state.password}
                  onChange={this.handleFormInput}
                  error={this.state.passwordError}
                />

                {/* <label >Password</label><br />
            <input  type="password" name="password" value={this.state.password} id="pwd" onChange={this.handleFormInput} /> */}
              </div>

              {/* <div style={{ color: "red", fontSize: "12px" }}>{this.state.emailError}</div> */}

              {/* <div style={{ color: "red", fontSize: "12px" }}>{this.state.passwordError}</div> */}
              {/* {this.state.passwordError ? (
            <div className={`alert alert-warning alert-dismissible fade show  ${style.msg}`} role="alert">
              {this.state.passwordError}



            </div>) : null} */}

              {/* <button onClick={this.mySubmitHandler} type='button' className={style.button}>Sign In</button> */}
              <div
                className={`${style.signinBtn} ${style.flex}`} 
                
                style={{ alignItems: "center" }}
              >
                
                  <Button type = "submit"
                    style={{
                      background: "#00ADEE",
                      textTransform: "none",
                      color: "#FFF",
                      fontFamily: "sans-serif",
                      margin:"0 2rem",
                     width:"60%"
                     
                    }}
                  ><Link style={{ textDecoration: "none" , color:"#fff" }} to="/customer">
                    Sign In </Link>
                  </Button>
               
              </div>
              {/* <h3 className={style.heading}>Or Login With</h3>
          <div className={style.btnStyle}>
            <button className={`btn btn-primary ${style.circle} ${style.bttn}`}><i className="fa fa-google"></i></button>
            <button className={`btn btn-primary ${style.circle} ${style.bttn}`}><i className="fa fa-facebook"></i></button>
          </div> */}
            </form>
          </div>
        </div>
      </div>
    );
  }
}

var actions = {
  login,
};

var mapStateToProps = (state) => ({
  user: state.users.user,
});

export default connect(mapStateToProps, actions)(SignInForm);
