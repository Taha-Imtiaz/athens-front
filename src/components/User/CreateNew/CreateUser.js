import React, { Component } from 'react';
import style from './CreateUser.module.css'
import Button from '../../Button/Button'
import { Multiselect } from 'multiselect-react-dropdown';
import API from '../../../utils/api'

const initialState = {

    name: "",
    email: "",
    phoneNumber: "",
    address: "",
    type: "",
    attribute: "",
    nameError: "",
    emailError: "",
    numberError: "",
    addressError: "",
    typeError: "",
    attributeError: "",

}


class CreateUser extends Component {

    typeOptions = [{ name: 'Office Manager', id: 1 }, { name: 'Mover', id: 2 }]
    attributeOptions = [{ name: 'Srigar', id: 1 }, { name: 'Sam', id: 2 }]

    constructor(props) {
        super(props);

        this.state = initialState
    }



    onTypeSelect = (selectedList, selectedItem) => {

        console.log(selectedList, selectedItem)
        this.setState({ "type": selectedItem })

    }

    onAttributeSelect = (selectedList, selectedItem) => {

        console.log(selectedList, selectedItem)
        this.setState({ "attribute": selectedItem })

    }

    onRemove(selectedList, removedItem) {
        console.log(selectedList, removedItem)
    }

    validate = () => {
        let nameError = ''
        let emailError = ''
        let numberError = ""
        let addressError = ""
        let typeError = ""
        let attributeError = ""


        var mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

        if (!this.state.name) {
            nameError = "Name should not be empty"
        }

        if (!this.state.email.match(mailformat)) {
            emailError = "Invalid Email"
        }

        if (!this.state.phoneNumber) {
            numberError = "Number should not be empty"
        }

        if (!this.state.address) {
            addressError = "Address should not be empty"
        }

        if (!this.state.type) {
            typeError = "Type should not be empty"
        }

        if (!this.state.attribute) {
            attributeError = "Attribute should not be empty"
        }

        if (nameError || emailError || numberError || addressError || typeError || attributeError) {
            this.setState({ nameError, emailError, numberError, addressError, typeError, attributeError })
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
                <div>
                    <h3 className={style.head}>Create New User</h3>
                </div>
                <div className={style.jumbotron}>

                    <div className={style.container}>
                        <form>


                            <div class="form-group">
                                <input type="input" class="form-control" id="name" placeholder="Full Name" name="name" value={this.state.name} onChange={this.handleFormInput} />
                            </div>


                            {this.state.nameError ? (
                                <div className={`alert alert-warning alert-dismissible fade show  ${style.msg}`} role="alert">
                                    {this.state.nameError}



                                </div>) : null}

                            <div class="form-group">
                                <input type="email" class="form-control" id="email" placeholder="Email Address" name="email" value={this.state.email} onChange={this.handleFormInput} />
                            </div>


                            {this.state.emailError ? (
                                <div className={`alert alert-warning alert-dismissible fade show  ${style.msg}`} role="alert">
                                    {this.state.emailError}



                                </div>) : null}

                            <div class="form-group">
                                <input type="input" class="form-control" id="phnumber" placeholder="Phone Number" name="phoneNumber" value={this.state.phoneNumber} onChange={this.handleFormInput} />
                            </div>


                            {this.state.numberError ? (
                                <div className={`alert alert-warning alert-dismissible fade show  ${style.msg}`} role="alert">
                                    {this.state.numberError}



                                </div>) : null}

                            <div class="form-group">
                                <input type="email" class="form-control" id="address" placeholder="Address" name="address" value={this.state.address} onChange={this.handleFormInput} />
                            </div>


                            {this.state.addressError ? (
                                <div className={`alert alert-warning alert-dismissible fade show  ${style.msg}`} role="alert">
                                    {this.state.addressError}



                                </div>) : null}


                            <div class="form-row text-align-around">
                                <div class="col">
                                    <div class="form-group">
                                        <Multiselect className={style.multi}

                                            singleSelect={true}
                                            options={this.typeOptions} // Options to display in the dropdown
                                            onSelect={this.onTypeSelect} // Function will trigger on select event
                                            onRemove={this.onRemove} // Function will trigger on remove event
                                            displayValue="name" // Property name to display in the dropdown options
                                            class="form-control"
                                            placeholder="Select Type"
                                        />

                                    </div>

                                </div>

                                {this.state.typeError ? (
                                    <div className={`alert alert-warning alert-dismissible fade show  ${style.msg}`} role="alert">
                                        {this.state.typeError}



                                    </div>) : null}

                            </div>
                            <div class="form-group">
                                <Multiselect className={style.multi}

                                    singleSelect={true}
                                    options={this.attributeOptions} // Options to display in the dropdown
                                    onSelect={this.onAttributeSelect} // Function will trigger on select event
                                    onRemove={this.onRemove} // Function will trigger on remove event
                                    displayValue="name" // Property name to display in the dropdown options
                                    class="form-control"
                                    placeholder="Select Attribute"
                                />

                            </div>

                            {this.state.attributeError ? (
                                <div className={`alert alert-warning alert-dismissible fade show  ${style.msg}`} role="alert">
                                    {this.state.attributeError}



                                </div>) : null}


                            <div className={style.mb}>
                                <Button name="Create" onClick={this.mySubmitHandler} />
                            </div>
                        </form>


                    </div>
                </div>
            </div>
        );
    }
}

export default CreateUser;