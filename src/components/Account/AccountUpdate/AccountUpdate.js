import React, { Component } from 'react';
import style from './AccountUpdate.module.css'
import Button from '../../Button/Button'
import API from '../../../utils/api'


class AccountUpdate extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: "",
            email: "",
            password: "",
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
                <h3 className={style.head}>Account</h3>
                <div className={style.form}>
                    <form>
                        <div class="form-group">
                            <input type="input" class="form-control" id="name" placeholder="Enter Name" name="name" value={this.state.name} onChange={this.handleFormInput} />
                        </div>
                        <div class="form-group">
                            <input type="email" class="form-control" id="email" placeholder="Enter Email" name="email" value={this.state.email} onChange={this.handleFormInput} />
                        </div>
                        <div class="form-group">
                            <input type="password" class="form-control" id="password" placeholder="Enter Password" name="password" value={this.state.password} onChange={this.handleFormInput} />
                        </div>
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