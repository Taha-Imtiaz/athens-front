import React, { Component } from 'react';
import style from './CreateUser.module.css'
import Button from '../../Button/Button'
class CreateUser extends Component {
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
                                <input type="input" class="form-control" id="name" placeholder="Full Name" aria-describedby="emailHelp" />
                            </div>

                            <div class="form-group">
                                <input type="email" class="form-control" id="email" placeholder="Email Address" aria-describedby="emailHelp" />
                            </div>

                            <div class="form-group">
                                <input type="input" class="form-control" id="phnumber" placeholder="Phone Number" aria-describedby="emailHelp" />
                            </div>

                            <div class="form-group">
                                <input type="email" class="form-control" id="address" placeholder="Address" aria-describedby="emailHelp" />
                            </div>


                            <div class="form-row text-align-around">
                                <div class="col">
                                    <div class="form-group">
                                        <div class={`dropdown ${style.drop}`}>
                                            <button class="btn btn-light dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                Select Type
                                    </button>
                                            <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                                <a class="dropdown-item" href="#">Office Manager</a>
                                                <a class="dropdown-item" href="#">Mover</a>
                                            </div>
                                        </div>

                                    </div>

                                </div>
                                <div class="col">
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
                                </div>
                            </div>



                            <div className={style.mb}>
                                <Button name="Delete" />
                            </div>
                        </form>


                    </div>
                </div>
            </div>
        );
    }
}

export default CreateUser;