import Navbar from '../../Navbar/Navbar'
import style from './customeradd.module.css'
import SideBar from '../../Sidebar/SideBar'
import Button from '../../Button/Button'

import API from '../../../utils/api'

import React, { Component } from 'react';

class CustomerAdd extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: "",
            phoneNumber: "",
            email: "",
            altnumber: "",
            altemail: "",
        }
    }


    handleFormInput = (event) => {
        var { name, value } = event.target
        this.setState({ [name]: value })
    }


    mySubmitHandler = (event) => {

        event.preventDefault();
        console.log(this.state)

        API.post(`posts`, this.state)
            .then(response => {
                console.log(response);
            })
            .catch(error => {
                console.log(error)
            })

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
                        <div class="form-group">
                            <label for="exampleInputEmail1">Phone Number</label>
                            <input type="input" class="form-control" id="phone_number" name="phoneNumber" value={this.state.phoneNumber} onChange={this.handleFormInput} />
                        </div>
                        <div class="form-group">
                            <label for="exampleInputEmail1">Email address</label>
                            <input type="email" class="form-control" name="email" value={this.state.email} onChange={this.handleFormInput} />
                        </div>
                    </form>
                    <h3>Sub Contact</h3>
                    <form>
                        <div class="form-group">
                            <label for="exampleInputEmail1">Phone Number</label>
                            <input type="input" class="form-control" id="phone_number" name="altnumber" value={this.state.altnumber} onChange={this.handleFormInput} />
                        </div>
                        <div class="form-group">
                            <label for="exampleInputEmail1">Email address</label>
                            <input type="email" class="form-control" name="altemail" value={this.state.altemail} onChange={this.handleFormInput} />
                            <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
                        </div>
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

export default CustomerAdd;
