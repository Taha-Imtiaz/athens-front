import React from 'react'
import style from './signin.module.css'
import heading from '../Headings/headings';
import headings from '../Headings/headings';
import HeadingComponent from '../Headings/headings';
import { Redirect } from 'react-router-dom';
import SideBar from '../Sidebar/SideBar';
import { Link } from 'react-router-dom'
// import axios from 'axios'
import { login } from '../../Redux/User/userActions'
import API from '../../utils/api'
import { connect } from "react-redux";



class SignInForm extends React.Component {
  initialState = {
    email: '',
    password: '',
    emailError: '',
    passwordError: '',
  }
  constructor(props) {
    super(props);
    // let loggedIn = false
    this.state = this.initialState
    let token = localStorage.getItem('athens-token')
    if(token) {
      console.log(this.props.user)
      props.history.push('/customer')
    }
    // loggedIn }
  }

  validate = () => {
    // var {email,password,emailError,passwordError} = this.state
    let emailError = ''
    let passwordError = ''

    var mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    if (!this.state.email.match(mailformat)) {
      emailError = "Invalid Email"
    }

    if (this.state.password === "") {
      passwordError = "Password should not be empty"
    }

    if (emailError || passwordError) {
      this.setState({ emailError, passwordError })
      return false
    }

    return true
  }

  formSubmit = (e) => {
    // history.push('/customers')
    e.preventDefault();

    const isValid = this.validate()
    var { login } = this.props;
    if (isValid) {
      console.log(this.state)
      let obj = {
        email: this.state.email,
        password: this.state.password
      }
      login(obj, () => {
        console.log('hell')
        this.props.history.push('/customer')
      })
      
    }
  }

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
    var { name, value } = event.target
    this.setState({ [name]: value })
  }

  render() {
    // if (this.state.loggedIn) {
    //   return <Redirect to='/admin' />
    // }
    return (
      <div className={`text-center ${style.jumbotron}`}>
        <form onSubmit={this.mySubmitHandler}>

          <h1 className={style.head}>Sign In</h1>
          <div className={style.userInput}>
            <label className={style.labell}>Email</label><br />
            <input className={style.input_fields} type="text" name="email" value={this.state.email} onChange={this.handleFormInput} />
          </div>

          {/* <div style={{ color: "red", fontSize: "12px" }}>{this.state.emailError}</div> */}
          {this.state.emailError ? (
            <div className={`alert alert-warning alert-dismissible fade show  ${style.msg}`} role="alert">
              {this.state.emailError}

            </div>) : null}

          <div className={style.pwd}>
            <label className={style.labell}>Password</label><br />
            <input className={style.input_fields} type="password" name="password" value={this.state.password} id="pwd" onChange={this.handleFormInput} />
          </div>

          {/* <div style={{ color: "red", fontSize: "12px" }}>{this.state.passwordError}</div> */}
          {this.state.passwordError ? (
            <div className={`alert alert-warning alert-dismissible fade show  ${style.msg}`} role="alert">
              {this.state.passwordError}



            </div>) : null}

          {/* <button onClick={this.mySubmitHandler} type='button' className={style.button}>Sign In</button> */}
          {/* <Link style={{ textDecoration: "none" }} to='/customer'> */}
          <button onClick={this.formSubmit} type='button' className={style.button}>Sign In</button>
          {/* </Link> */}
          {/* <h3 className={style.heading}>Or Login With</h3>
          <div className={style.btnStyle}>
            <button className={`btn btn-primary ${style.circle} ${style.bttn}`}><i className="fa fa-google"></i></button>
            <button className={`btn btn-primary ${style.circle} ${style.bttn}`}><i className="fa fa-facebook"></i></button>
          </div> */}
        </form>
      </div>
    )
  }
}

var actions = {
  login
};

var mapStateToProps = (state) => ({
  user: state.users.user
});

export default connect(mapStateToProps, actions)(SignInForm);