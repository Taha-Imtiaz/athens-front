import React from "react";
import style from "./signin.module.css";
import { Redirect } from "react-router-dom";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { login } from "../../Redux/User/userActions";
import { Button, TextField } from "@material-ui/core";

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
          : this.props.history.push("/customers");
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
        : this.props.history.push("/customers");
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
    e.preventDefault();

    const isValid = this.validate();
    var { login } = this.props;
    if (isValid) {
      let obj = {
        email: this.state.email,
        password: this.state.password,
      };
      login(obj).then((res) => {
        if (res?.data.status == 200) {
          res.data.data.role == "mover"
            ? this.props.history.push("/mover")
            : this.props.history.push("/customers");
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
    if (!value) {
      this.setState({ [name + "Error"]: name + " is required" });
    } else {
      this.setState({ [name + "Error"]: "" });
    }
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
                  style={{ margin: "0 2rem", width: "60%" }}
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
              </div>
              <div
                className={`${style.password} ${style.flex}`}
                style={{ alignItems: "center" }}
              >
                <TextField
                  variant="outlined"
                  style={{ margin: "0 2rem", width: "60%" }}
                  // required
                  fullWidth
                  size="small"
                  id="password"
                  label="Password"
                  name="password"
                  value={this.state.password}
                  onChange={this.handleFormInput}
                  error={this.state.passwordError}
                  type="password"
                />
              </div>
              <Link to="/email-verification" style={{}}>
                <div
                  className={`${style.forgetPs} ${style.flex}`}
                  style={{
                    alignItems: "flex-start",
                    width: "80%",
                    justifyContent: "flex-end",
                  }}
                >
                  {/* <Button 
                // type="button"
                  style={{
                    background: "#00ADEE",
                    textTransform: "none",
                    color: "#FFF",
                    fontFamily: "sans-serif",
                    margin: "0 2rem",
                    width: "30%"

                  }}
                > */}
                  Forgot Password?
                  {/* </Button> */}
                </div>
              </Link>
              <div
                className={`${style.signinBtn} ${style.flex}`}
                style={{ alignItems: "flex-start" }}
              >
                <Button
                  type="submit"
                  style={{
                    background: "#00ADEE",
                    textTransform: "none",
                    color: "#FFF",
                    fontFamily: "sans-serif",
                    margin: "0 2rem",
                    width: "60%",
                  }}
                >
                  Sign In
                </Button>
              </div>
           
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
