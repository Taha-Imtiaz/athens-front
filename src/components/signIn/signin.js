import React from 'react'
import style from './signin.module.css'
import heading from '../Headings/headings';
import headings from '../Headings/headings';
import HeadingComponent from '../Headings/headings';
import { Redirect } from 'react-router-dom';
import SideBar from '../Sidebar/SideBar';


class SignInForm extends React.Component{
    constructor(props) {
        super(props);
        let loggedIn = false
        this.state = { username: '', password:'', loggedIn}
    }

      mySubmitHandler = (event) => {
        event.preventDefault();
        if(this.state.username == ""){
          alert('fill this Field')
        }
        if(this.state.password == ""){
          alert('fill this Field')
        }
        console.log("Username: "+this.state.username)
        console.log("Password: "+this.state.password)

        if(this.state.username === "S" && this.state.password == "abc"){
          localStorage.setItem("token","abc")
          this.setState({
            loggedIn: true
          })
        }
      }

      usernameChangeHandler = (event) => {
        let uname = event.target.value
        if(uname == ""){
          alert('Fill this Field')
        }
        this.setState({username:uname})
      }

      passwordChangeHandler = (event) => {
        let pwd = event.target.value
       
        this.setState({password:pwd})
      }


    render(){ 
      if (this.state.loggedIn){
        return <Redirect to ='/admin'/>
      }
        return(
          <div className={style.jumbotron}>
            <form onSubmit={this.mySubmitHandler}>
            <h1 className={style.head}>Sign In</h1>
            <input className={style.input_fields} type="text" placeholder="Email Address" onChange={this.usernameChangeHandler}/>
            <br/>
            <input className={style.input_fields} type="password" id ="pwd" placeholder="Password" onChange={this.passwordChangeHandler}/>
            <br/>
            <button type ='submit' className={style.button}>Sign In</button>
            <h3 className={style.heading}>Or Login With</h3>
            <div className = "btnStyle">
            <button className={`btn btn-primary ${style.btn}`}><i className="fa fa-google"></i></button>
            <button className={`btn btn-primary ${style.btn}`}><i className="fa fa-twitter"></i></button>
            <button className={`btn btn-primary ${style.btn}`}><i className="fa fa-facebook"></i></button>
            </div>
            </form>
            </div>
        )
    }
}

export default SignInForm