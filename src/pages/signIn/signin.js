import React from "react";
import style from "./SignIn.module.css";
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
    this.state = this.initialState;
  }

  componentDidMount() {
    let token = localStorage.getItem("athens-token");
    if (token) {
      if (this.props.user) {
        this.props.user.role === "mover"
          ? this.props.history.push("/mover")
          : this.props.history.push("/customers");
      }
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.user) {
      this.props.user.role === "mover"
        ? this.props.history.push("/mover")
        : this.props.history.push("/customers");
    }
  }

  validate = () => {
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
      login(obj, () => {
        if (this.props.user) {
          this.props.user.role === "mover"
            ? this.props.history.push("/mover")
            : this.props.history.push("/customers");
        }
      });
    }
  };

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
    return (
      <div className={style.signInContainer}>
        <div className={style.image}></div>
        <div className={style.form}>
          <div className={`${style.signIn} `}>
            <div className={`${style.head} ${style.flex}`}>
              <h3>Sign In</h3>
            </div>

            <form onSubmit={this.formSubmit}>
              <div className={`${style.email} ${style.flex}`}>
                <TextField
                  variant="outlined"
                  size="small"
                  id="email"
                  className={style.textFields}
                  label="Email Address"
                  name="email"
                  value={this.state.email}
                  onChange={this.handleFormInput}
                  error={this.state.emailError ? true : false}
                />
              </div>
              <div className={`${style.password} ${style.flex}`}>
                <TextField
                  variant="outlined"
                  size="small"
                  id="password"
                  label="Password"
                  name="password"
                  className={style.textFields}
                  value={this.state.password}
                  onChange={this.handleFormInput}
                  error={this.state.passwordError ? true : false}
                  type="password"
                />
              </div>
              <Link to="/email-verification">
                <div className={`${style.forgetPs} ${style.flex}`}>
                  Forgot Password?
                </div>
              </Link>
              <div className={`${style.signinBtn} ${style.flex}`}>
                <Button className={style.button} type="submit">
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
  login
};

var mapStateToProps = (state) => ({
  user: state.users.user
});

export default connect(mapStateToProps, actions)(SignInForm);
