import React from 'react'
import style from './CustomerDeposit.module.css'
import SideBar from '../../Sidebar/SideBar'
import Button from '../../Button/Button'
import { Link } from 'react-router-dom'

const CustomerDeposit = () => {

  const routes = [{
    title: "Claims",
    path: "/claim/customer",
    icon: <i className = "fa fa-exchange"></i>
  },
  {
    title: "Blanket Deposit",
    path: "/claim/customerdeposit",
    icon: <i className = "fa fa-bed"></i>
  }
  ]


  return <div>
    <div className="row">
      <div className="col-2">
        <SideBar routes={routes} />
      </div>
      <div className="col-10">
      <div className="row">
    
      <div className="col-6">
        <h3 className={style.head}>Blanket Deposit</h3>
      </div>
      <div className="col-6">
        <div className={style.btn}>
        <Link style={{ textDecoration: "none" }} to='/claim/customerdeposit/deposit'> <Button name="Deposit" /> </Link>
        </div>
      </div>
      </div>

    <div className={`row ${style.myrow} `}>
      <div className={`col-4 ${style.flex}`}>
        <h6>Blanket</h6>
      </div>
      <div className={`col-4 ${style.flex}`}>
        <h6>Quantity</h6>
      </div>
      <div className={`col-4 ${style.flex}`}>
        <h6>Deposit</h6>
      </div>
    </div>

    <div className={style.jumbotron}>
      <ul className="list-group">
        
        <li className=" checkbox list-group-item">
          <div className="row">
          <div className="col-4">
          <label>Size(m)</label>
          </div>
          <div className="col-4">
          <label>2</label>
          </div>
          <div className="col-4">
            <label>$$$</label>
          </div>
       </div> 
        </li>
       
        <li className="list-group-item">
        <div className="row">
          <div className="col-4">
          <label>Size(s)</label>
          </div>
          <div className="col-4">
          <label>3</label>
          </div>
          <div className="col-4">
            <label>$$$</label>
          </div>
       </div> 
        </li>

        <li className="list-group-item">
        <div className="row">
          <div className="col-4">
          <label>Size(L)</label>
          </div>
          <div className="col-4">
          <label>4</label>
          </div>
          <div className="col-4">
            <label>$$$</label>
          </div>
       </div> 
        </li>
      </ul>
    </div>
    </div>
  </div>
  </div>
}

export default CustomerDeposit