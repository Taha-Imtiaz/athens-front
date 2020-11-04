// import Navbar from '../../Navbar/Navbar'
import style from './customeradd.module.css'
// import SideBar from '../../Sidebar/SideBar'
import Button from '../../Button/Button'
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addCustomer } from '../../../Redux/Customer/customerActions';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FormControl, TextField } from '@material-ui/core';
import { FormHelperText, InputLabel } from '@material-ui/core';
import { Input } from '@material-ui/core';



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
        console.log("add")
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
            <div className={`${style.formStyle}`}>
                <div className={`${style.form} `}>
                <h3 className={style.head}>Create New Customer</h3>
                <div >

                    <form onSubmit={this.mySubmitHandler}>
                       
             <TextField
            variant="outlined"
           
            required
         
            style = {{margin:"1rem 2rem", width:"92%"}}
            id="firstName"
            size="small"
            label="First Name"
            name="firstName"
            autoComplete="firstName"
            autoFocus
            value={this.state.firstName} onChange={this.handleFormInput}
          />
                      

                        {this.state.firstNameError ? (
                            <div className={`alert alert-warning alert-dismissible fade show  ${style.msg}`} role="alert">
                                {this.state.firstNameError}



                            </div>) : null}
                      
                      <TextField
           variant="outlined"
           required
           style = {{margin:"1rem 2rem", width:"92%"}}
            required
          
            id="lastName"
            size="small"
            label="Last Name"
            name="lastName"
            autoComplete="lastName"
            autoFocus
            value={this.state.lastName} onChange={this.handleFormInput}
          />
                        {this.state.lastNameError ? (
                            <div className={`alert alert-warning alert-dismissible fade show  ${style.msg}`} role="alert">
                                {this.state.lastNameError}

                            </div>) : null}


                        
                          
                            <TextField
          variant="outlined"
           
          required
       
          style = {{margin:"1rem 2rem", width:"92%"}}
            required
           
            size="small"
            id="phone"
            label="Phone Number"
            name="phone"
            autoComplete="phone"
            autoFocus
            value={this.state.phone} onChange={this.handleFormInput}
          />
                        {this.state.phoneNumberError ? (
                            <div className={`alert alert-warning alert-dismissible fade show  ${style.msg}`} role="alert">
                                {this.state.phoneNumberError}



                            </div>) : null}


                     
    
                      
                            <TextField
               variant="outlined"
           
               required
            
               style = {{margin:"1rem 2rem", width:"92%"}}
            required
          
            size="small"
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={this.state.email} onChange={this.handleFormInput}
          />
                        {this.state.emailError ? (
                            <div className={`alert alert-warning alert-dismissible fade show  ${style.msg}`} role="alert">
                                {this.state.emailError}



                            </div>) : null}
                    </form>
                    <h3 style = {{margin:"0 2rem"}}>Sub Contact</h3>
                    {this.state.subContacts.map((x, i) => {
                        return (
                            <div key={i}>
                                <form >
                                    
                                        {/* <InputLabel htmlFor ="phone_number">Phone Number</InputLabel>
                                        <Input  id="phone_number" name="phone" value={this.state.subContacts[i].phone} onChange={(e) => this.hanldeContactsInput(e, i)} /> */}
                                  
                                        <TextField
          variant="outlined"
          required
       
          style = {{margin:"1rem 1.5rem", width:"92%"}}
            size="small"
            // required
          
            id="phone_number"
            label="Phone Number"
            name="phone"
            autoComplete="phone_number"
            autoFocus
            value={this.state.subContacts[i].phone} onChange={(e) => this.hanldeContactsInput(e, i)}
          />


                                  
                                        {/* <InputLabel htmlFor="emailalt">Email address</InputLabel>
                                        <Input type="email" id = "emailalt"  name="email" value={this.state.subContacts[i].email} onChange={(e) => this.hanldeContactsInput(e, i)} /> */}
                                        {/* <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small> */}
                                        <TextField
           variant="outlined"
           
           required
        
           style = {{margin:"1rem 1.5rem", width:"92%"}}
            // required
          
            id="emailalt"
            label="Email Address"
            size="small"
            name="email"
            autoComplete="emailalt"
            autoFocus
            value={this.state.subContacts[i].email} onChange={(e) => this.hanldeContactsInput(e, i)}
          />

                                </form>
                            </div>
                        )
                    })}
                    < div className="form-group">
                        <div style={{ float: 'right' }} className = "row">
                            {/* <input type="button" className="btn btn-primary" name="Add Another" value="Add Another" onClick={this.addClaim} /> */}
                            <Button onClick={this.addContacts} name="Add Another"></Button>
                        </div>
                    </div>
                    <div className="row">
                    <div className={`col-12` }>
                        <button  onClick={this.mySubmitHandler}  className ={ `btn btn-primary ${style.button}`}>Submit</button>
                        {/* <button onClick={this.mySubmitHandler} type='button' className={style.button}>Sign In</button> */}
                    </div>
                    </div>
                </div>
            </div >
            </div>
        );
    }
}
var actions = {
    addCustomer
}


export default connect(null, actions)(CustomerAdd);
