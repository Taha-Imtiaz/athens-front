import React, { Component } from 'react';
import style from './AccountUpdate.module.css'
import Button from '../../Button/Button'

class AccountUpdate extends Component {
    render() {
        return (
            <div>
                <h3 className={style.head}>Account</h3>
                <div className={style.form}>
                    <form>
                        <div class="form-group">
                            <input type="input" class="form-control" id="name" placeholder="Enter Name" />
                        </div>
                        <div class="form-group">
                            <input type="email" class="form-control" id="email" placeholder="Enter Email" />
                        </div>
                        <div class="form-group">
                            <input type="password" class="form-control" id="password" placeholder="Enter Password" />
                        </div>
                    </form>
                    <div className={style.btn}>
                        <Button name="Update" />
                    </div>
                </div>
            </div>
        );
    }
}

export default AccountUpdate;