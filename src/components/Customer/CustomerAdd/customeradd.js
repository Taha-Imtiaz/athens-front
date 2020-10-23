// import Navbar from '../../Navbar/Navbar'
import style from './customeradd.module.css'
// import SideBar from '../../Sidebar/SideBar'
import Button from '../../Button/Button'
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addCustomer } from '../../../Redux/Customer/customerActions';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



class CustomerAdd extends Component {
    notify = () => toast("Customer created successfully!");
    constructor(props) {
        super(props);
        const initialState = {
            name: "",
            phone: "",
            email: "",
            phoneContacts: "",
            emailContacts: "",
            nameError: "",
            emailError: "",
            phoneNumberError: "",
            altnumberError: "",
            altemailError: "",
        }
        this.state = { ...initialState }
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

        if (!this.state.phone) {
            phoneNumberError = "Phone Number should not be empty"
        }

        if (!this.state.emailContacts.match(mailformat)) {
            altemailError = "Invalid Email"
        }

        if (!this.state.phoneContacts) {
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
        if (value == "") {
            this.setState({ [name + "Error"]: "Field Should not be empty" })
        } else {
            this.setState({ [name + "Error"]: "" })
        }
    }


    mySubmitHandler = (event) => {
        var { addCustomer, history } = this.props
        event.preventDefault();
        const isValid = this.validate()
        if (isValid) {

            var { name, email, phone, emailContacts, phoneContacts } = this.state
            var addCustomerObj = {
                name,
                phone,
                email,
                subcontacts: {
                    phoneContacts,
                    emailContacts
                }

            }
            addCustomer(addCustomerObj, () => {
                history.goBack();
            })
        }
    }
    render() {
        return (
            <div>
                <ToastContainer position="bottom-right" />
                <h3 className={style.head}>Create New Customer</h3>
                <div className={`${style.jumbotron}`}>

                    <form onSubmit={this.mySubmitHandler}>
                        <div className="form-group">
                            <label htmlFor="exampleInputEmail1">Customer Name</label>
                            <input type="input" className="form-control" id="name" name="name" value={this.state.name} onChange={this.handleFormInput} />
                        </div>

                        {this.state.nameError ? (
                            <div className={`alert alert-warning alert-dismissible fade show  ${style.msg}`} role="alert">
                                {this.state.nameError}



                            </div>) : null}


                        <div className="form-group">
                            <label htmlFor="exampleInputEmail1">Phone Number</label>
                            <input type="input" className="form-control" id="phone_number" name="phone" value={this.state.phone} onChange={this.handleFormInput} />
                        </div>

                        {this.state.phoneNumberError ? (
                            <div className={`alert alert-warning alert-dismissible fade show  ${style.msg}`} role="alert">
                                {this.state.phoneNumberError}



                            </div>) : null}


                        <div className="form-group">
                            <label htmlFor="exampleInputEmail1">Email address</label>
                            <input type="email" className="form-control" name="email" value={this.state.email} onChange={this.handleFormInput} />
                        </div>

                        {this.state.emailError ? (
                            <div className={`alert alert-warning alert-dismissible fade show  ${style.msg}`} role="alert">
                                {this.state.emailError}



                            </div>) : null}
                    </form>
                    <h3>Sub Contact</h3>
                    <form>
                        <div className="form-group">
                            <label htmlFor="exampleInputEmail1">Phone Number</label>
                            <input type="input" className="form-control" id="phone_number" name="phoneContacts" value={this.state.phoneContacts} onChange={this.handleFormInput} />
                        </div>

                        {this.state.altnumberError ? (
                            <div className={`alert alert-warning alert-dismissible fade show  ${style.msg}`} role="alert">
                                {this.state.altnumberError}



                            </div>) : null}


                        <div className="form-group">
                            <label htmlFor="exampleInputEmail1">Email address</label>
                            <input type="email" className="form-control" name="emailContacts" value={this.state.emailContacts} onChange={this.handleFormInput} />
                            <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
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


export default connect(null, actions)(CustomerAdd);
