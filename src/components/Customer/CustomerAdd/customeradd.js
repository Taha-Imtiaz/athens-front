import React from 'react'
import Navbar from '../../Navbar/Navbar'
import style from './customeradd.module.css'
const customerAdd = ()=>{
    return<div className={style.jumbotron}>
    
        <h3 className={style.head}>Create New Customer</h3> 
    <div className={style.container}>
        <form>
        <div class="form-group">
    <label for="exampleInputEmail1">Customer Name</label>
    <input type="input" class="form-control" id="name" aria-describedby="emailHelp"/>
    </div>
    <div class="form-group">
    <label for="exampleInputEmail1">Phone Number</label>
    <input type="input" class="form-control" id="phone_number" aria-describedby="emailHelp"/>
    </div>
     <div class="form-group">
    <label for="exampleInputEmail1">Email address</label>
    <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
    </div>
    </form>
    <h3>Sub Contact</h3>
    <form>
    <div class="form-group">
    <label for="exampleInputEmail1">Phone Number</label>
    <input type="input" class="form-control" id="phone_number" aria-describedby="emailHelp"/>
    </div>
     <div class="form-group">
    <label for="exampleInputEmail1">Email address</label>
    <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
    <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
    </div>
    <button type="submit" class="btn btn-primary">Submit</button>

    </form>
    </div>
    </div>
}
export default customerAdd