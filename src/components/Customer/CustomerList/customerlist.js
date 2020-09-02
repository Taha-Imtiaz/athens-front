import React from 'react'
import Navbar from '../../Navbar/Navbar'
import style from './customerlist.module.css'

const customerList = ()=>{
    return <div>
    <h1 className={style.head}>This is customer List page</h1>
    <div className = {style.btndel}>
    <button className={`btn btn-primary ${style.btnCustom}`}><i className="fa fa-trash"> Delete</i></button>       
    </div>
    <div className={style.jumbotron}>
        <div>
        <ul class="list-group">
  <li class=" checkbox list-group-item d-flex justify-content-between align-items-center">
    <label>Muhammad Shaheer Abbas</label>
    <button className={`btn btn-primary ${style.btnCustom}`}><i className="fa fa-map-marker">  Location/Address</i></button>
    <button className={`btn btn-primary ${style.btnCustom}`}><i className="fa fa-edit">  Edit</i></button>
  </li>
  <li class="list-group-item d-flex justify-content-between align-items-center">
    <label>Muhammad Shaheer Abbas</label>
    <button className={`btn btn-primary ${style.btnCustom}`}><i className="fa fa-map-marker">  Location/Address</i></button>
    <button className={`btn btn-primary ${style.btnCustom}`}><i className="fa fa-edit">  Edit</i></button>
  </li>
  <li class="list-group-item d-flex justify-content-between align-items-center">
    <label>Muhammad Shaheer Abbas</label>
    <button className={`btn btn-primary ${style.btnCustom}`}><i className="fa fa-map-marker">  Location/Address</i></button>
    <button className={`btn btn-primary ${style.btnCustom}`}><i className="fa fa-edit">  Edit</i></button>
  </li>
  <li class="list-group-item d-flex justify-content-between align-items-center">
    <label>Muhammad Shaheer Abbas</label>
    <button className={`btn btn-primary ${style.btnCustom}`}><i className="fa fa-map-marker">  Location/Address</i></button>
    <button className={`btn btn-primary ${style.btnCustom}`}><i className="fa fa-edit">  Edit</i></button>
  </li>
</ul>
</div>
    </div>
    </div>
}
export default customerList