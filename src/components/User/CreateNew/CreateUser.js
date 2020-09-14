import React, { Component } from 'react';
import style from './CreateUser.module.css'
import Button from '../../Button/Button'
import { Multiselect } from 'multiselect-react-dropdown';
import API from '../../../utils/api'


class CreateUser extends Component {

    state = {
        name: "",
        email: "",
        phoneNumber: "",
        address: "",
        options: [{ name: 'Srigar', id: 1 }, { name: 'Sam', id: 2 }],
    };

    onSelect(selectedList, selectedItem) {

        console.log(selectedList, selectedItem)
    }

    onRemove(selectedList, removedItem) {
        console.log(selectedList, removedItem)
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
                <div>
                    <h3 className={style.head}>Create New User</h3>
                </div>
                <div className={style.jumbotron}>

                    <div className={style.container}>
                        <form>


                            <div class="form-group">
                                <input type="input" class="form-control" id="name" placeholder="Full Name" name="name" value={this.state.name} onChange={this.handleFormInput} />
                            </div>

                            <div class="form-group">
                                <input type="email" class="form-control" id="email" placeholder="Email Address" name="email" value={this.state.email} onChange={this.handleFormInput} />
                            </div>

                            <div class="form-group">
                                <input type="input" class="form-control" id="phnumber" placeholder="Phone Number" name="phoneNumber" value={this.state.phoneNumber} onChange={this.handleFormInput} />
                            </div>

                            <div class="form-group">
                                <input type="email" class="form-control" id="address" placeholder="Address" name="address" value={this.state.address} onChange={this.handleFormInput} />
                            </div>


                            <div class="form-row text-align-around">
                                <div class="col">
                                    <div class="form-group">
                                        <Multiselect className={style.multi}

                                            singleSelect={true}
                                            options={this.state.options} // Options to display in the dropdown
                                            onSelect={this.onSelect} // Function will trigger on select event
                                            onRemove={this.onRemove} // Function will trigger on remove event
                                            displayValue="name" // Property name to display in the dropdown options
                                            class="form-control"
                                        />

                                    </div>

                                </div>
                                {/* <div class="col">
                                    <div class="form-group">
                                        <div class="dropdown">
                                            <button class="btn btn-light dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                Select Attribute
                                    </button>
                                            <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                                <a class="dropdown-item" href="#">Office Manager</a>
                                                <a class="dropdown-item" href="#">Mover</a>
                                            </div>
                                        </div>

                                    </div>
                                </div> */}
                            </div>



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