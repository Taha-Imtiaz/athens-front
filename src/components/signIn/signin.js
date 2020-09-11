import React from 'react'
import style from './signin.module.css'
import heading from '../Headings/headings';
import headings from '../Headings/headings';
import HeadingComponent from '../Headings/headings';
import { Redirect } from 'react-router-dom';
import SideBar from '../Sidebar/SideBar';
import { Link } from 'react-router-dom'


class SignInForm extends React.Component {
  constructor(props) {
    super(props);
    let loggedIn = false
    this.state = { username: '', password: '', loggedIn }
  }

  mySubmitHandler = (event) => {
    // event.preventDefault();
    // if (this.state.username == "") {
    //   alert('fill this Field')
    // }
    // if (this.state.password == "") {
    //   alert('fill this Field')
    // }
    // console.log("Username: " + this.state.username)
    // console.log("Password: " + this.state.password)

    // if (this.state.username === "S" && this.state.password == "abc") {
    //   localStorage.setItem("token", "abc")
    //   this.setState({
    //     loggedIn: true
    //   })
    // }
  }
  formSubmit = () => {
    // history.push('/customers')
    console.log('Hello')
  }

  // usernameChangeHandler = (event) => {
  //   let uname = event.target.value
  //   if (uname == "") {
  //     alert('Fill this Field')
  //   }
  //   this.setState({ username: uname })
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
    if (this.state.loggedIn) {
      return <Redirect to='/admin' />
    }
    return (
      <div className={`text-center ${style.jumbotron}`}>
        {/* <form onSubmit={this.mySubmitHandler}> */}
        <form>
          <h1 className={style.head}>Sign In</h1>
          <div className={style.userInput}>
            <label className={style.labell}>Username</label><br />
            <input className={style.input_fields} type="text" name="username" onChange={this.handleFormInput} />
          </div>

          <div className={style.pwd}>
            <label className={style.labell}>Password</label><br />
            <input className={style.input_fields} type="password" name="password" id="pwd" onChange={this.handleFormInput} />
          </div>

          {/* <button onClick={() => this.formSubmit()} type='button' className={style.button}>Sign In</button> */}
          <Link style={{ textDecoration: "none" }} to='/customer/add'> 
          <button onClick={() => this.formSubmit()} type='button' className={style.button}>Sign In</button>
          </Link>
          <h3 className={style.heading}>Or Login With</h3>
          <div className={style.btnStyle}>
            <button className={`btn btn-primary ${style.circle} ${style.bttn}`}><i className="fa fa-google"></i></button>
            <button className={`btn btn-primary ${style.circle} ${style.bttn}`}><i className="fa fa-facebook"></i></button>
          </div>
        </form>
      </div>
    )
  }
}

export default SignInForm