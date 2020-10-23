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
    constructor(props) {
        super(props);
        const initialState = {
            firtName: "",
            lastName: "",
            phone: "",
            email: "",
            subContacts: [{
                phone: "",
                email: ""
            }],
            firstNameError: "",
            lastNameError: "",
            emailError: "",
            phoneNumberError: "",
        }
        this.state = { ...initialState }
    }


    validate = () => {
        // var {username,password,emailError,passwordError} = this.state
        let emailError = ''
        let firstNameError = ''
        let lastNameError = ''
        let phoneNumberError = ''

        var mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

        if (!this.state.email.match(mailformat)) {
            emailError = "Invalid Email"
        }

        if (!this.state.firstName) {
            firstNameError = "First Name should not be empty"
        }

        if (!this.state.lastName) {
            lastNameError = "Last Name should not be empty"
        }

        if (!this.state.phone) {
            phoneNumberError = "Phone Number should not be empty"
        }

        // if (!this.state.emailContacts.match(mailformat)) {
        //     altemailError = "Invalid Email"
        // }

        // if (!this.state.phoneContacts) {
        //     altnumberError = "Phone Number should not be empty"
        // }




        if (emailError || firstNameError || lastNameError || phoneNumberError) {
            this.setState({ firstNameError, lastNameError, emailError, phoneNumberError })
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

    hanldeContactsInput = (e, i) => {
        let updatedContacts = this.state.subContacts.slice();
        updatedContacts[i][e.target.name] = e.target.value
        this.setState({ subContacts: updatedContacts });
    }


    mySubmitHandler = (event) => {
        var { addCustomer, history } = this.props
        event.preventDefault();
        const isValid = this.validate()
        if (isValid) {

            var { firstName, lastName, email, phone, subContacts } = this.state
            var addCustomerObj = {
                firstName,
                lastName,
                phone,
                email,
                subContacts
            }
            console.log(addCustomerObj)
            addCustomer(addCustomerObj, () => {
                history.goBack();
            })
        }
    }

    addContacts = () => {
        if (this.state.subContacts[0].phone && this.state.subContacts[0].email) {
            this.setState({
                subContacts: [...this.state.subContacts, {
                    phone: '',
                    email: ''
                }]
            });
        }
    }

    render() {
        return (
            <div>
                <h3 className={style.head}>Create New Customer</h3>
                <div className={`${style.jumbotron}`}>

                    <form onSubmit={this.mySubmitHandler}>
                        <div className="form-group">
                            <label htmlFor="exampleInputEmail1">First Name</label>
                            <input type="input" className="form-control" id="firstName" name="firstName" value={this.state.firstName} onChange={this.handleFormInput} />
                        </div>

                        {this.state.firstNameError ? (
                            <div className={`alert alert-warning alert-dismissible fade show  ${style.msg}`} role="alert">
                                {this.state.firstNameError}



                            </div>) : null}

                        <div className="form-group">
                            <label htmlFor="exampleInputEmail1">Last Name</label>
                            <input type="input" className="form-control" id="lastName" name="lastName" value={this.state.lastName} onChange={this.handleFormInput} />
                        </div>

                        {this.state.lastNameError ? (
                            <div className={`alert alert-warning alert-dismissible fade show  ${style.msg}`} role="alert">
                                {this.state.lastNameError}

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
                    {this.state.subContacts.map((x, i) => {
                        return (
                            <div key={i}>
                                <form>
                                    <div className="form-group">
                                        <label htmlFor="exampleInputEmail1">Phone Number</label>
                                        <input type="input" className="form-control" id="phone_number" name="phone" value={this.state.subContacts[i].phone} onChange={(e) => this.hanldeContactsInput(e, i)} />
                                    </div>


                                    <div className="form-group">
                                        <label htmlFor="exampleInputEmail1">Email address</label>
                                        <input type="email" className="form-control" name="email" value={this.state.subContacts[i].email} onChange={(e) => this.hanldeContactsInput(e, i)} />
                                        <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                                    </div>

                                </form>
                            </div>
                        )
                    })}
                    < div className="form-group">
                        <div style={{ float: 'right' }}>
                            {/* <input type="button" className="btn btn-primary" name="Add Another" value="Add Another" onClick={this.addClaim} /> */}
                            <Button onClick={this.addContacts} name="Add Another"></Button>
                        </div>
                    </div>
                    <div className={`d-flex justify-content-start`}>
                        <Button name="Submit" onClick={this.mySubmitHandler} />
                        {/* <button onClick={this.mySubmitHandler} type='button' className={style.button}>Sign In</button> */}
                    </div>
                </div>
            </div >
        );
    }
}
var actions = {
    addCustomer
}


export default connect(null, actions)(CustomerAdd);
