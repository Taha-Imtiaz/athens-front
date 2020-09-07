import React from 'react'
import style from './AccountDisplay.module.css'
import { Switch } from 'react-router-dom'
import AccountUpdate from '../AccountUpdate/AccountUpdate'


const AccountDisplay = () => {

    return <div className={style.acc}>
        <h3>Account</h3>
        <p>John Doe</p>
        <p>John@gmail.com</p>
        <p>********</p>
        <button className={`btn btn-primary ${style.btnCustom}`}>Edit</button>
    </div>
}

export default AccountDisplay