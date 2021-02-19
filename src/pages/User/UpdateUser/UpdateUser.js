import { TextField } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { getUser } from '../../../Redux/User/userActions'
import style from "./UpdateUser.module.css"

// import { connect } from 'react-redux'

const UpdateUser = (props) => {
let {match:{params:{userId}}} = props
let {user, getUser} = props
  console.log( userId)


let [userState,  setUserState] = useState({
    name:'',
    email:'',
    phone:'',
    address:''
})
useEffect(() => {
getUser(userId)

}, [])
  
useEffect(() => {
  let {user} = props
  console.log(user)
 if(user) {
  setUserState(userState => ({
    ...userState,
   name: user.name,
    email: user.email,
    phone: user.phone,
    address: user.address

  }))
}
}, [user])
 const handlePhoneNumberInput = (value, previousValue) => {
    // return nothing if no value
    if (!value) return value;

    // only allows 0-9 inputs
    const currentValue = value.replace(/[^\d]/g, '');
    const cvLength = currentValue.length;

    if (!previousValue || value.length > previousValue.length) {

      // returns: "x", "xx", "xxx"
      if (cvLength < 4) return currentValue;

      // returns: "(xxx)", "(xxx) x", "(xxx) xx", "(xxx) xxx",
      if (cvLength < 7) return `(${currentValue.slice(0, 3)}) ${currentValue.slice(3)}`;

      // returns: "(xxx) xxx-", (xxx) xxx-x", "(xxx) xxx-xx", "(xxx) xxx-xxx", "(xxx) xxx-xxxx"
      return `(${currentValue.slice(0, 3)}) ${currentValue.slice(3, 6)}-${currentValue.slice(6, 10)}`;
    }
  }

const handleFormInput = (event) => {

    let { name, value } = event.target;
    if (name === 'phone') {
    setUserState(prevState => ({...userState, phone: handlePhoneNumberInput(value, prevState.phone) }))
    } else {
    setUserState({ ...userState, [name]: value });
    }
    // if (value === "") {
    // setUserState({...userState,  [name + "Error"]: "Should not be empty" });
    // } else {
    // setUserState({...userState,  [name + "Error"]: "" });
    // }
  };

    return (
        <div className={style.userContainer}>
        <div className={`${style.userForm}`}>
          <h3 className={style.head}>Update User</h3>

      {user &&    <div>
            <form>
              <TextField
                variant="outlined"
                required
                fullWidth
                size="small"
                autoFocus
                id="name"
                label="Full Name"
                name="name"
                value={userState.name}
                onChange={handleFormInput}
                // error={this.state.nameError ? true : false}
                className={style.styleFormFields}
              />

              <TextField
                variant="outlined"
                required
                fullWidth
                size="small"
                id="email"
                label="Email Address"
                name="email"
                value={userState.email}
                onChange={handleFormInput}
                // error={this.state.emailError ? true : false}
                className={style.styleFormFields}
              />

              <TextField
                variant="outlined"
                required
                fullWidth
                size="small"
                id="phnumber"
                label="Phone Number"
                name="phone"
                value={userState.phone}
                onChange={handleFormInput}
                // error={this.state.phoneError ? true : false}
                className={style.styleFormFields}
              />

              <TextField
                variant="outlined"
                required
                fullWidth
                size="small"
                id="address"
                label="Address"
                name="address"
                value={userState.address}
                // error={this.state.addressError ? true : false}
                onChange={handleFormInput}
                className={style.styleAddress}
              />

    </form>
    </div>
    }
    </div>
    </div>
    )
}
var mapStateToProps = (state) =>({
  user: state.users.user
})
var actions = {
  getUser
}

export default connect(mapStateToProps,actions)(UpdateUser)
