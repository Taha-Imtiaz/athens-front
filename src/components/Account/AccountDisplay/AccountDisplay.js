import React, { useEffect } from 'react'
import style from './AccountDisplay.module.css'
import { Switch, Link } from 'react-router-dom'
import AccountUpdate from '../AccountUpdate/AccountUpdate'
import Button from '../../Button/Button'
import { getUserData } from '../../../Redux/user/userActions'
import { useState } from 'react'

const AccountDisplay = () => {
var userId = localStorage.setItem("_id", "5f8844b9eabed5230c097df9")
var [user, setUser] = useState('')
var getUserId =  localStorage.getItem("_id")

useEffect(() => {

getUserData(getUserId).then((res) => {
setUser(res.data.user)
}).catch((error) => {
    console.log(error)
})
}, [])
    
    return <div className={style.acc}>
    {user &&
        <div className="card" style={{ width: "25rem" }}>
            <div className="card-body">
                <h5 className="card-title">Account Holder</h5>
                <p className="card-text">{user.name}</p>
            </div>
            <ul className="list-group list-group-flush">
                <li className="list-group-item"><span>Email: </span>{user.email}</li>
                {/* <li className="list-group-item"><span>Password: </span>*******</li> */}
            </ul>
            <div className="card-body">
                
            <Link style={{ textDecoration: "none" }} to={{
               pathname:  '/account/update',
               userId: getUserId
                }}> <Button name="Edit" /> </Link>
            </div>
        </div>
        }
    </div>

}

export default AccountDisplay