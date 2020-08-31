import React from 'react'
import './signin.css'
import heading from '../Headings/headings';
import headings from '../Headings/headings';
import HeadingComponent from '../Headings/headings';

class SignInForm extends React.Component{
    constructor(props) {
        super(props);
        this.state = { username: '', password:''}
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
        return(
            <div>
            <form onSubmit={this.mySubmitHandler}>
            <HeadingComponent name = "Sign In"/>
            <input className="input_fields" type="text" placeholder="Email Address" onChange={this.usernameChangeHandler}/>
            <br/>
            <input className="input_fields" type="password" id ="pwd" placeholder="Password" onChange={this.passwordChangeHandler}/>
            <br/>
            <button type ='submit' className="button">Sign In</button>
            <h3 className="heading">Or Login With</h3>
            <div className = "btnStyle">
            <button className="btn"><i className="fa fa-google"></i></button>
            <button className="btn"><i className="fa fa-twitter"></i></button>
            <button className="btn"><i className="fa fa-facebook"></i></button>
            </div>
            </form>
            </div>
        )
    }
}

export default SignInForm