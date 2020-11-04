import React, { Component } from 'react';
import style from './AccountUpdate.module.css'
import Button from '../../Button/Button'
import API from '../../../utils/api'
import { getUserData, updateUser } from '../../../Redux/User/userActions';
import { connect } from 'react-redux';
import { TextField } from '@material-ui/core';


const initialState = {
    name: "",
    email: "",
    password: "",
    address: "",
    phone: "",
    nameError: "",
    emailError: "",
    passwordError: "",
}

class AccountUpdate extends Component {

    constructor(props) {
        super(props);
        this.state = initialState
    }


    componentDidMount = () => {
        var userId = this.props.location.userId
        var { history } = this.props;
        if (!userId) {
            history.push("/account");
        } else {
            getUserData(userId).then((res) => {
                var { user } = res.data
                var { name, email, password, address, phone } = user
                this.setState({
                    name,
                    email,
                    password,
                    address,
                    phone
                })
            }).catch((error) => {
                console.log(error)
            })
        }

    };


    validate = () => {
        // var {username,password,emailError,passwordError} = this.state
        let nameError = ''
        let emailError = ''
        let passwordError = ''
        var phoneError = ""
        var addressError = ""

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

        if (!this.state.phone) {
            phoneError = "Phone should not be empty"
        }

        if (!this.state.address) {
            addressError = "Address should not be empty"
        }


        if (nameError || emailError || passwordError || phoneError || addressError) {
            this.setState({ nameError, emailError, passwordError, phoneError, addressError })
            return false
        }

        return true
    }


    handleFormInput = (event) => {
        var { name, value } = event.target
        this.setState({ [name]: value })
        if (value == "") {
            this.setState({ [name + "Error"]: "Should not be empty" })
        } else {
            this.setState({ [name + "Error"]: "" })
        }
    }


    mySubmitHandler = (event) => {

        event.preventDefault();

        const isValid = this.validate()
        if (isValid) {
            var { name, email, password, address, phone } = this.state
            var updatedUserObj = {
                name,
                email,
                password,
                address,
                phone
            }
            const { updateUser, history } = this.props;
            updateUser(updatedUserObj, this.props.location.userId).then((res) => {
                history.push("/account");
            }).catch((error) => {
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
                        <div className="form-group">
                            <TextField
                 variant="outlined"
            margin="normal"
            required
            fullWidth
            size="small"
             id="name" label="Enter Name" name="name" value={this.state.name} onChange={this.handleFormInput} />
                        </div>

                        {this.state.nameError ? (
                            <div className={`alert alert-warning alert-dismissible fade show  ${style.msg}`} role="alert">
                                {this.state.nameError}



                            </div>) : null}

                        <div className="form-group">
                            <TextField
                 variant="outlined"
            margin="normal"
            required
            fullWidth
            size="small"
            id="email" label="Enter Email" name="email" value={this.state.email} onChange={this.handleFormInput} />
                        </div>

                        {this.state.emailError ? (
                            <div className={`alert alert-warning alert-dismissible fade show  ${style.msg}`} role="alert">
                                {this.state.emailError}



                            </div>) : null}




                        <div className="form-group">
                            <TextField
                 variant="outlined"
            margin="normal"
            required
            fullWidth
            size="small"
             id="name" label="Enter Phone" name="phone" value={this.state.phone} onChange={this.handleFormInput} />
                        </div>

                        {this.state.phoneError ? (
                            <div className={`alert alert-warning alert-dismissible fade show  ${style.msg}`} role="alert">
                                {this.state.phoneError}



                            </div>) : null}

                        <div className="form-group">
                            <TextField
                 variant="outlined"
            margin="normal"
            required
            fullWidth
            size="small"
             id="name" label="Enter Address" name="address" value={this.state.address} onChange={this.handleFormInput} />
                        </div>

                        {this.state.addressError ? (
                            <div className={`alert alert-warning alert-dismissible fade show  ${style.msg}`} role="alert">
                                {this.state.addressError}



                            </div>) : null}

                        <div className="form-group">
                            <TextField
                 variant="outlined"
            margin="normal"
            required
            fullWidth
            size="small"
            type = "password"
            id="password" label="Enter Password" name="password" value={this.state.password} onChange={this.handleFormInput} />
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


var actions = {
    updateUser
}

export default connect(null, actions)(AccountUpdate);