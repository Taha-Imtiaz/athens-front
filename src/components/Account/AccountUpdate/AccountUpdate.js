import React, { Component } from 'react';
import style from './AccountUpdate.module.css'
import Button from '../../Button/Button'
import API from '../../../utils/api'


const initialState = {
    name: "",
    email: "",
    password: "",
    nameError: "",
    emailError: "",
    passwordError: "",
}

class AccountUpdate extends Component {

    constructor(props) {
        super(props);
        this.state = initialState
    }

    validate = () => {
        // var {username,password,emailError,passwordError} = this.state
        let nameError = ''
        let emailError = ''
        let passwordError = ''

        var mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

        if (!this.state.name) {
            nameError = "Name should not be empty"
        }

        if (!this.state.email.match(mailformat)) {
            emailError = "Invalid Email"
        }

        if (!this.state.password) {
            passwordError = "Password should not be empty"
        }

        if (nameError || emailError || passwordError) {
            this.setState({ nameError, emailError, passwordError })
            return false
        }

        return true
    }


    handleFormInput = (event) => {
        var { name, value } = event.target
        this.setState({ [name]: value })
        if(value == "") {
            this.setState({[name + "Error"] : "Should not be empty"})
        } else {
            this.setState({[name + "Error"] : ""})
        }
    }


    mySubmitHandler = (event) => {

        event.preventDefault();

        const isValid = this.validate()
        if (isValid) {
            console.log(this.state)
            this.setState(initialState)

            API.post(`posts`, this.state)
                .then(response => {
                    console.log(response);
                })
                .catch(error => {
                    console.log(error)
                })
        }

    }


    render() {
        return (
            <div>
                <h3 className={style.head}>Account</h3>
                <div className={style.form}>
                    <form>
                        <div class="form-group">
                            <input type="input" class="form-control" id="name" placeholder="Enter Name" name="name" value={this.state.name} onChange={this.handleFormInput} />
                        </div>

                        {this.state.nameError ? (
                            <div className={`alert alert-warning alert-dismissible fade show  ${style.msg}`} role="alert">
                                {this.state.nameError}
                               
                               
                               
                            </div>) : null}

                        <div class="form-group">
                            <input type="email" class="form-control" id="email" placeholder="Enter Email" name="email" value={this.state.email} onChange={this.handleFormInput} />
                        </div>

                        {this.state.emailError ? (
                            <div className={`alert alert-warning alert-dismissible fade show  ${style.msg}`} role="alert">
                                {this.state.emailError}
                               
                               
                               
                            </div>) : null}


                        <div class="form-group">
                            <input type="password" class="form-control" id="password" placeholder="Enter Password" name="password" value={this.state.password} onChange={this.handleFormInput} />
                        </div>

                        {this.state.passwordError ? (
                            <div className={`alert alert-warning alert-dismissible fade show  ${style.msg}`} role="alert">
                                {this.state.passwordError}
                               
                               
                               
                            </div>) : null}
                    </form>
                    <div className={style.btn}>
                        <Button name="Update" onClick={this.mySubmitHandler} />
                    </div>
                </div>
            </div>
        );
    }
}

export default AccountUpdate;