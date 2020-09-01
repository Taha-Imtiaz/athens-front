import React from 'react'
import styles from './signin.module.css'
import heading from '../Headings/headings';
import headings from '../Headings/headings';
import HeadingComponent from '../Headings/headings';
import { Redirect } from 'react-router-dom';

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
            <div className={styles.jumbotron}>
            <form onSubmit={this.mySubmitHandler}>
            <h1 className={styles.head}>Sign In</h1>
            <input className={styles.input_fields} type="text" placeholder="Email Address" onChange={this.usernameChangeHandler}/>
            <br/>
            <input className={styles.input_fields} type="password" id ="pwd" placeholder="Password" onChange={this.passwordChangeHandler}/>
            <br/>
            <button type ='submit' className={styles.button}>Sign In</button>
            <h3 className={styles.heading}>Or Login With</h3>
            <div className = "btnStyle">
            <button className={styles.btn}><i className="fa fa-google"></i></button>
            <button className={styles.btn}><i className="fa fa-twitter"></i></button>
            <button className={styles.btn}><i className="fa fa-facebook"></i></button>
            </div>
            </form>
            </div>
        )
    }
}

export default SignInForm