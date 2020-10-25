import React, { useEffect } from 'react'
import style from './AccountDisplay.module.css'
import { Switch, Link } from 'react-router-dom'
import AccountUpdate from '../AccountUpdate/AccountUpdate'
import Button from '../../Button/Button'
import { getUserData } from '../../../Redux/user/userActions'
import { useState } from 'react'
import { getLoginUser } from '../../../Redux/user/userActions'
import { connect } from 'react-redux';

const AccountDisplay = (props) => {
    // var userId = localStorage.setItem("_id", "5f8844b9eabed5230c097df9")
    // var getUserId =  localStorage.getItem("_id")
    var { loggedInUser } = props;

    // useEffect(() => {
    //     setUser(loggedInUser)
    //     console.log(user)
    // }, [user])

    return <div className={style.acc}>
        {loggedInUser &&
            <div className="card" style={{ width: "25rem" }}>
                <div className="card-body">
                    <h5 className="card-title">Account Holder</h5>
                    <p className="card-text">{loggedInUser.name}</p>
                </div>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item"><span>Email: </span>{loggedInUser.email}</li>
                    {/* <li className="list-group-item"><span>Password: </span>*******</li> */}
                </ul>
                <div className="card-body">

                    <Link style={{ textDecoration: "none" }} to={{
                        pathname: '/account/update',
                        userId: loggedInUser._id
                    }}> <Button name="Edit" /> </Link>
                </div>
            </div>
        }
    </div>

}


const action = {
    getLoginUser
}

var mapStateToProps = (state) => ({
    loggedInUser: state.users.user
});


export default connect(mapStateToProps, action)(AccountDisplay)