// import Navbar from '../../Navbar/Navbar'
import style from './customeradd.module.css'
// import SideBar from '../../Sidebar/SideBar'
import Button from '../../Button/Button'
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addCustomer } from '../../../Redux/Customer/customerActions';


const initialState = {
    name: "",
    phoneNumber: "",
    email: "",
    altnumber: "",
    altemail: "",
    nameError: "",
    emailError: "",
    phoneNumberError: "",
    altnumberError: "",
    altemailError: "",
}

class CustomerAdd extends Component {

    constructor(props) {
        super(props);
        this.state = initialState
    }


    validate = () => {
        // var {username,password,emailError,passwordError} = this.state
        let emailError = ''
        let nameError = ''
        let phoneNumberError = ''
        let altnumberError = ''
        let altemailError = ''


        var mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

        if (!this.state.email.match(mailformat)) {
            emailError = "Invalid Email"
        }

        if (!this.state.name) {
            nameError = "Name should not be empty"
        }

        if (!this.state.phoneNumber) {
            phoneNumberError = "Phone Number should not be empty"
        }

        if (!this.state.altemail.match(mailformat)) {
            altemailError = "Invalid Email"
        }

        if (!this.state.altnumber) {
            altnumberError = "Phone Number should not be empty"
        }

        


        if (emailError || nameError || phoneNumberError || altnumberError || altemailError) {
            this.setState({ nameError, emailError, phoneNumberError, altnumberError, altemailError })
            return false
        }

        return true
    }



    handleFormInput = (event) => {
        var { name, value } = event.target
        this.setState({ [name]: value })
        if(value == "") {
            this.setState({[name + "Error"] : "Field Should not be empty"})
        } else {
            this.setState({[name + "Error"] : ""})
        }
    }


    mySubmitHandler = (event) => {
        var {addCustomer,history} = this.props
        event.preventDefault();

        const isValid = this.validate()
        if (isValid) {
            
        var {name,email,phoneNumber, altemail,altnumber} = this.state
        var addCustomerObj = {
            name,
            phoneNumber,
            email, 
            subcontacts: {
             altnumber,
            altemail
            }
           
        }
        console.log(addCustomerObj)
        addCustomer(addCustomerObj, () => history.goBack())
    }
    }
    render() {
        return (
            <div>
                <h3 className={style.head}>Create New Customer</h3>
                <div className={`${style.jumbotron}`}>

                    <form onSubmit={this.mySubmitHandler}>
                        <div class="form-group">
                            <label for="exampleInputEmail1">Customer Name</label>
                            <input type="input" class="form-control" id="name" name="name" value={this.state.name} onChange={this.handleFormInput} />
                        </div>

                        {this.state.nameError ? (
                            <div className={`alert alert-warning alert-dismissible fade show  ${style.msg}`} role="alert">
                                {this.state.nameError}
                                
                                
                                
                            </div>) : null}


                        <div class="form-group">
                            <label for="exampleInputEmail1">Phone Number</label>
                            <input type="input" class="form-control" id="phone_number" name="phoneNumber" value={this.state.phoneNumber} onChange={this.handleFormInput} />
                        </div>

                        {this.state.phoneNumberError ? (
                            <div className={`alert alert-warning alert-dismissible fade show  ${style.msg}`} role="alert">
                                {this.state.phoneNumberError}
                                
                                
                                
                            </div>) : null}


                        <div class="form-group">
                            <label for="exampleInputEmail1">Email address</label>
                            <input type="email" class="form-control" name="email" value={this.state.email} onChange={this.handleFormInput} />
                        </div>

                        {this.state.emailError ? (
                            <div className={`alert alert-warning alert-dismissible fade show  ${style.msg}`} role="alert">
                                {this.state.emailError}
                                
                                
                                
                            </div>) : null}
                    </form>
                    <h3>Sub Contact</h3>
                    <form>
                        <div class="form-group">
                            <label for="exampleInputEmail1">Phone Number</label>
                            <input type="input" class="form-control" id="phone_number" name="altnumber" value={this.state.altnumber} onChange={this.handleFormInput} />
                        </div>

                        {this.state.altnumberError ? (
                            <div className={`alert alert-warning alert-dismissible fade show  ${style.msg}`} role="alert">
                                {this.state.altnumberError}
                                
                                
                                
                            </div>) : null}


                        <div class="form-group">
                            <label for="exampleInputEmail1">Email address</label>
                            <input type="email" class="form-control" name="altemail" value={this.state.altemail} onChange={this.handleFormInput} />
                            <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
                        </div>

                        {this.state.altemailError ? (
                            <div className={`alert alert-warning alert-dismissible fade show  ${style.msg}`} role="alert">
                                {this.state.altemailError}
                                
                                
                                
                            </div>) : null}


                    </form>
                    <div className={`d-flex justify-content-start`}>
                        <Button name="Submit" onClick={this.mySubmitHandler} />
                        {/* <button onClick={this.mySubmitHandler} type='button' className={style.button}>Sign In</button> */}
                    </div>
                </div>
            </div>
        );
    }
}
var actions = {
    addCustomer
}


export default connect(null,actions)(CustomerAdd);
