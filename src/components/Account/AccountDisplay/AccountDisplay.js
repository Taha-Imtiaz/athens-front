import React from 'react'
import style from './AccountDisplay.module.css'
import { Switch, Link } from 'react-router-dom'
import AccountUpdate from '../AccountUpdate/AccountUpdate'
import Button from '../../Button/Button'

const AccountDisplay = () => {

    return <div className={style.acc}>

        <div class="card" style={{ width: "25rem" }}>
            <div class="card-body">
                <h5 class="card-title">Account Holder</h5>
                <p class="card-text">John Doe</p>
            </div>
            <ul class="list-group list-group-flush">
                <li class="list-group-item"><span>Email: </span>john@gmail.com</li>
                <li class="list-group-item"><span>Password: </span>*******</li>
            </ul>
            <div class="card-body">
                
            <Link style={{ textDecoration: "none" }} to='account/update'> <Button name="Edit" /> </Link>
            </div>
        </div>
    </div>

}

export default AccountDisplay