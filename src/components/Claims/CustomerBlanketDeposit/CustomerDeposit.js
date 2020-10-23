import React, { useEffect, useState } from 'react'
import style from './CustomerDeposit.module.css'
import SideBar from '../../Sidebar/SideBar'
import Button from '../../Button/Button'
import { Link } from 'react-router-dom'
import { getDeposits } from '../../../Redux/Claims/claimsActions'
const CustomerDeposit = () => {

  const routes = [{
    title: "Claims",
    path: "/claim/customer",
    icon: <i className="fa fa-exchange"></i>
  },
  {
    title: "Blanket Deposit",
    path: "/claim/customerdeposit",
    icon: <i className="fa fa-bed"></i>
  }
  ]
  const [blankets, setBlankets] = useState([])
  useEffect(() => {
    getDeposits().then(res => {
      console.log(res.data.blanketDeposit)
      setBlankets(res.data.blanketDeposit)
    })
  }, []);

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
            <h6>Customer</h6>
          </div>
          <div className={`col-3 ${style.flex}`}>
            <h6>Quantity</h6>
          </div>
          <div className={`col-3 ${style.flex}`}>
            <h6>Deposit</h6>
          </div>
        </div>

        <div className={style.jumbotron}>
          <ul className="list-group">
            {blankets.length ? blankets.map((x, i) => (
              <li key={i} className=" checkbox list-group-item">
                <div className="row">
                  <div className="col-4">
                    <label>{x.customer.firstName} {x.customer.lastName}</label>
                  </div>
                  <div className="col-4">
                    <label>{x.quantity}</label>
                  </div>
                  <div className="col-4">
                    <label>{x.cost}$</label>
                  </div>
                </div>
              </li>
            )) : null}
          </ul>
        </div>
      </div>
    </div>
  </div>
}

export default CustomerDeposit